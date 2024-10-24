import { useEffect, useState } from "react";
import SpeechRecognition, {useSpeechRecognition} from "react-speech-recognition"

function Speech() {
  
  const [isDivVisible, setIsDivVisible] = useState(false); 

    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition,
        isMicrophoneAvailable,
    } = useSpeechRecognition();

    const startListening = () => {
        SpeechRecognition.startListening({ continuous: true });
    };

    useEffect(() => {
      const lowerTranscript = transcript.toLowerCase(); // Normalizar el texto

      const activateKeywords: string[]  = ["turn on", "on", "active", "encendido"];
      const deactivateKeywords: string[]  = ["turn off", "off", "inactive", "apagado"];

      const containsKeyword =  (keywords: string[]): boolean => {
        return keywords.some(keyword => lowerTranscript.includes(keyword));
    };

    if (containsKeyword(activateKeywords)) {
        setIsDivVisible(true); // Mostrar el div
        resetTranscript(); // Limpiar para evitar reactivaciones
    } else if (containsKeyword(deactivateKeywords)) {
        setIsDivVisible(false); // Ocultar el div
        resetTranscript();
    }
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

                {isDivVisible && (
                  <>
                <div style={{ padding: '20px', backgroundColor: 'lightgreen', marginTop: '10px' }}>
                    <h3>¡Este es el div que puedes mostrar u ocultar con comandos de voz!</h3>
                </div>
                </>
                )}
        </div>
    </>
  )
}

export default Speech
