# Notes Dashboard

A tiny website with:
- A home page showing today's date and time, and two buttons: **Work** and **Personal**.
- Each button opens a full-page notepad. Whatever you type is saved automatically and synced through the cloud, so the same notes show up no matter which device or browser you open the page on.

It's plain HTML/CSS/JS — no build step, no server of your own to run. It's hosted for free with **GitHub Pages**, and notes are stored for free with **jsonbin.io**.

---

## Part 1 & 2 — Note syncing (jsonbin.io)

`config.js` already has your **Bin ID** filled in. You still need to add your **Master Key**:

1. Go to **https://jsonbin.io** and log in.
2. Click your account icon (top right) → **API Keys**.
3. Copy your account's **Master Key** (labelled `X-MASTER-KEY` on that page). This is different from a scoped "Access Key" — the master key always has full read/write access to every bin in your own account, so there's nothing extra to configure per bin.
4. Open `config.js` and replace `PASTE_YOUR_MASTER_KEY_HERE` with that key. It should look like:
   ```js
   window.NOTES_CONFIG = {
     BIN_ID: "6aaffad2ffd5d160531c8843",
     API_KEY: "your-master-key-goes-here"
   };
   ```
5. Save the file.

> **Why not the scoped Access Key?** jsonbin.io's Access Keys need to be explicitly granted permission to each individual bin (and to Read + Update specifically) at creation time — if that step is missed, every request comes back `401 Unauthorized`, which is what happened the first time around. The Master Key sidesteps that.
>
> Note: this key will be visible to anyone who looks at your website's source code once it's on the internet. That's fine for a personal scratch-notes app like this one, but don't use this setup for anything sensitive (passwords, financial info, etc.). If you ever want to revoke it, jsonbin.io lets you regenerate your Master Key from the API Keys page — just remember to update `config.js` and re-upload it to GitHub afterward.

---

## Part 3 — Upload to GitHub (free account)

Make sure `config.js` has your Master Key filled in (Part 1 & 2 above) before uploading it.

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
