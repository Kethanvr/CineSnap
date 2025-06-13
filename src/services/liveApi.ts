export interface LiveSession {
  ws: WebSocket | null;
  sessionId: string;
  isConnected: boolean;
  startTime: Date;
  mediaStream: MediaStream | null;
  isVideoEnabled: boolean;
  isAudioEnabled: boolean;
}

export interface MoodAnalysis {
  primaryMood: string;
  confidence: number;
  emotions: { [key: string]: number };
  recommendations: string[];
}

export interface LiveMessage {
  type:
    | "setup"
    | "realtimeInput"
    | "serverContent"
    | "setupComplete"
    | "interrupted";
  content?: any;
  realtimeInput?: {
    mediaChunks: Array<{
      mimeType: string;
      data: string;
    }>;
  };
  serverContent?: {
    modelTurn?: {
      parts: Array<{
        text?: string;
        inlineData?: {
          mimeType: string;
          data: string;
        };
      }>;
    };
    interrupted?: boolean;
  };
}

class LiveApiService {
  private session: LiveSession | null = null;
  private apiKey: string;
  private sessionTimeoutId: number | null = null;
  private readonly MAX_SESSION_DURATION = 2 * 60 * 1000; // 2 minutes (API limit for video)
  private readonly WS_URL =
    "wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1alpha.GenerativeService.BidiGenerateContent";

  // Event handlers
  private onMessageHandler:
    | ((message: string, isUser: boolean) => void)
    | null = null;
  private onMoodAnalysisHandler: ((analysis: MoodAnalysis) => void) | null =
    null;
  private onConnectionStateHandler: ((connected: boolean) => void) | null =
    null;
  private onErrorHandler: ((error: string) => void) | null = null;

