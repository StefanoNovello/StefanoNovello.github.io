document.addEventListener('DOMContentLoaded', function() {
    // save language selection
    localStorage.setItem('tumainiLang', document.documentElement.lang);
    // Set up modal link handlers
    document.addEventListener('click', function(e) {
        const link = e.target.closest('.modal-link');
        if (link) {
            e.preventDefault();
            const modalId = link.getAttribute('data-modal');
            const lang = document.documentElement.lang;
            openModal(modalId, lang);
        }
    });
    // Initialize gallery
    function initGallery() {
        const galleries = document.querySelectorAll('.gallery');
        if (galleries.length === 0) return;

        galleries.forEach(gallery => {
            gallery.querySelectorAll('.gallery-item img').forEach(img => {
                img.addEventListener('click', function() {
                    const modal = document.getElementById('infoModal');
                    const modalContent = document.getElementById('modalTextContent');
                    modalContent.innerHTML = `
                        <div class="gallery-modal">
                            <img src="${this.src}" alt="${this.alt}">
                            <p class="gallery-caption">${this.alt}</p>
                        </div>
                    `;
                    modal.style.display = "block";
                });
            });
        });
    }
    initGallery();

    // Update scroll padding for smooth anchor navigation
    function updateScrollPadding() {
        const nav = document.querySelector('nav');
        if (nav && nav.offsetHeight) {
            const navHeight = nav.offsetHeight;
            document.documentElement.style.setProperty(
                '--scroll-padding',
                `${navHeight}px`
            );
        }
    }

    updateScrollPadding();
    window.addEventListener('load', updateScrollPadding);
    window.addEventListener('resize', updateScrollPadding);
    
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
    const modal = document.getElementById('infoModal');
    const modalContent = document.getElementById('modalTextContent');
    
    // Show loading state
    modalContent.innerHTML = '<div class="modal-loading">Loading...</div>';
    modal.style.display = "block";
    
    fetch(`/modals/${contentId}`)
        .then(response => {
            if (!response.ok) {
                console.error('Failed to fetch modal:', response.status, response.statusText);
                throw new Error('Modal content not found');
            }
            return response.text();
        })
        .then(html => {
            if (!html.trim()) {
                throw new Error('Empty modal content');
            }
            modalContent.innerHTML = html;
        })
        .catch(err => {
            console.error('Error loading modal:', err);
            modalContent.innerHTML = `
                <div class="modal-error">
                    <h2>Error Loading Content</h2>
                    <p>Sorry, the requested content could not be loaded. Please try again later.</p>
                    <p class="error-details">${err.message}</p>
                </div>
            `;
        });
}

function closeModal() {
    const modal = document.getElementById('infoModal');
    modal.style.display = "none";
    document.getElementById('modalTextContent').innerHTML = '';
}

// Close modal when clicking outside content
window.onclick = function(event) {
    const modal = document.getElementById('infoModal');
    if (event.target == modal) {
        closeModal();
    }
}