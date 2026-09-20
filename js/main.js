/* ================================================================
   EDIT ME — everything personal lives here. Replace tmp values as
   you get real content. No other part of the site needs to change.
   ================================================================ */
const CONFIG = {
  name: "Shruti",
  birthDate: "1999-09-21",      // YYYY-MM-DD
  // turningAge is computed below from birthDate vs today — no need to set it by hand.
  message: `In every quiet moment and through every passing day,
you bring a gentle light that words can hardly say.

With you, every path makes sense, and every place feels like home.

Happy Birthday, Shruti!

Thank you for bringing so much peace, laughter, and beauty into my life.
I can’t wait to build the rest of our journey together.`,
  signature: "— Pramod",
  finalWish: "Happy Birthday, my love. Here’s to us. 🤍",

  // song shown in the mini player.
  // Option A: put an mp3 at assets/audio/song.mp3 and leave src as "assets/audio/song.mp3".
  // Option B: paste a direct link to an audio file (must end in something
  //   like .mp3 and allow cross-origin playback — most file-hosting/CDN
  //   links work, most streaming-service share links do NOT).
  song: {
    title: "Our Song",
    subtitle: "Birthday Playlist",
    src: "assets/audio/song.mp3",   // <-- EDIT ME: local file path or a direct https:// URL
    durationLabel: "4:44",
    durationSeconds: 284
  },
  // Ring collage on the cream hero section (8 tmp slots)
  ringPhotos: [
    { src: "assets/images/1.jpg", cap: "Sweetheart" },
    { src: "assets/images/2.jpg", cap: "Stunner" },
    { src: "assets/images/3.jpg", cap: "Sunshine" },
    { src: "assets/images/4.jpg", cap: "Darling" },
    { src: "assets/images/5.jpg", cap: "Angel" },
    { src: "assets/images/6.jpg", cap: "Baddie" },
    { src: "assets/images/7.jpg", cap: "Cutie" },
    { src: "assets/images/8.jpg", cap: "Mine" },
  ],

  // Two starfield grids, each with tmp nickname labels
  // every photo in assets/images shows up tumbling through the universe section
  starfieldOne: Array.from({length: 19}, (_, i) => ({ src: `assets/images/${i+1}.jpg`, cap: "" })),
};

/* ---------- derive turning age from birthDate vs. today ---------- */
const birth = new Date(CONFIG.birthDate + 'T00:00:00');
(function(){
  const now = new Date();
  let bdayYear = now.getFullYear();
  const thisYearBday = new Date(bdayYear, birth.getMonth(), birth.getDate());
  if(now > thisYearBday) bdayYear++;
  CONFIG.turningAge = bdayYear - birth.getFullYear();
})();

/* ---------- apply config to DOM ---------- */
document.getElementById('curtain-title').textContent = `for ${CONFIG.name}`;
document.getElementById('age-number').textContent = CONFIG.turningAge;
document.getElementById('age-number').setAttribute('data-text', CONFIG.turningAge);
document.getElementById('hero-name').textContent = CONFIG.name;
document.getElementById('hero-msg').textContent = CONFIG.message.trim();
document.querySelector('#hero .signature').textContent = CONFIG.signature;
document.getElementById('final-msg').textContent = CONFIG.finalWish;
document.getElementById('p-title').textContent = CONFIG.song.title;
document.getElementById('p-sub').textContent = CONFIG.song.subtitle;
document.getElementById('p-dur').textContent = CONFIG.song.durationLabel;
if(CONFIG.song.src){
  const bgmSrc = document.getElementById('bgm');
  bgmSrc.src = CONFIG.song.src;
  if(/^https?:\/\//i.test(CONFIG.song.src)){
    bgmSrc.crossOrigin = 'anonymous';
  }
}

const gradients = [
  ['#f0c48a','#e79aa0'], ['#c9a0e8','#8ab7e8'], ['#f2b5a0','#f2e0a0'],
  ['#a0e8c9','#8ab7e8'], ['#e8a0c9','#f0c48a'], ['#a0c9e8','#c9a0e8'],
  ['#f2794a','#e8557a'], ['#d9a441','#f2794a'],
];
function makePolaroid({src, cap}, i, rot){
  const el = document.createElement('div');
  el.className = 'polaroid';
  const g = gradients[i % gradients.length];
  el.innerHTML = `<div class="frame" style="--ph-a:${g[0]};--ph-b:${g[1]}"><img src="${src}" alt="${cap}" loading="lazy" onload="this.parentElement.classList.add('has-photo')" onerror="this.remove()"></div>`;
  if(rot !== undefined) el.style.setProperty('--r', rot+'deg');
  return el;
}

