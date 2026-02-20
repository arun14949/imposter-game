import '@knadh/oat/oat.min.css';
import '@knadh/oat/oat.min.js';
import './style.css';
import { WORDS, CATEGORIES } from './words.js';
import { sfxTap, sfxDenied, sfxFlip, sfxRevealWord, sfxPass, sfxStartGame, sfxResults, sfxConfetti, sfxRestart } from './sounds.js';

// ── Game State ──
const state = {
  players: 4,
  imposters: 1,
  category: "Random",
  currentPlayer: 0,
  roles: [],
  secretWord: "",
  cardRevealed: false
};

// ── DOM Helpers ──
const $ = (id) => document.getElementById(id);

// ── Init ──
function init() {
  renderCategories();
  updateStepperUI();
  bindEvents();
}

function bindEvents() {
  $('pMinus').addEventListener('click', () => { sfxTap(); adjustPlayers(-1); });
  $('pPlus').addEventListener('click', () => { sfxTap(); adjustPlayers(1); });
  $('iMinus').addEventListener('click', () => { sfxTap(); adjustImposters(-1); });
  $('iPlus').addEventListener('click', () => { sfxTap(); adjustImposters(1); });

  // Play denied sound when tapping disabled stepper buttons
  document.querySelectorAll('.stepper').forEach(stepper => {
    stepper.addEventListener('click', (e) => {
      const btn = e.target.closest('button');
      if (btn && btn.disabled) sfxDenied();
    });
  });
  $('startBtn').addEventListener('click', startGame);
  $('readyBtn').addEventListener('click', showRevealCard);
  $('flipContainer').addEventListener('click', flipCard);
  $('gotItBtn').addEventListener('click', nextPlayer);
  $('revealImpostersBtn').addEventListener('click', showResults);
  $('newRoundBtn').addEventListener('click', newRound);
  $('playAgainBtn').addEventListener('click', newRound);
  $('changeSettingsBtn').addEventListener('click', backToSetup);
  $('restartPass').addEventListener('click', () => { sfxRestart(); backToSetup(); });
  $('restartReveal').addEventListener('click', () => { sfxRestart(); backToSetup(); });
  $('restartRound').addEventListener('click', () => { sfxRestart(); backToSetup(); });
}

function renderCategories() {
  const grid = $('categoryGrid');
  grid.innerHTML = CATEGORIES.map(c =>
    `<div class="pill ${c === state.category ? 'selected' : ''}" data-category="${c}">${c}</div>`
  ).join('');
  grid.querySelectorAll('.pill').forEach(pill => {
    pill.addEventListener('click', () => {
      sfxTap();
      state.category = pill.dataset.category;
      renderCategories();
    });
  });
}

// ── Steppers ──
function adjustPlayers(delta) {
  state.players = Math.min(12, Math.max(3, state.players + delta));
  if (state.imposters >= state.players) state.imposters = state.players - 1;
  updateStepperUI();
}

function adjustImposters(delta) {
  state.imposters = Math.min(3, Math.max(1, state.imposters + delta));
  if (state.imposters >= state.players) state.imposters = state.players - 1;
  updateStepperUI();
}

function updateStepperUI() {
  $('playerCount').textContent = state.players;
  $('imposterCount').textContent = state.imposters;
  $('pMinus').disabled = state.players <= 3;
  $('pPlus').disabled = state.players >= 12;
  $('iMinus').disabled = state.imposters <= 1;
  $('iPlus').disabled = state.imposters >= 3 || state.imposters >= state.players - 1;
}

// ── Navigation ──
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const screen = $(id);
  screen.classList.add('active');
  if (screen.classList.contains('stagger')) {
    screen.style.animation = 'none';
    screen.offsetHeight;
    screen.style.animation = '';
  }
}

// ── Game Logic ──
function startGame() {
  let pool;
  if (state.category === "Random") {
    pool = Object.values(WORDS).flat();
  } else {
    pool = WORDS[state.category];
  }
  state.secretWord = pool[Math.floor(Math.random() * pool.length)];

  const imposterIndexes = new Set();
  while (imposterIndexes.size < state.imposters) {
    imposterIndexes.add(Math.floor(Math.random() * state.players));
  }
  state.roles = Array.from({ length: state.players }, (_, i) =>
    imposterIndexes.has(i) ? 'imposter' : 'word'
  );

  state.currentPlayer = 0;
  state.cardRevealed = false;
  sfxStartGame();
  showPassScreen();
}

