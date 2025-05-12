import { AlertTriangle } from "lucide-react";

export const ErrorMessage = ({ error }) => {
  if (!error) return null;

  return (
    <div className='bg-amber-50 border border-amber-700 text-amber-800 px-4 py-3 rounded-lg mb-6 flex items-start'>
      <AlertTriangle className='mr-2 flex-shrink-0 mt-1' size={18} />
      <p>{error}</p>
    </div>
  );
};