/* ring collage */
const ring = document.getElementById('ring');
const ringPhotos = CONFIG.ringPhotos;
const R = 150;
ringPhotos.forEach((p, i)=>{
  const angle = (360 / ringPhotos.length) * i;
  const wrap = document.createElement('div');
  wrap.className = 'polaroid';
  wrap.style.marginLeft = '-59px';
  wrap.style.marginTop = '-84px';
  wrap.style.transform = `rotate(${angle}deg) translate(${R}px) rotate(${-angle}deg)`;
  const g = gradients[i % gradients.length];
  wrap.innerHTML = `<div class="frame" style="--ph-a:${g[0]};--ph-b:${g[1]}"><img src="${p.src}" alt="${p.cap}" loading="lazy" onload="this.parentElement.classList.add('has-photo')" onerror="this.remove()"></div>`;
  ring.appendChild(wrap);
});

/* balloon letters */
function buildBalloonLine(id, text){
  const el = document.getElementById(id);
  [...text].forEach((ch,i)=>{
    const s = document.createElement('span');
    s.textContent = ch === ' ' ? ' ' : ch;
    s.style.animationDelay = (i*0.08)+'s';
    el.appendChild(s);
  });
}
buildBalloonLine('hb-line1','HAPPY');
buildBalloonLine('hb-line2','BIRTHDAY');

/* ---------- curtain open + audio kick-off ---------- */
const scene = document.getElementById('curtain-scene');
const bgm = document.getElementById('bgm');
document.getElementById('curtain-cta').addEventListener('click', ()=>{
  scene.classList.add('open');
  document.getElementById('player').classList.add('show');
  setTimeout(()=>{ scene.style.display='none'; }, 1500);
  bgm.play().catch(()=>{ /* no real audio file yet — player still shows visually */ });
  playingState.isPlaying = true;
  updatePlayButton();
  setTimeout(igniteAgeNumber, 500);
}, {once:true});

/* ---------- age number burn-in ---------- */
function igniteAgeNumber(){
  const num = document.getElementById('age-number');
  num.classList.add('ignite');
  const rect = num.getBoundingClientRect();
  const layer = document.getElementById('confetti-layer');
  const colors = ['#fff7c9','#ffd27a','#ff9a3d','#e8551f'];
  for(let i=0;i<26;i++){
    const s = document.createElement('div');
    s.className = 'ember';
    s.style.left = (rect.left + Math.random()*rect.width) + 'px';
    s.style.top = (rect.top + rect.height*(0.45 + Math.random()*0.45)) + 'px';
    s.style.background = colors[Math.floor(Math.random()*colors.length)];
    const rise = 50 + Math.random()*100;
    const drift = Math.random()*50 - 25;
    const dur = 0.8 + Math.random()*0.8;
    const delay = Math.random()*0.4;
    s.style.transition = `transform ${dur}s ease-out ${delay}s, opacity ${dur}s ease-in ${delay}s`;
    layer.appendChild(s);
    requestAnimationFrame(()=>{
      s.style.transform = `translate(${drift}px, ${-rise}px)`;
      s.style.opacity = '0';
    });
    setTimeout(()=> s.remove(), (dur+delay)*1000 + 150);
  }
}

/* ---------- age counter (live) ---------- */
function tickAge(){
  const now = new Date();
  let years = now.getFullYear() - birth.getFullYear();
  const lastBday = new Date(now.getFullYear(), birth.getMonth(), birth.getDate());
  if(now < lastBday){ years--; }
  const prevBday = new Date(lastBday);
  if(now < lastBday) prevBday.setFullYear(prevBday.getFullYear()-1);
  const msSince = now - prevBday;
  const days = Math.floor(msSince / 86400000);
  const h = String(now.getHours()).padStart(2,'0');
  const m = String(now.getMinutes()).padStart(2,'0');
  const s = String(now.getSeconds()).padStart(2,'0');
  document.getElementById('ac-years').textContent = years;
  document.getElementById('ac-days').textContent = days;
  document.getElementById('ac-time').textContent = `${h}:${m}:${s}`;
}
tickAge();
setInterval(tickAge, 1000);

