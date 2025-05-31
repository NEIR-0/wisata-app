import { ShareNetwork, FacebookLogo, TwitterLogo, WhatsappLogo, RedditLogo, Link } from "@phosphor-icons/react";
import { useState } from "react";

function ShareBtn() {
const [isOpen, setIsOpen] = useState(false);
const shareOptions = [
  {
    name: "Facebook",
    icon: FacebookLogo,
    color: "text-blue-600",
    bgColor: "hover:bg-blue-50"
  },
  {
    name: "Twitter",
    icon: TwitterLogo,
    color: "text-blue-400",
    bgColor: "hover:bg-blue-50"
  },
  {
    name: "WhatsApp",
    icon: WhatsappLogo,
    color: "text-green-500",
    bgColor: "hover:bg-green-50"
  },
  {
    name: "Reddit",
    icon: RedditLogo,
    color: "text-orange-600",
    bgColor: "hover:bg-orange-50"
  },
  {
    name: "Copy link",
    icon: Link,
    color: "text-gray-600",
    bgColor: "hover:bg-gray-50"
  }
];

const handleShare = (platform) => {
  setIsOpen(false);
};

const copyToClipboard = () => {
  navigator.clipboard.writeText(window.location.href);
  setIsOpen(false);
};

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center space-x-2 px-3 py-1 rounded-full duration-300 ease-out transition-all hover:bg-gray-100"
      >
        <ShareNetwork className="text-base" />
        <p className="text-base font-light">Share</p>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-[200px] bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-50">
          <div className="py-2">
            <div className="px-4 py-2 border-b border-gray-100">
              <h3 className="text-sm font-medium text-gray-900">Share</h3>
            </div>
            
            {shareOptions.map((option, index) => {
              const IconComponent = option.icon;
              return (
                <button
                  key={index}
                  onClick={() => option.name === "Copy link" ? copyToClipboard() : handleShare(option.name)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 text-left transition-colors ${option.bgColor}`}
                >
                  <IconComponent className={`text-lg ${option.color}`} />
                  <span className="text-sm text-gray-700">{option.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}

export default ShareBtn;