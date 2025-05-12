export const UnsupportedBrowserWarning = ({ supported }) => {
  if (supported) return null;

  return (
    <div className='bg-amber-50 border border-amber-700 text-amber-800 px-4 py-3 rounded-lg mb-6'>
      <p>
        This browser doesn't support speech recognition. For the best
        experience, please use Chrome, Edge, or Safari.
      </p>
    </div>
  );
};