/* ---------- music player ---------- */
const playingState = { isPlaying:false, fakeElapsed:0 };
function updatePlayButton(){
  const btn = document.getElementById('p-toggle');
  btn.textContent = playingState.isPlaying ? '❚❚' : '▶';
  btn.setAttribute('aria-label', playingState.isPlaying ? 'Pause song' : 'Play song');
}
document.getElementById('p-toggle').addEventListener('click', ()=>{
  if(playingState.isPlaying){ bgm.pause(); playingState.isPlaying=false; }
  else { bgm.play().catch(()=>{}); playingState.isPlaying=true; }
  updatePlayButton();
});
function fmtTime(s){
  const m = Math.floor(s/60), r = Math.floor(s%60);
  return `${m}:${String(r).padStart(2,'0')}`;
}
setInterval(()=>{
  if(!playingState.isPlaying) return;
  const dur = CONFIG.song.durationSeconds;
  let cur;
  if(bgm.duration && !isNaN(bgm.duration) && bgm.currentTime > 0){
    cur = bgm.currentTime;
  } else {
    playingState.fakeElapsed = (playingState.fakeElapsed + 1) % dur;
    cur = playingState.fakeElapsed;
  }
  document.getElementById('p-bar').style.width = (cur/dur*100)+'%';
  document.getElementById('p-cur').textContent = fmtTime(cur);
}, 1000);

/* ---------- scroll reveal ---------- */
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('in'); });
},{threshold:.15});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

/* ---------- memory thread rail ---------- */
const rail = document.getElementById('thread-rail');
const BULB_COUNT = 40;
for(let i=0;i<BULB_COUNT;i++){
  const b = document.createElement('div');
  b.className = 'bulb';
  rail.appendChild(b);
}
const bulbs = rail.querySelectorAll('.bulb');
function updateThread(){
  const scrollPct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
  const lit = Math.floor(scrollPct * bulbs.length);
  bulbs.forEach((b,i)=> b.classList.toggle('lit', i <= lit));
}
window.addEventListener('scroll', updateThread, {passive:true});
updateThread();

/* ---------- shared photo lightbox (opened by tapping a universe photo) ---------- */
const lightbox = document.getElementById('photo-lightbox');
function openLightbox(entry){
  const img = document.getElementById('lightbox-img');
  img.src = entry.img.src;
  img.alt = entry.cap || 'Photo';
  lightbox.classList.add('show');
}
function closeLightbox(){ lightbox.classList.remove('show'); }
lightbox.addEventListener('click', closeLightbox);
lightbox.querySelector('.lightbox-card').addEventListener('click', e=> e.stopPropagation());
document.getElementById('lightbox-close').addEventListener('click', closeLightbox);
window.addEventListener('keydown', e=>{
  if(e.key === 'Escape' && lightbox.classList.contains('show')) closeLightbox();
});

