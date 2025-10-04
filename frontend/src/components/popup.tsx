import React, { useEffect } from "react";

interface PopupProps {
  message: string;
  show: boolean;
  duration?: number; // milliseconds
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ message, show, duration = 3000, onClose }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [show, duration, onClose]);

  if (!show) return null;

  return (
    <div data-cy="popup-message"  className="fixed top-5 right-5 bg-green-500 text-white px-4 py-2 rounded shadow-md animate-fadeInOut">
      {message}
    </div>
  );
};

export default Popup;
