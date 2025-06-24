    const galleryContent = [
        {
            src: "img/IMG-20250504-WA0027.jpg",
            alt: {
                de: "Kinder unterstüzt durch TUMAINI",
                en: "Children supported by TUMAINI",
                it: "Bambini che ricevono appoggio da TUMAINI"
            }
        },
        {
            src: "img/IMG-20250508-WA0002.jpg",
            alt: {
                de: "Kinder in der Schule",
                en: "Children at school",
                it: "Bambini a scuola"
            }
        },
        {
            src: "img/16_651ca63b.jpg",
            alt: {
                de: "Kinder in der Schule",
                en: "Children at school",
                it: "Bambini a scuola"
            }
        },
    ];

function detectUserLanguage(supportedLanguages, defaultLanguage = 'de') {
  const userLanguages = navigator.languages || [navigator.language || defaultLanguage];

  for (const lang of userLanguages) {
    const baseLang = lang.toLowerCase().split('-')[0]; // normalize, e.g., 'en-US' → 'en'
    if (supportedLanguages.includes(baseLang)) {
      return baseLang;
    }
  }

  return defaultLanguage;
}

// Example usage:
const supportedLanguages = ['en', 'it', 'de'];


// You can now redirect or load the page in that language
    
document.addEventListener('DOMContentLoaded', function() {
    // Language switching functionality
    const langDe = document.getElementById('lang-de');
    const langIt = document.getElementById('lang-it');
    const langEn = document.getElementById('lang-en');
    
    const contentDe = document.getElementById('content-de');
    const contentIt = document.getElementById('content-it');
    const contentEn = document.getElementById('content-en');



    function renderGallery(lang) {
        console.log(`render gallery ${lang}`)
        const gallery = document.getElementById('gallery-' + lang);
        gallery.innerHTML = galleryContent.map(item => `
          <div class="gallery-item">
            <img src="${item.src}" alt="${item.alt[lang]}">
          </div>
        `).join('');
    }

    function switchTo(langCode) {
        const content = document.getElementById('content-' + langCode);
        const lang = document.getElementById('lang-'+ langCode);
        const langs = [ langDe, langIt, langEn ];
        const contents = [ contentDe, contentIt, contentEn ];
        for (const c of contents) {
             c.classList[c == content ? 'add' : 'remove']('active')
        }
        for (const l of langs) {
            l.classList[l == lang ? 'add' : 'remove']('active')
        }
        renderGallery(langCode);
        saveLanguagePref(langCode);
    }

    function updateScrollPadding() {
        const nav = document.querySelector('nav');
        if (nav && nav.offsetHeight) {
            const navHeight = nav.offsetHeight; // Gets current height (including wrapped lines)
            document.documentElement.style.setProperty(
            '--scroll-padding',
            `${navHeight}px`
            );
            console.log('updated scroll padding to: ',navHeight)
        }
    }

    updateScrollPadding();
    // Run on load and window resize
    window.addEventListener('load', function() {
        console.log('Update scroll padding on load');
        updateScrollPadding();
    });
    window.addEventListener('resize', updateScrollPadding);

    
    // Add event listener
    langDe.addEventListener('click', () => { switchTo('de'); });
    langIt.addEventListener('click', () => { switchTo('it'); });
    langEn.addEventListener('click', () => { switchTo('en'); });
    
    // Check for language preference in localStorage
    const savedLang = localStorage.getItem('tumainiLang');
    if (savedLang) {
        switchTo(savedLang);
    } else {
        const userLang = detectUserLanguage(supportedLanguages);
        console.log(`Detected user language: ${userLang}`);
        switchTo(userLang);
    }
    
    // Save language preference
    function saveLanguagePref(lang) {
        localStorage.setItem('tumainiLang', lang);
    }
    
    // Scroll to top button
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Intersection Observer for scroll animations
    const sections = document.querySelectorAll('section');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        observer.observe(section);
    });
});


function openModal(contentId, lang) {
  const baseUrl = window.location.origin;
  fetch(`${baseUrl}/modals/${contentId}-${lang}.html`)
    .then(response => response.text())
    .then(html => {
      document.getElementById('modalTextContent').innerHTML = html;
      document.getElementById('infoModal').style.display = "block";
    })
    .catch(err => {
      console.error('Error loading modal:', err);
      // Fallback content here
    });
}
function closeModal() {
  document.getElementById('infoModal').style.display = "none";
}

// Close modal when clicking outside content
window.onclick = function(event) {
  const modal = document.getElementById('infoModal');
  if (event.target == modal) {
    closeModal();
  }
}