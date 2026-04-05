/* ===================================================
   JAVASCRIPT - Etkileşim ve Animasyonlar
   ===================================================
   Bu dosya sayfamıza hayat veren özellikleri içerir:
   1. Dil değiştirme (TR ↔ EN)
   2. Navbar kaydırma efekti
   3. Mobil menü açma/kapama
   4. Scroll animasyonları
   5. Yazı yazma (typing) efekti
   =================================================== */

/* ===================================================
   1. DİL DEĞİŞTİRME SİSTEMİ
   ===================================================
   Her HTML elementinde data-tr ve data-en nitelikleri
   kullanıyoruz. Dil değiştiğinde bu niteliklerdeki
   metinler elementlerin içeriğine aktarılır.
   
   "let" → değişebilen bir değişken tanımlar
   "const" → değişmeyen bir sabit tanımlar
   =================================================== */

let currentLang = 'tr'; // Başlangıç dili: Türkçe

// Typing efekti için dile göre metinler (emoji yok)
const typingTexts = {
    tr: ['Bilgisayar Mühendisi', 'QA Stajyeri'],
    en: ['Computer Engineer', 'QA Intern']
};

// Her metin için Font Awesome ikon sınıfları
const typingIcons = [
    'fas fa-laptop-code',   // Bilgisayar Mühendisi
    'fas fa-bug',           // QA Stajyeri
];

/* ---------------------------------------------------
   switchLanguage() Fonksiyonu
   ---------------------------------------------------
   Bu fonksiyon çağrıldığında:
   1. Dili tr → en veya en → tr yapar
   2. Sayfadaki tüm data-tr/data-en'li elementleri bulur
   3. İçeriklerini seçilen dildeki metinle değiştirir
   4. Buton görünümünü günceller
   --------------------------------------------------- */
function switchLanguage() {
    // Dili değiştir (ternary operatör: koşul ? doğruysa : yanlışsa)
    currentLang = currentLang === 'tr' ? 'en' : 'tr';

    // Sayfadaki tüm çevrilebilir elementleri bul
    // querySelectorAll → CSS seçicisiyle eşleşen TÜM elementleri döndürür
    // [data-tr] → data-tr niteliği olan elementleri seçer
    const elements = document.querySelectorAll('[data-tr]');

    // Her element için dili değiştir
    // forEach → dizideki her eleman için fonksiyonu çalıştırır
    elements.forEach(function (element) {
        const newText = element.getAttribute('data-' + currentLang);
        if (newText) {
            element.textContent = newText;
        }
    });

    // Dil butonundaki aktif/pasif yazıyı güncelle
    const langToggle = document.getElementById('langToggle');
    if (currentLang === 'en') {
        langToggle.innerHTML = '<span class="lang-inactive">TR</span> / <span class="lang-active">EN</span>';
    } else {
        langToggle.innerHTML = '<span class="lang-active">TR</span> / <span class="lang-inactive">EN</span>';
    }

    // Typing efektini yeni dilde yeniden başlat
    restartTyping();
}

// Dil butonuna tıklama olayını bağla
// addEventListener → bir elemente olay dinleyici ekler
// 'click' → tıklama olayı
document.getElementById('langToggle').addEventListener('click', switchLanguage);


/* ===================================================
   2. NAVBAR KAYDIRMA EFEKTİ
   ===================================================
   Sayfa aşağı kaydırıldığında navbar'a arka plan
   ve gölge eklenir. 50px aşağı indiğinde tetiklenir.
   
   window.addEventListener('scroll', ...) → sayfa 
   her kaydırıldığında çalışan bir fonksiyon tanımlar.
   =================================================== */
const navbar = document.getElementById('navbar');

const scrollIndicator = document.querySelector('.scroll-indicator');

window.addEventListener('scroll', function () {
    // scrollY → sayfanın ne kadar aşağı kaydırıldığı (piksel)
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Scroll indicator: hero bölümünden çıkınca gizle
    if (scrollIndicator) {
        if (window.scrollY > 50) {
            scrollIndicator.classList.add('hidden');
        } else {
            scrollIndicator.classList.remove('hidden');
        }
    }
});


/* ===================================================
   3. MOBİL MENÜ (Hamburger)
   ===================================================
   Hamburger butonuna tıklayınca menü açılır/kapanır.
   Bir menü linkine tıklayınca menü otomatik kapanır.
   =================================================== */
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', function () {
    // toggle → class varsa kaldır, yoksa ekle
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Menü linklerine tıklayınca menüyü kapat
navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});


