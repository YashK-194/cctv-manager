"use client";

import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  RotateCcw,
  RotateCw,
} from "lucide-react";
import { useRef, useEffect } from "react";

export default function MainView({
  activeCamera,
  currentTime,
  cameras,
  onCameraSelect,
  isPlaying,
  onPlayPause,
  selectedIncident,
  onIncidentProcessed,
}) {
  const videoRef = useRef(null);
  const activeVideoData = cameras.find((camera) => camera.id === activeCamera);

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying]);

  // Handle incident timestamp seeking
  useEffect(() => {
    if (selectedIncident && videoRef.current) {
      const video = videoRef.current;
      const seekToTime = () => {
        // Check if the video duration is loaded
        if (video.duration && !isNaN(video.duration)) {
          // Convert timestamp (assuming it's in seconds from start of day) to video time
          // For demo purposes, map it to a percentage of video duration
          let targetTime;

          if (selectedIncident.timestamp <= video.duration) {
            // If timestamp is within video duration, use it directly
            targetTime = selectedIncident.timestamp;
          } else {
            // Otherwise, use a random time within the video
            targetTime = Math.random() * video.duration;
          }

          video.currentTime = targetTime;
          onIncidentProcessed(); // Clear the selected incident
        }
      };

      // If video metadata is already loaded, seek immediately
      if (video.readyState >= 1) {
        seekToTime();
      } else {
        // Otherwise wait for metadata to load
        video.addEventListener("loadedmetadata", seekToTime, { once: true });
      }
    }
  }, [selectedIncident, activeCamera, onIncidentProcessed]);

  const handlePlayPause = () => {
    onPlayPause(!isPlaying);
  };
  return (
    <div className="flex flex-col h-full bg-gray-900">
      {/* Main Video Display */}
      <div className="flex-1 p-3 min-h-0">
        <div className="relative w-full h-full bg-black rounded-lg overflow-hidden">
          {/* Video Container with fixed aspect ratio */}
          <div className="relative w-full h-full">
            {/* Actual Video Element */}
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-contain"
              src={activeVideoData?.videoSrc}
              loop
              muted
              autoPlay
              key={activeCamera} // Force re-render when camera changes
            />

            {/* Camera Label */}
            <div className="absolute top-4 left-4 bg-black/70 px-3 py-1 rounded">
              <span className="text-white text-sm font-medium">
                {activeVideoData?.name || activeCamera}
              </span>
            </div>

            {/* Timestamp */}
            <div className="absolute top-4 right-4 bg-black/70 px-3 py-1 rounded">
              <span className="text-white text-sm">{currentTime}</span>
            </div>

            {/* Small camera previews */}
            <div className="absolute bottom-4 right-4 flex space-x-2">
              {cameras
                .filter((camera) => camera.id !== activeCamera)
                .map((camera, index) => (
                  <div
                    key={camera.id}
                    className="w-24 h-16 bg-gray-700 rounded cursor-pointer hover:bg-gray-600 transition-colors relative overflow-hidden flex-shrink-0"
                    onClick={() => onCameraSelect(camera.id)}
                  >
                    {/* Mini video preview */}
                    <video
                      className="absolute inset-0 w-full h-full object-contain"
                      src={camera.videoSrc}
                      muted
                      loop
                      autoPlay
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black/70 px-1 py-0.5">
                      <span className="text-white text-xs">{camera.name}</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* Video Controls */}
      <div className="bg-gray-800 px-3 py-3 border-t border-gray-700">
        <div className="flex items-center space-x-4">
          {/* Video Control Buttons */}
          <button className="p-2 text-gray-400 hover:text-white">
            <SkipBack className="w-5 h-5" />
          </button>
          <button
            className="p-3 bg-gray-700 hover:bg-gray-600 rounded-full"
            onClick={handlePlayPause}
          >
            {isPlaying ? (
              <Pause className="w-6 h-6 text-white" />
            ) : (
              <Play className="w-6 h-6 text-white" />
            )}
          </button>
          <button className="p-2 text-gray-400 hover:text-white">
            <SkipForward className="w-5 h-5" />
          </button>

          {/* Time display */}
          <span className="text-white text-sm font-mono">{currentTime}</span>

          <div className="flex-1"></div>

          {/* Additional controls */}
          <button className="p-2 text-gray-400 hover:text-white">
            <RotateCcw className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-400 hover:text-white">
            <RotateCw className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
