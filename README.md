# Birthday Site

## Project structure

```
index.html          the page markup
css/style.css        all styling
js/main.js            behavior + the CONFIG block you'll edit
assets/images/       her photos (see below)
assets/audio/song.mp3  the song for the mini player
```

TO VIEW: double-click `index.html` and it opens in any browser.
TO SHARE: upload the whole project folder (index.html + css + js + assets)
to any free static host (Vercel, Netlify, GitHub Pages), or just send the
folder to open locally.

## Personalizing

Everything you'll want to change lives in ONE place: open `js/main.js`
in any text editor, near the top, in the block that starts with

    const CONFIG = {

Edit the values there — nothing else in the file needs to change.

### 1) Photos
- Drop your photos into `assets/images/` and name them `1.jpg`, `2.jpg`,
  `3.jpg` ... matching the `src` values already listed in `CONFIG`
  (`ringPhotos`, `trailPhotos`, `starfieldOne`, `starfieldTwo`). You can
  rename the files instead of editing the code if that's easier — just
  keep the names matching.
- Any slot without a real photo keeps showing a color placeholder, so
  it's safe to fill these in gradually.

### 2) The message
- Edit `message` and `signature` inside `CONFIG` with your real note.

### 3) The song
Two options for `song.src` in `CONFIG`:
- **Local file:** put an mp3 at `assets/audio/song.mp3` and leave `src`
  as `"assets/audio/song.mp3"`.
- **URL:** paste a direct link to an audio file, e.g.
  `src: "https://example.com/song.mp3"`. This only works with a direct
  link to an audio file (usually ending in `.mp3`/`.m4a`) that allows
  cross-origin playback — most file-hosting/CDN links work fine, but
  share links from streaming services (Spotify, YouTube, Apple Music
  etc.) generally do NOT work since they don't serve a raw audio file.

Update `song.title`, `song.subtitle`, and `song.durationLabel` /
`durationSeconds` to match. Until you add a real source, the player
still shows and animates, it just won't have real audio.

### 4) Nickname labels
Each photo object has a `cap` field (e.g. `"Sweetheart"`, `"Stunner"`).
Change these to whatever pet names you actually use.

### 5) Her age / birthday
`birthDate` in `CONFIG` drives everything — the big "turning N" number,
and the live years/days/clock counter, are both computed from it
against the current date automatically. No age needs to be typed in by
hand, and it stays correct on any date you open the page.
