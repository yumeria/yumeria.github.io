function showPopup(type) {
  var popup = document.getElementById('popup');
  var title = document.getElementById('popupTitle');
  var text = document.getElementById('popupText');
  var gbArea = document.getElementById('guestbookArea');
  var okBtn = document.getElementById('popupOK');
  var msgs = {
    info: ['SYSTEM OVERFLOW: TSUNDERE DETECTED',
      'Yumeria is a masked tsundere who posts kigurumi and cosplay photos.<br>She also plays with AI art and codes sometimes.<br><br>Why are you reading this? Go follow her already, baka!'],
    webring: ['WEBRING',
      '&#x25C0; PREV | <a href="#" onclick="closePopup(); return false;" style="color:#0f0;">RANDOM</a> | NEXT &#x25B6;<br><br>You found the secret webring!<br><span style="font-size:10px; color:#888;">(there are like 3 of us)</span>'],
    credits: ['CREDITS',
      'Site by: YUMERIA (with Notepad.exe, like a real dev)<br>Photos: YUMERIA<br>Hosted on: GeoCities<br><br>Thanks for visiting, I guess. &#x2665;']
  };
  if (type === 'guestbook') {
    gbArea.style.display = 'block';
    text.style.display = 'none';
    okBtn.style.display = 'none';
    title.textContent = '&#x1F4DD; GUESTBOOK - SIGN IT!!';
    renderGuestbook(gbArea);
  } else {
    gbArea.style.display = 'none';
    text.style.display = 'block';
    okBtn.style.display = 'inline-block';
    var m = msgs[type] || ['ERROR', 'You broke it. Congrats.'];
    title.textContent = m[0];
    text.innerHTML = m[1];
  }
  popup.classList.add('show');
}

function renderGuestbook(container) {
  var html = '';
  var entries = JSON.parse(localStorage.getItem('yumeria_guestbook') || '[]');
  if (entries.length === 0) {
    html += '<div class="gb-empty">No one has signed yet...<br>Be the first baka to leave a message!!</div>';
  } else {
    for (var i = entries.length - 1; i >= 0; i--) {
      var e = entries[i];
      html += '<div class="gb-entry"><div class="head">&#x2665; ' + e.name + ' <span style="color:#555;">(' + e.date + ')</span></div><div class="body">' + e.msg + '</div></div>';
    }
  }
  html += '<div class="gb-form"><input type="text" id="gbName" placeholder="Your name, baka..." maxlength="30"><br><input type="text" id="gbMsg" placeholder="Write your message..." maxlength="200" style="margin-top:4px;"><br><button onclick="submitGuestbook()">&#x270F; Sign Guestbook!!</button></div>';
  container.innerHTML = html;
}

function submitGuestbook() {
  var name = document.getElementById('gbName').value.trim() || 'Anonymous Baka';
  var msg = document.getElementById('gbMsg').value.trim();
  if (!msg) { alert('You have to write something, dummy!!'); return; }
  var entries = JSON.parse(localStorage.getItem('yumeria_guestbook') || '[]');
  var now = new Date();
  var date = now.getFullYear() + '-' + String(now.getMonth()+1).padStart(2,'0') + '-' + String(now.getDate()).padStart(2,'0');
  entries.push({name: name, msg: msg, date: date});
  localStorage.setItem('yumeria_guestbook', JSON.stringify(entries));
  renderGuestbook(document.getElementById('guestbookArea'));
}

function closePopup() {
  if (soundGatePending) { enableSound(); soundGatePending = false; }
  document.getElementById('popup').classList.remove('show');
}
document.getElementById('popup').addEventListener('click', function(e) { if (e.target === this) closePopup(); });

