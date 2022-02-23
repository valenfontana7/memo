import React from 'react';
import a from "./css/alertMessage.module.css";
import {LinearProgress} from "@material-ui/core";

function AlertMessage({message, flag, speed}) {
  const showAlert = (e) => {
    e.preventDefault();
    flag();
  }
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 100;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, speed);

    return () => {
      clearInterval(timer);
    };
  }, []);
  if(progress === 100) {
    setTimeout(()=> flag(), 280);
  }
  return (
    <div className={`alertamessage`}>
      <div className={a.content}>
      <span className={a.message}>{message}</span>
      <button onClick={showAlert} className={a.closeButton}>x</button>
      </div>
      <div style={{width: "100%"}}>
      <LinearProgress variant="determinate" value={progress} />
      </div>
    </div>
  )
};

export default AlertMessage;
