/* ===================================================
   JAVASCRIPT — Nur Kumbasar Portfolio
   ===================================================
   1. Language Toggle (TR ↔ EN)
   2. Navbar scroll effect
   3. Mobile menu (hamburger)
   4. Scroll animations (Intersection Observer)
   5. Typewriter effect
   6. Theme toggle (dark/light)
   7. Interactive terminal
   8. Project tabs
   =================================================== */

let currentLang = 'tr';

// Typing texts per language
const typingTexts = {
    tr: ['Bilgisayar Mühendisliği Öğrencisi', 'QA Stajyeri', 'Problem Çözücü'],
    en: ['Computer Engineering Student', 'QA Intern', 'Problem Solver']
};

/* ===================================================
   1. LANGUAGE TOGGLE
   =================================================== */
function switchLanguage() {
    currentLang = currentLang === 'tr' ? 'en' : 'tr';

    // Update all text elements
    document.querySelectorAll('[data-tr], [data-placeholder-tr]').forEach(function (el) {
        const newText = el.getAttribute('data-' + currentLang);
        if (newText) el.textContent = newText;
        const newPlaceholder = el.getAttribute('data-placeholder-' + currentLang);
        if (newPlaceholder) el.setAttribute('placeholder', newPlaceholder);
    });

    // Update button text
    const langToggle = document.getElementById('langToggle');
    langToggle.textContent = currentLang === 'en' ? 'EN' : 'TR';

    // Restart typing
    restartTyping();
}

document.getElementById('langToggle').addEventListener('click', switchLanguage);

/* ===================================================
   2. NAVBAR SCROLL EFFECT
   =================================================== */
const navbar = document.getElementById('navbar');
const scrollIndicator = document.getElementById('scrollIndicator');

window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    if (scrollIndicator) {
        if (window.scrollY > 100) {
            scrollIndicator.classList.add('hidden');
        } else {
            scrollIndicator.classList.remove('hidden');
        }
    }
});

/* ===================================================
   3. MOBILE MENU (Hamburger)
   =================================================== */
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', function () {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

/* ===================================================
   4. SCROLL ANIMATIONS (Intersection Observer)
   =================================================== */