  constructor() {
    this.apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!this.apiKey) {
      throw new Error("Gemini API key not found in environment variables");
    }
  }

  // Event handler setters
  onMessage(handler: (message: string, isUser: boolean) => void) {
    this.onMessageHandler = handler;
  }

  onMoodAnalysis(handler: (analysis: MoodAnalysis) => void) {
    this.onMoodAnalysisHandler = handler;
  }

  onConnectionState(handler: (connected: boolean) => void) {
    this.onConnectionStateHandler = handler;
  }

  onError(handler: (error: string) => void) {
    this.onErrorHandler = handler;
  }

  async startLiveSession(
    enableVideo: boolean = true,
    enableAudio: boolean = true
  ): Promise<boolean> {
    try {
      // Get user media
      const constraints: MediaStreamConstraints = {
        audio: enableAudio,
        video: enableVideo
          ? {
              width: { ideal: 640 },
              height: { ideal: 480 },
              frameRate: { ideal: 15 },
            }
          : false,
      };

      const mediaStream = await navigator.mediaDevices.getUserMedia(
        constraints
      );

      // Note: Live API requires server-side authentication
      // For production, this should go through your backend server
      const ws = new WebSocket(`${this.WS_URL}?key=${this.apiKey}`);

      this.session = {
        ws,
        sessionId: this.generateSessionId(),
        isConnected: false,
        startTime: new Date(),
        mediaStream,
        isVideoEnabled: enableVideo,
        isAudioEnabled: enableAudio,
      };

      console.log(
        `Live session created with video: ${enableVideo}, audio: ${enableAudio}`
      );

      // Set up WebSocket handlers
      this.setupWebSocketHandlers();

      // Set session timeout
      this.sessionTimeoutId = window.setTimeout(() => {
        this.endSession();
        this.onErrorHandler?.(
          "Session timeout reached (2 minutes). Starting new session..."
        );
      }, this.MAX_SESSION_DURATION);

      return new Promise((resolve) => {
        ws.onopen = () => {
          this.session!.isConnected = true;
          console.log("WebSocket connected, starting setup...");
          this.onConnectionStateHandler?.(true);
          this.sendSetupMessage(enableVideo, enableAudio);
          resolve(true);
        };

        ws.onerror = () => {
          this.onErrorHandler?.("Failed to connect to Live API");
          resolve(false);
        };
      });
    } catch (error) {
      console.error("Error starting live session:", error);
      this.onErrorHandler?.(
        "Failed to access camera/microphone. Please grant permissions."
      );
      return false;
    }
  }

  private setupWebSocketHandlers() {
    if (!this.session?.ws) return;

    this.session.ws.onmessage = (event) => {
      try {
        const message: LiveMessage = JSON.parse(event.data);
        this.handleLiveMessage(message);
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    this.session.ws.onclose = () => {
      this.session!.isConnected = false;
      this.onConnectionStateHandler?.(false);
    };

    this.session.ws.onerror = (error) => {
      console.error("WebSocket error:", error);
      this.onErrorHandler?.("Connection error occurred");
    };
  }

  private sendSetupMessage(_enableVideo: boolean, _enableAudio: boolean) {
    if (!this.session?.ws || this.session.ws.readyState !== WebSocket.OPEN)
      return;

    const setupMessage = {
      setup: {
        model: "models/gemini-2.0-flash-exp",
        generation_config: {
          response_modalities: ["TEXT", "AUDIO"],
          speech_config: {
            voice_config: {
              prebuilt_voice_config: {
                voice_name: "Aoede",
              },
            },
          },
        },
        system_instruction: {
          parts: [
            {
              text: `You are CineSnap AI, an advanced movie recommendation assistant with real-time video and audio capabilities.

Your primary functions:
1. MOOD ANALYSIS: Analyze user's facial expressions, tone of voice, and body language to understand their emotional state
2. PERSONALIZED RECOMMENDATIONS: Suggest movies based on detected mood, preferences, and context
3. INTERACTIVE CONVERSATION: Engage naturally through voice and video interactions

MOOD DETECTION GUIDELINES:
- Happy/Excited: Recommend upbeat movies, comedies, feel-good films
- Sad/Melancholy: Suggest comforting movies, heartwarming stories, or cathartic dramas
- Stressed/Anxious: Recommend relaxing content, light comedies, or mindfulness documentaries
- Bored: Suggest engaging thrillers, action movies, or binge-worthy series
- Romantic: Recommend romantic comedies, love stories, date-night movies
- Adventurous: Suggest action movies, adventure films, or travel documentaries

Always:
- Respond naturally and conversationally
- Ask follow-up questions about preferences
- Provide specific movie titles with brief explanations
- Consider the viewing context (alone, with friends, family, etc.)
- Adapt recommendations based on real-time mood changes

Keep responses concise but helpful. Use a warm, friendly tone that matches the user's energy level.`,
            },
          ],
        },
      },
    };

    this.session.ws.send(JSON.stringify(setupMessage));
    console.log("Setup message sent, starting media streaming...");
    this.startMediaStreaming();
  }

  private async startMediaStreaming() {
    if (!this.session?.mediaStream || !this.session.ws) return;

    try {
      // Check for supported MIME types
      const supportedTypes = [
        "video/webm;codecs=vp8,opus",
        "video/webm;codecs=vp9,opus",
        "video/webm",
        "video/mp4",
      ];

      let selectedType = supportedTypes[0];
      for (const type of supportedTypes) {
        if (MediaRecorder.isTypeSupported(type)) {
          selectedType = type;
          break;
        }
      }

      const mediaRecorder = new MediaRecorder(this.session.mediaStream, {
        mimeType: selectedType,
        videoBitsPerSecond: 500000, // 500kbps for manageable chunk sizes
        audioBitsPerSecond: 64000, // 64kbps for audio
      });

      mediaRecorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          // Only send if we have a valid session and data isn't too large
          if (
            this.session?.ws?.readyState === WebSocket.OPEN &&
            event.data.size < 500000
          ) {
            this.sendMediaChunk(event.data);
          } else if (event.data.size >= 500000) {
            console.warn(
              `Skipping large media chunk: ${event.data.size} bytes`
            );
          }
        }
      };

      mediaRecorder.onerror = (event) => {
        console.error("MediaRecorder error:", event);
        this.onErrorHandler?.("Media recording error occurred");
      };

      mediaRecorder.onstop = () => {
        console.log("Media recording stopped");
      };

      // Record in smaller chunks for better real-time performance
      mediaRecorder.start(500); // 0.5 second chunks for better responsiveness

      // Store recorder for cleanup
      (this.session as any).mediaRecorder = mediaRecorder;

      console.log(`Media streaming started with ${selectedType}`);
    } catch (error) {
      console.error("Error starting media streaming:", error);
      this.onErrorHandler?.("Failed to start media streaming");
    }
  }

  private async sendMediaChunk(chunk: Blob) {
    try {
      // Check if session is still active
      if (!this.session?.ws || this.session.ws.readyState !== WebSocket.OPEN) {
        console.warn("WebSocket not ready, skipping media chunk");
        return;
      }

      // Limit chunk size to prevent stack overflow
      const MAX_CHUNK_SIZE = 1024 * 1024; // 1MB limit
      if (chunk.size > MAX_CHUNK_SIZE) {
        console.warn(`Media chunk too large (${chunk.size} bytes), skipping`);
        return;
      }

      const arrayBuffer = await chunk.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);

      // Use a more efficient base64 encoding method to avoid stack overflow
      let base64Data = "";
      const CHUNK_SIZE = 8192; // Process in smaller chunks

      for (let i = 0; i < uint8Array.length; i += CHUNK_SIZE) {
        const slice = uint8Array.slice(i, i + CHUNK_SIZE);
        base64Data += btoa(String.fromCharCode(...slice));
      }

      const message = {
        realtimeInput: {
          mediaChunks: [
            {
              mimeType: chunk.type || "video/webm",
              data: base64Data,
            },
          ],
        },
      };

      this.session.ws.send(JSON.stringify(message));
    } catch (error) {
      console.error("Error sending media chunk:", error);
      // Don't throw the error to prevent disrupting the media stream
    }
  }

  private handleLiveMessage(message: LiveMessage) {
    switch (message.type) {
      case "setupComplete":
        console.log("Live session setup complete");
        break;

      case "serverContent":
        if (message.serverContent?.modelTurn?.parts) {
          for (const part of message.serverContent.modelTurn.parts) {
            if (part.text) {
              this.onMessageHandler?.(part.text, false);
              this.analyzeForMoodAndRecommendations(part.text);
            }

            if (part.inlineData?.mimeType.startsWith("audio/")) {
              this.playAudioResponse(part.inlineData.data);
            }
          }
        }
        break;

      case "interrupted":
        console.log("Model response interrupted");
        break;

      default:
        console.log("Received message:", message);
    }
  }

  private async playAudioResponse(base64Audio: string) {
    try {
      const audioData = atob(base64Audio);
      const audioBuffer = new ArrayBuffer(audioData.length);
      const view = new Uint8Array(audioBuffer);

      for (let i = 0; i < audioData.length; i++) {
        view[i] = audioData.charCodeAt(i);
      }

      const audioContext = new AudioContext();
      const audioBufferNode = await audioContext.decodeAudioData(audioBuffer);
      const source = audioContext.createBufferSource();

      source.buffer = audioBufferNode;
      source.connect(audioContext.destination);
      source.start();
    } catch (error) {
      console.error("Error playing audio response:", error);
    }
  }

  private analyzeForMoodAndRecommendations(text: string) {
    // Extract mood analysis from AI response
    const moodKeywords = {
      happy: ["happy", "joyful", "excited", "cheerful", "upbeat"],
      sad: ["sad", "melancholy", "down", "blue", "emotional"],
      stressed: ["stressed", "anxious", "tense", "worried", "overwhelmed"],
      bored: ["bored", "restless", "uninterested", "monotonous"],
      romantic: ["romantic", "love", "date", "intimate", "affectionate"],
      adventurous: ["adventurous", "exciting", "thrilling", "energetic"],
    };

    let detectedMood = "neutral";
    let confidence = 0;
    const emotions: { [key: string]: number } = {};

    // Simple keyword-based mood detection
    for (const [mood, keywords] of Object.entries(moodKeywords)) {
      const matches = keywords.filter((keyword) =>
        text.toLowerCase().includes(keyword)
      ).length;

      emotions[mood] = matches / keywords.length;
      if (emotions[mood] > confidence) {
        confidence = emotions[mood];
        detectedMood = mood;
      }
    }

    if (confidence > 0.2) {
      // Only trigger if we have reasonable confidence
      const analysis: MoodAnalysis = {
        primaryMood: detectedMood,
        confidence,
        emotions,
        recommendations: this.generateMoodBasedRecommendations(detectedMood),
      };

      this.onMoodAnalysisHandler?.(analysis);
    }
  }

  private generateMoodBasedRecommendations(mood: string): string[] {
    const recommendations: { [key: string]: string[] } = {
      happy: [
        "Feel-good comedies",
        "Uplifting dramas",
        "Musical films",
        "Adventure movies",
      ],
      sad: [
        "Comforting classics",
        "Heartwarming stories",
        "Inspiring biopics",
        "Gentle comedies",
      ],
      stressed: [
        "Light comedies",
        "Nature documentaries",
        "Mindfulness films",
        "Relaxing content",
      ],
      bored: [
        "Action thrillers",
        "Mystery series",
        "Sci-fi adventures",
        "Epic fantasies",
      ],
      romantic: [
        "Romantic comedies",
        "Love stories",
        "Date night movies",
        "Classic romances",
      ],
      adventurous: [
        "Action films",
        "Adventure epics",
        "Travel docs",
        "Superhero movies",
      ],
    };

    return (
      recommendations[mood] || [
        "Popular movies",
        "Trending content",
        "Award winners",
      ]
    );
  }

  sendTextMessage(text: string) {
    if (!this.session?.ws || this.session.ws.readyState !== WebSocket.OPEN) {
      this.onErrorHandler?.("Not connected to Live API");
      return;
    }

    const message = {
      realtimeInput: {
        mediaChunks: [
          {
            mimeType: "text/plain",
            data: btoa(text),
          },
        ],
      },
    };

    this.session.ws.send(JSON.stringify(message));
    this.onMessageHandler?.(text, true);
  }

  toggleVideo() {
    if (!this.session?.mediaStream) return;

    const videoTracks = this.session.mediaStream.getVideoTracks();
    videoTracks.forEach((track) => {
      track.enabled = !track.enabled;
    });

    this.session.isVideoEnabled = videoTracks[0]?.enabled || false;
    return this.session.isVideoEnabled;
  }

  toggleAudio() {
    if (!this.session?.mediaStream) return;

    const audioTracks = this.session.mediaStream.getAudioTracks();
    audioTracks.forEach((track) => {
      track.enabled = !track.enabled;
    });

    this.session.isAudioEnabled = audioTracks[0]?.enabled || false;
    return this.session.isAudioEnabled;
  }

  getSessionInfo() {
    if (!this.session) return null;

    const elapsed = Date.now() - this.session.startTime.getTime();
    const remaining = Math.max(0, this.MAX_SESSION_DURATION - elapsed);

    return {
      sessionId: this.session.sessionId,
      isConnected: this.session.isConnected,
      elapsed,
      remaining,
      isVideoEnabled: this.session.isVideoEnabled,
      isAudioEnabled: this.session.isAudioEnabled,
    };
  }

  getMediaStream(): MediaStream | null {
    return this.session?.mediaStream || null;
  }

  endSession() {
    if (this.sessionTimeoutId) {
      window.clearTimeout(this.sessionTimeoutId);
      this.sessionTimeoutId = null;
    }

    if (this.session) {
      // Stop media recorder
      const mediaRecorder = (this.session as any).mediaRecorder;
      if (mediaRecorder && mediaRecorder.state !== "inactive") {
        mediaRecorder.stop();
      }

      // Stop media stream
      if (this.session.mediaStream) {
        this.session.mediaStream.getTracks().forEach((track) => track.stop());
      }

      // Close WebSocket
      if (this.session.ws) {
        this.session.ws.close();
      }

      this.session = null;
    }

    this.onConnectionStateHandler?.(false);
  }

  isSessionActive(): boolean {
    return this.session?.isConnected || false;
  }

  private generateSessionId(): string {
    return (
      "session_" + Math.random().toString(36).substr(2, 9) + "_" + Date.now()
    );
  }
}

export const liveApiService = new LiveApiService();
