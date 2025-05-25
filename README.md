# S-CLOUD 🎵

A modern, responsive music streaming web application that provides high-quality audio streaming with advanced audio effects and an intuitive user interface.

## ✨ Features

### 🎧 Audio Streaming
- **High-Quality Audio**: Support for 320 kbps and 160 kbps streaming
- **Real-time Audio Effects**: Built-in Lofi mode with slowed + reverb effects
- **Seamless Playback**: Continuous audio streaming with progress tracking
- **Audio Controls**: Play/pause, seek, and time display

### 🔍 Search & Discovery
- **Smart Search**: Real-time song search with autocomplete
- **Quick Access Tags**: Pre-defined genre and artist buttons for easy discovery
- **Load More**: Pagination support for extensive search results
- **URL Hash Support**: Shareable search URLs

### 📱 Responsive Design
- **Mobile-First**: Optimized for all screen sizes
- **Modern UI**: Dark theme with glassmorphism effects
- **Smooth Animations**: Hover effects and transitions
- **Custom Scrollbars**: Enhanced visual experience

### 🎨 Visual Features
- **Album Art Display**: High-resolution cover images
- **Gradient Text**: Attractive branding with CSS gradients
- **Card-Based Layout**: Clean, organized song display
- **Progress Visualization**: Real-time playback progress

## 🚀 Quick Start

### Prerequisites
- Modern web browser with ES6+ support
- Internet connection for API access
- Web server (for local development)

### Installation

1. **Clone or Download** the project files
2. **Ensure you have the following files**:
   ```
   index.html
   logo.webp (your logo file)
   ```

3. **Serve the application**:
   - **Local Server**: Use any local web server
   - **Live Server (VS Code)**: Right-click on `index.html` → "Open with Live Server"
   - **Python**: `python -m http.server 8000`
   - **Node.js**: `npx serve .`

4. **Open in browser**: Navigate to your local server URL

## 🛠️ Configuration

### Audio Quality Settings
The application supports two audio quality options:
- **320 kbps**: Premium quality (default)
- **160 kbps**: Standard quality

Change quality using the dropdown in the header.

### Search Categories
Pre-configured search categories include:
- **Languages**: Hindi, English, Punjabi, Marathi, Rajasthani, Odia
- **Artists**: Yo Yo Honey Singh, Shubh, Arjit Singh, Ed Sheeran, etc.
- **Movies/Albums**: Stree 2, Paradox
- **Genres**: Old songs, Lofi

## 🎵 How to Use

### Searching for Music
1. **Text Search**: Enter song name, artist, or album in the search box
2. **Quick Categories**: Click on category buttons for instant results
3. **Load More**: Click "Load More" to see additional results

### Playing Music
1. **Select Song**: Click on any song card to start playing
2. **Controls**: Use the bottom player for play/pause and seeking
3. **Lofi Mode**: Toggle the Lofi switch for slowed + reverb effect

### Audio Effects
- **Lofi Toggle**: Applies 0.9x playback speed with reverb
- **Real-time Processing**: Effects applied using Web Audio API
- **Smooth Transitions**: Seamless switching between normal and Lofi modes

## 🔧 Technical Details

### Technologies Used
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Tailwind CSS, Custom CSS
- **Audio**: HTML5 Audio API, Web Audio API
- **HTTP Requests**: Fetch API
- **Fonts**: Inter (Google Fonts)

### API Integration
- **Music Service**: JioSaavn API via Vercel deployment
- **Endpoint**: `https://jiosaavn-api-privatecvc2.vercel.app/search/songs`
- **Features**: Song search, metadata, download URLs

### Browser Compatibility
- **Chrome**: Full support
- **Firefox**: Full support  
- **Safari**: Full support
- **Edge**: Full support
- **Mobile Browsers**: Responsive design

## 📂 File Structure

```
S-CLOUD/
├── index.html          # Main application file
├── logo.webp          # Application logo
└── README.md          # Documentation
```

## 🎨 Customization

### Styling
- **Colors**: Modify CSS custom properties for theme changes
- **Layout**: Adjust grid columns in the results section
- **Animations**: Customize transition durations and effects

### Search Categories
Update the search query buttons in the HTML:
```html
<button class="search-query-button">Your Category</button>
```

### Audio Quality
Modify the bitrate options in the select element:
```html
<option value="4">320 kbps</option>
<option value="3">160 kbps</option>
```

## 🐛 Troubleshooting

### Common Issues

**Audio Won't Play**
- Check internet connection
- Verify CORS settings if hosting locally
- Ensure browser supports HTML5 audio

**Search Not Working**
- Verify API endpoint accessibility
- Check browser console for errors
- Ensure proper encoding of search queries

**Lofi Effect Not Working**
- Confirm Web Audio API support
- Check for CORS issues with audio files
- Verify browser permissions for audio context

### Browser Console
Monitor the browser console for:
- Network errors
- Audio context warnings
- API response issues

## 🔒 Security Notes

- **CORS**: Audio files served with appropriate CORS headers
- **API Calls**: All requests made to trusted endpoints
- **Content Security**: No inline scripts in production recommended

## 📱 Mobile Optimization

- **Touch-Friendly**: Large touch targets for mobile interaction
- **Responsive Layout**: Adaptive design for various screen sizes
- **Performance**: Optimized loading and rendering for mobile devices

## 🚀 Performance Tips

- **Lazy Loading**: Images loaded as needed
- **Efficient DOM**: Minimal DOM manipulation
- **Audio Optimization**: Proper audio resource management
- **Network**: Compressed audio formats for faster loading

## 📄 License

This project is open source. Please ensure compliance with music streaming service terms of use.

## 🤝 Contributing

Feel free to submit issues, fork the repository, and create pull requests for improvements.

## 📞 Support

For technical issues or questions:
1. Check the troubleshooting section
2. Review browser console for errors
3. Verify internet connectivity and API access

---

**Enjoy your music streaming experience with S-CLOUD! 🎵**