const observerOptions = {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

setTimeout(function () {
    const targets = document.querySelectorAll(
        '.timeline-item, .skill-card, .lang-card, .about-text-block, .terminal-window, .contact-terminal, .project-panels'
    );
    targets.forEach(function (el, index) {
        el.classList.add('animate-on-scroll');
        el.style.transitionDelay = (index % 5) * 0.08 + 's';
        observer.observe(el);
    });
}, 300);

/* ===================================================
   5. TYPEWRITER EFFECT
   =================================================== */
const typingElement = document.getElementById('typingText');
const typingSpeed = 70;
const deletingSpeed = 35;
const pauseTime = 2200;

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingTimeout = null;

function typeText() {
    const texts = typingTexts[currentLang];
    const currentText = texts[textIndex % texts.length];

    if (isDeleting) {
        charIndex--;
        typingElement.textContent = currentText.substring(0, charIndex);

        if (charIndex === 0) {
            isDeleting = false;
            textIndex++;
            typingTimeout = setTimeout(typeText, 400);
            return;
        }
        typingTimeout = setTimeout(typeText, deletingSpeed);
    } else {
        charIndex++;
        typingElement.textContent = currentText.substring(0, charIndex);

        if (charIndex === currentText.length) {
            isDeleting = true;
            typingTimeout = setTimeout(typeText, pauseTime);
            return;
        }
        typingTimeout = setTimeout(typeText, typingSpeed);
    }
}

function restartTyping() {
    if (typingTimeout) clearTimeout(typingTimeout);
    charIndex = 0;
    isDeleting = false;
    typingElement.textContent = '';
    typeText();
}


/* ===================================================
   6. INTERACTIVE DOT GRID BACKGROUND
   =================================================== */
function initInteractiveGrid() {
    const canvas = document.getElementById('gridCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let mouse = { x: -9999, y: -9999 };
    const SPACING = 26;
    const BASE_R  = 1.4;
    const INFLUENCE = 130;

    function resize() {
        canvas.width  = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    window.addEventListener('mousemove', function(e) {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });
    window.addEventListener('mouseleave', function() {
        mouse.x = -9999;
        mouse.y = -9999;
    });

    function getColor() {
        var dark = document.documentElement.getAttribute('data-theme') === 'dark';
        return dark ? [192, 132, 252] : [168, 85, 247];
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        var clr = getColor();
        var r = clr[0], g = clr[1], b = clr[2];
        var cols = Math.ceil(canvas.width  / SPACING) + 1;
        var rows = Math.ceil(canvas.height / SPACING) + 1;

        for (var i = 0; i < cols; i++) {
            for (var j = 0; j < rows; j++) {
                var x = i * SPACING;
                var y = j * SPACING;
                var dist = Math.hypot(mouse.x - x, mouse.y - y);
                var radius = BASE_R;
                var alpha  = 0.13;

                if (dist < INFLUENCE) {
                    var f = 1 - dist / INFLUENCE;
                    radius = BASE_R + f * 4;
                    alpha  = 0.13 + f * 0.6;
                }

                ctx.beginPath();
                ctx.arc(x, y, radius, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(' + r + ',' + g + ',' + b + ',' + alpha + ')';
                ctx.fill();
            }
        }
        requestAnimationFrame(draw);
    }
    draw();
}

/* ===================================================
   7. URL BAR ANIMATION
   =================================================== */
function animateUrlBar() {
    var urlDomain = document.getElementById('urlDomain');
    var urlCursor = document.getElementById('urlCursor');
    if (!urlDomain) return;

    var text = 'nurkumbasar.com';
    var i = 0;
    urlDomain.textContent = '';

    function typeChar() {
        if (i < text.length) {
            urlDomain.textContent += text[i++];
            setTimeout(typeChar, 60 + Math.random() * 50);
        } else {
            setTimeout(function() {
                if (urlCursor) urlCursor.style.display = 'none';
            }, 1500);
        }
    }
    setTimeout(typeChar, 700);
}

/* ===================================================
   8. THEME TOGGLE (Dark / Light)
   =================================================== */
function initTheme() {
    const toggleBtn = document.getElementById('themeToggle');
    if (!toggleBtn) return;
    const icon = toggleBtn.querySelector('i');

    const savedTheme = localStorage.getItem('theme');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const currentTheme = savedTheme || (systemDark ? 'dark' : 'light');

    document.documentElement.setAttribute('data-theme', currentTheme);
    updateIcon(currentTheme);

    toggleBtn.addEventListener('click', function () {
        const active = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', active);
        localStorage.setItem('theme', active);
        updateIcon(active);
    });

    function updateIcon(theme) {
        if (!icon) return;
        icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
}

/* ===================================================
   8. INTERACTIVE TERMINAL
   =================================================== */
function initTerminal() {
    const input = document.getElementById('terminalInput');
    const body = document.getElementById('terminalBody');
    if (!input || !body) return;

    body.addEventListener('click', function () {
        input.focus();
    });

    input.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            const cmd = input.value.trim();
            input.value = '';
            if (cmd) executeCommand(cmd);
        }
    });

    function printLine(text, cssClass) {
        const line = document.createElement('div');
        line.className = 'terminal-line ' + (cssClass || '');
        line.innerHTML = text;
        body.insertBefore(line, input.parentElement);
        body.scrollTop = body.scrollHeight;
    }

    function executeCommand(cmd) {
        printLine('<span class="terminal-prompt">visitor@nurkumbasar:~$</span> ' + cmd);
        const clean = cmd.toLowerCase().split(' ')[0];

        if (clean === 'help') {
            if (currentLang === 'tr') {
                printLine('Kullanılabilir komutlar:', 'text-yellow');
                printLine('&nbsp;&nbsp;<b>help</b>     : Komut listesini gösterir');
                printLine('&nbsp;&nbsp;<b>about</b>    : Hakkımda özetini yazdırır');
                printLine('&nbsp;&nbsp;<b>skills</b>   : Teknik yeteneklerimi listeler');
                printLine('&nbsp;&nbsp;<b>projects</b> : Projelerimi gösterir');
                printLine('&nbsp;&nbsp;<b>theme</b>    : Temayı değiştirir');
                printLine('&nbsp;&nbsp;<b>clear</b>    : Ekranı temizler');
                printLine('&nbsp;&nbsp;<b>hack</b>     : Sürpriz easter egg 🥚');
            } else {
                printLine('Available commands:', 'text-yellow');
                printLine('&nbsp;&nbsp;<b>help</b>     : Show this list');
                printLine('&nbsp;&nbsp;<b>about</b>    : Print a summary about me');
                printLine('&nbsp;&nbsp;<b>skills</b>   : List my technical skills');
                printLine('&nbsp;&nbsp;<b>projects</b> : Show my featured projects');
                printLine('&nbsp;&nbsp;<b>theme</b>    : Toggle dark/light theme');
                printLine('&nbsp;&nbsp;<b>clear</b>    : Clear the terminal');
                printLine('&nbsp;&nbsp;<b>hack</b>     : A fun easter egg 🥚');
            }
        }
        else if (clean === 'about') {
            const aboutEl = document.querySelector('.about-text');
            if (aboutEl) printLine(aboutEl.textContent.trim());
            else printLine('Computer Engineering student at Kadir Has University.');
        }
        else if (clean === 'skills') {
            if (currentLang === 'tr') {
                printLine('--- Teknik Yetenekler ---', 'text-cyan');
                printLine('&bull; <b>Diller:</b> C++, Java, Python');
                printLine('&bull; <b>Araçlar:</b> Git, MySQL, MATLAB, Simulink, Wireshark');
                printLine('&bull; <b>Kavramlar:</b> OOP, Yazılım Testi, Proje Yönetimi');
            } else {
                printLine('--- Technical Skills ---', 'text-cyan');
                printLine('&bull; <b>Languages:</b> C++, Java, Python');
                printLine('&bull; <b>Tools:</b> Git, MySQL, MATLAB, Simulink, Wireshark');
                printLine('&bull; <b>Concepts:</b> OOP, Software Testing, Project Management');
            }
        }
        else if (clean === 'projects') {
            if (currentLang === 'tr') {
                printLine('--- Projeler ---', 'text-cyan');
                printLine('&bull; <b>GreenGrocer:</b> JavaFX & MySQL tabanlı market uygulaması');
                printLine('&bull; <b>RAM Design:</b> MATLAB & Simulink RAM simülasyonu');
                printLine('&bull; <b>DSA:</b> C++ veri yapıları ve algoritmalar');
            } else {
                printLine('--- Projects ---', 'text-cyan');
                printLine('&bull; <b>GreenGrocer:</b> JavaFX & MySQL grocery management app');
                printLine('&bull; <b>RAM Design:</b> MATLAB & Simulink RAM simulation');
                printLine('&bull; <b>DSA:</b> C++ data structures and algorithms');
            }
        }
        else if (clean === 'theme') {
            const active = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', active);
            localStorage.setItem('theme', active);
            const navIcon = document.querySelector('#themeToggle i');
            if (navIcon) navIcon.className = active === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
            printLine(currentLang === 'tr' ? `Tema '${active}' olarak değiştirildi.` : `Theme switched to '${active}'.`, 'text-green');
        }
        else if (clean === 'clear') {
            body.querySelectorAll('.terminal-line').forEach(function (l) { l.remove(); });
        }
        else if (clean === 'hack') {
            printLine('🦖 launching no-internet.exe...', 'text-yellow');
            setTimeout(function () {
                var wrapper = document.getElementById('dinoGameWrapper');
                if (wrapper) {
                    wrapper.style.display = 'block';
                    // scroll into view
                    wrapper.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    // init the game
                    if (typeof startDinoGame === 'function') startDinoGame();
                }
                printLine('Oyun başlatıldı! [ SPACE ] zıpla  [ ↓ ] eğil  [ ESC ] kapat', 'text-green');
            }, 400);
        }
        else {
            printLine(
                currentLang === 'tr'
                    ? `Komut bulunamadı: '${clean}'. 'help' yazın.`
                    : `Command not found: '${clean}'. Type 'help'.`,
                'text-red'
            );
        }
    }
}

/* ===================================================
   9. PROJECT TABS
   =================================================== */
function initProjectTabs() {
    const tabs = document.querySelectorAll('.project-tab');
    const panels = document.querySelectorAll('.project-panel');

    tabs.forEach(function (tab) {
        tab.addEventListener('click', function () {
            const idx = tab.getAttribute('data-index');

            tabs.forEach(function (t) { t.classList.remove('active'); });
            panels.forEach(function (p) { p.classList.remove('active'); });

            tab.classList.add('active');
            const target = document.querySelector('.project-panel[data-panel="' + idx + '"]');
            if (target) target.classList.add('active');
        });
    });
}


/* ===================================================
   INIT ON DOM READY
   =================================================== */
document.addEventListener('DOMContentLoaded', function () {
    setTimeout(typeText, 1200);
    initTheme();
    // initInteractiveGrid removed (aurora CSS background used instead)
    animateUrlBar();
    initTerminal();
    initProjectTabs();
    initDinoGame();
});

/* ===================================================
   CHROME DINO GAME
   =================================================== */
function initDinoGame() {
    var canvas = document.getElementById('dinoCanvas');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');

    var W = 0, H = 0, GROUND_Y = 0;
    var DINO_W = 26, DINO_H = 38;
    var score = 0, hiScore = 0;
    var speed = 4;
    var gameRunning = false, gameOver = false, started = false;
    var animId = null;
    var dino = { x: 55, y: 0, vy: 0, ducking: false, dead: false };
    var cacti = [];
    var spawnTimer = 0, spawnInterval = 90;

    function resize() {
        W = canvas.offsetWidth || 500;
        H = canvas.offsetHeight || 160;
        canvas.width = W;
        canvas.height = H;
        GROUND_Y = H - 30;
        if (!gameRunning) dino.y = GROUND_Y - DINO_H;
    }

    function isDark() { return document.documentElement.getAttribute('data-theme') === 'dark'; }

    function getColors() {
        var dark = isDark();
        return {
            bg:       dark ? '#0f0c1e' : '#f5f0ff',
            ground:   dark ? '#3b3060' : '#c4b5fd',
            dino:     dino.dead ? '#ef4444' : '#a855f7',
            cactus:   '#7c3aed',
            text:     dark ? '#e9d5ff' : '#4c1d95',
            muted:    dark ? '#7c3aed' : '#a78bfa',
        };
    }

    // Simple pixel dino: array of [x,y,w,h] rects relative to dino origin
    var DINO_RECTS = [[4,14,14,12],[10,0,16,14],[2,22,5,8],[15,22,5,8]]; // body,head,leg1,leg2

    function drawDino(ox, oy, color) {
        ctx.fillStyle = color;
        var isD = dino.ducking && !dino.dead;
        DINO_RECTS.forEach(function(r) {
            ctx.fillRect(ox + r[0] + (isD ? 4 : 0), oy + r[1] + (isD ? 10 : 0), r[2], r[3]);
        });
        ctx.fillStyle = isDark() ? '#0f0c1e' : '#fff'; // eye
        ctx.fillRect(ox + (isD ? 20 : 21), oy + (isD ? 12 : 3), 4, 4);
    }

    function drawCactus(c) {
        ctx.fillStyle = '#7c3aed';
        ctx.fillRect(c.x + Math.floor(c.w/2)-3, c.y, 6, c.h);  // trunk
        ctx.fillRect(c.x, c.y + c.h*0.25, c.w, 5);             // arms
        ctx.fillRect(c.x, c.y + c.h*0.1, 5, c.h*0.35);
        ctx.fillRect(c.x + c.w - 5, c.y + c.h*0.15, 5, c.h*0.3);
    }

    function draw() {
        var col = getColors();
        ctx.fillStyle = col.bg; ctx.fillRect(0, 0, W, H);
        ctx.fillStyle = col.ground; ctx.fillRect(0, GROUND_Y, W, 2);

        var dy = dino.ducking ? dino.y + 10 : dino.y;
        drawDino(dino.x, dy, col.dino);
        cacti.forEach(function(c) { drawCactus(c); });

        // Score
        ctx.fillStyle = col.text;
        ctx.font = '600 12px "Geist Mono", monospace';
        ctx.textAlign = 'right';
        ctx.fillText('HI ' + String(hiScore).padStart(5,'0') + '  ' + String(score).padStart(5,'0'), W - 10, 20);
        ctx.textAlign = 'left';

        if (!started && !gameOver) {
            ctx.fillStyle = col.text;
            ctx.font = 'bold 14px "Geist Mono", monospace';
            ctx.textAlign = 'center';
            var isEn = (typeof currentLang !== 'undefined' && currentLang === 'en');
            ctx.fillText(isEn ? '[ SPACE ] or click → start 🦖' : '[ SPACE ] veya tıkla → başla 🦖', W/2, H/2 - 8);
            ctx.fillStyle = col.muted;
            ctx.font = '10px "Geist Mono", monospace';
            ctx.fillText(isEn ? '// play without internet' : '// internet olmadan oyna', W/2, H/2 + 10);
            ctx.textAlign = 'left';
        }
        if (gameOver) {
            var isEn2 = (typeof currentLang !== 'undefined' && currentLang === 'en');
            ctx.fillStyle = col.text;
            ctx.font = 'bold 14px "Geist Mono", monospace';
            ctx.textAlign = 'center';
            ctx.fillText(isEn2 ? 'GAME OVER — press [ SPACE ] to retry' : 'GAME OVER — tekrar oyna: [ SPACE ]', W/2, H/2);
            ctx.textAlign = 'left';
        }
    }

    function spawnCactus() {
        var h = 22 + Math.random() * 22;
        var w = 14 + Math.random() * 10;
        cacti.push({ x: W + 8, y: GROUND_Y - h, w: w, h: h });
    }

    function collides(c) {
        var pad = 5, dh = dino.ducking ? 16 : 0;
        return (dino.x + pad < c.x + c.w) && (dino.x + DINO_W - pad > c.x) &&
               (dino.y + dh + pad < c.y + c.h) && (dino.y + DINO_H - pad > c.y);
    }

    function loop() {
        if (!gameRunning) return;
        dino.vy += 0.72; dino.y += dino.vy;
        if (dino.y >= GROUND_Y - DINO_H) { dino.y = GROUND_Y - DINO_H; dino.vy = 0; }
        for (var i = 0; i < cacti.length; i++) cacti[i].x -= speed;
        cacti = cacti.filter(function(c) { return c.x + c.w > 0; });
        if (++spawnTimer >= spawnInterval) { spawnCactus(); spawnTimer = 0; spawnInterval = 55 + Math.random() * 65; }
        for (var j = 0; j < cacti.length; j++) {
            if (collides(cacti[j])) {
                gameRunning = false; gameOver = true; dino.dead = true;
                if (score > hiScore) hiScore = score;
                draw(); return;
            }
        }
        score++;
        if (score % 300 === 0) speed = Math.min(speed + 0.5, 13);
        draw();
        animId = requestAnimationFrame(loop);
    }

    function jump() {
        if (!started || gameOver) { resetGame(); return; }
        if (!dino.ducking && dino.y >= GROUND_Y - DINO_H - 2) dino.vy = -12.5;
    }

    function resetGame() {
        score = 0; speed = 4; cacti = []; spawnTimer = 0; spawnInterval = 90;
        dino.y = GROUND_Y - DINO_H; dino.vy = 0; dino.dead = false; dino.ducking = false;
        gameOver = false; gameRunning = true; started = true;
        if (animId) cancelAnimationFrame(animId);
        loop();
    }

    // Exposed so 'hack' command can call it
    window.startDinoGame = function() {
        resize();
        if (!started) { draw(); } else { resetGame(); }
    };

    // ESC closes the game
    document.addEventListener('keydown', function(e) {
        if (e.code === 'Escape') {
            var wrapper = document.getElementById('dinoGameWrapper');
            if (wrapper && wrapper.style.display !== 'none') {
                gameRunning = false;
                if (animId) cancelAnimationFrame(animId);
                wrapper.style.display = 'none';
            }
        }
        if (e.code === 'Space' || e.code === 'ArrowUp') {
            var wrapper2 = document.getElementById('dinoGameWrapper');
            if (wrapper2 && wrapper2.style.display !== 'none') {
                e.preventDefault();
                jump();
            }
        }
        if (e.code === 'ArrowDown') {
            var wrapper3 = document.getElementById('dinoGameWrapper');
            if (wrapper3 && wrapper3.style.display !== 'none') dino.ducking = true;
        }
    });
    document.addEventListener('keyup', function(e) {
        if (e.code === 'ArrowDown') dino.ducking = false;
    });
    canvas.addEventListener('click', function() { jump(); });
    canvas.addEventListener('touchstart', function(e) { e.preventDefault(); jump(); }, { passive: false });

    // Initial draw (hidden, just preps canvas)
    window.addEventListener('resize', function() { if (gameRunning || started) resize(); });
    resize();
    draw();
}


