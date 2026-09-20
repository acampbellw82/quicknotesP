# Notes Dashboard

A tiny website with:
- A home page showing today's date and time, and two buttons: **Work** and **Personal**.
- Each button opens a full-page notepad. Whatever you type is saved automatically and synced through the cloud, so the same notes show up no matter which device or browser you open the page on.

It's plain HTML/CSS/JS — no build step, no server of your own to run. It's hosted for free with **GitHub Pages**, and notes are stored for free with **jsonbin.io**.

---

## Part 1 & 2 — Note syncing (jsonbin.io) — already done

`config.js` in this folder is already filled in with your jsonbin.io **Bin ID** and **Access Key**, so you can skip straight to Part 3.

For reference, this is what makes syncing work, in case you ever need to redo it:
1. **https://jsonbin.io** free account → account icon → **API Keys** → **Create Access Key** (read + write) → that's the `API_KEY`.
2. **Bins** → **Create Bin** → content `{ "work": "", "personal": "" }` → **Create** → the ID shown at the top is the `BIN_ID`.
3. Both values go into `config.js`:
   ```js
   window.NOTES_CONFIG = {
     BIN_ID: "6aaffad2ffd5d160531c8843",
     API_KEY: "$2a$10$IlQ0Kuc0QcR8P8Y88On9feCfFSXj4JgUDtFIbbvQBsblH3D9MFcL6"
   };
   ```

> Note: this key will be visible to anyone who looks at your website's source code once it's on the internet. That's fine for a personal scratch-notes app like this one, but don't use this setup for anything sensitive (passwords, financial info, etc.). If that key is ever compromised or you want to rotate it, generate a new Access Key on jsonbin.io and swap it into `config.js`, then re-upload that one file to GitHub.

---

## Part 3 — Upload to GitHub (free account)

`config.js` in this folder already has your sync credentials filled in — just upload it as-is.

1. Go to **https://github.com** and sign up for a free account if you don't have one.
2. Once logged in, click the **+** icon (top right) → **New repository**.
3. Name it something like `notes-dashboard`. Leave it **Public**. Don't check "Add a README" (we already have one). Click **Create repository**.
4. On the new repo's page, click **uploading an existing file** (a link in the "Quick setup" area).
5. Drag and drop all the files from this folder into the upload box:
   - `index.html`
   - `work.html`
   - `personal.html`
   - `style.css`
   - `notes.js`
   - `config.js` (with your Bin ID and API key filled in)
   - `README.md`
6. Scroll down and click **Commit changes**.

---

## Part 4 — Turn on GitHub Pages

1. In your repository, click **Settings** (top menu of the repo).
2. In the left sidebar, click **Pages**.
3. Under "Build and deployment" → "Source", choose **Deploy from a branch**.
4. Under "Branch", choose **main** and folder **/(root)**, then click **Save**.
5. Wait about 1 minute, then refresh the page. GitHub will show a green box with your live URL, something like:
   ```
   https://YOUR-USERNAME.github.io/notes-dashboard/
   ```
6. Open that link — that's your dashboard! Bookmark it on every device (phone, laptop, tablet) you want to use it on.

---

## Using it

- Open your GitHub Pages link → you'll see the date, time, and two buttons.
- Tap **Work** or **Personal** to open that notepad and start typing.
- Notes save automatically ~1 second after you stop typing (you'll see "Saving…" then "Saved just now" under the title).
- Open the same link on another device and your notes will be there too (it also checks for updates every 20 seconds while the page is open).

## Making changes later

To edit the site later (e.g. change colors, add a third page), edit the files locally and re-upload them the same way (Settings aren't needed again — just go to the repo, click **Add file → Upload files**, and overwrite the changed ones). GitHub Pages will redeploy automatically within a minute or two.

## Troubleshooting

- **"Sync not set up yet" message**: `config.js` still has the placeholder text — go back to Part 2.
- **"Could not load/save notes" message**: double check the Bin ID and API key are copied exactly (no extra spaces), and that the access key has read + write permission.
- **Page shows old content after uploading changes**: hard-refresh the browser (Ctrl/Cmd+Shift+R), GitHub Pages can take a minute or two to update.
