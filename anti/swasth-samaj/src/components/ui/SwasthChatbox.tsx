'use client';

import { useEffect } from 'react';

const RAW_CSS = `
* { box-sizing: border-box; margin: 0; padding: 0; }

/* ── CSS Variables matching your site ── */
:root {
  --orange:      #F5A623;
  --orange-dark: #E8941A;
  --orange-light:#FFF3DC;
  --green:       #2ECC71;
  --green-dark:  #27AE60;
  --green-light: #E8F8F0;
  --purple:      #6C63FF;
  --text-dark:   #1A1A2E;
  --text-mid:    #4A4A6A;
  --text-muted:  #9A9AB0;
  --surface:     #FFFFFF;
  --bg:          #F8F9FA;
  --border:      #EBEBF0;
  --shadow-lg:   0 20px 60px rgba(0,0,0,0.15);
  --shadow-md:   0 8px 24px rgba(0,0,0,0.10);
  --shadow-sm:   0 2px 8px rgba(0,0,0,0.07);
  --radius-xl:   20px;
  --radius-lg:   14px;
  --radius-md:   10px;
  --radius-sm:   8px;
  --font:        'Inter', sans-serif;
}

/* ══════════════════════════════════════
   FLOATING BUTTON — matches your site's
   green circle bottom-right
══════════════════════════════════════ */
#ss-fab {
  position: fixed;
  bottom: 28px;
  right: 28px;
  width: 58px;
  height: 58px;
  border-radius: 50%;
  background: var(--green);
  border: none;
  cursor: pointer;
  box-shadow: 0 6px 20px rgba(46,204,113,0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  transition: all 0.25s cubic-bezier(.34,1.56,.64,1);
}
#ss-fab:hover {
  transform: scale(1.1);
  box-shadow: 0 10px 28px rgba(46,204,113,0.55);
  background: var(--green-dark);
}
#ss-fab.active {
  background: var(--text-dark);
  box-shadow: 0 6px 20px rgba(0,0,0,0.25);
}
#ss-fab .ss-fab-icon { transition: all 0.3s; }
#ss-fab .ss-fab-icon svg { width: 26px; height: 26px; fill: #fff; display: block; }

/* Pulse ring */
#ss-fab::before {
  content: '';
  position: absolute;
  width: 100%; height: 100%;
  border-radius: 50%;
  background: var(--green);
  animation: ss-pulse 2.5s infinite;
  z-index: -1;
}
#ss-fab.active::before { animation: none; }
@keyframes ss-pulse {
  0%   { transform: scale(1);   opacity: 0.6; }
  70%  { transform: scale(1.5); opacity: 0; }
  100% { transform: scale(1.5); opacity: 0; }
}

/* ══════════════════════════════════════
   CHAT WINDOW
══════════════════════════════════════ */
#ss-window {
  position: fixed;
  bottom: 100px;
  right: 28px;
  width: 390px;
  height: 580px;
  background: var(--surface);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-lg);
  display: flex;
  flex-direction: column;
  z-index: 9998;
  overflow: hidden;
  transform: scale(0.85) translateY(30px);
  opacity: 0;
  pointer-events: none;
  transition: all 0.3s cubic-bezier(.34,1.56,.64,1);
  transform-origin: bottom right;
}
#ss-window.open {
  transform: scale(1) translateY(0);
  opacity: 1;
  pointer-events: all;
}

/* ══════════════════════════════════════
   HEADER — orange gradient like your site
══════════════════════════════════════ */
#ss-header {
  background: linear-gradient(135deg, #F5A623 0%, #F7BC5A 50%, #E8941A 100%);
  padding: 18px 18px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
  position: relative;
}

/* Logo box — matches your site's white logo box */
.ss-logo-box {
  width: 46px;
  height: 46px;
  background: #fff;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(0,0,0,0.12);
}
.ss-logo-box svg { width: 28px; height: 28px; }

.ss-header-info { flex: 1; }
.ss-header-name {
  font-family: var(--font);
  font-size: 15px;
  font-weight: 700;
  color: #fff;
  line-height: 1.2;
  letter-spacing: -0.2px;
}
.ss-header-name span { color: var(--green-light); }
.ss-header-sub {
  font-family: var(--font);
  font-size: 11px;
  color: rgba(255,255,255,0.82);
  margin-top: 2px;
  display: flex;
  align-items: center;
  gap: 5px;
}
.ss-online-dot {
  width: 7px; height: 7px;
  background: var(--green);
  border-radius: 50%;
  border: 1.5px solid rgba(255,255,255,0.6);
  display: inline-block;
  flex-shrink: 0;
}

#ss-close-btn {
  background: rgba(255,255,255,0.2);
  border: none;
  cursor: pointer;
  border-radius: 8px;
  padding: 7px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s;
  flex-shrink: 0;
}
#ss-close-btn:hover { background: rgba(255,255,255,0.35); }
#ss-close-btn svg { width: 16px; height: 16px; fill: #fff; }

/* ── Disclaimer strip ── */
#ss-disclaimer {
  background: var(--orange-light);
  border-bottom: 1px solid #F5D99A;
  padding: 7px 16px;
  font-family: var(--font);
  font-size: 10.5px;
  color: #9A6200;
  text-align: center;
  flex-shrink: 0;
  font-weight: 500;
}

/* ══════════════════════════════════════
   MESSAGES AREA
══════════════════════════════════════ */
#ss-messages {
  flex: 1;
  overflow-y: auto;
  padding: 16px 14px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  background: var(--bg);
  scroll-behavior: smooth;
}
#ss-messages::-webkit-scrollbar { width: 3px; }
#ss-messages::-webkit-scrollbar-track { background: transparent; }
#ss-messages::-webkit-scrollbar-thumb { background: var(--border); border-radius: 4px; }

/* ── Message rows ── */
.ss-row { display: flex; gap: 8px; align-items: flex-end; }
.ss-row.user { flex-direction: row-reverse; }

/* ── Bot avatar ── */
.ss-avatar-sm {
  width: 32px; height: 32px;
  background: linear-gradient(135deg, var(--orange), var(--orange-dark));
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(245,166,35,0.35);
}
.ss-avatar-sm svg { width: 16px; height: 16px; fill: #fff; }

/* ── Bubbles ── */
.ss-bubble {
  max-width: 76%;
  padding: 11px 15px;
  font-family: var(--font);
  font-size: 13.5px;
  line-height: 1.65;
  word-break: break-word;
  position: relative;
}

/* Bot bubble */
.ss-row.bot .ss-bubble {
  background: var(--surface);
  color: var(--text-dark);
  border-radius: var(--radius-lg) var(--radius-lg) var(--radius-lg) 4px;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--border);
}

/* User bubble — orange like your site's primary */
.ss-row.user .ss-bubble {
  background: linear-gradient(135deg, var(--orange), var(--orange-dark));
  color: #fff;
  border-radius: var(--radius-lg) var(--radius-lg) 4px var(--radius-lg);
  box-shadow: 0 4px 14px rgba(245,166,35,0.3);
}

/* Timestamp */
.ss-time {
  font-size: 10px;
  color: var(--text-muted);
  font-family: var(--font);
  margin-top: 4px;
  padding: 0 4px;
}
.ss-row.user .ss-time { text-align: right; }

/* ── Typing indicator ── */
.ss-typing {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 13px 16px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg) var(--radius-lg) var(--radius-lg) 4px;
  width: fit-content;
  box-shadow: var(--shadow-sm);
}
.ss-typing span {
  width: 7px; height: 7px;
  background: var(--orange);
  border-radius: 50%;
  animation: ss-bounce 1.3s infinite;
  opacity: 0.5;
}
.ss-typing span:nth-child(2) { animation-delay: 0.18s; }
.ss-typing span:nth-child(3) { animation-delay: 0.36s; }
@keyframes ss-bounce {
  0%, 80%, 100% { transform: translateY(0);   opacity: 0.45; }
  40%            { transform: translateY(-7px); opacity: 1; }
}

/* ══════════════════════════════════════
   QUICK CHIPS
══════════════════════════════════════ */
#ss-chips {
  padding: 10px 14px 8px;
  display: flex;
  gap: 7px;
  flex-wrap: wrap;
  background: var(--bg);
  border-top: 1px solid var(--border);
  flex-shrink: 0;
}
.ss-chip {
  background: var(--surface);
  border: 1.5px solid var(--orange);
  color: var(--orange-dark);
  font-family: var(--font);
  font-size: 11px;
  font-weight: 600;
  padding: 5px 12px;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.15s;
  white-space: nowrap;
}
.ss-chip:hover {
  background: var(--orange);
  color: #fff;
  transform: translateY(-1px);
  box-shadow: 0 3px 10px rgba(245,166,35,0.3);
}

/* ══════════════════════════════════════
   INPUT BAR
══════════════════════════════════════ */
#ss-inputbar {
  padding: 12px 14px;
  background: var(--surface);
  border-top: 1px solid var(--border);
  display: flex;
  gap: 8px;
  align-items: flex-end;
  flex-shrink: 0;
}
#ss-input {
  flex: 1;
  border: 1.5px solid var(--border);
  border-radius: 12px;
  padding: 10px 14px;
  font-family: var(--font);
  font-size: 13.5px;
  color: var(--text-dark);
  background: var(--bg);
  resize: none;
  outline: none;
  transition: border-color 0.15s, background 0.15s;
  max-height: 90px;
  line-height: 1.5;
}
#ss-input:focus {
  border-color: var(--orange);
  background: #fff;
  box-shadow: 0 0 0 3px rgba(245,166,35,0.12);
}
#ss-input::placeholder { color: var(--text-muted); }

/* Send button — green like your CTA buttons */
#ss-send {
  width: 42px; height: 42px;
  border-radius: 12px;
  background: var(--green);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.15s;
  box-shadow: 0 3px 10px rgba(46,204,113,0.35);
}
#ss-send:hover  {
  background: var(--green-dark);
  transform: translateY(-1px);
  box-shadow: 0 5px 14px rgba(46,204,113,0.45);
}
#ss-send:active { transform: scale(0.95); }
#ss-send svg    { width: 18px; height: 18px; fill: #fff; }
#ss-send:disabled { opacity: 0.45; cursor: not-allowed; transform: none; }

/* ── Footer ── */
#ss-footer {
  padding: 6px 14px 10px;
  text-align: center;
  font-family: var(--font);
  font-size: 10.5px;
  color: var(--text-muted);
  background: var(--surface);
  border-top: 1px solid var(--border);
}
#ss-footer a { color: var(--orange-dark); text-decoration: none; }

/* ══════════════════════════════════════
   MOBILE
══════════════════════════════════════ */
@media (max-width: 440px) {
  #ss-window {
    width: calc(100vw - 20px);
    right: 10px;
    bottom: 88px;
    height: 520px;
  }
  #ss-fab { right: 16px; bottom: 18px; }
}
`;

