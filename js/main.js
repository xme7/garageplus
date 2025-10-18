document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initServicesCarousel();
    initReviews();
    initMap();
    initContactForm();
    initBackToTop();
});

function initNavigation() {
    const header = document.getElementById('header');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - 100) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }

            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                bsCollapse.hide();
            }
        });
    });
}

function initServicesCarousel() {
    const carousel = document.getElementById('servicesCarousel');
    const prevBtn = document.getElementById('servicesPrev');
    const nextBtn = document.getElementById('servicesNext');
    const dotsContainer = document.getElementById('servicesDots');
    const cards = carousel.querySelectorAll('.service-card');

    let currentIndex = 0;
    let isDown = false;
    let startX;
    let scrollLeft;
    let cardWidth = 0;
    let visibleCards = 3;

    function updateCarouselLayout() {
        const containerWidth = carousel.offsetWidth;
        if (window.innerWidth < 768) {
            visibleCards = 1;
        } else if (window.innerWidth < 992) {
            visibleCards = 2;
        } else {
            visibleCards = 3;
        }

        cardWidth = cards[0].offsetWidth + 24;
        updateDots();
    }

    function updateDots() {
        dotsContainer.innerHTML = '';
        const totalDots = Math.ceil(cards.length - visibleCards + 1);

        for (let i = 0; i < totalDots; i++) {
            const dot = document.createElement('button');
            dot.className = 'carousel-dot';
            dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
            if (i === currentIndex) {
                dot.classList.add('active');
            }
            dot.addEventListener('click', () => scrollToIndex(i));
            dotsContainer.appendChild(dot);
        }
    }

    function scrollToIndex(index) {
        currentIndex = Math.max(0, Math.min(index, cards.length - visibleCards));
        const scrollPosition = currentIndex * cardWidth;
        carousel.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
        });
        updateActiveDot();
    }

    function updateActiveDot() {
        const dots = dotsContainer.querySelectorAll('.carousel-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            scrollToIndex(currentIndex - 1);
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentIndex < cards.length - visibleCards) {
            scrollToIndex(currentIndex + 1);
        }
    });

    carousel.addEventListener('mousedown', (e) => {
        isDown = true;
        carousel.style.cursor = 'grabbing';
        startX = e.pageX - carousel.offsetLeft;
        scrollLeft = carousel.scrollLeft;
    });

    carousel.addEventListener('mouseleave', () => {
        isDown = false;
        carousel.style.cursor = 'grab';
    });

    carousel.addEventListener('mouseup', () => {
        isDown = false;
        carousel.style.cursor = 'grab';

        const newIndex = Math.round(carousel.scrollLeft / cardWidth);
        currentIndex = Math.max(0, Math.min(newIndex, cards.length - visibleCards));
        updateActiveDot();
    });

    carousel.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - carousel.offsetLeft;
        const walk = (x - startX) * 2;
        carousel.scrollLeft = scrollLeft - walk;
    });

    carousel.addEventListener('touchstart', (e) => {
        startX = e.touches[0].pageX - carousel.offsetLeft;
        scrollLeft = carousel.scrollLeft;
    });

    carousel.addEventListener('touchmove', (e) => {
        const x = e.touches[0].pageX - carousel.offsetLeft;
        const walk = (x - startX) * 2;
        carousel.scrollLeft = scrollLeft - walk;
    });

    carousel.addEventListener('touchend', () => {
        const newIndex = Math.round(carousel.scrollLeft / cardWidth);
        currentIndex = Math.max(0, Math.min(newIndex, cards.length - visibleCards));
        scrollToIndex(currentIndex);
    });

    window.addEventListener('resize', updateCarouselLayout);
    updateCarouselLayout();
}

