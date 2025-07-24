"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import MainView from "./MainView";
import IncidentPanel from "./IncidentPanel";

export default function Dashboard() {
  const [activeCamera, setActiveCamera] = useState("Camera - 01");
  const [currentTime, setCurrentTime] = useState("03:12:37 (05-Jun-2025)");
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectedIncident, setSelectedIncident] = useState(null);

  // Mock data for cameras
  const cameras = [
    {
      id: "Camera - 01",
      name: "Entrance Camera",
      videoSrc: "/videos/enterance.mp4",
      status: "active",
      hasUnauthorizedAccess: true,
      hasFaceRecognised: true,
      hasMultipleEvents: true,
      hasGunThreat: true,
    },
    {
      id: "Camera - 02",
      name: "Reception Camera",
      videoSrc: "/videos/reception.mp4",
      status: "active",
      hasUnauthorizedAccess: true,
      hasFaceRecognised: true,
    },
    {
      id: "Camera - 03",
      name: "Store Camera",
      videoSrc: "/videos/store.mp4",
      status: "active",
      hasTrafficCongestion: true,
      hasUnauthorizedAccess: true,
    },
  ];

  // Mock incident data
  const incidents = [
    {
      id: 1,
      type: "Unauthorised Access",
      camera: "Entrance Camera",
      cameraId: "Camera - 01",
      time: "14:35 - 14:37 on 7-Jul-2025",
      timestamp: 875, // 14:35 in seconds
      status: "unresolved",
      severity: "high",
    },
    {
      id: 2,
      type: "Gun Threat",
      camera: "Reception Camera",
      cameraId: "Camera - 02",
      time: "12:22 - 12:24 on 7-Jul-2025",
      timestamp: 742, // 12:22 in seconds
      status: "unresolved",
      severity: "critical",
    },
    {
      id: 3,
      type: "Unauthorised Access",
      camera: "Store Camera",
      cameraId: "Camera - 03",
      time: "09:15 - 09:17 on 7-Jul-2025",
      timestamp: 555, // 09:15 in seconds
      status: "unresolved",
      severity: "high",
    },
    {
      id: 4,
      type: "Unauthorised Access",
      camera: "Entrance Camera",
      cameraId: "Camera - 01",
      time: "16:45 - 16:47 on 7-Jul-2025",
      timestamp: 1005, // 16:45 in seconds
      status: "unresolved",
      severity: "high",
    },
    {
      id: 5,
      type: "Unauthorised Access",
      camera: "Reception Camera",
      cameraId: "Camera - 02",
      time: "11:30 - 11:32 on 7-Jul-2025",
      timestamp: 690, // 11:30 in seconds
      status: "unresolved",
      severity: "high",
    },
  ];

  const handleIncidentClick = (incident) => {
    // Switch to the incident's camera
    setActiveCamera(incident.cameraId);
    // Set the selected incident for timestamp handling
    setSelectedIncident(incident);
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex min-w-0">
        {/* Main Video and Timeline Area */}
        <div className="flex-1 min-w-0 flex flex-col">
          {/* Main Video View */}
          <div className="flex-1">
            <MainView
              activeCamera={activeCamera}
              currentTime={currentTime}
              cameras={cameras}
              onCameraSelect={setActiveCamera}
              isPlaying={isPlaying}
              onPlayPause={setIsPlaying}
              selectedIncident={selectedIncident}
              onIncidentProcessed={() => setSelectedIncident(null)}
            />
          </div>

          {/* Bottom Timeline Section */}
          <div className="bg-gray-800 border-t border-gray-700">
            <div className="p-3">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-white font-medium text-sm">
                  Camera Timeline
                </h3>
                <div className="text-xs text-gray-400">
                  17/7/2025 - 03:12:37
                </div>
              </div>

              {/* Simplified Main Timeline */}
              <div className="relative mb-3">
                <div className="h-12 bg-gray-700/20 rounded relative overflow-hidden">
                  {/* Simplified hour markers */}
                  <div className="absolute inset-x-0 top-0 flex justify-between text-xs text-gray-500 px-3 pt-1">
                    <span>00:00</span>
                    <span>06:00</span>
                    <span>12:00</span>
                    <span>18:00</span>
                  </div>

                  {/* Current time indicator */}
                  <div className="absolute left-[19%] top-2 bottom-1 w-0.5 bg-yellow-400"></div>

                  {/* Cleaner Event segments */}
                  <div
                    className="absolute top-4 left-[9%] h-4 bg-orange-500 rounded text-xs text-white flex items-center justify-center font-medium"
                    style={{ width: "70px" }}
                  >
                    Access
                  </div>
                  <div
                    className="absolute top-4 left-[34%] h-4 bg-blue-500 rounded text-xs text-white flex items-center justify-center font-medium"
                    style={{ width: "50px" }}
                  >
                    Face
                  </div>
                  <div
                    className="absolute top-4 left-[50%] h-4 bg-yellow-400 rounded text-xs text-black flex items-center justify-center font-medium"
                    style={{ width: "60px" }}
                  >
                    Multiple
                  </div>
                  <div
                    className="absolute top-4 left-[73%] h-4 bg-red-500 rounded animate-pulse text-xs text-white flex items-center justify-center font-medium"
                    style={{ width: "55px" }}
                  >
                    Threat
                  </div>
                </div>
              </div>

              {/* Camera List with individual timelines */}
              <div className="space-y-1.5">
                {cameras.map((camera) => (
                  <div key={camera.id} className="flex items-center space-x-4">
                    <div className="flex items-center space-x-3 w-28">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          camera.id === activeCamera
                            ? "bg-green-400"
                            : "bg-gray-500"
                        }`}
                      ></div>
                      <span className="text-sm text-gray-300 font-medium">
                        {camera.id}
                      </span>
                    </div>

                    {/* Individual camera timeline */}
                    <div className="flex-1 h-8 bg-gray-700/30 rounded relative overflow-hidden">
                      {/* Event indicators for each camera */}
                      {camera.hasUnauthorizedAccess && (
                        <>
                          <div
                            className={`absolute left-[9%] top-0.5 bottom-0.5 bg-orange-500 rounded cursor-pointer hover:bg-orange-400 transition-all duration-200 shadow-md ${
                              selectedIncident?.type ===
                                "Unauthorised Access" &&
                              selectedIncident?.cameraId === camera.id
                                ? "ring-2 ring-orange-300 shadow-lg scale-105"
                                : ""
                            }`}
                            style={{ width: "70px" }}
                            title="Unauthorised Access"
                            onClick={() => {
                              const incident = incidents.find(
                                (i) =>
                                  i.type === "Unauthorised Access" &&
                                  i.cameraId === camera.id
                              );
                              if (incident) handleIncidentClick(incident);
                            }}
                          ></div>
                          {camera.id === "Camera - 01" && (
                            <div
                              className={`absolute left-[73%] top-0.5 bottom-0.5 bg-orange-500 rounded cursor-pointer hover:bg-orange-400 transition-all duration-200 shadow-md ${
                                selectedIncident?.type ===
                                  "Unauthorised Access" &&
                                selectedIncident?.cameraId === camera.id
                                  ? "ring-2 ring-orange-300 shadow-lg scale-105"
                                  : ""
                              }`}
                              style={{ width: "60px" }}
                              title="Unauthorised Access"
                            ></div>
                          )}
                        </>
                      )}

                      {camera.hasFaceRecognised && (
                        <div
                          className="absolute left-[34%] top-0.5 bottom-0.5 bg-blue-500 rounded cursor-pointer hover:bg-blue-400 transition-all duration-200 shadow-md"
                          style={{ width: "55px" }}
                          title="Face Recognised"
                        ></div>
                      )}

                      {camera.hasMultipleEvents && (
                        <div
                          className="absolute left-[50%] top-0.5 bottom-0.5 bg-yellow-400 rounded cursor-pointer hover:bg-yellow-300 transition-all duration-200 shadow-md"
                          style={{ width: "70px" }}
                          title="Multiple Events"
                        ></div>
                      )}

                      {camera.hasGunThreat && (
                        <div
                          className={`absolute left-[73%] top-0.5 bottom-0.5 bg-red-500 rounded animate-pulse cursor-pointer hover:bg-red-400 transition-all duration-200 shadow-md ${
                            selectedIncident?.type === "Gun Threat" &&
                            selectedIncident?.cameraId === camera.id
                              ? "ring-2 ring-red-300 shadow-lg scale-105"
                              : ""
                          }`}
                          style={{ width: "65px" }}
                          title="Gun Threat"
                          onClick={() => {
                            const incident = incidents.find(
                              (i) =>
                                i.type === "Gun Threat" &&
                                i.cameraId === camera.id
                            );
                            if (incident) handleIncidentClick(incident);
                          }}
                        ></div>
                      )}

                      {camera.hasTrafficCongestion && (
                        <div
                          className="absolute left-[25%] top-0.5 bottom-0.5 bg-cyan-500 rounded cursor-pointer hover:bg-cyan-400 transition-all duration-200 shadow-md"
                          style={{ width: "80px" }}
                          title="Traffic congestion"
                        ></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Incident Panel */}
        <div className="w-64 flex-shrink-0">
          <IncidentPanel
            incidents={incidents}
            onIncidentClick={handleIncidentClick}
            selectedIncident={selectedIncident}
          />
        </div>
      </div>
    </div>
  );
}
