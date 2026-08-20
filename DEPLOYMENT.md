# Jam-Pak EDU - Quick Start Guide

## For Demo / Testing

### Windows Users (Easiest)
**Double-click:** `START_JAM_PAK.bat`
- Server starts automatically
- Browser opens automatically
- Game is ready to use

### Manual Start (if needed)
```powershell
node src/server.js
```
Then open: http://localhost:3001

---

## For Deployment / Production

### Deploy on Render from GitHub
1. Push this repository to GitHub.
2. In Render, create a **Web Service** and select the GitHub repository.
3. Set **Root Directory** to blank. The repository root must contain `package.json`, `Procfile`, `public`, and `src`.
4. Use the Node environment, keep the build command empty (or `npm install`), and use `npm start` as the start command.
5. Deploy and open the generated `https://...onrender.com` URL. Do not open `public/index.html` directly for the deployed game.

If **Root Directory** is set to `src`, the start command must instead be `node server.js`. The recommended configuration is to leave **Root Directory** blank and use `npm start`.

Before deploying, open the GitHub repository's main page and confirm these items are visible at the top level:

```text
package.json
Procfile
public/
src/
src/server.js
```

If they are inside another folder such as `JamPak-EDU/`, set Render's **Root Directory** to that folder. Do not use `src` as the root when using the repository's `npm start` command.

The app also includes a `Procfile` with the equivalent command:

```bash
web: node src/server.js
```

The server uses Render's `PORT` environment variable and falls back to port `3001` for local development.

### Deploy on Your Own Server
1. Install Node.js v18+
2. Clone the repo
3. Run `node src/server.js`
4. Set `PORT` environment variable if needed
5. Point domain to the server

### Database / Data Persistence
Currently uses JSON file storage:
- `src/data/question-bank.json` — quiz questions
- `src/data/access-control.json` — users, schools, teachers

For production, migrate to PostgreSQL or MongoDB.

---

## Features Included

✅ Multiplayer game hosting (room codes)
✅ Solo study mode
✅ Teacher/Student accounts with school linking
✅ Question builder (owner access)
✅ Real-time scoring & leaderboards
✅ Jamaican-themed UI
✅ 11 grade levels (1-11)
✅ 7+ subjects per grade
✅ Timer/countdown
✅ Answer reveal + retry logic

---

## API Base URL

**Development:** `http://localhost:3001`
**Production:** `https://yourdomain.com`

The app auto-detects localhost and uses appropriate URLs.

---

## Troubleshooting

### "Cannot reach game server"
- Ensure server is running: `node src/server.js`
- Verify port 3001 is not blocked
- Check firewall settings

### "No schools found"
- Server is running but database empty
- Create schools via teacher signup or `/api/schools` endpoint

### Port 3001 already in use
On Windows, stop the process using port 3001 or start the server with another port:

```powershell
$env:PORT=3010; npm start
```

---

## Next Steps for Buyers/Team

1. **Database Migration** (PostgreSQL recommended)
   - Replace JSON persistence in `src/server.js`
   - Use proper auth (JWT tokens implemented)

2. **Dashboard Enhancement**
   - Add teacher analytics
   - Student progress tracking
   - Parent notifications

3. **Mobile App**
   - React Native / Flutter for iOS/Android

4. **Offline Mode**
   - Service workers for quiz caching
   - Sync when connection restored

5. **CI/CD Pipeline**
   - GitHub Actions for auto-deployment
   - Automated testing setup

---

## Tech Stack

- **Frontend:** Vanilla JavaScript (no frameworks)
- **Backend:** Node.js + Express
- **Storage:** JSON (upgradeable to SQL/NoSQL)
- **Styling:** CSS3 (custom, no frameworks)
- **Deployment Ready:** Yes

---

**Created by:** Shantaye Williams  
**License:** All Rights Reserved  
**Year:** 2025-2026
