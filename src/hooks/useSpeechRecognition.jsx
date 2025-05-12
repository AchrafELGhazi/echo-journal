import React from 'react';
export const useSpeechRecognition = () => {
  const [currentEntry, setCurrentEntry] = React.useState('');
  const [listening, setListening] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [supported, setSupported] = React.useState(true);
  const recognitionRef = React.useRef(null);

  React.useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setSupported(false);
      setError(
        'Speech recognition is not supported in this browser. Try Chrome, Edge, or Safari.'
      );
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = event => {
      let transcript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      setCurrentEntry(transcript);
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognition.onerror = event => {
      console.error('Speech recognition error', event.error);
      setListening(false);

      if (event.error === 'not-allowed') {
        setError(
          'Microphone access denied. Please allow microphone access in your browser settings.'
        );
      } else if (event.error === 'no-speech') {
        setError(
          'No speech detected. Please try speaking again or check your microphone.'
        );
      } else {
        setError(`Speech recognition error: ${event.error}`);
      }
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const startListening = async () => {
    setError(null);

    if (!recognitionRef.current) {
      setError('Speech recognition is not available');
      return;
    }

    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      recognitionRef.current.start();
      setListening(true);
    } catch (err) {
      console.error('Error accessing microphone:', err);
      setError(
        "Couldn't access your microphone. Please check permissions in your browser settings."
      );
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setListening(false);
    }
  };

  return {
    currentEntry,
    setCurrentEntry,
    listening,
    error,
    supported,
    startListening,
    stopListening,
  };
};