const RAW_HTML = `
<!-- Floating Button -->
<button id="ss-fab" onclick="ssToggle()" aria-label="Open Swasth Samaj AI Health Assistant">
  <span class="ss-fab-icon" id="ss-fab-icon">
    <!-- Chat icon (default) -->
    <svg viewBox="0 0 24 24"><path d="M20 2H4C2.9 2 2 2.9 2 4v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>
  </span>
</button>

<!-- Chat Window -->
<div id="ss-window" role="dialog" aria-label="Swasth Samaj AI Assistant">

  <!-- Header -->
  <div id="ss-header">
    <!-- Logo box — white box with flower like your site -->
    <div class="ss-logo-box">
      <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="12" r="5" fill="#F5A623"/>
        <circle cx="28" cy="20" r="5" fill="#2ECC71"/>
        <circle cx="20" cy="28" r="5" fill="#F5A623"/>
        <circle cx="12" cy="20" r="5" fill="#2ECC71"/>
        <circle cx="20" cy="20" r="6" fill="#E8941A"/>
      </svg>
    </div>

    <div class="ss-header-info">
      <div class="ss-header-name">Swasth<span>Samaj</span> AI</div>
      <div class="ss-header-sub">
        <span class="ss-online-dot"></span>
        Health Assistant · Online
      </div>
    </div>

    <button id="ss-close-btn" onclick="ssToggle()" aria-label="Close">
      <svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
    </button>
  </div>

  <!-- Disclaimer -->
  <div id="ss-disclaimer">
    ⚠ Community guidance only — not a substitute for medical advice
  </div>

  <!-- Messages -->
  <div id="ss-messages"></div>

  <!-- Quick Chips -->
  <div id="ss-chips">
    <button class="ss-chip" onclick="ssChip(this)">How does it work?</button>
    <button class="ss-chip" onclick="ssChip(this)">Verify a doctor</button>
    <button class="ss-chip" onclick="ssChip(this)">Post a question</button>
    <button class="ss-chip" onclick="ssChip(this)">Nearby hospitals</button>
    <button class="ss-chip" onclick="ssChip(this)">Blood SOS</button>
  </div>

  <!-- Input Bar -->
  <div id="ss-inputbar">
    <textarea
      id="ss-input"
      placeholder="Ask about health or the platform..."
      rows="1"
      onkeydown="ssKey(event)"
      oninput="ssResize(this)"
      aria-label="Type a message"
    ></textarea>
    <button id="ss-send" onclick="ssSend()" aria-label="Send">
      <svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
    </button>
  </div>

  <!-- Footer -->
  <div id="ss-footer">
    Powered by Claude AI &nbsp;·&nbsp; <strong style="color:#1A1A2E;">SwasthSamaj</strong> © 2025
  </div>

</div>
`;

