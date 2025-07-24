"use client";

import {
  Monitor,
  Camera,
  MapPin,
  AlertTriangle,
  Users,
  ChevronDown,
} from "lucide-react";

export default function Sidebar() {
  const user = {
    name: "Mohammed Ajhas",
    email: "ajhas@mandlacx.com",
  };

  const navItems = [
    { icon: Monitor, label: "Dashboard", active: true },
    { icon: Camera, label: "Cameras" },
    { icon: MapPin, label: "Scenes" },
    { icon: AlertTriangle, label: "Incidents" },
    { icon: Users, label: "Users" },
  ];

  return (
    <div className="w-56 bg-gray-800 border-r border-gray-700 flex flex-col flex-shrink-0">
      {/* Logo */}
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
            <span className="text-black font-bold text-sm">M</span>
          </div>
          <span className="text-white font-semibold text-lg">MANDLACX</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6">
        <ul className="space-y-2 px-4">
          {navItems.map((item, index) => (
            <li key={index}>
              <a
                href="#"
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  item.active
                    ? "bg-yellow-500 text-black"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
            <span className="text-white font-medium text-sm">
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white font-medium text-sm truncate">
              {user.name}
            </p>
            <p className="text-gray-400 text-xs truncate">{user.email}</p>
          </div>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </div>
      </div>
    </div>
  );
}
