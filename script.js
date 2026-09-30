document.addEventListener('DOMContentLoaded', () => {

    // ══════════════════════════════════════════════════════════
    //  ELEMENTS
    // ══════════════════════════════════════════════════════════
    const setupPanel        = document.getElementById('setup-panel');
    const readerPanel       = document.getElementById('reader-panel');
    const textInput         = document.getElementById('text-input');
    const clearBtn          = document.getElementById('clear-btn');
    const formatBtn         = document.getElementById('format-btn');
    const voiceBtn          = document.getElementById('voice-btn');
    const voiceIndicator    = document.getElementById('voice-indicator');
    const resumeNotice      = document.getElementById('resume-notice');
    const resumeBtn         = document.getElementById('resume-btn');
    const resumeDismiss     = document.getElementById('resume-dismiss');

    // Setup sliders
    const speedRange        = document.getElementById('speed-range');
    const speedValueEl      = document.getElementById('speed-value');
    const speedMinus        = document.getElementById('speed-minus');
    const speedPlus         = document.getElementById('speed-plus');
    const fontRange         = document.getElementById('font-range');
    const fontSizeEl        = document.getElementById('font-size-value');
    const fontMinus         = document.getElementById('font-minus');
    const fontPlus          = document.getElementById('font-plus');
    const colorBtns         = document.querySelectorAll('.color-btn');

    // Font switcher
    const fontBtns          = document.querySelectorAll('.font-btn');

    // Translation
    const langBtns          = document.querySelectorAll('.lang-btn');
    const translateBtn      = document.getElementById('translate-btn');
    const translateStatus   = document.getElementById('translate-status');

    // Toggles
    const mirrorToggle      = document.getElementById('mirror-toggle');
    const focusToggle       = document.getElementById('focus-toggle');
    const highlightToggle   = document.getElementById('highlight-toggle');
    const eyeContactToggle  = document.getElementById('eyecontact-toggle');
    const countdownToggle   = document.getElementById('countdown-toggle');
    const startBtn          = document.getElementById('start-btn');

    // Reader controls
    const stopBtn           = document.getElementById('stop-btn');
    const pauseBtn          = document.getElementById('pause-btn');
    const pauseIcon         = document.getElementById('pause-icon');
    const playIcon          = document.getElementById('play-icon');
    const ffBtn             = document.getElementById('ff-btn');
    const restartBtn        = document.getElementById('restart-btn');
    const mirrorReaderBtn   = document.getElementById('mirror-reader-btn');
    const eyeContactReaderBtn = document.getElementById('eyecontact-reader-btn');
    const scrollContainer   = document.getElementById('scroll-container');
    const contentDisplay    = document.getElementById('content-display');
    const progressBar       = document.getElementById('progress-bar');
    const progressPct       = document.getElementById('progress-pct');
    const timeRemainingEl   = document.getElementById('time-remaining');
    const statusBadge       = document.getElementById('status-badge');
    const currentSpeedEl    = document.getElementById('current-speed-display');
    const focusLine         = document.getElementById('focus-line');
    const cameraZone        = document.getElementById('camera-zone');
    const countdownOverlay  = document.getElementById('countdown-overlay');
    const countdownNumber   = document.getElementById('countdown-number');
    const dynamicSpeedRange = document.getElementById('dynamic-speed-range');
    const dynamicMinus      = document.getElementById('dynamic-minus');
    const dynamicPlus       = document.getElementById('dynamic-plus');
    const readerFontMinus   = document.getElementById('reader-font-minus');
    const readerFontPlus    = document.getElementById('reader-font-plus');
    const themeToggle       = document.getElementById('theme-toggle');
    const sunIcon           = themeToggle.querySelector('.sun-icon');
    const moonIcon          = themeToggle.querySelector('.moon-icon');
    const uploadBtn         = document.getElementById('upload-btn');
    const fileUpload        = document.getElementById('file-upload');
    const grammarBtn        = document.getElementById('grammar-btn');

    // New feature elements
    const shortcutsBtn      = document.getElementById('shortcuts-btn');
    const shortcutsModal    = document.getElementById('shortcuts-modal');
    const shortcutsClose    = document.getElementById('shortcuts-close');
    const statsOverlay      = document.getElementById('stats-overlay');
    const statsRestartBtn   = document.getElementById('stats-restart-btn');
    const statsExitBtn      = document.getElementById('stats-exit-btn');
    const statDuration      = document.getElementById('stat-duration');
    const statWords         = document.getElementById('stat-words');
    const statWpm           = document.getElementById('stat-wpm');
    const statSpeed         = document.getElementById('stat-speed');
    const wpmDisplay        = document.getElementById('wpm-display');
    const fullscreenBtn     = document.getElementById('fullscreen-btn');
    const customColorInput  = document.getElementById('custom-color-input');
    const customColorDot    = document.getElementById('custom-color-dot');
    const customColorBtn    = customColorInput ? customColorInput.closest('.custom-color-btn') : null;
    
    // Auth & History Elements
    const authBtn           = document.getElementById('auth-btn');
    const historyBtn        = document.getElementById('history-btn');
    const authModal         = document.getElementById('auth-modal');
    const historyModal      = document.getElementById('history-modal');
    const authClose         = document.getElementById('auth-close');
    const historyClose      = document.getElementById('history-close');
    const authForm          = document.getElementById('auth-form');
    const authEmail         = document.getElementById('auth-email');
    const authPass          = document.getElementById('auth-password');
    const authMsg           = document.getElementById('auth-msg');
    const authSubmitBtn     = document.getElementById('auth-submit-btn');
    const googleLoginBtn    = document.getElementById('google-login-btn');
    const tabLogin          = document.getElementById('tab-login');
    const tabSignup         = document.getElementById('tab-signup');
    const historyList       = document.getElementById('history-list');
    const clearHistoryBtn   = document.getElementById('clear-history-btn');
    
    // OTP Elements
    const otpScreen         = document.getElementById('otp-screen');
    const otpEmailDisplay   = document.getElementById('otp-email-display');
    const otpBoxes         = document.querySelectorAll('.otp-box');
    const otpVerifyBtn      = document.getElementById('otp-verify-btn');
    const resendOtpBtn      = document.getElementById('resend-otp');
    const resendTimerEl     = document.getElementById('resend-timer');
    const passGroup         = document.getElementById('pass-group');
    const topActions        = document.querySelector('.top-actions');

    // Initialize PDF.js
    if (window.pdfjsLib) {
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
    }

    // ══════════════════════════════════════════════════════════
    //  STATE
    // ══════════════════════════════════════════════════════════
    let scrollSpeed     = 20;
    let baseSpeed       = 20;
    let fontSize        = 32;
    let readerFont      = "'Sora', sans-serif";
    let textColor       = '#f1f5f9';
    document.documentElement.style.setProperty('--user-text-color', textColor);
    let isMirrored      = false;
    let isEyeContact    = false;
    let isScrolling     = false;
    let lastTimestamp   = 0;
    let currentScrollY  = 0;
    let animationId     = null;
    let isFFActive      = false;
    let paragraphs      = [];
    let isRecording     = false;
    let recognition     = null;
    let resumeScrollY   = 0;
    let selectedLang    = null;
    let originalScript  = null;

    // Session tracking for stats
    let sessionStartTime = 0;
    let sessionWordCount = 0;
    let sessionSpeedSum  = 0;
    let sessionSpeedTicks = 0;

    const STORAGE_FONT   = 'lumina_font';
    const STORAGE_THEME  = 'lumina_theme';
    const STORAGE_USER   = 'lumina_user';
    const STORAGE_HIST   = 'lumina_history';

    let currentUser      = JSON.parse(localStorage.getItem(STORAGE_USER)) || null;
    let readingHistory   = JSON.parse(localStorage.getItem(STORAGE_HIST)) || [];
    let authMode         = 'login';

    const STORAGE_SCRIPT = 'lumina_script_v2';
    const STORAGE_SCROLL = 'lumina_scroll_pos';
    const STORAGE_SPEED  = 'lumina_speed';

    // ══════════════════════════════════════════════════════════
    //  THEME ENGINE
    // ══════════════════════════════════════════════════════════
    function setTheme(theme) {
        if (theme === 'light') {
            document.documentElement.setAttribute('data-theme', 'light');
            sunIcon.classList.add('hidden');
            moonIcon.classList.remove('hidden');
        } else {
            document.documentElement.removeAttribute('data-theme');
            sunIcon.classList.remove('hidden');
            moonIcon.classList.add('hidden');
        }
        localStorage.setItem(STORAGE_THEME, theme);
    }

    const savedTheme = localStorage.getItem(STORAGE_THEME) || 'dark';
    setTheme(savedTheme);

    themeToggle.addEventListener('click', () => {
        const isLight = document.documentElement.getAttribute('data-theme') === 'light';
        setTheme(isLight ? 'dark' : 'light');
    });

    // ══════════════════════════════════════════════════════════
    //  PERSIST / RESTORE
    // ══════════════════════════════════════════════════════════
    const saved = localStorage.getItem(STORAGE_SCRIPT);
    if (saved) textInput.value = saved;

    const savedSpeed = localStorage.getItem(STORAGE_SPEED);
    if (savedSpeed) setSpeed(+savedSpeed);

    const savedFont = localStorage.getItem(STORAGE_FONT);
    if (savedFont) setFontSize(+savedFont);

    const savedPos = localStorage.getItem(STORAGE_SCROLL);
    if (savedPos && +savedPos > 10 && saved) {
        resumeScrollY = +savedPos;
        resumeNotice.classList.remove('hidden');
    }

    textInput.addEventListener('input', () => {
        localStorage.setItem(STORAGE_SCRIPT, textInput.value);
        resumeNotice.classList.add('hidden');
        localStorage.removeItem(STORAGE_SCROLL);
        originalScript = null; // reset translation state
        // Re-enable translate btn if lang selected
        if (selectedLang && selectedLang !== 'en') translateBtn.disabled = false;
    });

    clearBtn.addEventListener('click', () => {
        textInput.value = '';
        localStorage.removeItem(STORAGE_SCRIPT);
        localStorage.removeItem(STORAGE_SCROLL);
        resumeNotice.classList.add('hidden');
        originalScript = null;
        setTranslateStatus('');
        textInput.focus();
    });

    resumeBtn.addEventListener('click', () => {
        resumeNotice.classList.add('hidden');
        startReading(true);
    });
    resumeDismiss.addEventListener('click', () => {
        resumeNotice.classList.add('hidden');
        localStorage.removeItem(STORAGE_SCROLL);
    });

    // ══════════════════════════════════════════════════════════
    //  FONT CARDS — wire up switching via CSS custom property
    // ══════════════════════════════════════════════════════════
    fontBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            fontBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            readerFont = btn.getAttribute('data-font');
            document.documentElement.style.setProperty('--reader-font', readerFont);
        });
    });

    // ══════════════════════════════════════════════════════════
    //  TRANSLATION — MyMemory API (free, no key required)
    // ══════════════════════════════════════════════════════════
    langBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            langBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            selectedLang = btn.dataset.lang;

            // If English selected, restore original
            if (selectedLang === 'en') {
                if (originalScript !== null) {
                    textInput.value = originalScript;
                    localStorage.setItem(STORAGE_SCRIPT, textInput.value);
                    originalScript = null;
                }
                translateBtn.disabled = true;
                setTranslateStatus('');
            } else {
                translateBtn.disabled = !textInput.value.trim();
            }
        });
    });

    translateBtn.addEventListener('click', async () => {
        const text = textInput.value.trim();
        if (!text || !selectedLang) return;

        // Always translate from the ORIGINAL English script, not the current (possibly already-translated) text
        // This prevents Hindi → Bengali producing mixed language
        if (originalScript === null) originalScript = text;
        const sourceText = originalScript;

        translateBtn.classList.add('loading');
        translateBtn.disabled = true;
        setTranslateStatus('working', `⏳ Translating to ${getSelectedLangName()}…`);

        try {
            const translated = await translateText(sourceText, selectedLang);
            textInput.value = translated;
            localStorage.setItem(STORAGE_SCRIPT, translated);
            setTranslateStatus('success', `✓ Translated to ${getSelectedLangName()}. Pick another language or English to restore.`);
        } catch (err) {
            setTranslateStatus('error', `✗ ${err.message}`);
        } finally {
            translateBtn.classList.remove('loading');
            // Always re-enable so the user can switch languages freely
            translateBtn.disabled = !selectedLang || selectedLang === 'en';
        }
    });

    function getSelectedLangName() {
        const btn = document.querySelector('.lang-btn.active');
        return btn ? btn.dataset.name : 'Unknown';
    }

    function setTranslateStatus(type, message) {
        if (!type) {
            translateStatus.className = 'translate-status hidden';
            translateStatus.textContent = '';
            return;
        }
        translateStatus.className = `translate-status ${type}`;
        translateStatus.textContent = message;
        translateStatus.classList.remove('hidden');
    }

    // Fetch-based translation using MyMemory API (Free, CORS-friendly)
    async function translateChunk(chunk, targetLang) {
        try {
            // Using MyMemory API
            const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(chunk)}&langpair=en|${targetLang}`;
            const response = await fetch(url);
            
            if (!response.ok) throw new Error('Network response was not ok');
            
            const data = await response.json();
            
            if (data.responseStatus === 200) {
                return data.responseData.translatedText;
            } else if (data.responseStatus === 403) {
                throw new Error('Translation limit reached for now. Please try again later.');
            } else {
                throw new Error(data.responseDetails || 'Translation failed');
            }
        } catch (err) {
            console.error('Translation error:', err);
            // Fallback to a different message if it's a fetch error (likely CORS or Offline)
            if (err.message === 'Failed to fetch') {
                throw new Error('Internet connection lost or Translation Service is down.');
            }
            throw err;
        }
    }

    async function translateText(text, targetLang) {
        // Chunk at 400 raw chars so URL-encoded length stays safe
        const MAX = 400;
        const chunks = [];
        let remaining = text;

        while (remaining.length > 0) {
            if (remaining.length <= MAX) { chunks.push(remaining); break; }
            let cut = remaining.lastIndexOf('\n', MAX);
            if (cut <= 0) cut = remaining.lastIndexOf('. ', MAX);
            if (cut <= 0) cut = remaining.lastIndexOf(' ', MAX);
            if (cut <= 0) cut = MAX;
            chunks.push(remaining.slice(0, cut).trim());
            remaining = remaining.slice(cut).trim();
        }

        const results = [];
        for (let i = 0; i < chunks.length; i++) {
            setTranslateStatus('working', `⏳ Translating${chunks.length > 1 ? ` part ${i + 1} of ${chunks.length}` : ''}…`);
            const translated = await translateChunk(chunks[i], targetLang);
            results.push(translated);
            if (i < chunks.length - 1) await new Promise(r => setTimeout(r, 250));
        }
        return results.join('\n');
    }


    // ══════════════════════════════════════════════════════════
    //  FILE UPLOAD (PDF, DOCX, TXT)
    // ══════════════════════════════════════════════════════════
    uploadBtn.addEventListener('click', () => fileUpload.click());

    fileUpload.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        uploadBtn.innerHTML = '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg> Reading...';
        uploadBtn.disabled = true;

        try {
            let text = '';
            const extension = file.name.split('.').pop().toLowerCase();

            if (extension === 'pdf') {
                text = await parsePDF(file);
            } else if (extension === 'docx') {
                text = await parseDocx(file);
            } else {
                text = await file.text();
            }

            if (text.trim()) {
                textInput.value = text;
                localStorage.setItem(STORAGE_SCRIPT, text);
                originalScript = null; // reset translation
                setTranslateStatus('success', `✓ Loaded ${file.name}`);
            }
        } catch (err) {
            console.error('File parse error:', err);
            setTranslateStatus('error', `✗ Failed to read file: ${err.message}`);
        } finally {
            uploadBtn.innerHTML = '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg> Upload';
            uploadBtn.disabled = false;
            fileUpload.value = '';
        }
    });

    async function parsePDF(file) {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        let fullText = '';
        for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const content = await page.getTextContent();
            fullText += content.items.map(item => item.str).join(' ') + '\n';
        }
        return fullText;
    }

    async function parseDocx(file) {
        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.extractRawText({ arrayBuffer });
        return result.value;
    }

    // ══════════════════════════════════════════════════════════
    //  DRAG & DROP IMPORT
    // ══════════════════════════════════════════════════════════
    const dragoverOverlay = document.getElementById('dragover-overlay');
    const textareaWrapper = document.querySelector('.textarea-wrapper');

    if (textareaWrapper && dragoverOverlay) {
        // Prevent default drag behaviors
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            textareaWrapper.addEventListener(eventName, preventDefaults, false);
            document.body.addEventListener(eventName, preventDefaults, false);
        });

        function preventDefaults(e) {
            e.preventDefault();
            e.stopPropagation();
        }

        // Highlight/show overlay when item is dragged over
        ['dragenter', 'dragover'].forEach(eventName => {
            textareaWrapper.addEventListener(eventName, () => {
                dragoverOverlay.classList.add('active');
            }, false);
        });

        // Hide overlay when item leaves
        dragoverOverlay.addEventListener('dragleave', () => {
            dragoverOverlay.classList.remove('active');
        }, false);

        // Handle dropped files
        textareaWrapper.addEventListener('drop', async (e) => {
            dragoverOverlay.classList.remove('active');
            
            const dt = e.dataTransfer;
            const files = dt.files;
            if (!files || files.length === 0) return;
            
            const file = files[0];
            uploadBtn.innerHTML = '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg> Reading...';
            uploadBtn.disabled = true;

            try {
                let text = '';
                const extension = file.name.split('.').pop().toLowerCase();

                if (extension === 'pdf') {
                    text = await parsePDF(file);
                } else if (extension === 'docx') {
                    text = await parseDocx(file);
                } else {
                    text = await file.text();
                }

                if (text.trim()) {
                    textInput.value = text;
                    localStorage.setItem(STORAGE_SCRIPT, text);
                    originalScript = null; // reset translation
                    setTranslateStatus('success', `✓ Loaded ${file.name} (Dropped)`);
                    resumeNotice.classList.add('hidden');
                    localStorage.removeItem(STORAGE_SCROLL);
                }
            } catch (err) {
                console.error('Drop parse error:', err);
                setTranslateStatus('error', `✗ Failed to read dropped file: ${err.message}`);
            } finally {
                uploadBtn.innerHTML = '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg> Upload';
                uploadBtn.disabled = false;
            }
        }, false);
    }

    // ══════════════════════════════════════════════════════════
    //  GRAMMAR CHECK (LanguageTool API)
    // ══════════════════════════════════════════════════════════
    grammarBtn.addEventListener('click', async () => {
        const text = textInput.value.trim();
        if (!text) return;

        grammarBtn.innerHTML = '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg> Checking...';
        grammarBtn.disabled = true;

        try {
            const response = await fetch('https://api.languagetoolplus.com/v2/check', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams({
                    text: text,
                    language: 'en-US'
                })
            });

            const data = await response.json();
            const matches = data.matches || [];

            if (matches.length === 0) {
                setTranslateStatus('success', '✨ No grammatical errors found! Your script is perfect.');
            } else {
                const count = matches.length;
                setTranslateStatus('working', `🔍 Found ${count} potential issue${count > 1 ? 's' : ''}. Applying smart fixes...`);
                
                // Simple auto-fix for common issues
                let fixedText = text;
                // Reverse iterate to avoid index shifting
                matches.sort((a, b) => b.offset - a.offset).forEach(m => {
                    if (m.replacements && m.replacements.length > 0) {
                        const replacement = m.replacements[0].value;
                        fixedText = fixedText.substring(0, m.offset) + replacement + fixedText.substring(m.offset + m.length);
                    }
                });

                textInput.value = fixedText;
                localStorage.setItem(STORAGE_SCRIPT, fixedText);
                setTranslateStatus('success', `✓ Fixed ${count} grammar/spelling issues.`);
            }
        } catch (err) {
            console.error('Grammar check error:', err);
            setTranslateStatus('error', '✗ Grammar check failed. Please check internet connection.');
        } finally {
            grammarBtn.innerHTML = '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg> Grammar';
            grammarBtn.disabled = false;
        }
    });

    // ══════════════════════════════════════════════════════════
    //  SMART FORMATTER
    // ══════════════════════════════════════════════════════════
    formatBtn.addEventListener('click', () => {
        const raw = textInput.value.trim();
        if (!raw) return;

        const lines = raw.split('\n').map(l => l.trim()).filter(Boolean);
        const formatted = lines.map(line => {
            if (line === line.toUpperCase() && line.length > 3)
                line = line.toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
            if (!/[.!?…]$/.test(line)) line += '.';
            const transitions = /^(And|But|So|Now|Next|Then|Because|Therefore|Finally|Also|However|Actually|Basically)/i;
            if (transitions.test(line)) line = '\n' + line;
            return line;
        });

        textInput.value = formatted.join('\n').replace(/\n{3,}/g, '\n\n').trim();
        localStorage.setItem(STORAGE_SCRIPT, textInput.value);

        formatBtn.innerHTML = '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> Done!';
        formatBtn.style.borderColor = '#4ade80';
        formatBtn.style.color = '#4ade80';
        setTimeout(() => {
            formatBtn.innerHTML = '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg> Format';
            formatBtn.style.borderColor = '';
            formatBtn.style.color = '';
        }, 1500);
    });

    // ══════════════════════════════════════════════════════════
    //  TEXT HIGHLIGHTER
    // ══════════════════════════════════════════════════════════
    const highlightBtn = document.getElementById('highlight-btn');
    if (highlightBtn) {
        highlightBtn.addEventListener('click', () => {
            const start = textInput.selectionStart;
            const end = textInput.selectionEnd;
            if (start !== end) {
                const text = textInput.value;
                const selected = text.substring(start, end);
                const before = text.substring(0, start);
                const after = text.substring(end);
                
                // Toggle highlight: If already highlighted, remove it. If not, add it.
                if (before.endsWith('==') && after.startsWith('==')) {
                    textInput.value = before.slice(0, -2) + selected + after.slice(2);
                    textInput.selectionStart = start - 2;
                    textInput.selectionEnd = end - 2;
                } else {
                    textInput.value = before + '==' + selected + '==' + after;
                    textInput.selectionStart = start + 2;
                    textInput.selectionEnd = end + 2;
                }
                localStorage.setItem(STORAGE_SCRIPT, textInput.value);
            } else {
                const oldHTML = highlightBtn.innerHTML;
                highlightBtn.innerHTML = '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg> Select Text!';
                highlightBtn.style.color = 'var(--accent)';
                setTimeout(() => {
                    highlightBtn.innerHTML = oldHTML;
                    highlightBtn.style.color = '';
                }, 1500);
            }
            textInput.focus();
        });
    }

    // ══════════════════════════════════════════════════════════
    //  VOICE TO SCRIPT
    // ══════════════════════════════════════════════════════════
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
        voiceBtn.disabled = true;
        voiceBtn.title = 'Speech recognition not supported in this browser';
        voiceBtn.style.opacity = '0.4';
    } else {
        recognition = new SpeechRecognition();
        recognition.continuous    = true;
        recognition.interimResults = true;
        recognition.lang          = 'en-IN';

        let finalTranscript = '';
        recognition.onresult = (e) => {
            let interim = '';
            for (let i = e.resultIndex; i < e.results.length; i++) {
                const t = e.results[i][0].transcript;
                if (e.results[i].isFinal) finalTranscript += t + ' ';
                else interim = t;
            }
            const base = textInput.getAttribute('data-base') || '';
            textInput.value = base + finalTranscript + interim;
            localStorage.setItem(STORAGE_SCRIPT, textInput.value);
        };
        recognition.onend = () => { if (isRecording) recognition.start(); };
        recognition.onerror = (e) => { if (e.error !== 'no-speech') stopVoice(); };
    }

    const startVoice = () => {
        if (!recognition) return;
        isRecording = true;
        textInput.setAttribute('data-base', textInput.value ? textInput.value + '\n' : '');
        recognition.start();
        voiceBtn.innerHTML = '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"/></svg> Stop';
        voiceBtn.classList.add('recording');
        voiceIndicator.classList.remove('hidden');
    };
    const stopVoice = () => {
        isRecording = false;
        if (recognition) recognition.stop();
        voiceBtn.innerHTML = '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="22"/></svg> Dictate';
        voiceBtn.classList.remove('recording');
        voiceIndicator.classList.add('hidden');
        textInput.removeAttribute('data-base');
    };
    voiceBtn.addEventListener('click', () => isRecording ? stopVoice() : startVoice());

    // ══════════════════════════════════════════════════════════
    //  SPEED
    // ══════════════════════════════════════════════════════════
    function setSpeed(val) {
        scrollSpeed = Math.max(5, Math.min(200, Math.round(val)));
        baseSpeed   = scrollSpeed;
        speedValueEl.textContent    = scrollSpeed;
        currentSpeedEl.textContent  = `${scrollSpeed} px/s`;
        speedRange.value            = scrollSpeed;
        dynamicSpeedRange.value     = scrollSpeed;
        localStorage.setItem(STORAGE_SPEED, scrollSpeed);
    }
    speedRange.addEventListener('input',        e => setSpeed(+e.target.value));
    dynamicSpeedRange.addEventListener('input', e => setSpeed(+e.target.value));
    speedMinus.addEventListener('click',   () => setSpeed(baseSpeed - 5));
    speedPlus.addEventListener('click',    () => setSpeed(baseSpeed + 5));
    dynamicMinus.addEventListener('click', () => setSpeed(baseSpeed - 5));
    dynamicPlus.addEventListener('click',  () => setSpeed(baseSpeed + 5));

    // ══════════════════════════════════════════════════════════
    //  FONT SIZE
    // ══════════════════════════════════════════════════════════
    function setFontSize(val) {
        fontSize = Math.max(16, Math.min(72, Math.round(val)));
        fontSizeEl.textContent              = fontSize;
        fontRange.value                     = fontSize;
        contentDisplay.style.fontSize       = `${fontSize}px`;
        localStorage.setItem(STORAGE_FONT, fontSize);
    }
    fontRange.addEventListener('input',      e => setFontSize(+e.target.value));
    fontMinus.addEventListener('click',           () => setFontSize(fontSize - 2));
    fontPlus.addEventListener('click',            () => setFontSize(fontSize + 2));
    readerFontMinus.addEventListener('click',     () => setFontSize(fontSize - 2));
    readerFontPlus.addEventListener('click',      () => setFontSize(fontSize + 2));

    // ══════════════════════════════════════════════════════════
    //  TEXT COLOR
    // ══════════════════════════════════════════════════════════
    colorBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            colorBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            textColor = btn.dataset.color;
            document.documentElement.style.setProperty('--user-text-color', textColor);
        });
    });

    // ══════════════════════════════════════════════════════════
    //  MIRROR
    // ══════════════════════════════════════════════════════════
    function applyMirror(on) {
        isMirrored = on;
        contentDisplay.classList.toggle('mirrored', on);
        mirrorReaderBtn.classList.toggle('active', on);
        mirrorToggle.checked = on;
    }
    mirrorToggle.addEventListener('change', () => applyMirror(mirrorToggle.checked));
    mirrorReaderBtn.addEventListener('click', () => applyMirror(!isMirrored));

    // ══════════════════════════════════════════════════════════
    //  EYE CONTACT MODE
    // ══════════════════════════════════════════════════════════
    function applyEyeContact(on) {
        isEyeContact = on;
        scrollContainer.classList.toggle('eye-contact', on);
        if (cameraZone) cameraZone.classList.toggle('visible', on);
        eyeContactReaderBtn.classList.toggle('active', on);
        eyeContactToggle.checked = on;
        focusLine.style.top = on ? '28%' : '50%';
    }
    eyeContactToggle.addEventListener('change', () => applyEyeContact(eyeContactToggle.checked));
    eyeContactReaderBtn.addEventListener('click', () => applyEyeContact(!isEyeContact));

    // ══════════════════════════════════════════════════════════
    //  FOCUS LINE TOGGLE
    // ══════════════════════════════════════════════════════════
    focusToggle.addEventListener('change', () => {
        focusLine.classList.toggle('hidden', !focusToggle.checked);
    });

    // ══════════════════════════════════════════════════════════
    //  SENTENCE HIGHLIGHT
    // ══════════════════════════════════════════════════════════
    function updateSentenceHighlight() {
        if (!highlightToggle.checked || paragraphs.length === 0) return;
        const cRect    = scrollContainer.getBoundingClientRect();
        const focusY   = isEyeContact
            ? cRect.top + cRect.height * 0.28
            : cRect.top + cRect.height * 0.5;

        let closest = null, closestDist = Infinity;
        paragraphs.forEach(p => {
            const r    = p.getBoundingClientRect();
            const dist = Math.abs((r.top + r.height / 2) - focusY);
            if (dist < closestDist) { closestDist = dist; closest = p; }
        });

        paragraphs.forEach(p => {
            p.classList.toggle('active-sentence', p === closest);
            p.classList.toggle('dim-sentence',    p !== closest);
        });
    }

    // ══════════════════════════════════════════════════════════
    //  SCROLL LOOP
    // ══════════════════════════════════════════════════════════
    function scrollStep(ts) {
        if (!isScrolling) return;
        if (!lastTimestamp) lastTimestamp = ts;

        const delta = (ts - lastTimestamp) / 1000;
        currentScrollY += scrollSpeed * delta;
        scrollContainer.scrollTop = currentScrollY;

        const maxScroll = scrollContainer.scrollHeight - scrollContainer.clientHeight;
        const pct = maxScroll > 0 ? Math.min(100, (currentScrollY / maxScroll) * 100) : 0;
        progressBar.style.width = `${pct}%`;
        progressPct.textContent = `${Math.round(pct)}%`;

        const remaining = maxScroll > 0 ? Math.max(0, (maxScroll - currentScrollY) / scrollSpeed) : 0;
        timeRemainingEl.textContent = remaining < 60
            ? `${Math.ceil(remaining)}s left`
            : `${Math.floor(remaining / 60)}m ${Math.ceil(remaining % 60)}s left`;

        // Live WPM estimate: wpm = (words * 60) / elapsed_seconds
        const elapsed = (Date.now() - sessionStartTime) / 1000;
        if (elapsed > 2 && sessionWordCount > 0) {
            const liveWpm = Math.round((sessionWordCount * pct / 100) / elapsed * 60);
            wpmDisplay.textContent = `${liveWpm} WPM`;
        }

        // Track speed for average
        sessionSpeedSum += scrollSpeed;
        sessionSpeedTicks++;

        localStorage.setItem(STORAGE_SCROLL, Math.floor(currentScrollY));
        updateSentenceHighlight();

        if (currentScrollY >= maxScroll - 2) { stopReading(true); return; }
        lastTimestamp = ts;
        animationId = requestAnimationFrame(scrollStep);
    }

    // ══════════════════════════════════════════════════════════
    //  COUNTDOWN
    // ══════════════════════════════════════════════════════════
    function runCountdown(cb) {
        if (!countdownToggle.checked) { cb(); return; }
        countdownOverlay.classList.remove('hidden');
        let n = 3;
        countdownNumber.textContent = n;

        function tick() {
            n--;
            if (n <= 0) { countdownOverlay.classList.add('hidden'); cb(); return; }
            countdownNumber.textContent = n;
            countdownNumber.style.animation = 'none';
            requestAnimationFrame(() => requestAnimationFrame(() => {
                countdownNumber.style.animation = 'popIn .85s cubic-bezier(.34,1.56,.64,1)';
            }));
            setTimeout(tick, 900);
        }
        setTimeout(tick, 900);
    }

    // ══════════════════════════════════════════════════════════
    //  START READING
    // ══════════════════════════════════════════════════════════
    function startReading(resume = false) {
        stopVoice();
        const text = textInput.value.trim();
        if (!text) {
            textInput.focus();
            textInput.style.borderColor = 'var(--danger)';
            textInput.style.boxShadow = '0 0 0 3px rgba(248,113,113,0.15)';
            setTimeout(() => { textInput.style.borderColor = ''; textInput.style.boxShadow = ''; }, 1200);
            return;
        }

        let processedText = text.replace(/==([^=]+)==/g, '<mark class="user-highlight">$1</mark>');

        contentDisplay.innerHTML = processedText
            .split('\n')
            .map(l => l.trim() ? `<p>${l}</p>` : '<br>')
            .join('');
        paragraphs = Array.from(contentDisplay.querySelectorAll('p'));

        // Apply all settings
        contentDisplay.style.fontSize    = `${fontSize}px`;
        contentDisplay.style.fontFamily  = readerFont;
        contentDisplay.classList.toggle('mirrored', isMirrored);
        focusLine.classList.toggle('hidden', !focusToggle.checked);
        focusLine.style.top = isEyeContact ? '28%' : '50%';
        scrollContainer.classList.toggle('eye-contact', isEyeContact);
        if (cameraZone) cameraZone.classList.toggle('visible', isEyeContact);
        mirrorReaderBtn.classList.toggle('active', isMirrored);
        eyeContactReaderBtn.classList.toggle('active', isEyeContact);

        setupPanel.classList.add('hidden');
        readerPanel.classList.remove('hidden');
        topActions.classList.add('hidden');
        wpmDisplay.textContent = '-- WPM';

        // Track session
        sessionWordCount = text.trim().split(/\s+/).length;
        sessionSpeedSum = 0;
        sessionSpeedTicks = 0;
        sessionStartTime = Date.now();

        try {
            const el = document.documentElement;
            if (el.requestFullscreen) el.requestFullscreen();
            else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
        } catch (_) {}

        progressBar.style.width  = '0%';
        progressPct.textContent  = '0%';
        timeRemainingEl.textContent = '-- left';
        setPauseUI(false);

        if (resume && resumeScrollY > 0) {
            setTimeout(() => {
                scrollContainer.scrollTop = resumeScrollY;
                currentScrollY = resumeScrollY;
                lastTimestamp  = 0;
                isScrolling    = true;
                animationId    = requestAnimationFrame(scrollStep);
            }, 100);
        } else {
            // Save to history on every new start
            saveToHistory(text);
            scrollContainer.scrollTop = 0;
            currentScrollY = 0;
            lastTimestamp  = 0;
            runCountdown(() => { isScrolling = true; animationId = requestAnimationFrame(scrollStep); });
        }
    }

    // ══════════════════════════════════════════════════════════
    //  STOP
    // ══════════════════════════════════════════════════════════
    function stopReading(completed = false) {
        isScrolling = false;
        if (animationId) cancelAnimationFrame(animationId);
        countdownOverlay.classList.add('hidden');
        paragraphs.forEach(p => p.classList.remove('active-sentence', 'dim-sentence'));
        try { if (document.fullscreenElement) document.exitFullscreen(); } catch (_) {}
        readerPanel.classList.add('hidden');
        setupPanel.classList.remove('hidden');
        topActions.classList.remove('hidden');
        contentDisplay.innerHTML = '';
        paragraphs = [];
        if (currentScrollY > 20) {
            resumeScrollY = currentScrollY;
            resumeNotice.classList.remove('hidden');
        }

        if (completed && sessionStartTime > 0) {
            const elapsed = (Date.now() - sessionStartTime) / 1000;
            const mins = Math.floor(elapsed / 60);
            const secs = Math.round(elapsed % 60);
            const avgWpm = elapsed > 0 ? Math.round((sessionWordCount / elapsed) * 60) : 0;
            const avgSpd = sessionSpeedTicks > 0 ? Math.round(sessionSpeedSum / sessionSpeedTicks) : baseSpeed;

            statDuration.textContent = mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
            statWords.textContent    = sessionWordCount.toLocaleString();
            statWpm.textContent      = avgWpm;
            statSpeed.textContent    = `${avgSpd} px/s`;

            statsOverlay.classList.remove('hidden');
            resumeNotice.classList.add('hidden');
        }
    }

    // ══════════════════════════════════════════════════════════
    //  RESTART
    // ══════════════════════════════════════════════════════════
    restartBtn.addEventListener('click', () => {
        isScrolling = false;
        if (animationId) cancelAnimationFrame(animationId);
        scrollContainer.scrollTop = 0;
        currentScrollY = 0; lastTimestamp = 0;
        progressBar.style.width = '0%'; progressPct.textContent = '0%';
        paragraphs.forEach(p => p.classList.remove('active-sentence', 'dim-sentence'));
        setPauseUI(false);
        runCountdown(() => { isScrolling = true; animationId = requestAnimationFrame(scrollStep); });
    });

    // ══════════════════════════════════════════════════════════
    //  PAUSE / PLAY
    // ══════════════════════════════════════════════════════════
    function setPauseUI(paused) {
        pauseIcon.classList.toggle('hidden', paused);
        playIcon.classList.toggle('hidden', !paused);
        statusBadge.textContent = paused ? '⏸ Paused' : '● Live';
        statusBadge.classList.toggle('paused', paused);
    }
    function togglePause() {
        isScrolling = !isScrolling;
        setPauseUI(!isScrolling);
        if (isScrolling) { lastTimestamp = 0; animationId = requestAnimationFrame(scrollStep); }
        else if (animationId) cancelAnimationFrame(animationId);
    }

    // ══════════════════════════════════════════════════════════
    //  FAST FORWARD
    // ══════════════════════════════════════════════════════════
    function startFF() {
        if (isFFActive) return;
        isFFActive = true;
        scrollSpeed = baseSpeed * 4;
        currentSpeedEl.textContent = `${scrollSpeed} px/s ⚡`;
        ffBtn.classList.add('active');
    }
    function stopFF() {
        if (!isFFActive) return;
        isFFActive = false;
        scrollSpeed = baseSpeed;
        currentSpeedEl.textContent = `${scrollSpeed} px/s`;
        ffBtn.classList.remove('active');
    }

    // ══════════════════════════════════════════════════════════
    //  BINDINGS
    // ══════════════════════════════════════════════════════════
    startBtn.addEventListener('click', () => startReading(false));
    stopBtn.addEventListener('click',   stopReading);
    pauseBtn.addEventListener('click',  togglePause);

    ffBtn.addEventListener('mousedown',  startFF);
    ffBtn.addEventListener('mouseup',    stopFF);
    ffBtn.addEventListener('mouseleave', stopFF);
    ffBtn.addEventListener('touchstart', e => { e.preventDefault(); startFF(); });
    ffBtn.addEventListener('touchend',   stopFF);

    document.addEventListener('fullscreenchange', () => {
        if (!document.fullscreenElement && !readerPanel.classList.contains('hidden')) stopReading();
    });

    // ══════════════════════════════════════════════════════════
    //  KEYBOARD SHORTCUTS
    // ══════════════════════════════════════════════════════════
    document.addEventListener('keydown', e => {
        if (readerPanel.classList.contains('hidden')) {
            // ? shortcut when not reading
            if (e.key === '?' || e.key === '/') shortcutsModal.classList.remove('hidden');
            return;
        }
        switch (e.code) {
            case 'Space':     e.preventDefault(); togglePause(); break;
            case 'Escape':    stopReading(false); break;
            case 'ArrowUp':   e.preventDefault(); setSpeed(baseSpeed + 5); break;
            case 'ArrowDown': e.preventDefault(); setSpeed(baseSpeed - 5); break;
            case 'KeyF':      if (!isFFActive) startFF(); break;
            case 'KeyR':      restartBtn.click(); break;
            case 'KeyM':      applyMirror(!isMirrored); break;
            case 'KeyE':      applyEyeContact(!isEyeContact); break;
        }
        if (e.key === '?') shortcutsModal.classList.remove('hidden');
    });
    document.addEventListener('keyup', e => { if (e.code === 'KeyF') stopFF(); });

    // ── New feature bindings ─────────────────────────────────
    // Shortcuts modal
    if (shortcutsBtn) shortcutsBtn.addEventListener('click', () => shortcutsModal.classList.remove('hidden'));
    if (shortcutsClose) shortcutsClose.addEventListener('click', () => shortcutsModal.classList.add('hidden'));
    if (shortcutsModal) shortcutsModal.addEventListener('click', e => { if (e.target === shortcutsModal) shortcutsModal.classList.add('hidden'); });

    // Fullscreen toggle in HUD
    if (fullscreenBtn) {
        fullscreenBtn.addEventListener('click', () => {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen().catch(() => {});
                fullscreenBtn.textContent = '⛶';
            } else {
                document.exitFullscreen().catch(() => {});
            }
        });
        document.addEventListener('fullscreenchange', () => {
            fullscreenBtn.textContent = document.fullscreenElement ? '⛶' : '⛶';
        });
    }

    // Theme Toggle Handler
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const html = document.documentElement;
            const isLight = html.getAttribute('data-theme') === 'dark';
            if (isLight) {
                html.setAttribute('data-theme', 'light');
                if (sunIcon) sunIcon.classList.add('hidden');
                if (moonIcon) moonIcon.classList.remove('hidden');
            } else {
                html.setAttribute('data-theme', 'dark');
                if (sunIcon) sunIcon.classList.remove('hidden');
                if (moonIcon) moonIcon.classList.add('hidden');
            }
        });
    }

    // Stats overlay buttons
    if (statsRestartBtn) statsRestartBtn.addEventListener('click', () => {
        statsOverlay.classList.add('hidden');
        startReading(false);
    });
    if (statsExitBtn) statsExitBtn.addEventListener('click', () => {
        statsOverlay.classList.add('hidden');
    });
    if (statsOverlay) statsOverlay.addEventListener('click', e => { if (e.target === statsOverlay) statsOverlay.classList.add('hidden'); });

    // Custom color picker
    if (customColorInput) {
        customColorInput.addEventListener('input', () => {
            const col = customColorInput.value;
            textColor = col;
            document.documentElement.style.setProperty('--user-text-color', col);
            customColorDot.style.background = col;
            // Deactivate preset buttons
            document.querySelectorAll('.color-btn').forEach(b => b.classList.remove('active'));
            if (customColorBtn) customColorBtn.classList.add('active');
        });
        customColorBtn.addEventListener('click', () => customColorInput.click());
    }
    //  AUTH & HISTORY LOGIC
    // ══════════════════════════════════════════════════════════
    function updateAuthUI() {
        if (!authBtn) return;
        if (currentUser) {
            authBtn.className = "user-profile-btn";
            authBtn.innerHTML = `<img src="${currentUser.photo || 'https://ui-avatars.com/api/?name=' + currentUser.email}" title="Logged in as ${currentUser.email}">`;
        } else {
            authBtn.className = "auth-pill-btn";
            authBtn.innerHTML = `Login / Signup`;
        }
    }
    updateAuthUI();

    if (authBtn) {
        authBtn.addEventListener('click', () => {
            if (currentUser) {
                if (confirm(`Logout from ${currentUser.email}?`)) {
                    currentUser = null;
                    localStorage.removeItem(STORAGE_USER);
                    updateAuthUI();
                }
            } else if (authModal) {
                authModal.classList.remove('hidden');
            }
        });
    }

    if (authClose && authModal) {
        authClose.addEventListener('click', () => authModal.classList.add('hidden'));
    }
    
    if (tabLogin && tabSignup && authSubmitBtn) {
        tabLogin.addEventListener('click', () => {
            authMode = 'login';
            tabLogin.classList.add('active');
            tabSignup.classList.remove('active');
            authSubmitBtn.textContent = 'Login to Lumina';
        });
        
        tabSignup.addEventListener('click', () => {
            authMode = 'signup';
            tabSignup.classList.add('active');
            tabLogin.classList.remove('active');
            authSubmitBtn.textContent = 'Create Account';
        });
    }

    if (authForm) {
        authForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = authEmail ? authEmail.value : '';
            
            if (authMode === 'signup' && authForm && otpScreen && otpEmailDisplay) {
                // Switch to OTP Screen
                authForm.classList.add('hidden');
                otpScreen.classList.remove('hidden');
                otpEmailDisplay.textContent = email;
                startOtpTimer();
                setAuthMsg('success', '✓ Verification code sent!');
            } else {
                // Direct login
                currentUser = { email, photo: null };
                localStorage.setItem(STORAGE_USER, JSON.stringify(currentUser));
                setAuthMsg('success', 'Welcome back!');
                setTimeout(() => {
                    if (authModal) authModal.classList.add('hidden');
                    updateAuthUI();
                    setAuthMsg('', '');
                }, 1000);
            }
        });
    }

    function setAuthMsg(type, text) {
        authMsg.className = `auth-msg ${type}`;
        authMsg.textContent = text;
    }

    // OTP Digit Handling
    if (otpBoxes && otpBoxes.length > 0) {
        otpBoxes.forEach((box, idx) => {
            box.addEventListener('input', (e) => {
                if (e.target.value && idx < otpBoxes.length - 1) {
                    otpBoxes[idx + 1].focus();
                }
            });
            box.addEventListener('keydown', (e) => {
                if (e.key === 'Backspace' && !e.target.value && idx > 0) {
                    otpBoxes[idx - 1].focus();
                }
            });
        });
    }

    if (otpVerifyBtn) {
        otpVerifyBtn.addEventListener('click', () => {
            const code = Array.from(otpBoxes || []).map(b => b.value).join('');
            if (code.length === 4) {
                otpVerifyBtn.innerHTML = 'Verifying...';
                setTimeout(() => {
                    currentUser = { email: authEmail ? authEmail.value : 'user@example.com', photo: null };
                    localStorage.setItem(STORAGE_USER, JSON.stringify(currentUser));
                    updateAuthUI();
                    setAuthMsg('success', '✓ Email verified! Account created.');
                    setTimeout(() => {
                        if (authModal) authModal.classList.add('hidden');
                        if (otpScreen) otpScreen.classList.add('hidden');
                        if (authForm) authForm.classList.remove('hidden');
                        setAuthMsg('', '');
                        otpVerifyBtn.innerHTML = 'Verify & Create Account';
                        if (otpBoxes) otpBoxes.forEach(b => b.value = '');
                    }, 1500);
                }, 1000);
            } else {
                setAuthMsg('error', 'Please enter the 4-digit code.');
            }
        });
    }

    let otpTimer;
    function startOtpTimer() {
        if (!resendOtpBtn || !resendTimerEl) return;
        let seconds = 30;
        resendOtpBtn.disabled = true;
        clearInterval(otpTimer);
        otpTimer = setInterval(() => {
            seconds--;
            resendTimerEl.textContent = seconds;
            if (seconds <= 0) {
                clearInterval(otpTimer);
                resendOtpBtn.disabled = false;
                resendOtpBtn.innerHTML = 'Resend Code';
            }
        }, 1000);
    }

    if (resendOtpBtn) {
        resendOtpBtn.addEventListener('click', () => {
            setAuthMsg('success', '✓ New code sent!');
            startOtpTimer();
            resendOtpBtn.innerHTML = 'Resend in <span id="resend-timer">30</span>s';
        });
    }

    if (googleLoginBtn) {
        googleLoginBtn.addEventListener('click', () => {
            googleLoginBtn.innerHTML = '⏳ Connecting...';
            setTimeout(() => {
                currentUser = { 
                    email: "demo.user@gmail.com", 
                    photo: "https://lh3.googleusercontent.com/a/default-user=s96-c" 
                };
                localStorage.setItem(STORAGE_USER, JSON.stringify(currentUser));
                updateAuthUI();
                if (authModal) authModal.classList.add('hidden');
            }, 1200);
        });
    }

    // History Logic
    if (historyBtn && historyModal) {
        historyBtn.addEventListener('click', () => {
            renderHistory();
            historyModal.classList.remove('hidden');
        });
    }
    if (historyClose && historyModal) {
        historyClose.addEventListener('click', () => historyModal.classList.add('hidden'));
    }

    function saveToHistory(text) {
        if (!text || !text.trim()) return;
        const newItem = {
            id: Date.now(),
            date: new Date().toLocaleString(),
            text: text,
            preview: text.substring(0, 150) + (text.length > 150 ? '...' : '')
        };
        // Avoid duplicates (if same text read again)
        readingHistory = readingHistory.filter(h => h.text !== text);
        readingHistory.unshift(newItem);
        if (readingHistory.length > 20) readingHistory.pop();
        localStorage.setItem(STORAGE_HIST, JSON.stringify(readingHistory));
    }

    function renderHistory() {
        if (!historyList) return;
        if (readingHistory.length === 0) {
            historyList.innerHTML = '<div class="empty-history">No history found. Start reading to save scripts!</div>';
            return;
        }
        historyList.innerHTML = readingHistory.map(item => `
            <div class="history-item" data-id="${item.id}">
                <div class="history-header">
                    <span class="history-date">${item.date}</span>
                </div>
                <div class="history-preview">${item.preview}</div>
            </div>
        `).join('');

        historyList.querySelectorAll('.history-item').forEach(el => {
            el.addEventListener('click', () => {
                const item = readingHistory.find(h => h.id == el.dataset.id);
                if (item) {
                    if (textInput) textInput.value = item.text;
                    localStorage.setItem(STORAGE_SCRIPT, item.text);
                    if (historyModal) historyModal.classList.add('hidden');
                    setTranslateStatus('success', '✓ Loaded from history');
                }
            });
        });
    }

    if (clearHistoryBtn) {
        clearHistoryBtn.addEventListener('click', () => {
            if (confirm('Clear all reading history?')) {
                readingHistory = [];
                localStorage.removeItem(STORAGE_HIST);
                renderHistory();
            }
        });
    }

    // Close modals on escape
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (authModal) authModal.classList.add('hidden');
            if (historyModal) historyModal.classList.add('hidden');
        }
    });
    
    // ══════════════════════════════════════════════════════════
    //  SUBTLE THREE.JS BACKGROUND
    // ══════════════════════════════════════════════════════════
    function initSubtleBackground() {
        const container = document.getElementById('canvas-container-app');
        if (!container || typeof THREE === 'undefined') return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
        camera.position.z = 400;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        const particleCount = 600; // Increased count
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const scales = new Float32Array(particleCount);

        for(let i = 0; i < particleCount; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 1000;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 1000;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 1000;
            scales[i] = Math.random() * 2.5 + 0.5; // Larger particles
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));

        const material = new THREE.ShaderMaterial({
            uniforms: {
                color: { value: new THREE.Color(0xffffff) }
            },
            vertexShader: `
                attribute float scale;
                void main() {
                    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                    gl_PointSize = scale * (300.0 / -mvPosition.z);
                    gl_Position = projectionMatrix * mvPosition;
                }
            `,
            fragmentShader: `
                uniform vec3 color;
                void main() {
                    vec2 xy = gl_PointCoord.xy - vec2(0.5);
                    float ll = length(xy);
                    if(ll > 0.5) discard;
                    gl_FragColor = vec4(color, (0.5 - ll) * 1.2); // Brighter and more visible
                }
            `,
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthTest: false
        });

        const particles = new THREE.Points(geometry, material);
        scene.add(particles);

        let time = 0;
        function animate() {
            requestAnimationFrame(animate);
            time += 0.001;
            
            particles.rotation.y = time * 0.5;
            particles.rotation.x = time * 0.2;
            
            // Adjust color based on theme
            if (document.documentElement.getAttribute('data-theme') === 'dark') {
                material.uniforms.color.value.setHex(0x9BAA95);
                material.blending = THREE.AdditiveBlending;
            } else {
                material.uniforms.color.value.setHex(0x30362F);
                material.blending = THREE.NormalBlending;
            }
            
            renderer.render(scene, camera);
        }
        animate();

        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }
    
    // Initialize after a tiny delay to not block main thread parsing
    setTimeout(initSubtleBackground, 500);

});
