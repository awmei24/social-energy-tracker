# Quick Start Guide - Social Energy Tracker

## 🚀 Getting Started

### Installation & Setup
```bash
# Navigate to project directory
cd /Users/amandamei/personal\ code/social-energy-tracker

# Install dependencies (if not already done)
npm install

# Start development server
npm run dev
```

The app will start at `http://localhost:5173` (or similar port shown in terminal)

---

## 📱 How to Use

### 1. First Time Launch
- App opens to **Analytics page** (no data yet)
- You'll see "No data yet" message
- Click the **➕ Log Interaction** button to get started

### 2. Logging Your First Interaction

#### Step 1: Energy Level
- Select how you're feeling: Drained 😴 | Neutral 😐 | Energized ⚡
- Click your choice → auto-advances to next step

#### Step 2: Interaction Type
- Choose who you were with: Work, Friends, Family, Strangers, Solo
- Click your choice → auto-advances to next step

#### Step 3: Tags (Optional)
- Click any predefined tags to select them
- Or type a new tag and press Enter to create custom tag
- Selected tags will be highlighted
- Click "Next →" when done

#### Step 4: Journal Entry (Optional)
- Write about your experience (or skip to save without journal)
- Click "Save Entry" to finish, or "Skip" to save without journal
- You're automatically taken to Analytics page

### 3. Viewing Your Data

#### Analytics Page (📊)
- **Energy Levels** - See your distribution with percentages
- **Interaction Types** - Which types you log most
- **Top Tags** - Your most-used tags
- **Recent Activity** - Last 7 days with bar charts
- **All Interactions** - Complete table of all logs

#### Digital Journal Page (📓)
- Browse all your journal entries
- Most recent entries shown first
- See energy level, interaction type, and tags for each entry
- Full journal text displayed

### 4. Creating Custom Tags

#### Option 1: During Logging
- On the Tags step, type in the input field
- Press Enter to add the new tag
- Custom tags are automatically saved and appear in future logs

#### Option 2: Via Predefined List
- Default tags: "crowded", "deep convo", "draining", "fun", "meaningful"
- These are always available

---

## 💾 Your Data

### Where It's Stored
- All data is saved in your browser's **localStorage**
- Data persists across browser sessions
- Data is NOT synced to any server (privacy-first)

### Clearing Your Data
- **To clear**: Open DevTools (F12) → Application → LocalStorage → Delete keys:
  - `social-energy-logs`
  - `social-energy-custom-tags`

### Backing Up Your Data
- Currently stored locally only
- Consider exporting data regularly if implementing features

---

## 🎯 Tips & Best Practices

### Energy Levels
- **Drained** - Social interaction was exhausting
- **Neutral** - Neither draining nor energizing
- **Energized** - Interaction boosted your energy

### Interaction Types
- **Work** - Professional/workplace interactions
- **Friends** - Close friends or familiar people
- **Family** - Family members
- **Strangers** - New people or unfamiliar crowds
- **Solo** - Time alone or personal activities

### Tags (Examples)
- **Descriptive**: "crowded", "intimate", "formal", "casual"
- **Emotional**: "draining", "meaningful", "fun", "awkward"
- **Context**: "work meeting", "lunch", "family dinner", "party"

### Creating Meaningful Tags
- Use lowercase and simple names
- Be consistent (use "deep convo" not "deep_convo" and "deep conversation")
- Aim for 5-15 custom tags for best analytics

---

## 🔧 Troubleshooting

### Data Not Saving?
- Check if localStorage is enabled in browser
- Try reloading the page (Cmd/Ctrl + R)
- Open DevTools to see any console errors

### Tags Not Appearing?
- Custom tags are stored separately from logs
- If you clear storage, custom tags also clear
- Create the tag again during logging

### Wrong Navigation?
- Bottom nav shows current page in purple/accent color
- Click any tab to navigate to that page
- Your form data is preserved on navigation

### Performance Issues?
- If you have 1000+ logs, app may slow down
- This is normal - will optimize in future versions

---

## 📊 Understanding Your Analytics

### Energy Distribution
- Shows percentage and count of each energy level
- Helps you see your overall energy patterns
- Ideal: Balanced mix, or high % energized

### Interaction Types
- Which types you interact with most frequently
- Identifies patterns (e.g., lots of solo time vs. social)
- Use to plan future interactions

### Tags Analytics
- Your top 10 most-used tags
- Shows what types of interactions are most common
- "draining" high? Consider more energizing activities

### Timeline Chart
- 7-day rolling view of your energy patterns
- See if days of week affect your energy
- Spot trends over time

### Full Logs Table
- Complete history of all entries
- Searchable (use browser's Cmd/Ctrl + F)
- Shows all details: date, time, energy, type, tags, journal

---

## 🎮 Workflow Examples

### Example 1: Social Energy Tracker
1. After each social interaction, immediately log it
2. Add relevant tags (e.g., "crowded", "fun", "meaningful")
3. Optionally write brief journal note
4. Check analytics weekly to identify patterns

### Example 2: Work Tracking
1. Log interactions with different teams
2. Tag with project names
3. Use "draining" tag for difficult meetings
4. See which types of work boost/drain energy

### Example 3: Personal Growth
1. Log solo activities with tags like "reflection", "exercise"
2. Compare energy levels: social vs. solo
3. Write journal entries for important moments
4. Review patterns quarterly

---

## ❓ FAQ

**Q: Can I edit or delete entries?**
A: Currently no - the app is append-only. This keeps history clean. Delete via DevTools if needed.

**Q: Will my data sync between devices?**
A: No, currently localStorage only. Future version will support cloud sync.

**Q: Can I export my data?**
A: Not built-in yet. You can view via Analytics page or export via DevTools.

**Q: How much data can I store?**
A: localStorage typically allows 5-10MB depending on browser. Should handle 5000+ logs.

**Q: What if I close without saving?**
A: Mid-form data is lost. When you save, it's immediately persisted.

**Q: Can I share analytics with friends?**
A: Not currently built-in. Consider screenshot/export features for future.

---

## 🎨 Tips for Best Experience

### Visual Design
- Light mode (default) - best for daytime use
- Dark mode available (system preference)
- Touch-friendly buttons on mobile

### Best Practices
- Log regularly (daily or after interactions)
- Use consistent tags for better patterns
- Write thoughtful journal entries
- Review analytics weekly

### Performance
- App is optimized for typical usage (100-1000 logs)
- Clearing old data can help if very large dataset

---

## 🐛 Found a Bug?

### Report Issues
1. Check browser console for errors (F12)
2. Try clearing storage and reloading
3. Note exact steps to reproduce
4. Check if issue occurs in incognito/private mode

### Common Issues
- **Form won't save**: Check console for JavaScript errors
- **Data disappeared**: May have cleared storage accidentally
- **Buttons not responsive**: Try refreshing page (Cmd/Ctrl + R)

---

## 🚀 What's Next?

### Planned Features
- Data export (CSV, JSON)
- Cloud backup
- Advanced filtering
- Goal tracking
- Insights & patterns

### Share Feedback
- What features would help?
- What's confusing?
- Performance issues?
- Design suggestions?

---

Enjoy tracking your social energy! 📊✨
