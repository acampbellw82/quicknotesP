// Shared sync logic for work.html and personal.html
// Uses jsonbin.io (free tier) as a tiny cloud key-value store so the
// same notes show up on every device that opens this page.
//
// Data shape stored in the bin: { "work": "...", "personal": "..." }

(function () {
  const CONFIG = window.NOTES_CONFIG || {};
  const BIN_ID = CONFIG.BIN_ID;
  const API_KEY = CONFIG.API_KEY;
  const BASE_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`;

  const textarea = document.getElementById("notes");
  const statusEl = document.getElementById("status");
  const pageKey = document.body.dataset.page; // "work" or "personal"

  let saveTimer = null;
  let lastSavedValue = "";
  let isTyping = false;

  function setStatus(text) {
    if (statusEl) statusEl.textContent = text;
  }

  function configured() {
    return (
      BIN_ID &&
      API_KEY &&
      BIN_ID !== "PASTE_YOUR_BIN_ID_HERE" &&
      API_KEY !== "PASTE_YOUR_ACCESS_KEY_HERE"
    );
  }

  async function fetchBin() {
    const res = await fetch(`${BASE_URL}/latest`, {
      headers: { "X-Access-Key": API_KEY }
    });
    if (!res.ok) throw new Error(`Load failed (${res.status})`);
    const json = await res.json();
    return json.record || {};
  }

  async function writeBin(record) {
    const res = await fetch(BASE_URL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Access-Key": API_KEY
      },
      body: JSON.stringify(record)
    });
    if (!res.ok) throw new Error(`Save failed (${res.status})`);
  }

  async function loadNotes() {
    if (!configured()) {
      setStatus("⚠ Sync not set up yet — see README.md (config.js)");
      textarea.disabled = false;
      return;
    }
    setStatus("Loading…");
    try {
      const record = await fetchBin();
      const value = record[pageKey] || "";
      // Don't clobber what the person is actively typing if the load
      // happened to finish late.
      if (!isTyping) {
        textarea.value = value;
        lastSavedValue = value;
      }
      setStatus("All notes synced");
    } catch (err) {
      setStatus("⚠ Could not load notes: " + err.message);
    }
  }

  async function saveNotes() {
    const value = textarea.value;
    if (value === lastSavedValue) return;
    setStatus("Saving…");
    try {
      // Merge with the latest remote copy so we don't overwrite the
      // *other* page's notes (work vs personal share one bin).
      let record = {};
      try {
        record = await fetchBin();
      } catch (e) {
        /* fall back to writing just this key */
      }
      record[pageKey] = value;
      await writeBin(record);
      lastSavedValue = value;
      setStatus("Saved just now");
    } catch (err) {
      setStatus("⚠ Could not save: " + err.message);
    }
  }

  function scheduleSave() {
    isTyping = true;
    setStatus("Typing…");
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => {
      isTyping = false;
      saveNotes();
    }, 900);
  }

  function flushSave() {
    if (textarea.value !== lastSavedValue) {
      clearTimeout(saveTimer);
      isTyping = false;
      saveNotes();
    }
  }

  if (textarea) {
    textarea.addEventListener("input", scheduleSave);
    // Save immediately if the person switches tabs / leaves the page,
    // instead of waiting for the debounce timer.
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") flushSave();
    });
    window.addEventListener("pagehide", flushSave);
    loadNotes();
    // Poll every 20s so edits made on another device show up here too,
    // as long as you're not actively typing.
    setInterval(() => {
      if (!isTyping) loadNotes();
    }, 20000);
  }
})();
