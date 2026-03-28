# Social Energy Tracker 📊

A React app to log and track your social interactions and their impact on your energy levels. Understand your social patterns through data visualization and journaling.

## ✨ Features

### 📝 Log Interactions
- **4-step logging flow**: Energy level → Interaction type → Tags → Journal entry
- **Single-choice selectors** for energy (Drained, Neutral, Energized) and interaction type
- **Multi-select tags** with custom tag creation
- **Optional journaling** to reflect on each interaction
- **Automatic persistence** to browser storage

### 📊 Analytics Dashboard
- **Energy distribution** with charts and percentages
- **Interaction type breakdown** showing patterns
- **Top tags** visualization
- **7-day timeline** with daily energy patterns
- **Complete interaction logs** with all details

### 📓 Digital Journal
- **View all journal entries** with full context
- **Metadata display**: Date, time, energy level, interaction type, tags
- **Chronological ordering** (newest first)
- **Card-based layout** for readability

### 🎯 Smart Features
- **Custom tags** that persist across sessions
- **Default tags** included: crowded, deep convo, draining, fun, meaningful
- **Persistent storage** in browser localStorage
- **Responsive design** for mobile, tablet, and desktop
- **Dark mode support** based on system preference

---

## 🚀 Quick Start

### Installation
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app will open at `http://localhost:5173`

### Usage
1. **Click "Log Interaction"** button to record your first entry
2. **Select your energy level** (Drained, Neutral, or Energized)
3. **Choose interaction type** (Work, Friends, Family, Strangers, Solo)
4. **Select tags** (or create custom ones)
5. **Write optional journal entry** - or skip to save without journaling
6. **Review analytics** to see your patterns

See [QUICK_START.md](./QUICK_START.md) for detailed usage guide.

---

## 📂 Project Structure

```
src/
├── App.jsx                    # Main app with screen routing
├── App.css                    # All component styling
├── index.css                  # Global styles & CSS variables
├── components/
│   └── BottomNav.jsx         # Navigation tabs
├── hooks/
│   └── storage.js            # localStorage management
└── pages/
    ├── LogPage.jsx           # 4-step logging form
    ├── AnalyticsPage.jsx     # Data visualization dashboard
    └── JournalPage.jsx       # Journal entry display
```

---

## 📊 Data Structure

Each logged interaction includes:
```javascript
{
  id: "uuid",                          // Unique identifier
  timestamp: 1711612345678,            // When it was logged
  energy: "low" | "mid" | "high",      // Energy level
  type: "Work" | "Friends" | ...,      // Interaction type
  tags: ["tag1", "tag2"],              // Selected tags (custom or default)
  journal: "optional text or null"     // Journal entry
}
```

Data is stored in browser's `localStorage` with two keys:
- `social-energy-logs` - All interactions
- `social-energy-custom-tags` - User-created tags

---

## 🎨 Technology Stack

- **React 19** - UI framework
- **Vite** - Build tool & dev server
- **CSS3** - Styling with CSS variables for theming
- **localStorage API** - Client-side data persistence

---

## 📱 Browser Compatibility

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## 🔧 Available Commands

```bash
# Development
npm run dev           # Start dev server

# Build
npm run build         # Create production build

# Quality
npm run lint          # Run ESLint

# Preview
npm run preview       # Test production build locally
```

---

## 💾 Data Persistence

### Local Storage
- **Automatic saving** - All interactions saved immediately
- **No server required** - 100% client-side
- **Privacy-focused** - Your data never leaves your device
- **Persistent** - Data survives browser restart

### Storage Limits
- Typical limit: 5-10MB per domain
- Supports 1000+ interactions comfortably
- Clear data via DevTools: Application → LocalStorage

---

## 🎯 Next Steps & Future Features

### Planned Enhancements
- ✅ **Cloud sync** - Backup to server
- ✅ **Data export** - CSV, JSON formats
- ✅ **Advanced filtering** - Date range, energy level filters
- ✅ **Goal tracking** - Set and monitor objectives
- ✅ **Rich text journal** - Bold, italic, formatting
- ✅ **Insights** - AI-powered pattern detection
- ✅ **Calendar view** - Visual timeline
- ✅ **Mobile app** - React Native

See [ARCHITECTURE_RECOMMENDATIONS.md](./ARCHITECTURE_RECOMMENDATIONS.md) for detailed roadmap.

---

## 📖 Documentation

- **[QUICK_START.md](./QUICK_START.md)** - How to use the app
- **[IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)** - Technical overview of all features
- **[ARCHITECTURE_RECOMMENDATIONS.md](./ARCHITECTURE_RECOMMENDATIONS.md)** - Future improvements and best practices

---

## 🔒 Privacy & Security

- ✅ All data stored locally in your browser
- ✅ No server communication or tracking
- ✅ No cookies or analytics by default
- ✅ GDPR compliant
- ✅ Full user control over data

---

## 🐛 Troubleshooting

### App won't load?
- Clear browser cache and localStorage
- Try in incognito/private mode
- Check browser console for errors (F12)

### Data not saving?
- Verify localStorage is enabled
- Check available storage space
- Reload page and try again

### Slow performance?
- Currently optimized for <5000 logs
- Clearing old data can help

---

## 📝 License

This project is open source and available for personal use.

---

## 🤝 Contributing

Have ideas for improvements? Check [ARCHITECTURE_RECOMMENDATIONS.md](./ARCHITECTURE_RECOMMENDATIONS.md) for development guidelines.

---

## 👤 Author

Amanda Mei

---

## 📞 Support

For issues or questions:
1. Check [QUICK_START.md](./QUICK_START.md) for common solutions
2. Review [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md) for feature details
3. See [ARCHITECTURE_RECOMMENDATIONS.md](./ARCHITECTURE_RECOMMENDATIONS.md) for technical help

---

**Understand your social energy. Track your patterns. Improve your wellbeing.** 🌟