/* ---------- starfield canvas: twinkling stars + tumbling, draggable, clickable photos ---------- */
function initStarCanvas(section, photos){
  const canvas = section.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  const FIELD_PAD = 0.4;
  let w,h,stars=[],sprites=[];
  let panX = 0, panY = 0;
  let dragging = false, dragLastX = 0, dragLastY = 0, moved = 0;
  const entries = photos.map(p=>{
    const img = new Image();
    img.src = p.src;
    img.onload = ()=>{ img.loaded = true; };
    img.onerror = ()=>{ img.broken = true; };
    return { img, cap: p.cap };
  });

  function randX(){ return (Math.random()*(1+2*FIELD_PAD) - FIELD_PAD) * w; }
  function makeSprite(entry, y){
    const depth = 0.35 + Math.random()*0.85;
    return {
      entry, depth,
      x: randX(),
      y: y !== undefined ? y : -100*depth,
      rot: Math.random()*40 - 20,
      spin: Math.random()*0.3 - 0.15,
      driftPhase: Math.random()*Math.PI*2,
      driftAmp: 10 + Math.random()*20,
      size: (46 + Math.random()*30) * depth,
      _x:0, _y:0, _rot:0, _size:0, _capH:0,
    };
  }
  function resize(){
    w = canvas.width = section.clientWidth;
    h = canvas.height = section.clientHeight;
    stars = Array.from({length: Math.floor(w*h/9000)}, ()=>({
      x: randX(), y: Math.random()*h, r: Math.random()*1.4+.3, s: Math.random()*.5+.1
    }));
    if(!sprites.length && entries.length){
      const count = Math.max(entries.length*3, 14);
      sprites = Array.from({length:count}, (_,i)=> makeSprite(entries[i % entries.length], Math.random()*h));
    }
    const maxX = w*FIELD_PAD, maxY = h*FIELD_PAD;
    panX = Math.max(-maxX, Math.min(maxX, panX));
    panY = Math.max(-maxY, Math.min(maxY, panY));
  }
  function drawSprite(sp){
    const s = sp.size, pad = s*0.08, photoSize = s - pad*2, capH = s*0.28;
    const parallax = 0.5 + sp.depth*0.5;
    const x = sp.x + Math.sin(sp.driftPhase)*sp.driftAmp + panX*parallax;
    const y = sp.y + panY*parallax;
    sp._x = x; sp._y = y; sp._rot = sp.rot; sp._size = s; sp._capH = capH;
    ctx.save();
    ctx.globalAlpha = 0.5 + sp.depth*0.45;
    ctx.translate(x, y);
    ctx.rotate(sp.rot * Math.PI/180);
    ctx.shadowColor = 'rgba(0,0,0,.45)';
    ctx.shadowBlur = 10*sp.depth;
    ctx.fillStyle = '#fff';
    ctx.fillRect(-s/2, -s/2 - capH/2, s, s + capH);
    ctx.shadowBlur = 0;
    if(sp.entry.img.loaded){
      ctx.drawImage(sp.entry.img, -s/2+pad, -s/2+pad - capH/2, photoSize, photoSize);
    } else {
      ctx.fillStyle = '#caa46b';
      ctx.fillRect(-s/2+pad, -s/2+pad - capH/2, photoSize, photoSize);
    }
    ctx.restore();
  }
  function draw(){
    ctx.clearRect(0,0,w,h);
    const LINK_DIST = 130;
    for(let i=0;i<stars.length;i++){
      for(let j=i+1;j<stars.length;j++){
        const a = stars[i], b = stars[j];
        const dx = a.x-b.x, dy = a.y-b.y;
        const dist = Math.sqrt(dx*dx+dy*dy);
        if(dist < LINK_DIST){
          ctx.strokeStyle = `rgba(217,164,65,${(1 - dist/LINK_DIST) * 0.18})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x+panX*0.4, a.y+panY*0.4);
          ctx.lineTo(b.x+panX*0.4, b.y+panY*0.4);
          ctx.stroke();
        }
      }
    }
    ctx.fillStyle = '#fff';
    stars.forEach(st=>{
      ctx.globalAlpha = 0.4 + 0.6*Math.sin(Date.now()*0.001*st.s + st.x);
      ctx.beginPath(); ctx.arc(st.x+panX*0.4, st.y+panY*0.4, st.r, 0, Math.PI*2); ctx.fill();
    });
    ctx.globalAlpha = 1;

    sprites.forEach(sp=>{
      sp.y += 0.35 + sp.depth*0.55;
      sp.rot += sp.spin;
      sp.driftPhase += 0.006;
      drawSprite(sp);
      if(sp._y - sp._size > h + 40){
        const fresh = makeSprite(sp.entry);
        const parallax = 0.5 + fresh.depth*0.5;
        fresh.y = -100*fresh.depth - panY*parallax;
        Object.assign(sp, fresh);
      }
    });

    requestAnimationFrame(draw);
  }
  function hitTestSprite(px, py){
    for(let k = sprites.length-1; k>=0; k--){
      const sp = sprites[k];
      const dx = px - sp._x, dy = py - sp._y;
      const theta = sp._rot * Math.PI/180;
      const cos = Math.cos(theta), sin = Math.sin(theta);
      const lx = dx*cos + dy*sin;
      const ly = -dx*sin + dy*cos;
      if(Math.abs(lx) <= sp._size/2 && Math.abs(ly) <= sp._size/2 + sp._capH/2) return sp;
    }
    return null;
  }
  function clampPan(){
    const maxX = w*FIELD_PAD, maxY = h*FIELD_PAD;
    panX = Math.max(-maxX, Math.min(maxX, panX));
    panY = Math.max(-maxY, Math.min(maxY, panY));
  }
  canvas.style.cursor = 'grab';
  canvas.style.touchAction = 'none';
  canvas.addEventListener('pointerdown', e=>{
    dragging = true; moved = 0;
    dragLastX = e.clientX; dragLastY = e.clientY;
    canvas.setPointerCapture(e.pointerId);
    canvas.style.cursor = 'grabbing';
  });
  canvas.addEventListener('pointermove', e=>{
    if(!dragging) return;
    const dx = e.clientX - dragLastX, dy = e.clientY - dragLastY;
    dragLastX = e.clientX; dragLastY = e.clientY;
    moved += Math.abs(dx) + Math.abs(dy);
    panX += dx; panY += dy;
    clampPan();
  });
  function endDrag(e){
    dragging = false;
    canvas.style.cursor = 'grab';
    if(moved < 6){
      const rect = canvas.getBoundingClientRect();
      const hit = hitTestSprite(e.clientX - rect.left, e.clientY - rect.top);
      if(hit) openLightbox(hit.entry);
    }
  }
  canvas.addEventListener('pointerup', endDrag);
  canvas.addEventListener('pointercancel', endDrag);
  ['touchstart','touchmove','touchend'].forEach(evt=>{
    canvas.addEventListener(evt, e=> e.stopPropagation(), {passive:true});
  });

  window.addEventListener('resize', resize);
  resize(); draw();
}
document.querySelectorAll('.starfield').forEach(section=>{
  initStarCanvas(section, CONFIG.starfieldOne);
});

/* ---------- one-section-per-scroll paging ---------- */
(function(){
  const pages = Array.from(document.querySelectorAll(
    '#age, #balloons, #hero, #star1, #finale, footer'
  ));
  if(!pages.length) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let current = 0;
  let animating = false;
  let unlockTimer = null;

  function nearestPageIndex(){
    let best = 0, bestDist = Infinity;
    pages.forEach((p, i)=>{
      const dist = Math.abs(p.getBoundingClientRect().top);
      if(dist < bestDist){ bestDist = dist; best = i; }
    });
    return best;
  }
  current = nearestPageIndex();

  function goTo(index){
    index = Math.max(0, Math.min(pages.length - 1, index));
    current = index;
    animating = true;
    pages[index].scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    clearTimeout(unlockTimer);
    unlockTimer = setTimeout(()=>{ animating = false; }, reduceMotion ? 50 : 900);
  }

  function onWheel(e){
    if(Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return; // horizontal gesture — let it scroll natively
    e.preventDefault();
    if(animating) return;
    goTo(current + (e.deltaY > 0 ? 1 : -1));
  }

  let touchStartX = null, touchStartY = null;
  function onTouchStart(e){
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  }
  function onTouchEnd(e){
    if(touchStartY === null) return;
    const dx = touchStartX - e.changedTouches[0].clientX;
    const dy = touchStartY - e.changedTouches[0].clientY;
    touchStartX = touchStartY = null;
    if(Math.abs(dy) <= Math.abs(dx) || Math.abs(dy) < 10 || animating) return;
    goTo(current + (dy > 0 ? 1 : -1));
  }

  function onKey(e){
    if(['INPUT','TEXTAREA'].includes(document.activeElement.tagName) || animating) return;
    if(e.key === 'ArrowDown' || e.key === 'PageDown'){ e.preventDefault(); goTo(current + 1); }
    else if(e.key === 'ArrowUp' || e.key === 'PageUp'){ e.preventDefault(); goTo(current - 1); }
  }

  window.addEventListener('wheel', onWheel, { passive:false });
  window.addEventListener('touchstart', onTouchStart, { passive:true });
  window.addEventListener('touchend', onTouchEnd, { passive:true });
  window.addEventListener('keydown', onKey);
})();

/* ---------- finale candle + confetti ---------- */
const candleWrap = document.getElementById('candle-wrap');
function blowCandle(){
  if(candleWrap.classList.contains('blown')) return;
  candleWrap.classList.add('blown');
  document.getElementById('final-msg').classList.add('show');
  burstConfetti();
}
candleWrap.addEventListener('click', blowCandle);
candleWrap.addEventListener('keydown', e=>{
  if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); blowCandle(); }
});
function burstConfetti(){
  const layer = document.getElementById('confetti-layer');
  const colors = ['#d9a441','#f2794a','#e8557a','#8ab7e8','#a0e8c9'];
  for(let i=0;i<80;i++){
    const p = document.createElement('div');
    p.className = 'confetti-piece';
    p.style.left = Math.random()*100+'vw';
    p.style.background = colors[Math.floor(Math.random()*colors.length)];
    const duration = 2.2 + Math.random()*1.6;
    const rotate = Math.random()*720 - 360;
    p.style.transition = `transform ${duration}s cubic-bezier(.2,.6,.4,1), opacity ${duration}s ease`;
    layer.appendChild(p);
    requestAnimationFrame(()=>{
      p.style.transform = `translateY(${window.innerHeight+40}px) rotate(${rotate}deg)`;
      p.style.opacity = '0';
    });
    setTimeout(()=> p.remove(), duration*1000+100);
  }
}
