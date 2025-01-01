import { useState } from "react";

export default function ToggleSwitch() {
  const [isEnabled, setIsEnabled] = useState(false);

  return (
    <div
      className={`relative w-12 h-6 flex items-center bg-gray-300 rounded-full cursor-pointer transition-colors duration-300 ${
        isEnabled ? "bg-blue-500" : "bg-gray-300"
      }`}
      onClick={() => setIsEnabled(!isEnabled)}
    >
      <div
        className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
          isEnabled ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </div>
  );
}
