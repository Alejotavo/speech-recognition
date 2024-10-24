import { useEffect, useState } from "react";
import SpeechRecognition, {useSpeechRecognition} from "react-speech-recognition"

function Speech() {
  
  const [isFirstDivVisible, setIsFirstDivVisible] = useState(false); 
  const [isSecondDivVisible, setIsSecondDivVisible] = useState(false); 

    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition,
        isMicrophoneAvailable,
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

  return (
    <>
      <div>
                <p>{transcript}</p>

                {!browserSupportsSpeechRecognition && <p>Browser does not support speech recognition.</p>}
                {!isMicrophoneAvailable && <p>Microphone is not available.</p>}

                {listening ? <p>Listening...</p> : <p>Click "Start" to begin listening.</p>}
                
                <button onClick={startListening}>Start</button>
                <button onClick={SpeechRecognition.stopListening}>Stop</button>
                <button onClick={resetTranscript}>Reset</button>

                {isFirstDivVisible && (
                <div style={{ padding: '20px', backgroundColor: 'lightgreen', marginTop: '10px' }}>
                    <h3>LIGHT 01</h3>
                </div>
              )}
                {isSecondDivVisible && (
                <div style={{ padding: '20px', backgroundColor: 'lightblue', marginTop: '10px' }}>
                    <h3>LIGHT 02</h3>
                </div>
              )}
        </div>
    </>
  )
}

export default Speech
