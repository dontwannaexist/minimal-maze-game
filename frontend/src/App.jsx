import React, { useState } from "react";
import GameCanvas from "./components/GameCanvas";
import CaptchaOverlay from "./components/CaptchaOverlay";

const App = () => {
  const [captchaPassed, setCaptchaPassed] = useState(true);


  return (
    <div>
      {!captchaPassed && <CaptchaOverlay onSuccess={() => setCaptchaPassed(true)} />}
      {captchaPassed && <GameCanvas onSuccess={() => console.log("✅ CAPTCHA Verified")} />}
    </div>
  

  );
};

export default App;
