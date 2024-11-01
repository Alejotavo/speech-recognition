import { useEffect, useState } from "react";
import SpeechRecognition, {useSpeechRecognition} from "react-speech-recognition"
import Axonometric from "./axonometric/axonometric";
import "./speetch.scss"
import axios from "axios";
import { postData } from "../services/service";


function Speech() {
  
  const [isMicrophoneAvailable, setIsMicrophoneAvailable] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);

  const [isFinal, setIsFinal] = useState(false);
  const [prompt, setPrompt] = useState("");


const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    //isMicrophoneAvailable,
} = useSpeechRecognition();

const startListening = () => {
    SpeechRecognition.startListening({ continuous: true, language: 'es-ES' });
};


  // Detectar cambios en el transcript y actualizar el estado prompt
  useEffect(() => {
    setPrompt(transcript.toLowerCase()); // Normaliza el transcript
    setIsFinal(false); // Resetea isFinal cuando hay una actualización en el transcript

    const timer = setTimeout(() => {
      if (transcript) {
        setIsFinal(true); // Marca la frase como completa después de 2 segundos de pausa
      }
    }, 2000); // 2 segundos de pausa

    return () => clearTimeout(timer); // Limpia el temporizador al cambiar el transcript

  }, [transcript]);



useEffect(() => {
  const sendTranscriptToAPI = async () => {
    if (!isFinal || !prompt) return; // Solo envía si la frase está completa

    //const lowerTranscript = transcript.toLowerCase(); // Normalizar el texto
    try {

      const fullPrompt = `I have a home automation system in which I have defined two environments, LIVING, KITCHEN, BEDROOM, each of which has lights that can be turned on or off via a voice command. The possible responses will be LIVING_ON, LIVING_OFF, KITCHEN_ON, KITCHEN_OFF, BEDROOM_ON, BEDROOM_OFF. What would the response be (among those defined above) if the input voice command is: '${prompt}'? Remember to respond with only one word (the possible responses)."`;

        const data = {
            model: "gemma2:2b", // Modelo utilizado
            prompt: fullPrompt, // Asegúrate de que 'lowerTranscript' esté definido y tenga el formato adecuado
            stream: false,
        };
  
        const apiResponse = await postData(data);
        resetTranscript();
        
        console.log("API Response:", apiResponse); // Revisa el resultado
        console.log("API Response:", apiResponse.response);
        resetTranscript();
        setPrompt(""); // Resetea el prompt después de enviar
        setApiResponse(apiResponse.response);
        
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("Error de Axios:", error.response?.data || error.message);
        } else {
            console.error("Error al enviar el transcript:", error);
        }
    }
  };
  
  sendTranscriptToAPI();

}, [isFinal, prompt, resetTranscript]);


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
            response={apiResponse}
            />
      </div>
    </div>
    </>
  )
}


export default Speech
