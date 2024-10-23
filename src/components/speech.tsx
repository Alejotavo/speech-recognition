import SpeechRecognition, {useSpeechRecognition} from "react-speech-recognition"

function Speech() {
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
        </div>
    </>
  )
}

export default Speech
