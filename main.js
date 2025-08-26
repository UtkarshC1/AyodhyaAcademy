// Ensure the DOM is fully loaded before executing the script.
document.addEventListener('DOMContentLoaded', () => {

    // ------------------------------------------------------------------
    // Mobile Menu Functionality
    // ------------------------------------------------------------------
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuLinks = mobileMenu.querySelectorAll('a');

    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });

    // ------------------------------------------------------------------
    // Scroll-based Header and Back-to-Top Button
    // ------------------------------------------------------------------
    const mainHeader = document.getElementById('main-header');
    const backToTopBtn = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            mainHeader.classList.add('header-scrolled');
        } else {
            mainHeader.classList.remove('header-scrolled');
        }

        if (backToTopBtn) {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        }
    });

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ------------------------------------------------------------------
    // Fade-in Effect on Scroll (Intersection Observer)
    // ------------------------------------------------------------------
    const sections = document.querySelectorAll('.fade-in');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // ------------------------------------------------------------------
    // Academic Calendar Functionality
    // ------------------------------------------------------------------
    const calendarGrid = document.getElementById('calendar-grid');
    const currentMonthYearEl = document.getElementById('current-month-year');
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');

    let currentDate = new Date();

    const events = {
        '2025-01-14': {
            title: 'Hazrat Ali Jayanti / Makar Sankranti',
            type: 'holiday'
        },
        '2025-01-26': {
            title: 'Republic Day',
            type: 'holiday'
        },
        '2025-02-26': {
            title: 'Maha Shivaratri',
            type: 'holiday'
        },
        '2025-03-13': {
            title: 'Holi (Holiday)',
            type: 'holiday'
        },
        '2025-03-14': {
            title: 'Holi (Dhuleti)',
            type: 'holiday'
        },
        '2025-03-31': {
            title: 'Eid-ul-Fitr',
            type: 'holiday'
        },
        '2025-04-06': {
            title: 'Ram Navami',
            type: 'holiday'
        },
        '2025-04-10': {
            title: 'Mahavir Jayanti',
            type: 'holiday'
        },
        '2025-04-14': {
            title: 'Dr. B. R. Ambedkar Jayanti',
            type: 'holiday'
        },
        '2025-04-18': {
            title: 'Good Friday',
            type: 'holiday'
        },
        '2025-05-12': {
            title: 'Buddha Purnima',
            type: 'holiday'
        },
        '2025-06-07': {
            title: 'Eid-ul-Zuha (Bakrid)',
            type: 'holiday'
        },
        '2025-07-06': {
            title: 'Muharram',
            type: 'holiday'
        },
        '2025-08-09': {
            title: 'Raksha Bandhan',
            type: 'holiday'
        },
        '2025-08-14': {
            title: 'School Break',
            type: 'holiday'
        },
        '2025-08-15': {
            title: 'Independence Day',
            type: 'holiday'
        },
        '2025-08-16': {
            title: 'Janmashtami',
            type: 'holiday'
        },
        '2025-08-17': {
            title: 'School Break',
            type: 'holiday'
        },
        '2025-09-05': {
            title: 'Eid-e-Milad',
            type: 'holiday'
        },
        '2025-10-01': {
            title: 'Maha Navami',
            type: 'holiday'
        },
        '2025-10-02': {
            title: 'Gandhi Jayanti / Dussehra',
            type: 'holiday'
        },
        '2025-10-20': {
            title: 'Diwali',
            type: 'holiday'
        },
        '2025-10-22': {
            title: 'Govardhan Puja',
            type: 'holiday'
        },
        '2025-10-23': {
            title: 'Bhai Dooj',
            type: 'holiday'
        },
        '2025-11-05': {
            title: 'Gurunanak Jayanti',
            type: 'holiday'
        },
        '2025-12-25': {
            title: 'Christmas',
            type: 'holiday'
        },
        '2025-07-07': {
            title: 'Periodic Test 1',
            type: 'exam'
        },
        '2025-07-08': {
            title: 'Periodic Test 1',
            type: 'exam'
        },
        '2025-07-09': {
            title: 'Periodic Test 1',
            type: 'exam'
        },
        '2025-07-10': {
            title: 'Periodic Test 1',
            type: 'exam'
        },
        '2025-07-11': {
            title: 'Periodic Test 1',
            type: 'exam'
        },
        '2025-07-12': {
            title: 'Periodic Test 1',
            type: 'exam'
        },
        '2025-09-08': {
            title: 'Half-Yearly Exam',
            type: 'exam'
        },
        '2025-09-09': {
            title: 'Half-Yearly Exam',
            type: 'exam'
        },
        '2025-09-10': {
            title: 'Half-Yearly Exam',
            type: 'exam'
        },
        '2025-09-11': {
            title: 'Half-Yearly Exam',
            type: 'exam'
        },
        '2025-09-12': {
            title: 'Half-Yearly Exam',
            type: 'exam'
        },
        '2025-09-13': {
            title: 'Half-Yearly Exam',
            type: 'exam'
        },
        '2025-09-15': {
            title: 'Half-Yearly Exam',
            type: 'exam'
        },
        '2025-09-16': {
            title: 'Half-Yearly Exam',
            type: 'exam'
        },
        '2025-09-17': {
            title: 'Half-Yearly Exam',
            type: 'exam'
        },
        '2025-09-18': {
            title: 'Half-Yearly Exam',
            type: 'exam'
        },
        '2025-09-19': {
            title: 'Half-Yearly Exam',
            type: 'exam'
        },
        '2025-09-20': {
            title: 'Half-Yearly Exam',
            type: 'exam'
        },
        '2025-12-01': {
            title: 'Periodic Test 2',
            type: 'exam'
        },
        '2025-12-02': {
            title: 'Periodic Test 2',
            type: 'exam'
        },
        '2025-12-03': {
            title: 'Periodic Test 2',
            type: 'exam'
        },
        '2025-12-04': {
            title: 'Periodic Test 2',
            type: 'exam'
        },
        '2025-12-05': {
            title: 'Periodic Test 2',
            type: 'exam'
        },
        '2025-12-06': {
            title: 'Periodic Test 2',
            type: 'exam'
        },
        '2026-02-16': {
            title: 'Annual Examination',
            type: 'exam'
        },
        '2026-02-17': {
            title: 'Annual Examination',
            type: 'exam'
        },
        '2026-02-18': {
            title: 'Annual Examination',
            type: 'exam'
        },
        '2026-02-19': {
            title: 'Annual Examination',
            type: 'exam'
        },
        '2026-02-20': {
            title: 'Annual Examination',
            type: 'exam'
        },
        '2026-02-21': {
            title: 'Annual Examination',
            type: 'exam'
        },
        '2026-02-23': {
            title: 'Annual Examination',
            type: 'exam'
        },
        '2026-02-24': {
            title: 'Annual Examination',
            type: 'exam'
        },
        '2026-02-25': {
            title: 'Annual Examination',
            type: 'exam'
        },
        '2026-02-26': {
            title: 'Annual Examination',
            type: 'exam'
        },
        '2026-02-27': {
            title: 'Annual Examination',
            type: 'exam'
        },
        '2026-02-28': {
            title: 'Annual Examination',
            type: 'exam'
        },
        '2025-04-07': {
            title: 'New Academic Session Begins',
            type: 'holiday'
        },
        '2025-05-31': {
            title: 'Summer Vacation Starts',
            type: 'holiday'
        },
        '2025-06-01': {
            title: 'Summer Vacation',
            type: 'holiday'
        },
        '2025-06-02': {
            title: 'Summer Vacation',
            type: 'holiday'
        },
        '2025-06-03': {
            title: 'Summer Vacation',
            type: 'holiday'
        },
        '2025-06-04': {
            title: 'Summer Vacation',
            type: 'holiday'
        },
        '2025-06-05': {
            title: 'Summer Vacation',
            type: 'holiday'
        },
        '2025-06-06': {
            title: 'Summer Vacation',
            type: 'holiday'
        },
        '2025-06-07': {
            title: 'Summer Vacation',
            type: 'holiday'
        },
        '2025-06-08': {
            title: 'Summer Vacation',
            type: 'holiday'
        },
        '2025-06-09': {
            title: 'Summer Vacation',
            type: 'holiday'
        },
        '2025-06-10': {
            title: 'Summer Vacation',
            type: 'holiday'
        },
        '2025-06-11': {
            title: 'Summer Vacation',
            type: 'holiday'
        },
        '2025-06-12': {
            title: 'Summer Vacation',
            type: 'holiday'
        },
        '2025-06-13': {
            title: 'Summer Vacation',
            type: 'holiday'
        },
        '2025-06-14': {
            title: 'Summer Vacation',
            type: 'holiday'
        },
        '2025-06-15': {
            title: 'Summer Vacation',
            type: 'holiday'
        },
        '2025-06-16': {
            title: 'Summer Vacation',
            type: 'holiday'
        },
        '2025-06-17': {
            title: 'Summer Vacation',
            type: 'holiday'
        },
        '2025-06-18': {
            title: 'Summer Vacation',
            type: 'holiday'
        },
        '2025-06-19': {
            title: 'Summer Vacation',
            type: 'holiday'
        },
        '2025-06-20': {
            title: 'Summer Vacation',
            type: 'holiday'
        },
        '2025-06-21': {
            title: 'Summer Vacation',
            type: 'holiday'
        },
        '2025-06-22': {
            title: 'Summer Vacation',
            type: 'holiday'
        },
        '2025-06-23': {
            title: 'Summer Vacation',
            type: 'holiday'
        },
        '2025-06-24': {
            title: 'Summer Vacation',
            type: 'holiday'
        },
        '2025-06-25': {
            title: 'Summer Vacation',
            type: 'holiday'
        },
        '2025-06-26': {
            title: 'Summer Vacation',
            type: 'holiday'
        },
        '2025-06-27': {
            title: 'Summer Vacation',
            type: 'holiday'
        },
        '2025-06-28': {
            title: 'Summer Vacation',
            type: 'holiday'
        },
        '2025-06-29': {
            title: 'Summer Vacation',
            type: 'holiday'
        },
        '2025-06-30': {
            title: 'Summer Vacation Ends',
            type: 'holiday'
        },
        '2026-01-01': {
            title: 'Winter Vacation',
            type: 'holiday'
        },
        '2026-01-02': {
            title: 'Winter Vacation',
            type: 'holiday'
        },
        '2026-01-03': {
            title: 'Winter Vacation',
            type: 'holiday'
        },
        '2026-01-04': {
            title: 'Winter Vacation',
            type: 'holiday'
        },
        '2026-01-05': {
            title: 'Winter Vacation',
            type: 'holiday'
        },
        '2026-01-06': {
            title: 'Winter Vacation',
            type: 'holiday'
        },
        '2026-01-07': {
            title: 'Winter Vacation',
            type: 'holiday'
        },
        '2026-01-08': {
            title: 'Winter Vacation',
            type: 'holiday'
        },
        '2026-01-09': {
            title: 'Winter Vacation',
            type: 'holiday'
        },
        '2026-01-10': {
            title: 'Winter Vacation Ends',
            type: 'holiday'
        },
    };

    function renderCalendar() {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();

        currentMonthYearEl.textContent = new Date(year, month).toLocaleString('en-IN', {
            month: 'long',
            year: 'numeric'
        });
        calendarGrid.innerHTML = '';

        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        for (let i = 0; i < firstDayOfMonth; i++) {
            const emptyDay = document.createElement('div');
            calendarGrid.appendChild(emptyDay);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const dayEl = document.createElement('div');
            dayEl.classList.add('p-2', 'rounded-lg', 'font-medium', 'text-slate-700', 'transition-colors',
                'cursor-pointer', 'hover:bg-blue-200', 'tooltip-container', 'relative');
            dayEl.textContent = day;

            const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const event = events[dateString];

            if (event) {
                dayEl.classList.add('text-white', 'font-bold', `event-${event.type}`, 'shadow-md');
                const tooltip = document.createElement('span');
                tooltip.classList.add('tooltip-text');
                tooltip.textContent = event.title;
                dayEl.appendChild(tooltip);
            }
            calendarGrid.appendChild(dayEl);
        }
    }

    prevMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });

    nextMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });

    renderCalendar();

    // ------------------------------------------------------------------
    // Count-up Animation
    // ------------------------------------------------------------------
    const counters = document.querySelectorAll('.counter');

    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const increment = target / 200;

            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(updateCount, 15);
            } else {
                counter.innerText = target + "+";
            }
        }

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCount();
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.5
        });

        observer.observe(counter);
    });

    // ------------------------------------------------------------------
    // AI PROBLEM SOLVING (Combined and Fixed)
    // ------------------------------------------------------------------
    const solveBtn = document.getElementById('solve-btn');
    const userQuestion = document.getElementById('user-question');
    const imageUpload = document.getElementById('image-upload');
    const solutionOutputContainer = document.getElementById('solution-output-container');
    const solutionOutput = document.getElementById('solution-output');
    const loadingSpinner = document.getElementById('loading-spinner-solver');
    const imagePreview = document.getElementById('image-preview');
    const previewImage = document.getElementById('preview-image');

    // Image preview functionality
    imageUpload.addEventListener('change', () => {
        const file = imageUpload.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                previewImage.src = e.target.result;
                imagePreview.classList.remove('hidden');
            };
            reader.readAsDataURL(file);
        } else {
            imagePreview.classList.add('hidden');
        }
    });

    solveBtn.addEventListener('click', async () => {
        const textPrompt = userQuestion.value.trim();
        const imageFile = imageUpload.files[0];

        if (!textPrompt && !imageFile) {
            solutionOutputContainer.classList.remove('hidden');
            solutionOutput.innerHTML = '<p class="text-center text-red-500">Please enter a question or upload an image.</p>';
            return;
        }

        // Show loading state
        solveBtn.disabled = true;
        solutionOutputContainer.classList.remove('hidden');
        loadingSpinner.classList.remove('hidden');
        solutionOutput.innerHTML = '';

        let chatHistory = [];
        let parts = [];

        // Add text part to the payload
        if (textPrompt) {
            parts.push({
                text: textPrompt
            });
        }

        // Convert image to base64 if available
        if (imageFile) {
            const base64Image = await toBase64(imageFile);
            parts.push({
                inline_data: {
                    mime_type: imageFile.type,
                    data: base64Image
                }
            });
        }

        chatHistory.push({
            role: "user",
            parts: parts
        });

        const payload = {
            contents: chatHistory
        };
        // !! IMPORTANT: REPLACE with your actual Gemini API Key !!
        const apiKey = "AIzaSyB-UPmBpYoE0Eg2SKzxcX8PZnCTXxGgO9c"; // This is a placeholder.
        const apiUrl =
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

        // Utility function to convert file to Base64
        function toBase64(file) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result.split(',')[1]);
                reader.onerror = error => reject(error);
            });
        }

        let retries = 0;
        const maxRetries = 5;
        const baseDelay = 1000;

        async function fetchWithExponentialBackoff() {
            try {
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payload)
                });

                if (!response.ok) {
                    if (response.status === 429 && retries < maxRetries) {
                        const delay = baseDelay * Math.pow(2, retries);
                        retries++;
                        await new Promise(resolve => setTimeout(resolve, delay));
                        return fetchWithExponentialBackoff();
                    } else {
                        throw new Error(`API call failed with status: ${response.status}`);
                    }
                }

                const result = await response.json();
                return result;
            } catch (error) {
                console.error('Fetch error:', error);
                return null;
            }
        }

        const result = await fetchWithExponentialBackoff();

        // Hide loading state
        solveBtn.disabled = false;
        loadingSpinner.classList.add('hidden');

        if (result && result.candidates && result.candidates.length > 0 &&
            result.candidates[0].content && result.candidates[0].content.parts &&
            result.candidates[0].content.parts.length > 0) {
            const text = result.candidates[0].content.parts[0].text;
            solutionOutput.innerHTML = `<h3>Solution:</h3><p>${text.replace(/\n/g, '<br>')}</p>`;
        } else {
            solutionOutput.innerHTML = '<p class="text-center text-red-500">Sorry, something went wrong. Please try again.</p>';
        }
    });
});


// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

