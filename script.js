const btn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
if (btn) {
    btn.addEventListener('click', () => {
        const isOpen = mobileMenu.style.display === 'flex';
        mobileMenu.style.display = isOpen ? 'none' : 'flex';
    });
}

function handleSubmit(e) {
    e.preventDefault();
    const status = document.getElementById('status');
    status.style.display = 'block';
    status.textContent = 'Message sent (demo).';
    e.target.reset();
    return false;
}

const popup = document.getElementById('popup');
const popupTitle = document.getElementById('popupTitle');
document.querySelectorAll('.details-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        popupTitle.textContent = btn.dataset.project;
        popup.classList.remove('hidden');
    });
});
const closePopup = document.getElementById('closePopup');
if (closePopup) {
    closePopup.addEventListener('click', () => popup.classList.add('hidden'));
}

const journeyPopup = document.getElementById('journeyPopup');
const journeyPopupTitle = document.getElementById('journeyPopupTitle');
const journeyPopupText = document.getElementById('journeyPopupText');
const closeJourneyPopup = document.getElementById('closeJourneyPopup');

function openJourneyPopup(title, text) {
    journeyPopupTitle.textContent = title;
    journeyPopupText.textContent = text;
    journeyPopup.classList.remove('hidden');
    journeyPopup.setAttribute('aria-hidden', 'false');
}
function closeJourney() {
    journeyPopup.classList.add('hidden');
    journeyPopup.setAttribute('aria-hidden', 'true');
}

if (closeJourneyPopup) {
    closeJourneyPopup.addEventListener('click', closeJourney);
}

document.querySelectorAll('.timeline-item').forEach(item => {
    const dot = item.querySelector('.timeline-dot');
    const card = item.querySelector('.timeline-card');
    const title = card.querySelector('h3')?.textContent || 'Step';
    const text = card.querySelector('p')?.textContent || '';

    [dot, card].forEach(el => {
        el && el.addEventListener('click', () => {
            openJourneyPopup(title, text + ' (Edit this text later to add more details.)');
        });
    });

    dot && dot.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openJourneyPopup(title, text + ' (Edit this text later to add more details.)');
        }
    });
});

if (journeyPopup) {
    journeyPopup.addEventListener('click', (e) => {
        if (e.target === journeyPopup) closeJourney();
    });
}


const projectDetails = {
    "Project 1": {
        features: "Add, edit, delete tasks; mark tasks as complete; localStorage support.",
        difficulty: "Beginner"
    },
    "Project 2": {
        features: "Play Rock-Paper-Scissors against the computer with score tracking and animations.",
        difficulty: "Beginner"
    },
    "Project 3": {
        features: "Multiple-choice quiz that checks answers in real-time and displays your final score.",
        difficulty: "Beginner–Intermediate"
    },
    "Project 4": {
        features: "Memory matching game with cards; tracks moves and time; option to restart anytime.",
        difficulty: "Beginner–Intermediate"
    },
    "Project 5": {
        features: "Hangman word-guessing game with hints, lives, and random words from multiple lists.",
        difficulty: "Intermediate"
    },
    "Project 6": {
        features: "Countdown timer for upcoming Dutch holidays/events; automatically updates to the next event.",
        difficulty: "Beginner–Intermediate"
    },
    "Project 7": {
        features: "Interactive dice roller with animated rolling effect and a dynamic result display.",
        difficulty: "Beginner"
    },
    "Project 8": {
        features: "Random color generator with preview; copy colors to clipboard with one click.",
        difficulty: "Beginner"
    },
    "Project 9": {
        features: "BMI calculator: enter weight and height to calculate your BMI and see your weight category.",
        difficulty: "Beginner"
    },
    "Project 10": {
        features: "Temperature converter: convert values between Celsius and Fahrenheit easily and accurately.",
        difficulty: "Beginner"
    },
    "Project 11": {
        features: "Real-time digital clock showing hours, minutes, and seconds in a modern interface.",
        difficulty: "Beginner"
    },
    "Project 12": {
        features: "Password generator: create strong passwords with options for length, letters, numbers, and symbols.",
        difficulty: "Beginner–Intermediate"
    }
};


document.querySelectorAll(".details-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        const projectName = btn.getAttribute("data-project");
        const details = projectDetails[projectName];
        document.getElementById("popupTitle").innerText = projectName;
        document.getElementById("popupContent").innerHTML = `
      <p><strong>Features:</strong> ${details.features}</p>
      <p><strong>Difficulty:</strong> ${details.difficulty}</p>
    `;
        document.getElementById("popup").classList.remove("hidden");
    });
});

document.getElementById("closePopup").addEventListener("click", () => {
    document.getElementById("popup").classList.add("hidden");
});
