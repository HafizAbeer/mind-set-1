import React from "react";
import { createPortal } from "react-dom";
import {
  Users,
  ChevronRight,
  MessageCircle,
  Mail,
  Copy,
  Star,
  BookOpen,
  Plus,
  PenTool,
  Printer,
  Search,
  Bookmark,
  Smartphone,
} from "lucide-react";
import mindsetLogo from "../../assets/mindset-logo.svg";

const ShareModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const people = [
    { name: "Herland Antezana", image: "https://i.pravatar.cc/150?u=herland" },
    { name: "Rigo Rangel", image: "https://i.pravatar.cc/150?u=rigo" },
    {
      name: "Magico and El...",
      subtitle: "2 People",
      image: "https://i.pravatar.cc/150?u=magico",
    },
    { name: "Jenny Court", image: "https://i.pravatar.cc/150?u=jenny" },
  ];

  const apps = [
    {
      name: "AirDrop",
      icon: (
        <div className="w-12 h-12 bg-[#007AFF] rounded-xl flex items-center justify-center text-white">
          <Smartphone size={28} />
        </div>
      ),
    },
    {
      name: "Messages",
      icon: (
        <div className="w-12 h-12 bg-[#34C759] rounded-xl flex items-center justify-center text-white">
          <MessageCircle size={28} fill="currentColor" />
        </div>
      ),
    },
    {
      name: "Mail",
      icon: (
        <div className="w-12 h-12 bg-[#007AFF] rounded-xl flex items-center justify-center text-white">
          <Mail size={28} />
        </div>
      ),
    },
    {
      name: "Notes",
      icon: (
        <div className="w-12 h-12 bg-[#FFCC00] rounded-xl flex items-center justify-center text-white">
          <div className="w-8 h-8 border-2 border-white/40 rounded shadow-inner" />
        </div>
      ),
    },
  ];

  const actions = [
    { name: "Copy", icon: <Copy size={24} /> },
    { name: "Add to Favorites", icon: <Star size={24} /> },
    { name: "Add to Reading List", icon: <BookOpen size={24} /> },
    { name: "Add Bookmark", icon: <Bookmark size={24} /> },
  ];

  return createPortal(
    <div
      className="fixed inset-0 z-[300] flex items-end justify-center sm:items-center bg-black/40 backdrop-blur-[2px]"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[400px] bg-[#F9F9F9] rounded-t-[20px] sm:rounded-[20px] overflow-hidden shadow-2xl animate-in slide-in-from-bottom duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col max-h-[90vh] overflow-y-auto custom-scrollbar">
          {/* Header */}
          <div className="p-4 bg-white border-b border-gray-200">
            <div className="flex items-start gap-4 mb-4">
              <img
                src={mindsetLogo}
                alt="App Icon"
                className="w-14 h-14 rounded-xl shadow-md"
              />
              <div className="flex-1">
                <h3 className="text-[17px] font-bold text-black leading-tight">
                  New Mindset App
                </h3>
                <p className="text-[13px] text-gray-500">Subtitle</p>
                <button className="mt-2 flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full transition-colors">
                  <Users size={16} className="text-gray-600" />
                  <span className="text-[13px] font-semibold text-gray-700">
                    Collaborate
                  </span>
                  <ChevronRight size={14} className="text-gray-400" />
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between text-[13px] text-gray-400 font-medium">
              <span>Only invited people can edit.</span>
              <ChevronRight size={14} />
            </div>
          </div>

          {/* People Row */}
          <div className="p-4 border-b border-gray-200 overflow-x-auto">
            <div className="flex gap-4">
              {people.map((person, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center gap-1 min-w-[70px]"
                >
                  <div className="relative">
                    <img
                      src={person.image}
                      alt=""
                      className="w-14 h-14 rounded-full object-cover"
                    />
                    <div className="absolute bottom-0 right-0 w-5 h-5 bg-[#34C759] rounded-full border-2 border-white flex items-center justify-center">
                      <MessageCircle
                        size={10}
                        className="text-white"
                        fill="currentColor"
                      />
                    </div>
                  </div>
                  <span className="text-[11px] text-gray-700 text-center leading-tight">
                    {person.name.split(" ").map((n, j) => (
                      <React.Fragment key={j}>
                        {n}
                        <br />
                      </React.Fragment>
                    ))}
                    {person.subtitle && (
                      <span className="text-gray-400">{person.subtitle}</span>
                    )}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Apps Row */}
          <div className="p-4 border-b border-gray-200 overflow-x-auto">
            <div className="flex gap-6">
              {apps.map((app, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center gap-1.5 min-w-[60px]"
                >
                  {app.icon}
                  <span className="text-[11px] text-gray-700">{app.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="p-4 border-b border-gray-200 overflow-x-auto">
            <div className="flex gap-6">
              {actions.map((action, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center gap-1.5 min-w-[70px]"
                >
                  <div className="w-14 h-14 bg-gray-200 rounded-full flex items-center justify-center text-gray-600">
                    {action.icon}
                  </div>
                  <span className="text-[11px] text-gray-700 text-center">
                    {action.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* List Section 1 */}
          <div className="p-4">
            <div className="bg-white rounded-xl overflow-hidden shadow-sm">
              {[
                { icon: <BookOpen size={18} />, label: "Add to Reading List" },
                { icon: <Bookmark size={18} />, label: "Add Bookmark" },
                { icon: <Star size={18} />, label: "Add to Favorites" },
                { icon: <Plus size={18} />, label: "Add to Home Screen" },
              ].map((item, i) => (
                <button
                  key={i}
                  className="w-full flex items-center justify-between p-3.5 hover:bg-gray-50 border-b border-gray-100 last:border-0 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-gray-700">{item.icon}</div>
                    <span className="text-[15px] font-medium text-black">
                      {item.label}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* List Section 2 */}
          <div className="p-4 pt-0">
            <div className="bg-white rounded-xl overflow-hidden shadow-sm">
              {[
                { icon: <PenTool size={18} />, label: "Markup" },
                { icon: <Printer size={18} />, label: "Print" },
              ].map((item, i) => (
                <button
                  key={i}
                  className="w-full flex items-center justify-between p-3.5 hover:bg-gray-50 border-b border-gray-100 last:border-0 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-gray-700">{item.icon}</div>
                    <span className="text-[15px] font-medium text-black">
                      {item.label}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Footer Search */}
          <div className="p-4 pt-0 mb-4">
            <div className="bg-white rounded-full flex items-center px-4 py-2 shadow-sm border border-gray-100">
              <span className="text-[15px] text-gray-400 mx-auto">Name</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 0px;
          height: 0px;
        }
      `}</style>
    </div>,
    document.body,
  );
};

export default ShareModal;