function initReviews() {
    const reviewsContainer = document.getElementById('reviewsContainer');

    const mockReviews = [
        {
            name: "John Smith",
            rating: 5,
            text: "Excellent service! The team was professional, transparent about costs, and my car runs perfectly. Highly recommend Local Workshop for any automotive needs.",
            date: "2 weeks ago"
        },
        {
            name: "Maria Garcia",
            rating: 5,
            text: "Best mechanic shop in town! They fixed my transmission issue quickly and at a fair price. The staff is friendly and knowledgeable.",
            date: "1 month ago"
        },
        {
            name: "David Chen",
            rating: 5,
            text: "I've been coming here for years. Always reliable, honest, and they stand behind their work. Won't take my car anywhere else.",
            date: "3 weeks ago"
        },
        {
            name: "Sarah Johnson",
            rating: 4,
            text: "Great bodywork and painting service. My car looks brand new after the collision repair. Very satisfied with the results.",
            date: "1 week ago"
        },
        {
            name: "Michael Brown",
            rating: 5,
            text: "Fast and efficient service. They diagnosed the problem quickly and had me back on the road the same day. Excellent customer service.",
            date: "2 months ago"
        },
        {
            name: "Lisa Anderson",
            rating: 5,
            text: "Fair prices and quality work. The mechanics take time to explain everything and never try to upsell unnecessary services.",
            date: "1 month ago"
        }
    ];

    setTimeout(() => {
        displayReviews(mockReviews.slice(0, 3));
    }, 800);

    function displayReviews(reviews) {
        reviewsContainer.innerHTML = '';

        reviews.forEach(review => {
            const reviewCard = document.createElement('div');
            reviewCard.className = 'review-card';

            const stars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
            const initials = review.name.split(' ').map(n => n[0]).join('');

            reviewCard.innerHTML = `
                <div class="review-header">
                    <div class="review-avatar">${initials}</div>
                    <div class="review-info">
                        <h4>${review.name}</h4>
                        <div class="review-rating">${stars}</div>
                    </div>
                </div>
                <p class="review-text">${review.text}</p>
                <small style="color: var(--color-dark-grey);">${review.date}</small>
            `;

            reviewsContainer.appendChild(reviewCard);
        });
    }
}

function initMap() {
    window.initMap = function() {
        const workshopLocation = { lat: 40.7128, lng: -74.0060 };

        const map = new google.maps.Map(document.getElementById('map'), {
            zoom: 15,
            center: workshopLocation,
            styles: [
                {
                    featureType: 'all',
                    elementType: 'geometry',
                    stylers: [{ saturation: -30 }]
                }
            ]
        });

        new google.maps.Marker({
            position: workshopLocation,
            map: map,
            title: 'Local Workshop',
            animation: google.maps.Animation.DROP
        });
    };

    if (typeof google === 'undefined' || typeof google.maps === 'undefined') {
        const mapElement = document.getElementById('map');
        mapElement.style.background = 'linear-gradient(135deg, #333 0%, #000 100%)';
        mapElement.style.display = 'flex';
        mapElement.style.alignItems = 'center';
        mapElement.style.justifyContent = 'center';
        mapElement.innerHTML = '<p style="color: white; text-align: center; padding: 2rem;">Map placeholder - Add your Google Maps API key</p>';
    }
}

function initContactForm() {
    const form = document.getElementById('contactForm');
    const phoneInput = document.getElementById('phone');
    const formMessage = document.getElementById('formMessage');
    const submitBtn = document.getElementById('submitBtn');

    let iti;
    if (typeof intlTelInput !== 'undefined') {
        iti = intlTelInput(phoneInput, {
            initialCountry: 'auto',
            geoIpLookup: function(callback) {
                fetch('https://ipapi.co/json/')
                    .then(res => res.json())
                    .then(data => callback(data.country_code))
                    .catch(() => callback('us'));
            },
            utilsScript: 'https://cdn.jsdelivr.net/npm/intl-tel-input@18.2.1/build/js/utils.js'
        });
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const phone = phoneInput.value.trim();
        const message = document.getElementById('message').value.trim();

        if (!name || !phone || !message) {
            showMessage('Please fill in all fields', 'error');
            return;
        }

        if (iti && !iti.isValidNumber()) {
            showMessage('Please enter a valid phone number', 'error');
            phoneInput.classList.add('error');
            return;
        }

        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Sending...</span>';

        try {
            await new Promise(resolve => setTimeout(resolve, 1500));

            showMessage('Thank you! We will contact you soon.', 'success');
            form.reset();

            if (typeof turnstile !== 'undefined') {
                turnstile.reset();
            }
        } catch (error) {
            showMessage('Something went wrong. Please try again.', 'error');
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<span data-i18n="contact.form.submit">Send Message</span>';
            if (window.i18n) {
                window.i18n.translatePage();
            }
        }
    });

    function showMessage(message, type) {
        formMessage.textContent = message;
        formMessage.className = `form-message ${type}`;

        setTimeout(() => {
            formMessage.className = 'form-message';
        }, 5000);
    }

    phoneInput.addEventListener('input', () => {
        phoneInput.classList.remove('error');
    });
}

function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

