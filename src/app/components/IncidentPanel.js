"use client";

import {
  AlertTriangle,
  Zap,
  Shield,
  ChevronRight,
  Clock,
  Camera,
  Eye,
  Check,
  X,
  ExternalLink,
} from "lucide-react";

export default function IncidentPanel({
  incidents,
  onIncidentClick,
  selectedIncident,
  onIncidentHover,
  onIncidentLeave,
}) {
  const getIncidentIcon = (type) => {
    switch (type) {
      case "Gun Threat":
        return <Zap className="w-4 h-4" />;
      case "Unauthorised Access":
        return <Shield className="w-4 h-4" />;
      case "Face Recognised":
        return <Eye className="w-4 h-4" />;
      case "Traffic Congestion":
        return <AlertTriangle className="w-4 h-4" />;
      case "Multiple Events":
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const getIncidentColor = (type, severity) => {
    if (type === "Gun Threat" || severity === "critical") {
      return "border-red-500/50 bg-gradient-to-br from-red-500/15 to-red-600/5 hover:from-red-500/25 hover:to-red-600/10";
    }
    if (type === "Unauthorised Access" || severity === "high") {
      return "border-orange-500/50 bg-gradient-to-br from-orange-500/15 to-orange-600/5 hover:from-orange-500/25 hover:to-orange-600/10";
    }
    return "border-yellow-500/50 bg-gradient-to-br from-yellow-500/15 to-yellow-600/5 hover:from-yellow-500/25 hover:to-yellow-600/10";
  };

  const getIconColor = (type, severity) => {
    if (type === "Gun Threat" || severity === "critical") {
      return "text-red-400";
    }
    if (type === "Unauthorised Access" || severity === "high") {
      return "text-orange-400";
    }
    return "text-yellow-400";
  };

  const getIconBgColor = (type, severity) => {
    if (type === "Gun Threat" || severity === "critical") {
      return "bg-red-500/20 border border-red-500/30";
    }
    if (type === "Unauthorised Access" || severity === "high") {
      return "bg-orange-500/20 border border-orange-500/30";
    }
    return "bg-yellow-500/20 border border-yellow-500/30";
  };

  const resolvedCount = incidents.filter((i) => i.status === "resolved").length;
  const unresolvedCount = incidents.filter(
    (i) => i.status === "unresolved"
  ).length;

  return (
    <div className="bg-gray-800 border-l border-gray-700 h-full flex flex-col">
      {/* Header - Simplified */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center space-x-3 mb-3">
          <AlertTriangle className="w-5 h-5 text-red-500" />
          <h2 className="text-white text-lg font-semibold">
            {unresolvedCount} Unresolved Incidents
          </h2>
        </div>

        {/* Simplified Stats */}
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <span className="text-gray-300">{unresolvedCount} Active</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-gray-300">4 Resolved</span>
          </div>
        </div>
      </div>

      {/* Incidents List - Cleaned */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {incidents.map((incident, index) => (
          <div
            key={incident.id}
            className={`bg-gray-700/30 border border-gray-600/30 rounded-lg p-3 cursor-pointer transition-all duration-200 hover:bg-gray-700/50 hover:border-gray-500/50 ${
              selectedIncident?.id === incident.id
                ? "ring-2 ring-blue-500/50 bg-gray-700/50 border-blue-500/30"
                : ""
            }`}
            onClick={() => onIncidentClick(incident)}
            tabIndex={0}
            role="button"
            aria-label={`${incident.type} incident at ${incident.camera}`}
          >
            {/* Simplified Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start space-x-3 flex-1">
                <div
                  className={`p-2 rounded-lg ${
                    incident.type === "Gun Threat"
                      ? "bg-red-500/15"
                      : incident.type === "Unauthorised Access"
                      ? "bg-orange-500/15"
                      : "bg-yellow-500/15"
                  }`}
                >
                  <div
                    className={`${
                      incident.type === "Gun Threat"
                        ? "text-red-400"
                        : incident.type === "Unauthorised Access"
                        ? "text-orange-400"
                        : "text-yellow-400"
                    }`}
                  >
                    {getIncidentIcon(incident.type)}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-white font-medium text-sm">
                      {incident.type}
                    </h3>
                    <span
                      className={`px-2 py-0.5 rounded text-xs font-medium ${
                        incident.severity === "critical"
                          ? "bg-red-500/20 text-red-400"
                          : incident.severity === "high"
                          ? "bg-orange-500/20 text-orange-400"
                          : "bg-yellow-500/20 text-yellow-400"
                      }`}
                    >
                      {incident.severity === "critical"
                        ? "Critical"
                        : incident.severity === "high"
                        ? "High"
                        : "Medium"}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <Camera className="w-3 h-3 text-gray-400" />
                      <span className="text-gray-300 text-xs">
                        {incident.camera}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-3 h-3 text-gray-400" />
                      <span className="text-gray-400 text-xs">
                        {incident.time}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Simplified Action Buttons */}
              <div className="flex flex-col space-y-1.5">
                <button
                  className="px-2 py-1 bg-blue-500/20 hover:bg-blue-500/30 rounded text-blue-400 text-xs font-medium transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    // Handle view details action
                  }}
                >
                  View
                </button>
                <button
                  className="px-2 py-1 bg-green-500/20 hover:bg-green-500/30 rounded text-green-400 text-xs font-medium transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    // Handle resolve action
                  }}
                >
                  Resolve
                </button>
              </div>
            </div>

            {/* Simplified Thumbnail */}
            <div className="w-full h-12 bg-gradient-to-br from-amber-200 to-amber-300 rounded overflow-hidden relative">
              <div className="absolute inset-1 bg-black/20 rounded">
                <div className="absolute right-1 top-1/2 transform -translate-y-1/2 w-3 h-4 bg-gray-600 rounded"></div>
                <div className="absolute left-1 bottom-1 w-2 h-1.5 bg-amber-400 rounded"></div>
                <div className="absolute left-4 bottom-1 w-2 h-1.5 bg-amber-400 rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
