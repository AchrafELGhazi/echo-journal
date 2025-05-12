import { Mic, Trash2 } from 'lucide-react';
import { useSpeechRecognition } from './hooks/useSpeechRecognition';
import { useJournalEntries } from './hooks/useJournalEntries';
import { RecordingControls } from './components/RecordingControls';
import { ErrorMessage } from './components/ErrorMessage';
import { UnsupportedBrowserWarning } from './components/UnsupportedBrowserWarning';
import { formatDate } from './utils/formatDate';

const ListeningIndicator = ({ listening }) => {
  if (!listening) return null;

  return (
    <div className='mt-4 text-amber-700 flex items-center'>
      <div className='animate-pulse mr-2'>
        <Mic size={16} />
      </div>
      <span>Listening... Speak now</span>
    </div>
  );
};

const JournalEntry = ({ entry, onDelete }) => {
  return (
    <div className='bg-amber-50 p-4 rounded border border-amber-200 shadow-md'>
      <div className='flex justify-between items-start mb-2'>
        <p className='text-sm text-amber-800 font-mono'>
          {formatDate(entry.timestamp)}
        </p>

        <button
          onClick={() => onDelete(entry.id)}
          className='text-red-700 hover:bg-red-100 p-1 rounded'
        >
          <Trash2 size={16} />
        </button>
      </div>

      <p className='whitespace-pre-wrap text-amber-950 font-serif'>
        {entry.text}
      </p>
    </div>
  );
};

const JournalEntryList = ({ entries, deleteEntry }) => {
  if (entries.length === 0) {
    return (
      <div className='text-center py-8 bg-amber-50 rounded border border-amber-200 shadow-md'>
        <p className='text-amber-700 font-serif italic'>
          No entries yet. Start recording to create your first journal entry!
        </p>
      </div>
    );
  }

  return (
    <>
      <h2 className='text-xl font-serif font-semibold text-amber-900 mb-2'>
        Journal Entries ({entries.length})
      </h2>

      <div className='space-y-4'>
        {entries.map(entry => (
          <JournalEntry key={entry.id} entry={entry} onDelete={deleteEntry} />
        ))}
      </div>
    </>
  );
};

const VoiceJournal = () => {
  const {
    currentEntry,
    setCurrentEntry,
    listening,
    error,
    supported,
    startListening,
    stopListening,
  } = useSpeechRecognition();

  const {
    entries,
    saveEntry: saveEntryLogic,
    deleteEntry,
    clearAllEntries,
  } = useJournalEntries();

  const handleSaveEntry = () => {
    if (saveEntryLogic(currentEntry)) {
      setCurrentEntry('');
    }
  };

  return (
    <div className='max-w-3xl mx-auto p-6 min-h-screen bg-amber-100'>
      <div className='border-4 border-amber-800 p-8 rounded-lg shadow-lg bg-amber-50'>
        <header className='text-center mb-8 border-b-2 border-amber-800 pb-4'>
          <h1 className='text-3xl font-serif font-bold text-amber-800 mb-2'>
           Echo Journal
          </h1>
          <p className='text-amber-700 font-serif italic'>
            Speak your thoughts and save them for posterity
          </p>
        </header>

        <ErrorMessage error={error} />
        <UnsupportedBrowserWarning supported={supported} />

        <div className='bg-amber-50 p-6 rounded border-2 border-amber-700 shadow-md mb-6'>
          <textarea
            className='w-full p-3 border-2 border-amber-600 rounded bg-amber-50 text-lg mb-4 min-h-32 focus:outline-none focus:ring-2 focus:ring-amber-500 font-serif text-amber-950'
            placeholder='Start speaking or type your journal entry here...'
            value={currentEntry}
            onChange={e => setCurrentEntry(e.target.value)}
          />

          <RecordingControls
            listening={listening}
            supported={supported}
            startListening={startListening}
            stopListening={stopListening}
            currentEntry={currentEntry}
            saveEntry={handleSaveEntry}
            entries={entries}
            clearAllEntries={clearAllEntries}
          />

          <ListeningIndicator listening={listening} />
        </div>

        <JournalEntryList entries={entries} deleteEntry={deleteEntry} />
      </div>
    </div>
  );
};

export default VoiceJournal;
