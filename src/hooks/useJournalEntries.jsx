import React from 'react';

export const useJournalEntries = () => {
  const [entries, setEntries] = React.useState([]);

  const saveEntry = currentEntry => {
    if (currentEntry.trim()) {
      const newEntry = {
        id: Date.now().toString(),
        text: currentEntry,
        timestamp: new Date().toISOString(),
      };

      setEntries(prev => [newEntry, ...prev]);
      return true;
    }
    return false;
  };

  const deleteEntry = id => {
    setEntries(prev => prev.filter(entry => entry.id !== id));
  };

  const clearAllEntries = () => {
    setEntries([]);
  };

  return {
    entries,
    saveEntry,
    deleteEntry,
    clearAllEntries,
  };
};
