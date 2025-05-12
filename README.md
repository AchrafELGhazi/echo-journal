# Echo Journal

A simple voice-to-text journaling application that lets you record your thoughts using your microphone and save them as text entries.

![Echo Journal Screenshot](/public/image.png)

## Features

- 🎤 Voice-to-text recording using the Web Speech Recognition API
- 📝 Save and manage journal entries
- ⏱️ Automatic timestamps for all entries
- 🗑️ Delete individual entries or clear all

## Browser Compatibility

Echo Journal works best with:
- Google Chrome (recommended)
- Microsoft Edge
- Safari (newer versions)

Firefox and other browsers may not support the Speech Recognition API required for voice input.

## Getting Started

### Prerequisites

- A modern web browser (Google Chrome recommended)
- Microphone access

### Installation

1. Clone the repository:
```
git clone https://github.com/AchrafELGhazi/echo-journal.git
```

2. Navigate to the project directory:
```
cd echo-journal
```

3. Install dependencies:
```
npm install
```

4. Start the development server:
```
npm run dev
```

5. Build for production:
```
npm run build
```

## Usage

1. **Allow Microphone Access**: When prompted by your browser, grant microphone access permissions
2. **Start Recording**: Click the "Start Recording" button and begin speaking
3. **Stop Recording**: Click "Stop Recording" when finished
4. **Save Entry**: Click "Save Entry" to store your journal entry
5. **View Entries**: All saved entries appear below with timestamps
6. **Delete Entries**: Remove individual entries or clear all entries

## Troubleshooting

If voice recording isn't working:

1. **Check Browser Compatibility**: Ensure you're using Google Chrome, Edge, or a newer version of Safari
2. **Verify Microphone Permissions**: Go to your browser settings and check that microphone access is allowed for the site
3. **Check Microphone Connection**: Make sure your microphone is properly connected and working
4. **Look for Error Messages**: The app will display helpful error messages to guide you

## Technologies Used

- React.js
- Web Speech Recognition API
- Tailwind CSS
- Lucide React (for icons)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgments

- Built with React
- Styled with Tailwind CSS
- Icons from Lucide React