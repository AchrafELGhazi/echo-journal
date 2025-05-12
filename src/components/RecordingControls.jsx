import { Mic, MicOff, Save, Trash2 } from 'lucide-react';
export const RecordingControls = ({
  listening,
  supported,
  startListening,
  stopListening,
  currentEntry,
  saveEntry,
  entries,
  clearAllEntries,
}) => {
  return (
    <div className='flex flex-wrap gap-3 justify-between'>
      <button
        onClick={listening ? stopListening : startListening}
        disabled={!supported}
        className={`${
          listening
            ? 'bg-red-800 hover:bg-red-900'
            : 'bg-amber-700 hover:bg-amber-800'
        } text-amber-50 px-4 py-2 rounded border border-amber-900 shadow-md ${
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
          className={`bg-emerald-700 hover:bg-emerald-800 text-amber-50 px-4 py-2 rounded border border-emerald-900 shadow-md ${
            !currentEntry.trim() ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          <Save className='mr-2' size={18} />
          Save Entry
        </button>

        <button
          onClick={clearAllEntries}
          disabled={entries.length === 0}
          className={`bg-red-700 hover:bg-red-800 text-amber-50 px-4 py-2 rounded border border-red-900 shadow-md ${
            entries.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          <Trash2 className='mr-2' size={18} />
          Clear All
        </button>
      </div>
    </div>
  );
};
