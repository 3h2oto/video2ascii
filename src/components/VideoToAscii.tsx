"use client";

import { useVideoToAscii } from "@/hooks/useVideoToAscii";
import { useAsciiMouseEffect } from "@/hooks/useAsciiMouseEffect";
import { useAsciiRipple } from "@/hooks/useAsciiRipple";
import { useAsciiAudio } from "@/hooks/useAsciiAudio";
import { CHAR_WIDTH_RATIO, type VideoToAsciiProps } from "@/lib/webgl";

export type { VideoToAsciiProps };

// Component Implementation
export function VideoToAscii({
  src,
  fontSize = 10,
  colored = false,
  blend = 0,
  highlight = 0,
  charset = "standard",
  maxWidth = 900,
  enableMouse = true,
  trailLength = 24,
  enableRipple = false,
  rippleSpeed = 40,
  audioReactivity = 0,
  audioSensitivity = 50,
  showStats = false,
  className = "",
}: VideoToAsciiProps) {
  // Core hook handles WebGL setup and rendering
  const ascii = useVideoToAscii({
    fontSize,
    colored,
    blend,
    highlight,
    charset,
    maxWidth,
  });

  // Destructure to avoid linter issues with accessing refs
  const {
    containerRef,
    videoRef,
    canvasRef,
    stats,
    dimensions,
    isReady,
    isPlaying,
  } = ascii;

  // Feature hooks - always call them (React rules), enable/disable via options
  const mouseHandlers = useAsciiMouseEffect(ascii, {
    enabled: enableMouse,
    trailLength,
  });

  const rippleHandlers = useAsciiRipple(ascii, {
    enabled: enableRipple,
    speed: rippleSpeed,
  });

  useAsciiAudio(ascii, {
    enabled: audioReactivity > 0,
    reactivity: audioReactivity,
    sensitivity: audioSensitivity,
  });

  // Calculate canvas size in pixels
  const charWidth = fontSize * CHAR_WIDTH_RATIO;
  const pixelWidth = dimensions.cols * charWidth;
  const pixelHeight = dimensions.rows * fontSize;

  return (
    <div className={`video-to-ascii ${className}`}>
      {/* Hidden video element - feeds frames to WebGL */}
      <video
        ref={videoRef}
        src={src}
        muted={audioReactivity === 0}
        loop
        playsInline
        crossOrigin="anonymous"
        style={{ display: "none" }}
      />

      {/* Interactive container */}
      <div
        ref={containerRef}
        className="relative cursor-pointer select-none overflow-hidden rounded"
        style={{
          width: pixelWidth || "100%",
          height: pixelHeight || "auto",
          backgroundColor: "#000",
        }}
        {...(enableMouse ? mouseHandlers : {})}
        {...(enableRipple ? rippleHandlers : {})}
      >
        {/* WebGL canvas - all ASCII rendering happens here */}
        <canvas
          ref={canvasRef}
          style={{
            width: "100%",
            height: "100%",
            display: "block",
          }}
        />

        {/* Stats overlay */}
        {showStats && isReady && (
          <div className="absolute top-2 left-2 bg-black/70 text-green-400 px-2 py-1 text-xs font-mono rounded">
            {stats.fps} FPS | {stats.frameTime.toFixed(2)}ms | {dimensions.cols}
            ×{dimensions.rows}
          </div>
        )}

        {/* Play indicator */}
        {!isPlaying && isReady && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <div className="text-white text-lg">▶ Press Space to Play</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default VideoToAscii;