function showPassScreen() {
  updateProgress();
  $('passPlayerNum').textContent = state.currentPlayer + 1;
  showScreen('pass');
  const c = $('passContent');
  c.classList.remove('stagger');
  void c.offsetHeight;
  c.classList.add('stagger');
}

function updateProgress() {
  const pct = ((state.currentPlayer) / state.players) * 100;
  const txt = `Player ${state.currentPlayer + 1} of ${state.players}`;

  [$('revealProgress'), $('revealProgress2')].forEach(el => {
    if (el) el.value = pct;
  });
  [$('progressText'), $('progressText2')].forEach(el => {
    if (el) el.textContent = txt;
  });
}

function showRevealCard() {
  state.cardRevealed = false;
  const flipCardEl = $('flipCard');
  flipCardEl.classList.remove('flipped');

  const role = state.roles[state.currentPlayer];
  const back = $('flipBack');
  const badge = $('cardBadge');
  const word = $('cardWord');
  const sub = $('cardSub');

  back.className = 'flip-face flip-back ' + (role === 'imposter' ? 'imposter-card' : 'word-card');

  if (role === 'imposter') {
    badge.className = 'badge danger mb-4';
    badge.textContent = 'IMPOSTER';
    word.textContent = 'IMPOSTER';
    sub.textContent = "You don't know the word. Blend in!";
  } else {
    badge.className = 'badge success mb-4';
    badge.textContent = 'YOUR WORD';
    word.textContent = state.secretWord;
    sub.textContent = "Remember it. Don't give it away!";
  }

  $('gotItBtn').style.visibility = 'hidden';
  updateProgress();
  showScreen('reveal');
}

function flipCard() {
  const flipEl = $('flipCard');
  sfxFlip();

  if (state.cardRevealed) {
    // Tap again to flip back (hide the word)
    flipEl.classList.toggle('flipped');
    return;
  }

  state.cardRevealed = true;
  flipEl.classList.add('flipped');
  setTimeout(sfxRevealWord, 350);
  setTimeout(() => {
    const btn = $('gotItBtn');
    btn.style.visibility = 'visible';
    btn.textContent = state.currentPlayer < state.players - 1
      ? 'Got it — Pass the phone'
      : 'Got it — Start the round!';
  }, 400);
}

function nextPlayer() {
  sfxPass();
  state.currentPlayer++;
  if (state.currentPlayer >= state.players) {
    showScreen('round');
  } else {
    showPassScreen();
  }
}

function showResults() {
  const list = $('imposterList');
  list.innerHTML = state.roles
    .map((r, i) => r === 'imposter'
      ? `<span class="badge danger" style="font-size: var(--text-6); padding: var(--space-2) var(--space-4); animation: fadeUp 0.5s ${i * 0.1}s cubic-bezier(0.16,1,0.3,1) backwards">🔴 Player ${i + 1}</span>`
      : '')
    .filter(Boolean)
    .join('');

  $('secretWordReveal').textContent = state.secretWord;
  showScreen('result');
  sfxResults();
  spawnConfetti();
  setTimeout(sfxConfetti, 500);
}

function newRound() {
  startGame();
}

function backToSetup() {
  showScreen('setup');
}

// ── Confetti ──
function spawnConfetti() {
  const container = $('confetti');
  container.innerHTML = '';
  const colors = ['#CDFF50', '#FF3C6F', '#3CF0FF', '#FFD93D', '#FF6B6B', '#C084FC'];
  for (let i = 0; i < 60; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.left = Math.random() * 100 + '%';
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.width = (6 + Math.random() * 8) + 'px';
    piece.style.height = (6 + Math.random() * 8) + 'px';
    piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
    piece.style.setProperty('--drift', (Math.random() * 200 - 100) + 'px');
    piece.style.animationDuration = (2 + Math.random() * 2) + 's';
    piece.style.animationDelay = Math.random() * 0.8 + 's';
    piece.style.opacity = 0.8 + Math.random() * 0.2;
    container.appendChild(piece);
  }
  setTimeout(() => container.innerHTML = '', 5000);
}

// ── Prevent iOS double-tap zoom ──
let lastTap = 0;
document.addEventListener('touchend', (e) => {
  const now = Date.now();
  if (now - lastTap < 300) {
    e.preventDefault();
  }
  lastTap = now;
}, { passive: false });

// Prevent pinch zoom
document.addEventListener('gesturestart', (e) => e.preventDefault(), { passive: false });
document.addEventListener('gesturechange', (e) => e.preventDefault(), { passive: false });
document.addEventListener('gestureend', (e) => e.preventDefault(), { passive: false });

// ── Boot ──
init();