document.addEventListener('contextmenu', function(e) {
  e.preventDefault();
  document.getElementById('popupTitle').textContent = '&#x26A0; ACCESS DENIED, BAKA &#x26A0;';
  document.getElementById('popupText').innerHTML = '<span class="big">&#x1F4A2;</span>H-hey!! What do you think you\'re doing?!<br><br>Right-clicking is forbidden!!<br>This is <strong style="color:#ff69b4;">M Y</strong> site!!<br><br>If you want to save something, just ask!!<br>...not that I\'d let you, baka!! &#x2665;';
  document.getElementById('guestbookArea').style.display = 'none';
  document.getElementById('popupText').style.display = 'block';
  document.getElementById('popupOK').style.display = 'inline-block';
  document.getElementById('popup').classList.add('show');
});

window.onbeforeunload = function() {
  return 'Leaving already? ...I knew you would, baka.';
};

document.addEventListener('mousemove', function(e) {
  if (Math.random() > 0.55) return;
  var el = document.createElement('div');
  var chars = ['&#x2728;', '&#x26A1;', '&#x2B50;', '&#x2665;', '0', '1', '&gt;', '&#x2605;'];
  el.innerHTML = chars[Math.floor(Math.random() * chars.length)];
  el.style.cssText = 'position:fixed;left:'+e.clientX+'px;top:'+e.clientY+'px;font-size:'+(10+Math.random()*10)+'px;color:'+['#0f0','#f0f','#0ff','#ff0','#f00','#ff69b4'][Math.floor(Math.random()*6)]+';pointer-events:none;z-index:99999;opacity:1;transition:all 0.8s ease-out;transform:translateY(0);font-weight:bold;';
  document.body.appendChild(el);
  setTimeout(function() { el.style.opacity = '0'; el.style.transform = 'translateY(-25px)'; setTimeout(function() { el.remove(); }, 800); }, 50);
});

// ===== MATRIX RAIN =====
function initMatrix() {
  var c = document.getElementById('matrix');
  if (!c) return;
  var ctx = c.getContext('2d');
  var parent = c.parentElement;
  function resize() { c.width = parent.offsetWidth; c.height = parent.offsetHeight; }
  resize();
  window.addEventListener('resize', resize);
  var chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789';
  var fontSize = 10;
  var cols = Math.floor(c.width / fontSize);
  var drops = [];
  for (var i = 0; i < cols; i++) drops[i] = Math.floor(Math.random() * -c.height / fontSize);
  function draw() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, c.width, c.height);
    ctx.fillStyle = '#0f0';
    ctx.font = fontSize + 'px monospace';
    for (var i = 0; i < cols; i++) {
      var ch = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillStyle = Math.random() > 0.95 ? '#fff' : '#0f0';
      ctx.fillText(ch, i * fontSize, drops[i] * fontSize);
      if (drops[i] * fontSize > c.height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    }
  }
  setInterval(draw, 60);
}

// ===== STAR RATING =====
function initStars() {
  var container = document.getElementById('starRating');
  if (!container) return;
  var saved = parseInt(localStorage.getItem('yumeria_rating') || '0');
  var spans = container.querySelectorAll('span[data-v]');
  function highlight(n) {
    for (var i = 0; i < spans.length; i++) {
      spans[i].classList.toggle('on', i < n);
      spans[i].innerHTML = i < n ? '&#x2605;' : '&#x2606;';
    }
  }
  highlight(saved);
  for (var i = 0; i < spans.length; i++) {
    (function(idx) {
      spans[idx].addEventListener('click', function() {
        var v = parseInt(this.getAttribute('data-v'));
        localStorage.setItem('yumeria_rating', v);
        highlight(v);
      });
    })(i);
  }
}

// ===== AIM BUDDY MESSAGES =====
var aimMsgs = [
  'Online... not that I care if you notice!!',
  '&#x2665; Status: Tsundere &#x2665;',
  'Away: don\'t miss me too much, baka',
  '&#x2728; vibing... do not disturb &#x2728;',
  'BRB, being cute elsewhere',
  'Currently: ignoring you with love &#x2665;',
  'Busy breaking hearts and compiling code',
  'Online but pretending not to see you'
];

