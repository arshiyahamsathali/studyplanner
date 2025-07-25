import React, { useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import './EmotionSupport.css'
const emotionMessages = {
  happy: "You're doing great! Keep up the awesome work! 💪🌟",
  sad: "It's okay to feel down. You're strong, and you got this! 💖",
  neutral: "Every step counts. Stay focused and consistent! 🚀",
};

const getEmotion = (text) => {
  const lower = text.toLowerCase();
  if (/(tired|sad|depressed|stress|hopeless)/.test(lower)) return 'sad';
  if (/(happy|great|amazing|excited|awesome)/.test(lower)) return 'happy';
  return 'neutral';
};

const EmotionSupport = () => {
  const { transcript, listening, resetTranscript } = useSpeechRecognition();
  const [emotion, setEmotion] = useState('');
  const [message, setMessage] = useState('');

  const handleAnalyze = () => {
    const detected = getEmotion(transcript);
    setEmotion(detected);
    setMessage(emotionMessages[detected]);
  };

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <h2>🎤 Talk to Your Study Assistant</h2>

      <div style={{ marginBottom: '1rem' }}>
        <button onClick={() => SpeechRecognition.startListening({ continuous: true })}>
          Start Listening
        </button>
        <button onClick={SpeechRecognition.stopListening}>
          Stop
        </button>
        <button onClick={() => {
          handleAnalyze();
          resetTranscript();
        }}>
          Analyze Emotion
        </button>
      </div>

      <p><strong>Status:</strong> {listening ? '🎙️ Listening...' : '🛑 Not Listening'}</p>
      <p><strong>Transcript:</strong> {transcript || 'Speak something...'}</p>

      {message && (
        <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#f0f0f0', borderRadius: '8px' }}>
          <h3>Detected Emotion: {emotion}</h3>
          <p>{message}</p>
        </div>
      )}
    </div>
  );
};

export default EmotionSupport;