import React, { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Save, Trash2, AlertTriangle } from 'lucide-react';

const VoiceJournal = () => {
  const [entries, setEntries] = useState([]);
  const [currentEntry, setCurrentEntry] = useState('');
  const [listening, setListening] = useState(false);
  const [error, setError] = useState(null);
  const [supported, setSupported] = useState(true);

  const recognitionRef = useRef(null);

  useEffect(() => {
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

  const saveEntry = () => {
    if (currentEntry.trim()) {
      const newEntry = {
        id: Date.now().toString(),
        text: currentEntry,
        timestamp: new Date().toISOString(),
      };

      setEntries(prev => [newEntry, ...prev]);
      setCurrentEntry('');
    }
  };

  const deleteEntry = id => {
    setEntries(prev => prev.filter(entry => entry.id !== id));
  };

  const clearAllEntries = () => {
    setEntries([]);
  };

  const formatDate = isoString => {
    const date = new Date(isoString);
    return date.toLocaleString();
  };

  return (
    <div className='max-w-3xl mx-auto p-4 min-h-screen bg-gray-50'>
      <header className='text-center mb-8'>
        <h1 className='text-3xl font-bold text-blue-600 mb-2'>
          Simple Voice Journal
        </h1>
        <p className='text-gray-600'>
          Speak your thoughts and save them instantly
        </p>
      </header>

      {error && (
        <div className='bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-start'>
          <AlertTriangle className='mr-2 flex-shrink-0 mt-1' size={18} />
          <p>{error}</p>
        </div>
      )}

      {!supported ? (
        <div className='bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded-lg mb-6'>
          <p>
            This browser doesn't support speech recognition. For the best
            experience, please use Chrome, Edge, or Safari.
          </p>
        </div>
      ) : null}

      <div className='bg-white p-6 rounded-lg shadow-md mb-6'>
        <textarea
          className='w-full p-3 border border-gray-300 rounded-lg text-lg mb-4 min-h-32 focus:outline-none focus:ring-2 focus:ring-blue-500'
          placeholder='Start speaking or type your journal entry here...'
          value={currentEntry}
          onChange={e => setCurrentEntry(e.target.value)}
        />

        <div className='flex flex-wrap gap-3 justify-between'>
          <button
            onClick={listening ? stopListening : startListening}
            disabled={!supported}
            className={`${
              listening
                ? 'bg-red-500 hover:bg-red-600'
                : 'bg-blue-500 hover:bg-blue-600'
            } text-white px-4 py-2 rounded-lg flex items-center ${
              !supported ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {listening ? (
              <MicOff className='mr-2' size={18} />
            ) : (
              <Mic className='mr-2' size={18} />
            )}
            {listening ? 'Stop Recording' : 'Start Recording'}
          </button>

          <div className='flex gap-2'>
            <button
              onClick={saveEntry}
              disabled={!currentEntry.trim()}
              className={`bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center ${
                !currentEntry.trim() ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <Save className='mr-2' size={18} />
              Save Entry
            </button>

            <button
              onClick={clearAllEntries}
              disabled={entries.length === 0}
              className={`bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center ${
                entries.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <Trash2 className='mr-2' size={18} />
              Clear All
            </button>
          </div>
        </div>

        {listening && (
          <div className='mt-4 text-blue-600 flex items-center'>
            <div className='animate-pulse mr-2'>
              <Mic size={16} />
            </div>
            <span>Listening... Speak now</span>
          </div>
        )}
      </div>

      <div className='space-y-4'>
        {entries.length > 0 ? (
          <>
            <h2 className='text-xl font-semibold text-gray-800 mb-2'>
              Journal Entries ({entries.length})
            </h2>

            {entries.map(entry => (
              <div key={entry.id} className='bg-white p-4 rounded-lg shadow-md'>
                <div className='flex justify-between items-start mb-2'>
                  <p className='text-sm text-gray-500'>
                    {formatDate(entry.timestamp)}
                  </p>

                  <button
                    onClick={() => deleteEntry(entry.id)}
                    className='text-red-500 hover:bg-red-50 p-1 rounded'
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <p className='whitespace-pre-wrap text-gray-800'>
                  {entry.text}
                </p>
              </div>
            ))}
          </>
        ) : (
          <div className='text-center py-8 bg-white rounded-lg shadow-md'>
            <p className='text-gray-500'>
              No entries yet. Start recording to create your first journal
              entry!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VoiceJournal;