// ===== RANDOM BOOT MESSAGES =====
var bootMsgs = [
  'Ugh. YOU again?? ...Fine. System loading.',
  'It\'s not like I waited for you to visit, baka!!',
  'Loading... loading... oh it\'s YOU. Great.',
  'System: ONLINE. Patience: DEPLETED. Visitor: ANNOYING.',
  'ERROR: Cuteness levels exceeding max capacity!!',
  'Connection established. Annoyance rising. Welcome, I guess.',
  'Initializing tsundere protocols... WHY am I bothering for YOU?!',
  'Booting... It\'s not like I made this site for you!! ...n-not at all!!',
  'You again?! Fine. Whatever. System ready.',
  '&#x26A0; BAKA DETECTED IN AREA &#x26A0; Proceeding with excessive cuteness anyway.'
];

document.addEventListener('DOMContentLoaded', function() {
  // randomize images
  document.querySelectorAll('img[data-random]').forEach(function(img) {
    var n = Math.floor(Math.random() * 38);
    img.src = 'model/model_' + n + '.png';
  });

  // random boot message
  var boot = document.querySelector('.boot');
  if (boot) {
    var msg = bootMsgs[Math.floor(Math.random() * bootMsgs.length)];
    var tmp = document.createElement('div');
    tmp.innerHTML = msg;
    var plain = tmp.textContent;
    boot.innerHTML = '<span style="color:#888;">[BOOT]</span> ';
    var ci = 0;
    function typeBoot() {
      if (ci < plain.length) {
        boot.appendChild(document.createTextNode(plain[ci]));
        ci++;
        setTimeout(typeBoot, 12 + Math.random() * 20);
      } else {
        var cur = document.createElement('span');
        cur.className = 'blink';
        cur.innerHTML = '&#x2588;';
        boot.appendChild(cur);
      }
    }
    setTimeout(typeBoot, 300);
  }

  // matrix rain
  initMatrix();

  // star rating
  initStars();

  // AIM buddy rotating messages
  var aimMsg = document.getElementById('aimMsg');
  if (aimMsg) {
    var idx = 0;
    setInterval(function() {
      idx = (idx + 1) % aimMsgs.length;
      aimMsg.innerHTML = aimMsgs[idx];
    }, 8000);
  }

  // init local background music (muted autostart) + show cringe error popup on load
  initAudio();
  showSoundGate();
});

// ===== BACKGROUND MUSIC (local mp3) =====
var audioEl = null;
var musicReady = false;
var musicPlaying = false;
var soundGatePending = false;
var songTitle = 'Promise - Kohmi Hirose';
// saved state: 'auto' | 'playing' | 'muted' | 'paused'
var savedMusicState = (function() {
  try { return localStorage.getItem('yumeria_music') || 'auto'; } catch (e) { return 'auto'; }
})();
var savedVol = (function() {
  try { var v = parseFloat(localStorage.getItem('yumeria_vol')); return isNaN(v) ? 0.5 : Math.max(0, Math.min(1, v)); } catch (e) { return 0.5; }
})();

function saveMusicState(s) {
  savedMusicState = s;
  try { localStorage.setItem('yumeria_music', s); } catch (e) {}
}

function initAudio() {
  audioEl = new Audio('audio/getdown.mp3');
  audioEl.loop = true;
  audioEl.preload = 'auto';
  audioEl.volume = savedVol;
  audioEl.addEventListener('play', function() { musicPlaying = true; });
  audioEl.addEventListener('pause', function() { musicPlaying = false; });
  audioEl.addEventListener('canplay', function() {
    musicReady = true;
    if (savedMusicState === 'paused') {
      audioEl.pause();
      setMusicUI(false, false);
    } else {
      audioEl.muted = true;
      audioEl.play().catch(function() {});
      setMusicUI(true, true);
    }
  });
  audioEl.load();

  // volume slider
  var slider = document.getElementById('volSlider');
  if (slider) {
    slider.value = savedVol;
    slider.addEventListener('input', function() {
      audioEl.volume = parseFloat(this.value);
      if (audioEl.muted && audioEl.volume > 0) {
        audioEl.muted = false;
        setMusicUI(true, false);
      }
      try { localStorage.setItem('yumeria_vol', this.value); } catch (e) {}
    });
  }

  // toggle music on play button click
  document.getElementById('playBtn').addEventListener('click', function(e) {
    e.stopPropagation();
    toggleMusic();
  });

  // fallback: enable sound on first user gesture
  var enable = function() {
    enableSound();
    document.removeEventListener('click', enable);
    document.removeEventListener('keydown', enable);
    document.removeEventListener('scroll', enable);
  };
  document.addEventListener('click', enable);
  document.addEventListener('keydown', enable);
  document.addEventListener('scroll', enable);
}

