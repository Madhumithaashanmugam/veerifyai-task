import { useEffect } from "react";
import "./popup.css";

interface PopupProps {
  isOpen: boolean;
  title: string;
  message: string;
  onClose: () => void;
}

const SuccessPopup = ({
  isOpen,
  title,
  message,
  onClose,
}: PopupProps) => {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const timer = window.setTimeout(onClose, 2000);

    return () => {
      window.clearTimeout(timer);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="popup-overlay">
      <div className="popup-card success-popup">
        <div className="popup-top">
          <h3 className="popup-title">{title}</h3>
          <button className="popup-close" onClick={onClose}>
            ×
          </button>
        </div>

        <p className="popup-message">{message}</p>

        <div className="popup-actions">
          <button className="popup-button" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessPopup;