/* ===================================================
   4. SCROLL ANİMASYONLARI (Intersection Observer)
   ===================================================
   Sayfa kaydırıldığında elementler görünüm alanına 
   girince yavaşça belirir. Bu, "Intersection Observer"
   API'si ile yapılır — modern ve performanslı bir yöntem.
   
   - threshold: 0.15 → elementin %15'i göründüğünde tetikle
   - entry.isIntersecting → element görünüm alanında mı?
   =================================================== */
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px' // Alt kenardan 50px önce tetikle
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Bir kez animasyon çaldıktan sonra izlemeyi bırak
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Animasyon uygulanacak elementleri seç ve Observer'a kaydet
// Biraz gecikmeyle başlat ki sayfa yüklensin
setTimeout(function () {
    // Her bölümdeki kartlara ve elementlere animasyon class'ı ekle
    const animateTargets = document.querySelectorAll(
        '.about-card, .stat-card, .timeline-item, .edu-card, .skill-category, .contact-card'
    );

    animateTargets.forEach(function (element, index) {
        element.classList.add('animate-on-scroll');
        // Her elemente hafif gecikme ekle (sırayla görünsün)
        element.style.transitionDelay = (index % 4) * 0.1 + 's';
        observer.observe(element);
    });
}, 300);


/* ===================================================
   5. YAZI YAZMA (TYPING) EFEKTİ
   ===================================================
   Hero bölümünde metinler tek tek karakterle yazılır,
   silinir ve sonraki metne geçer. Bu, profesyonel
   portfolio sitelerinde çok kullanılan bir efekttir.
   
   - typingSpeed: bir harfin yazılma süresi (ms)
   - deletingSpeed: bir harfin silinme süresi (ms)
   - pauseTime: metin tamamlandıktan sonra bekleme
   =================================================== */
const typingElement = document.getElementById('typingText');
const typingIconEl = document.getElementById('typingIcon');
const typingSpeed = 80;     // ms — yazma hızı
const deletingSpeed = 40;   // ms — silme hızı
const pauseTime = 2000;     // ms — bekleme süresi

let textIndex = 0;      // Şuanki metin indeksi
let charIndex = 0;       // Şuanki karakter indeksi
let isDeleting = false;  // Silme modunda mıyız?
let typingTimeout = null; // Zamanlayıcı referansı

function updateTypingIcon() {
    if (typingIconEl) {
        const iconClass = typingIcons[textIndex % typingIcons.length];
        typingIconEl.className = 'typing-icon ' + iconClass;
    }
}

function typeText() {
    // Mevcut dildeki metinleri al
    const texts = typingTexts[currentLang];
    const currentText = texts[textIndex % texts.length];

    if (isDeleting) {
        // SİLME MODU: her adımda bir karakter sil
        charIndex--;
        typingElement.textContent = currentText.substring(0, charIndex);

        if (charIndex === 0) {
            // Tüm metin silindi, sonraki metne geç
            isDeleting = false;
            textIndex++;
            updateTypingIcon(); // İkonu güncelle
            typingTimeout = setTimeout(typeText, 400); // Kısa bekleme
            return;
        }
        typingTimeout = setTimeout(typeText, deletingSpeed);
    } else {
        // YAZMA MODU: her adımda bir karakter ekle
        charIndex++;
        typingElement.textContent = currentText.substring(0, charIndex);

        if (charIndex === currentText.length) {
            // Metin tamamlandı, biraz bekle sonra silmeye başla
            isDeleting = true;
            typingTimeout = setTimeout(typeText, pauseTime);
            return;
        }
        typingTimeout = setTimeout(typeText, typingSpeed);
    }
}

// Typing efektini yeniden başlat (dil değiştiğinde)
function restartTyping() {
    // Mevcut zamanlayıcıyı temizle
    if (typingTimeout) {
        clearTimeout(typingTimeout);
    }
    charIndex = 0;
    isDeleting = false;
    typingElement.textContent = '';
    typeText();
}

// Sayfa yüklendiğinde typing efektini başlat
// DOMContentLoaded → HTML tamamen yüklendikten sonra çalışır
document.addEventListener('DOMContentLoaded', function () {
    setTimeout(typeText, 1500); // 1.5 saniye sonra başla
});
