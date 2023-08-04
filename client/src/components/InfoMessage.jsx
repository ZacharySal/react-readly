import { useEffect, useState } from "react";

function InfoMessage({ text, resetMsg, type }) {
  const [showMsg, setShowMsg] = useState(true);

  useEffect(() => {
    setTimeout(function () {
      setShowMsg(false);
      resetMsg(null);
    }, 2000);
  }, []);

  if (showMsg) {
    return (
      <div className="info-message-container">
        {type === "error" && (
          <i style={{ color: "red" }} className="fa-regular fa-circle-xmark"></i>
        )}
        {type === "info" && (
          <i style={{ color: "green" }} className="fa-regular fa-circle-check"></i>
        )}
        <p className="info-message-text">{text}</p>
      </div>
    );
  }
}

export default InfoMessage;
