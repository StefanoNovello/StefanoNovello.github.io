document.addEventListener('DOMContentLoaded', function() {
    // Language switching functionality
    const langDe = document.getElementById('lang-de');
    const langIt = document.getElementById('lang-it');
    const langEn = document.getElementById('lang-en');
    
    const contentDe = document.getElementById('content-de');
    const contentIt = document.getElementById('content-it');
    const contentEn = document.getElementById('content-en');
    
    function switchToDe() {
        contentDe.classList.add('active');
        contentIt.classList.remove('active');
        contentEn.classList.remove('active');
        
        langDe.classList.add('active');
        langIt.classList.remove('active');
        langEn.classList.remove('active');
        
        saveLanguagePref('de');
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
    
    function switchToIt() {
        contentDe.classList.remove('active');
        contentIt.classList.add('active');
        contentEn.classList.remove('active');
        
        langDe.classList.remove('active');
        langIt.classList.add('active');
        langEn.classList.remove('active');
        
        saveLanguagePref('it');
    }
    
    function switchToEn() {
        contentDe.classList.remove('active');
        contentIt.classList.remove('active');
        contentEn.classList.add('active');
        
        langDe.classList.remove('active');
        langIt.classList.remove('active');
        langEn.classList.add('active');
        
        saveLanguagePref('en');
    }
    
    // Add event listeners
    langDe.addEventListener('click', switchToDe);
    langIt.addEventListener('click', switchToIt);
    langEn.addEventListener('click', switchToEn);
    
    // Check for language preference in localStorage
    const savedLang = localStorage.getItem('tumainiLang');
    if (savedLang) {
        if (savedLang === 'de') switchToDe();
        if (savedLang === 'it') switchToIt();
        if (savedLang === 'en') switchToEn();
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