function setMusicUI(playing, muted) {
  var ctrl = document.getElementById('musicCtrl');
  var btn = document.getElementById('playBtn');
  var txt = document.getElementById('musicTxt');
  if (!ctrl) return;
  if (!musicReady) { txt.textContent = 'LOADING...'; return; }
  if (playing) {
    ctrl.classList.remove('paused');
    btn.innerHTML = muted ? '&#x1F507;' : '&#x23F8;';
    txt.textContent = muted ? (songTitle + ' (muted)') : ('♪ ' + songTitle + ' ♪');
  } else {
    ctrl.classList.add('paused');
    btn.innerHTML = '&#x25B6;';
    txt.textContent = 'PAUSED: ' + songTitle;
  }
}

function toggleMusic() {
  if (!audioEl) return;
  if (musicPlaying) {
    if (audioEl.muted) {
      // currently muted but playing -> unmute instead of pausing
      audioEl.muted = false;
      setMusicUI(true, false);
      saveMusicState('playing');
    } else {
      audioEl.pause();
      setMusicUI(false, false);
      saveMusicState('paused');
    }
  } else {
    audioEl.play();
    audioEl.muted = false;
    setMusicUI(true, false);
    saveMusicState('playing');
  }
}

function enableSound() {
  if (!audioEl || !musicReady) return;
  if (savedMusicState === 'paused') return; // don't restart a song the user stopped
  try {
    audioEl.play();
    audioEl.muted = (savedMusicState === 'muted'); // keep muted if that's what they had
    setMusicUI(true, audioEl.muted);
    saveMusicState(audioEl.muted ? 'muted' : 'playing');
  } catch (e) {}
}

function showSoundGate() {
  var popup = document.getElementById('popup');
  var title = document.getElementById('popupTitle');
  var text = document.getElementById('popupText');
  var gb = document.getElementById('guestbookArea');
  var ok = document.getElementById('popupOK');
  gb.style.display = 'none';
  text.style.display = 'block';
  ok.style.display = 'inline-block';
  title.textContent = '⚠ BAKA INTRUSION DETECTED ⚠';
  if (savedMusicState === 'paused') {
    // remembered the user stopped the song -> funny "you killed my song" joke, do NOT restart
    text.innerHTML = '<span class="big">&#x1F480;</span>H-hey!! I REMEMBER you stopped my song last time, you heartless baka!! &#x1F480;<br><br>Do you have ANY idea how long I spent picking <strong style="color:#ff69b4;">"Promise" by Kohmi Hirose</strong>?? And you just... turned it OFF. Cruel!!<br><br>I\'m NOT starting it again just because you showed up. Sign the guestbook and scram!!<br><br><span style="color:#888;">(click OK if you must... I won\'t be happy about it)</span>';
  } else {
    text.innerHTML = '<span class="big">&#x1F4A2;</span>H-hey!! My system detected a BAKA trying to visit without signing the guestbook!!<br><br>Click <strong style="color:#ff69b4;">OK</strong> to acknowledge, dummy!!<br><br><span style="color:#888;">(you better sign it later, baka)</span>';
  }
  soundGatePending = true;
  popup.classList.add('show');
}