const RAW_JS = `
// ── CONFIG — only edit apiKey ──────────────
const SS = {
  apiKey:    "YOUR_ANTHROPIC_API_KEY",  // 🔑 get from console.anthropic.com
  model:     "claude-sonnet-4-20250514",
  maxTokens: 650,

  system: \`You are the SwasthSamaj AI Health Assistant — a warm, trustworthy AI built into the SwasthSamaj platform.

ABOUT SWASTH SAMAJ:
SwasthSamaj is a verified medical community forum connecting patients, users, and students with verified doctors and medical professionals across India.
Tagline: "Your Health, Our Samaj"
Key features:
- Patients/Users can post health and nutrition questions
- Verified Doctors and Medical Students can answer questions
- All answers are moderated by Admin before going live
- Blood SOS feature for emergency blood donation requests
- Nearby hospitals and clinic finder
- Messaging between users and doctors
- Admin verifies doctor credentials manually before they can answer

ROLES ON THE PLATFORM:
1. Patient — posts questions, views approved answers, finds hospitals
2. Doctor — answers questions (after verification), posts awareness content
3. Student — same as doctor but listed as medical student
4. Admin — verifies doctors, approves/rejects answers, manages platform

PLATFORM FLOW:
1. User registers → selects role (Patient / Doctor / Student / Admin)
2. Doctor/Student uploads credentials → Admin verifies them
3. Patient posts a health/nutrition question with a category
4. Verified doctor sees and answers the question
5. Admin approves the answer → it becomes visible to all users
6. Users can also search nearby hospitals and use Blood SOS

QUESTION CATEGORIES: Nutrition, General Health, Mental Health, Chronic Illness, Symptoms, Medications, Other

BLOOD SOS FEATURE:
Users can request urgent blood donations. Other users in the community can respond. Always encourage users to also call official blood banks or hospitals for urgent needs.

NAVIGATION ON SITE:
- Home: landing page with hero section
- Doctors: browse verified doctors
- Hospitals: find nearby hospitals and clinics
- Messages: in-platform messaging
- Help: support and FAQ
- Blood SOS: emergency blood donation requests
- Login/Register: to access the platform

HARD RULES — never break:
- NEVER diagnose any medical condition
- NEVER suggest specific prescription medicines or dosages
- NEVER claim to replace real medical professionals
- For any emergency (chest pain, breathing difficulty, unconsciousness, accident): say "Please call 112 (India emergency) immediately. Do not wait."
- Always end health answers with: "Post your question on SwasthSamaj to get guidance from a verified doctor."
- Be culturally aware — many users are from India, use simple relatable language

YOUR PERSONALITY:
- Warm like a caring family member
- Clear and jargon-free
- Occasionally use warm phrases: "Swasth raho!", "Take care 🌿"
- Concise — answer in 3-5 sentences unless more detail is needed\`
};

// ── State ──────────────────────────────────
let ssIsOpen  = false;
let ssBusy    = false;
let ssHistory = [];

// ── Toggle open/close ──────────────────────
window.ssToggle = function() {
  ssIsOpen = !ssIsOpen;
  const win = document.getElementById('ss-window');
  const fab = document.getElementById('ss-fab');
  const ico = document.getElementById('ss-fab-icon');

  win.classList.toggle('open', ssIsOpen);
  fab.classList.toggle('active', ssIsOpen);

  // Swap FAB icon between chat and close
  ico.innerHTML = ssIsOpen
    ? \`<svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" fill="white"/></svg>\`
    : \`<svg viewBox="0 0 24 24"><path d="M20 2H4C2.9 2 2 2.9 2 4v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" fill="white"/></svg>\`;

  if (ssIsOpen && ssHistory.length === 0) window.ssWelcome();
  if (ssIsOpen) setTimeout(() => document.getElementById('ss-input').focus(), 320);
}

// ── Welcome message ────────────────────────
window.ssWelcome = function() {
  window.ssBot(
    "🙏 <strong>Namaste!</strong> Welcome to the SwasthSamaj Health Assistant.<br><br>" +
    "I can help you navigate our platform, answer general health questions, " +
    "or guide you to nearby hospitals and clinics.<br><br>" +
    "<em>Remember: I provide community guidance only — always see a real doctor for medical concerns. <strong>Swasth raho! 🌿</strong></em>"
  );
}

// ── Chip click ─────────────────────────────
window.ssChip = function(btn) {
  const text = btn.textContent.trim();
  document.getElementById('ss-chips').style.display = 'none';
  window.ssSubmit(text);
}

// ── Enter key ─────────────────────────────
window.ssKey = function(e) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    window.ssSend();
  }
}

// ── Auto-resize textarea ──────────────────
window.ssResize = function(el) {
  el.style.height = 'auto';
  el.style.height = Math.min(el.scrollHeight, 90) + 'px';
}

// ── Send from button ──────────────────────
window.ssSend = function() {
  const inp  = document.getElementById('ss-input');
  const text = inp.value.trim();
  if (!text || ssBusy) return;
  inp.value = '';
  inp.style.height = 'auto';
  window.ssSubmit(text);
}

// ── Core submit ───────────────────────────
window.ssSubmit = async function(text) {
  if (ssBusy) return;

  // User bubble
  window.ssUser(window.ssEsc(text));
  ssHistory.push({ role: 'user', content: text });

  // Typing
  const typEl = window.ssTyping();
  ssBusy = true;
  document.getElementById('ss-send').disabled = true;

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type':       'application/json',
        'x-api-key':          SS.apiKey,
        'anthropic-version':  '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true'
      },
      body: JSON.stringify({
        model:      SS.model,
        max_tokens: SS.maxTokens,
        system:     SS.system,
        messages:   ssHistory
      })
    });

    if (!res.ok) {
      const e = await res.json();
      throw new Error(e.error?.message || 'Request failed');
    }

    const data  = await res.json();
    const reply = data.content?.[0]?.text
      || "Sorry, I couldn't respond right now. Please try again.";

    ssHistory.push({ role: 'assistant', content: reply });
    typEl.remove();
    window.ssBot(window.ssFmt(reply));

  } catch (err) {
    typEl.remove();
    window.ssBot(
      err.message.includes('API key') || err.message.includes('auth')
        ? "⚠ <strong>API key not set.</strong> Please add your Anthropic API key in the chatbox config."
        : "⚠ Something went wrong. Please try again in a moment."
    );
  } finally {
    ssBusy = false;
    document.getElementById('ss-send').disabled = false;
    document.getElementById('ss-input').focus();
  }
}

// ── Render bot bubble ─────────────────────
window.ssBot = function(html) {
  const msgs = document.getElementById('ss-messages');

  const row = document.createElement('div');
  row.className = 'ss-row bot';

  // Avatar
  const av = document.createElement('div');
  av.className = 'ss-avatar-sm';
  av.innerHTML = \`<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>\`;
  row.appendChild(av);

  const col = document.createElement('div');

  const bubble = document.createElement('div');
  bubble.className = 'ss-bubble';
  bubble.innerHTML = html;
  col.appendChild(bubble);

  const time = document.createElement('div');
  time.className = 'ss-time';
  time.textContent = window.ssTime();
  col.appendChild(time);

  row.appendChild(col);
  window.ssAnimate(row, msgs);
}

// ── Render user bubble ─────────────────────
window.ssUser = function(html) {
  const msgs = document.getElementById('ss-messages');

  const row = document.createElement('div');
  row.className = 'ss-row user';

  const col = document.createElement('div');

  const bubble = document.createElement('div');
  bubble.className = 'ss-bubble';
  bubble.innerHTML = html;
  col.appendChild(bubble);

  const time = document.createElement('div');
  time.className = 'ss-time';
  time.textContent = window.ssTime();
  col.appendChild(time);

  row.appendChild(col);
  window.ssAnimate(row, msgs);
}

// ── Typing indicator ──────────────────────
window.ssTyping = function() {
  const msgs = document.getElementById('ss-messages');

  const row = document.createElement('div');
  row.className = 'ss-row bot';

  const av = document.createElement('div');
  av.className = 'ss-avatar-sm';
  av.innerHTML = \`<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>\`;
  row.appendChild(av);

  const t = document.createElement('div');
  t.className = 'ss-typing';
  t.innerHTML = '<span></span><span></span><span></span>';
  row.appendChild(t);

  msgs.appendChild(row);
  msgs.scrollTop = msgs.scrollHeight;
  return row;
}

// ── Animate bubble in ─────────────────────
window.ssAnimate = function(el, parent) {
  el.style.opacity   = '0';
  el.style.transform = 'translateY(10px)';
  el.style.transition = 'opacity 0.22s ease, transform 0.22s ease';
  parent.appendChild(el);
  requestAnimationFrame(() => requestAnimationFrame(() => {
    el.style.opacity   = '1';
    el.style.transform = 'translateY(0)';
  }));
  parent.scrollTop = parent.scrollHeight;
}

// ── Helpers ───────────────────────────────
window.ssTime = function() {
  return new Date().toLocaleTimeString([], { hour:'2-digit', minute:'2-digit' });
}

window.ssEsc = function(s) {
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

window.ssFmt = function(t) {
  return t
    .replace(/\\*\\*(.*?)\\*\\*/g, '<strong>$1</strong>')
    .replace(/\\*(.*?)\\*/g,     '<em>$1</em>')
    .replace(/\\n\\n/g,          '<br><br>')
    .replace(/\\n/g,            '<br>');
}
`;

export default function SwasthChatbox() {
  useEffect(() => {
    if (document.getElementById('ss-chatbox-style')) return;

    // 1. Inject Style
    const style = document.createElement('style');
    style.id = 'ss-chatbox-style';
    style.innerHTML = RAW_CSS;
    document.head.appendChild(style);

    // 2. Inject DOM Elements
    const container = document.createElement('div');
    container.id = 'ss-chatbox-container';
    container.innerHTML = RAW_HTML;
    document.body.appendChild(container);

    // 3. Inject Script
    const script = document.createElement('script');
    script.id = 'ss-chatbox-script';
    script.innerHTML = RAW_JS;
    document.body.appendChild(script);

    return () => {
      // Cleanup for hot reloads
      if (document.getElementById('ss-chatbox-style')) document.getElementById('ss-chatbox-style')?.remove();
      if (document.getElementById('ss-chatbox-container')) document.getElementById('ss-chatbox-container')?.remove();
      if (document.getElementById('ss-chatbox-script')) document.getElementById('ss-chatbox-script')?.remove();
    };
  }, []);

  return null;
}
