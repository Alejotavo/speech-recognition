import { useEffect, useState } from "react";
import SpeechRecognition, {useSpeechRecognition} from "react-speech-recognition"
import Axonometric from "./axonometric/axonometric";
import "./speetch.scss"

function Speech() {
  
  const [isFirstDivVisible, setIsFirstDivVisible] = useState(false); 
  const [isSecondDivVisible, setIsSecondDivVisible] = useState(false); 
  const [isMicrophoneAvailable, setIsMicrophoneAvailable] = useState(false);


    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition,
        //isMicrophoneAvailable,
    } = useSpeechRecognition();

    const startListening = () => {
        SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });
    };

    useEffect(() => {
      const lowerTranscript = transcript.toLowerCase(); // Normalizar el texto

     // Definimos un mapeo de palabras clave a acciones
     const keywordActions = [
      {
        activate: ["kitchen on", "kitchen enable"],
        deactivate: ["kitchen off", "kitchen disable"],
        setVisible: setIsFirstDivVisible,
      },
      {
        activate: ["living room on", "living room enable"],
        deactivate: ["living room off", "living room disable"],
        setVisible: setIsSecondDivVisible,
      },
    ];

    // Iteramos sobre las acciones de las palabras clave
    keywordActions.forEach(({ activate, deactivate, setVisible }) => {
      if (activate.some(keyword => lowerTranscript.includes(keyword))) {
        setVisible(true);
        resetTranscript();
      } else if (deactivate.some(keyword => lowerTranscript.includes(keyword))) {
        setVisible(false);
        resetTranscript();
      }
    });
  }, [transcript, resetTranscript]);

    console.log(transcript);



// funcion para checkear si el mic esta conectado o NO. 
//Luego lo llamo desde un useeffect que poolea cada 5 seg.

    const checkMicrophoneAvailability = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        setIsMicrophoneAvailable(true);
        // Detener el stream para liberar el micrófono
        stream.getTracks().forEach(track => track.stop());
      } catch (error) {
        setIsMicrophoneAvailable(false);
      }
    };
  
    useEffect(() => {
      checkMicrophoneAvailability();
      const interval = setInterval(checkMicrophoneAvailability, 5000); // cada 5 segundos
    return () => clearInterval(interval);
  
    }, []);

  return (
    <>
    <div className="row">
      <div className="column">
        <p>{transcript}</p>
        {!browserSupportsSpeechRecognition && <p>Browser does not support speech recognition.</p>}
        {!isMicrophoneAvailable && <p>Microphone is not available.</p>}
        {isMicrophoneAvailable && <p>Microphone is available.</p>}
        {listening ? <p>Listening...</p> : <p>Click "Start" to begin listening.</p>}
        <button onClick={startListening}>Start</button>
        <button onClick={SpeechRecognition.stopListening}>Stop</button>
        <button onClick={resetTranscript}>Reset</button>
      </div>
      <div className="column">
        <Axonometric 
            kitchenLight={isFirstDivVisible} 
            livingRoomLight={isSecondDivVisible}  
            />
      </div>
    </div>
    </>
  )
}

export default Speech
