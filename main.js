/* 
   Sozha Design & Build - Main JS 
*/

document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    initStickyHeader();
    initHeroSlider();
    initCountryCodes();
});

/* Scroll Animations (Fade Up) */
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-up');
    fadeElements.forEach(el => observer.observe(el));
}

/* Sticky Header Background */
function initStickyHeader() {
    const header = document.querySelector('header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(26, 26, 26, 0.95)';
            header.style.padding = '1rem 0';
            header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.5)';
        } else {
            header.style.background = 'rgba(26, 26, 26, 0.8)'; // Initial state
            header.style.padding = '1.5rem 0';
            header.style.boxShadow = 'none';
        }
    });
}

/* Hero Slider Logic */
function initHeroSlider() {
    const slides = document.querySelectorAll('.slide');
    if (slides.length === 0) return;

    let currentSlide = 0;
    const slideInterval = 5000; // 5 seconds

    setInterval(() => {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }, slideInterval);
}

/* Contact Form Handler */
function handleFormSubmit(event) {
    event.preventDefault();

    // Get values
    const form = event.target;
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    const name = form.querySelector('input[type="text"]').value;
    const email = form.querySelector('input[type="email"]').value;
    const phoneInput = form.querySelector('input[type="tel"]').value;
    const countryCode = form.querySelector('select[name="countryCode"]').value;
    // Prepend a ' to prevent Google Sheets from treating it as a formula
    const phone = `'${countryCode} ${phoneInput}`;
    const message = form.querySelector('textarea').value;

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerText;
    submitBtn.innerText = 'Sending...';
    submitBtn.disabled = true;

    // GOOGLE APPS SCRIPT URL
    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzvZv1cgr2VmEIwSEb1PUm4MecFgK7S4Lbv1r4cp_9Ra8NNbZ6F1zFcSE1K_n1dIzdf0w/exec';

    const date = new Date().toLocaleDateString('en-GB'); // Format: DD/MM/YYYY
    const formData = { date, name, email, phone, message };

    // Send Data
    fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', // Important for Google Apps Script
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
        .then(response => {
            // Show Success Modal
            const modal = document.getElementById('success-modal');
            if (modal) {
                modal.style.display = 'flex';
            } else {
                alert("Message Sent! We will contact you shortly.");
            }

            form.reset();
        })
        .catch(error => {
            console.error('Error!', error.message);
            alert('Something went wrong. Please try again.');
        })
        .finally(() => {
            submitBtn.innerText = originalText;
            submitBtn.disabled = false;
        });
}

/* Country Codes Initialization */
function initCountryCodes() {
    const select = document.querySelector('select[name="countryCode"]');
    if (!select) return;

    const countries = [
        { code: "+91", name: "India (IN)" },
        { code: "+971", name: "UAE (AE)" },
        { code: "+1", name: "USA (US)" },
        { code: "+44", name: "UK (GB)" },
        { code: "+966", name: "Saudi Arabia (SA)" },
        { code: "+974", name: "Qatar (QA)" },
        { code: "+965", name: "Kuwait (KW)" },
        { code: "+968", name: "Oman (OM)" },
        { code: "+973", name: "Bahrain (BH)" },
        { code: "+65", name: "Singapore (SG)" },
        { code: "+60", name: "Malaysia (MY)" },
        { code: "+61", name: "Australia (AU)" },
        { code: "+1", name: "Canada (CA)" },
        { code: "+49", name: "Germany (DE)" },
        { code: "+33", name: "France (FR)" },
        { code: "+39", name: "Italy (IT)" },
        { code: "+81", name: "Japan (JP)" },
        { code: "+86", name: "China (CN)" },
        { code: "+82", name: "South Korea (KR)" },
        { code: "+7", name: "Russia (RU)" },
        { code: "+55", name: "Brazil (BR)" },
        { code: "+27", name: "South Africa (ZA)" },
        { code: "+234", name: "Nigeria (NG)" },
        { code: "+20", name: "Egypt (EG)" },
        { code: "+90", name: "Turkey (TR)" },
        { code: "+62", name: "Indonesia (ID)" },
        { code: "+66", name: "Thailand (TH)" },
        { code: "+84", name: "Vietnam (VN)" },
        { code: "+63", name: "Philippines (PH)" },
        { code: "+92", name: "Pakistan (PK)" },
        { code: "+880", name: "Bangladesh (BD)" },
        { code: "+94", name: "Sri Lanka (LK)" },
        { code: "+977", name: "Nepal (NP)" },
        { code: "+31", name: "Netherlands (NL)" },
        { code: "+32", name: "Belgium (BE)" },
        { code: "+41", name: "Switzerland (CH)" },
        { code: "+46", name: "Sweden (SE)" },
        { code: "+47", name: "Norway (NO)" },
        { code: "+45", name: "Denmark (DK)" },
        { code: "+353", name: "Ireland (IE)" },
        { code: "+34", name: "Spain (ES)" },
        { code: "+351", name: "Portugal (PT)" },
        { code: "+30", name: "Greece (GR)" },
        { code: "+212", name: "Morocco (MA)" },
        { code: "+254", name: "Kenya (KE)" },
        { code: "+255", name: "Tanzania (TZ)" },
        { code: "+256", name: "Uganda (UG)" },
        { code: "+233", name: "Ghana (GH)" },
        { code: "+221", name: "Senegal (SN)" },
        { code: "+358", name: "Finland (FI)" },
        { code: "+43", name: "Austria (AT)" },
        { code: "+420", name: "Czech Republic (CZ)" },
        { code: "+48", name: "Poland (PL)" },
        { code: "+40", name: "Romania (RO)" },
        { code: "+36", name: "Hungary (HU)" },
        { code: "+352", name: "Luxembourg (LU)" },
        { code: "+64", name: "New Zealand (NZ)" },
        { code: "+52", name: "Mexico (MX)" },
        { code: "+54", name: "Argentina (AR)" },
        { code: "+56", name: "Chile (CL)" },
        { code: "+57", name: "Colombia (CO)" },
        { code: "+51", name: "Peru (PE)" },
        { code: "+213", name: "Algeria (DZ)" },
        { code: "+216", name: "Tunisia (TN)" },
        { code: "+218", name: "Libya (LY)" },
        { code: "+249", name: "Sudan (SD)" },
        { code: "+251", name: "Ethiopia (ET)" },
        { code: "+252", name: "Somalia (SO)" },
        { code: "+253", name: "Djibouti (DJ)" },
        { code: "+257", name: "Burundi (BI)" },
        { code: "+258", name: "Mozambique (MZ)" },
        { code: "+260", name: "Zambia (ZM)" },
        { code: "+261", name: "Madagascar (MG)" },
        { code: "+262", name: "Reunion (RE)" },
        { code: "+263", name: "Zimbabwe (ZW)" },
        { code: "+264", name: "Namibia (NA)" },
        { code: "+265", name: "Malawi (MW)" },
        { code: "+266", name: "Lesotho (LS)" },
        { code: "+267", name: "Botswana (BW)" },
        { code: "+268", name: "Swaziland (SZ)" },
        { code: "+269", name: "Comoros (KM)" },
        { code: "+290", name: "Saint Helena (SH)" },
        { code: "+291", name: "Eritrea (ER)" },
        { code: "+297", name: "Aruba (AW)" },
        { code: "+298", name: "Faroe Islands (FO)" },
        { code: "+299", name: "Greenland (GL)" }
    ];

    select.innerHTML = countries.map(c => `<option value="${c.code}">${c.code} (${c.name.split(' (')[1].replace(')', '')}) - ${c.name.split(' (')[0]}</option>`).join('');
}
