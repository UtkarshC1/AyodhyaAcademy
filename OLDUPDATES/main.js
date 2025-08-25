// This file is referenced in the HTML as `js/main.js`

document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile Menu Toggle ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Close mobile menu when a link is clicked
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });

    // --- Dynamic Content & Animations ---
    
    // Intersection Observer for fade-in effect on sections
    const fadeInElements = document.querySelectorAll('.fade-in');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2 // Trigger when 20% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Stop observing once it's visible
            }
        });
    }, observerOptions);

    fadeInElements.forEach(el => {
        observer.observe(el);
    });

    // --- Academic Calendar Functionality ---

    const calendarGrid = document.getElementById('calendar-grid');
    const currentMonthYear = document.getElementById('current-month-year');
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');

    let currentDate = new Date();

    const events = {
        // Example events (can be fetched from an API)
        '2025-08-15': { name: 'Independence Day', type: 'holiday' },
        '2025-09-05': { name: 'Teacher\'s Day Celebration', type: 'function' },
        '2025-09-20': { name: 'Mid-term Exams Begin', type: 'exam' },
        '2025-10-02': { name: 'Gandhi Jayanti', type: 'holiday' },
        '2025-10-10': { name: 'Annual School Function', type: 'function' },
        '2025-10-25': { name: 'PTM', type: 'ptm' }
    };

    function generateCalendar() {
        calendarGrid.innerHTML = '';
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();

        currentMonthYear.textContent = `${currentDate.toLocaleString('default', { month: 'long' })} ${year}`;

        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const numDays = lastDay.getDate();
        const startDayIndex = firstDay.getDay(); // 0 for Sunday, 1 for Monday, etc.

        // Fill in leading empty days
        for (let i = 0; i < startDayIndex; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'py-2';
            calendarGrid.appendChild(emptyDay);
        }

        // Fill in the days of the month
        for (let day = 1; day <= numDays; day++) {
            const dayEl = document.createElement('div');
            dayEl.className = 'py-2 px-1 text-center font-semibold rounded-lg relative tooltip-container';
            dayEl.textContent = day;

            const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const event = events[dateString];

            if (event) {
                dayEl.classList.add(`event-${event.type}`, 'text-blue-900', 'cursor-pointer', 'hover:scale-105', 'transition-transform');

                const tooltip = document.createElement('span');
                tooltip.className = 'tooltip-text';
                tooltip.textContent = event.name;
                dayEl.appendChild(tooltip);
            } else {
                dayEl.classList.add('text-slate-700');
            }

            calendarGrid.appendChild(dayEl);
        }
    }

    prevMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        generateCalendar();
    });

    nextMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        generateCalendar();
    });

    // Initial calendar generation
    generateCalendar();

    // --- LLM Feature: Event Idea Generator ---

    const generateBtn = document.getElementById('generate-btn');
    const eventPrompt = document.getElementById('event-prompt');
    const eventOutput = document.getElementById('event-output');
    const loadingSpinner = document.getElementById('loading-spinner');

    generateBtn.addEventListener('click', async () => {
        const promptText = eventPrompt.value.trim();

        if (promptText === '') {
            eventOutput.innerHTML = '<p class="text-center text-red-500 italic">Please enter a description for the event.</p>';
            return;
        }

        // Show loading spinner and clear previous output
        loadingSpinner.classList.remove('hidden');
        loadingSpinner.classList.add('flex');
        eventOutput.innerHTML = '';

        // Simulate API call to a Gemini-powered backend
        const simulatedResponse = await simulateGeminiResponse(promptText);

        // Hide spinner and display the result
        loadingSpinner.classList.add('hidden');
        loadingSpinner.classList.remove('flex');
        eventOutput.innerHTML = simulatedResponse;
    });

    async function simulateGeminiResponse(prompt) {
        // This is a placeholder function. In a real-world scenario, you would
        // make an API call to a backend server that interacts with the Gemini API.
        
        // Simulating a delay
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Generate a simple, pre-determined response based on a keyword
        const lowerPrompt = prompt.toLowerCase();
        let generatedContent = '';

        if (lowerPrompt.includes('sports')) {
            generatedContent = `
                <h4>Theme: "Olympus Games"</h4>
                <p>A fun and competitive theme inspired by the ancient Greek Olympics. Students can represent different "city-states" or houses.</p>
                <h5>Event Schedule:</h5>
                <ul>
                    <li><strong>8:00 AM - 9:00 AM:</strong> Opening Ceremony & Torch Relay</li>
                    <li><strong>9:00 AM - 12:00 PM:</strong> Track & Field Events (100m, relay, long jump)</li>
                    <li><strong>12:00 PM - 1:00 PM:</strong> Lunch Break</li>
                    <li><strong>1:00 PM - 3:00 PM:</strong> Team Sports (Football, Basketball, Tug-of-War)</li>
                    <li><strong>3:00 PM - 4:00 PM:</strong> Award Ceremony & Closing</li>
                </ul>
            `;
        } else if (lowerPrompt.includes('science')) {
            generatedContent = `
                <h4>Theme: "Future Innovators Expo"</h4>
                <p>An engaging theme that encourages students to think about future technologies and scientific breakthroughs. The fair could be structured around different "zones" like Renewable Energy, Robotics, and Biotechnology.</p>
                <h5>Event Schedule:</h5>
                <ul>
                    <li><strong>9:00 AM - 10:00 AM:</strong> Project Setup & Judging begins</li>
                    <li><strong>10:00 AM - 1:00 PM:</strong> Public Viewing & Student Demonstrations</li>
                    <li><strong>1:00 PM - 2:00 PM:</strong> Interactive Science Workshop</li>
                    <li><strong>2:00 PM - 3:00 PM:</strong> Guest Speaker Presentation on "AI & the Future"</li>
                    <li><strong>3:00 PM - 4:00 PM:</strong> Award Ceremony & Recognition</li>
                </ul>
            `;
        } else {
            generatedContent = `
                <h4>Theme: "Unity in Diversity"</h4>
                <p>A beautiful theme that celebrates the cultural richness and varied talents of our students. The event could feature performances from different traditions, food stalls, and art displays.</p>
                <h5>Event Schedule:</h5>
                <ul>
                    <li><strong>10:00 AM - 11:00 AM:</strong> Welcome & Opening Performance</li>
                    <li><strong>11:00 AM - 1:00 PM:</strong> Cultural Dance & Music Showcases</li>
                    <li><strong>1:00 PM - 2:00 PM:</strong> Food Festival featuring diverse cuisines</li>
                    <li><strong>2:00 PM - 3:30 PM:</strong> Talent Show & Student Skits</li>
                    <li><strong>3:30 PM - 4:00 PM:</strong> Closing Remarks & Student Awards</li>
                </ul>
            `;
        }

        return generatedContent;
    }
});
