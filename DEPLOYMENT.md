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

### Email Verification Setup

Teacher and student registration already uses Resend verification links; the sign-in screens now also let an unverified user request a fresh link. Create a Resend account and add these Render environment variables:

```text
RESEND_API_KEY=re_your_private_key
EMAIL_FROM=JamPak EDU <noreply@your-verified-domain.com>
APP_BASE_URL=https://your-service.onrender.com
REQUIRE_EMAIL_VERIFICATION=true
```

The sender domain must be verified in Resend. Keep `RESEND_API_KEY` private and never put it in frontend files or commit it to GitHub. Set `REQUIRE_EMAIL_VERIFICATION=true` before opening registration to the public.

### PostgreSQL Setup (Render)

Production requires PostgreSQL for accounts, classrooms, approved/reviewable questions, and durable quiz results. Without `DATABASE_URL`, the production server will stop with a clear startup error rather than appear healthy while losing user data on restart.

1. In Render, create a **PostgreSQL** database in the same region as the web service.
2. Copy its **Internal Database URL**.
3. Open the Jam-Pak EDU web service's **Environment** settings and add:

   ```text
   DATABASE_URL=<the internal database URL>
   DATABASE_SSL=true
   ```

4. Deploy the web service. On first connection it creates the tables and indexes defined in `src/data/schema.sql`, imports the existing `src/data/question-bank.json`, and copies any existing `src/data/access-control.json` data into PostgreSQL. Question records are keyed to an individual grade and subject; quizzes no longer substitute questions from other grades or subjects.
5. In the Teacher Portal, open **Questions** to review imported questions. With the current 703-question file, about 580 questions will need review because they lack a clear explanation or repeat a prompt across grades. They are kept in the database, but do not enter public quizzes until a teacher sets the exact grade/topic, adds an explanation, and approves them. The review queue is paged so it remains usable on a phone.

The home-page leaderboard ranks each nickname's best score and can be filtered by grade and subject. Ask players to choose nicknames, not real names. This first version stores game scores without tying them to verified student accounts, so it is a friendly game ranking, not an official school grade.

For local development, PostgreSQL is optional: run `npm start` without `DATABASE_URL`. That mode is only a local preview; account and classroom state is saved to the local JSON file, while quiz results are held in memory and will not survive a restart. To exercise persistent storage locally, set `DATABASE_URL` to a development database before starting the server.

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
PostgreSQL currently stores:
- `questions` — grade, subject, topic, prompt, answer choices, answer key, explanation, review status, and author metadata
- `quiz_results` — nickname, grade, subject, score, and completion counts for the leaderboard
- `application_state` — teacher/student accounts and their password hashes, schools, classes, quizzes, assignments, and manual-review records as one JSON document

On the first PostgreSQL startup, existing question and account JSON data is imported without deleting its source files. Keep the Render web service at one instance while account/classroom records are stored as a single JSON document; this interim storage is durable, but it is not designed for multiple app instances writing concurrently. Student quiz history is still not tied to verified student accounts, and some dashboard history remains in browser storage. Do not rely on leaderboard results as official school grades.

---

## Features Included

✅ Multiplayer game hosting (room codes)
✅ Solo study mode
✅ Teacher/Student accounts with school linking
✅ Question builder (owner access)
✅ Teacher question approval queue
✅ Exact grade/subject question matching
✅ Live-game and all-time nickname leaderboards
✅ Resend verification emails
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

1. **Finish the database migration**
   - Move accounts, classes, assignments, and quiz definitions from JSON into PostgreSQL.
   - Store student progress against verified student accounts; keep public nicknames separate from private identity.
2. **Build question coverage carefully**
   - Review the imported question queue, use consistent grade/topic tags, and add explanations.
   - Add curriculum/source references and a report-question workflow before opening all grades to public play.
3. **Improve classrooms and dashboards**
   - Add teacher/student profile images using managed object storage (not local server files).
   - Finish progress history and teacher gradebook views with clear privacy controls.
4. **Prepare for public launch**
   - Add automated tests, backups, privacy/parent-consent information, abuse reporting, and a support contact.
   - Pilot with a few Jamaican classrooms and fix the most common issues before expanding.
5. **Explore growth and financing**
   - Build a sustainable product and a track record of schools, learners, retention, and revenue first.
   - Get Jamaican legal, accounting, and securities-market advice before considering a Jamaica Stock Exchange listing; that is a long-term outcome, not a launch requirement.
6. **Mobile App**
   - React Native / Flutter for iOS/Android

7. **Offline Mode**
   - Service workers for quiz caching
   - Sync when connection restored

8. **CI/CD Pipeline**
   - GitHub Actions for auto-deployment
   - Automated testing setup

---

## Tech Stack

- **Frontend:** Vanilla JavaScript (no frameworks)
- **Backend:** Node.js + Express
- **Storage:** PostgreSQL for questions and quiz results; remaining account/classroom data is still JSON
- **Styling:** CSS3 (custom, no frameworks)
- **Deployment status:** Early deployment foundation; finish account/classroom migration and public-launch safeguards before a broad public release.

---

**Created by:** Shantaye Williams  
**License:** All Rights Reserved  
**Year:** 2025-2026
