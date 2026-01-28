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
        features: "Interactive gameplay; score tracking; simple animations.",
        difficulty: "Beginner"
    },
    "Project 3": {
        features: "Multiple-choice questions; instant feedback; score calculation.",
        difficulty: "Beginner–Intermediate"
    },
    "Project 4": {
        features: "Card matching logic; timer; move counter; restart option.",
        difficulty: "Beginner–Intermediate"
    },
    "Project 5": {
        features: "Word guessing game; visual hangman progression; multiple word lists.",
        difficulty: "Intermediate"
    },
    "Project 6": {
        features: "Live countdown; automatic next event; clean UI.",
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
