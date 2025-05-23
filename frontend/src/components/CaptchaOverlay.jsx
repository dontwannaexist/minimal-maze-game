import React, { useState } from "react";

const CaptchaOverlay = ({ onSuccess }) => {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const verifyCaptcha = () => {
    if (input.toLowerCase() === "robot") {
      onSuccess();
    } else {
      setError("Incorrect CAPTCHA");
    }
  };
  
  return (
    <div style={{
      position: "fixed",
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: "rgba(0,0,0,0.7)",
      display: "flex", justifyContent: "center", alignItems: "center",
      flexDirection: "column", color: "#fff"
    }}>
      <h2>Type the word "robot" to continue</h2>
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        style={{ padding: "10px", fontSize: "16px", marginBottom: "10px" }}
      />
      <button onClick={verifyCaptcha} style={{ padding: "10px 20px" }}>Submit</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default CaptchaOverlay;
