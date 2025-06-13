declare module 'react-speech-kit' {
  export interface SpeechSynthesisHook {
    speak: (options: { text: string; voice?: SpeechSynthesisVoice; rate?: number; pitch?: number; volume?: number }) => void;
    cancel: () => void;
    speaking: boolean;
    supported: boolean;
    voices: SpeechSynthesisVoice[];
  }

  export interface SpeechRecognitionHook {
    listen: (options?: { interimResults?: boolean; lang?: string }) => void;
    listening: boolean;
    stop: () => void;
    supported: boolean;
  }

  export function useSpeechSynthesis(): SpeechSynthesisHook;
  export function useSpeechRecognition(options?: {
    onResult?: (result: string) => void;
    onEnd?: () => void;
    onError?: (event: any) => void;
  }): SpeechRecognitionHook;
}
