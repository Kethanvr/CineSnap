import React, { useState } from "react";
import { Fab, Badge, Tooltip, Zoom } from "@mui/material";
import {
  SmartToy as AIIcon,
  AutoAwesome as SparkleIcon,
} from "@mui/icons-material";
import { motion } from "framer-motion";

interface AIFloatingButtonProps {
  onClick: () => void;
  hasNewSuggestions?: boolean;
  disabled?: boolean;
}

const AIFloatingButton: React.FC<AIFloatingButtonProps> = ({
  onClick,
  hasNewSuggestions = false,
  disabled = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Tooltip title="Ask CineSnap AI for movie recommendations" placement="left">
      <Zoom in={true}>
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          style={{
            position: "fixed",
            bottom: "2rem",
            right: "2rem",
            zIndex: 1200,
          }}
        >
          <Badge
            badgeContent={
              hasNewSuggestions ? <SparkleIcon fontSize="small" /> : null
            }
            color="secondary"
            overlap="circular"
          >
            <Fab
              color="primary"
              size="large"
              onClick={onClick}
              disabled={disabled}
              sx={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #764ba2 0%, #667eea 100%)",
                  transform: "scale(1.05)",
                },
                "&:disabled": {
                  background: "grey.400",
                },
                transition: "all 0.3s ease",
                boxShadow: isHovered
                  ? "0 8px 25px rgba(102, 126, 234, 0.4)"
                  : "0 4px 15px rgba(102, 126, 234, 0.2)",
              }}
            >
              <motion.div
                animate={isHovered ? { rotate: 360 } : { rotate: 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                <AIIcon fontSize="large" />
              </motion.div>
            </Fab>
          </Badge>
        </motion.div>
      </Zoom>
    </Tooltip>
  );
};

export default AIFloatingButton;
