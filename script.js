
// ===== 1. FOOTER YEAR =====
const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}


// ===== 2. DARK MODE TOGGLE =====
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

function updateThemeButton() {
    const isDark = body.classList.contains("dark-mode");

    themeToggle.textContent = isDark ? "☀️" : "🌙";
    themeToggle.setAttribute(
        "aria-label",
        isDark ? "Switch to light mode" : "Switch to dark mode"
    );
}

themeToggle.addEventListener("click", function () {
    body.classList.toggle("dark-mode");

    const currentTheme =
        body.classList.contains("dark-mode") ? "dark" : "light";

    try {
        localStorage.setItem("portfolio-theme", currentTheme);
    } catch (error) {
        // Theme switching still works if storage is unavailable.
    }

    updateThemeButton();
});

try {
    if (localStorage.getItem("portfolio-theme") === "dark") {
        body.classList.add("dark-mode");
    }
} catch (error) {
    // Use the default light theme if storage is unavailable.
}

updateThemeButton();


// ===== 3. MOBILE NAVIGATION =====
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

function closeMenu() {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    menuToggle.textContent = "☰";
}

menuToggle.addEventListener("click", function () {
    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Open navigation"
    );

    menuToggle.textContent = isOpen ? "✕" : "☰";
});

navLinks.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", closeMenu);
});


// ===== 4. CONTACT FORM =====
const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

// Replace this with your real email address before publishing.
const portfolioEmail = "your.email@example.com";

contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
        formStatus.textContent = "Please complete all fields.";
        return;
    }

    if (portfolioEmail === "yveag98@gmail.com") {
        formStatus.textContent =
            "Your form works! Add your real email address in script.js " +
            "to enable email preparation.";
        return;
    }

    const subject = encodeURIComponent(
        "Portfolio enquiry from " + name
    );

    const bodyText = encodeURIComponent(
        "Name: " + name +
        "\nEmail: " + email +
        "\n\nMessage:\n" + message
    );

    const mailtoLink =
        "mailto:" + portfolioEmail +
        "?subject=" + subject +
        "&body=" + bodyText;

    formStatus.textContent =
        "Opening your email application. Please review and send your message.";

    window.location.href = mailtoLink;
});


// ===== 5. BACK TO TOP BUTTON =====
const backToTop = document.getElementById("back-to-top");

window.addEventListener("scroll", function () {
    if (window.scrollY > 350) {
        backToTop.classList.add("visible");
    } else {
        backToTop.classList.remove("visible");
    }
});

backToTop.addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});



// ===== 6. SCROLL REVEAL ANIMATION =====
const revealElements = document.querySelectorAll(
    ".section-heading, .education-card, .about-content, .skill-card, .project-card, .contact-card"
);

if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
        function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("revealed");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.15
        }
    );

    revealElements.forEach(function (element) {
        element.classList.add("reveal");
        revealObserver.observe(element);
    });
} else {
    revealElements.forEach(function (element) {
        element.classList.add("revealed");
    });
}



// ===== 7. ACTIVE NAVIGATION HIGHLIGHT =====
const sections = document.querySelectorAll("section[id]");
const navigationLinks = document.querySelectorAll("#nav-links a");

const activeSectionObserver = new IntersectionObserver(
    function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                navigationLinks.forEach(function (link) {
                    link.classList.remove("active");

                    if (
                        link.getAttribute("href") ===
                        "#" + entry.target.id
                    ) {
                        link.classList.add("active");
                    }
                });
            }
        });
    },
    {
        threshold: 0.3
    }
);

sections.forEach(function (section) {
    activeSectionObserver.observe(section);
});


// ===== 8. PROJECT FILTER =====
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        const selectedFilter = button.dataset.filter;

        filterButtons.forEach(function (btn) {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        projectCards.forEach(function (card) {
            const category = card.dataset.category;

            if (selectedFilter === "all" || category === selectedFilter) {
                card.style.display = "";
            } else {
                card.style.display = "none";
            }
        });
    });
});


// ===== 9. COPY EMAIL BUTTON =====
const copyEmailButton = document.getElementById("copy-email-btn");
const copyEmailStatus = document.getElementById("copy-email-status");

const portfolioContactEmail = "yveag8@gmail.com";

if (copyEmailButton && copyEmailStatus) {
    copyEmailButton.addEventListener("click", async function () {
        try {
            await navigator.clipboard.writeText(portfolioContactEmail);

            copyEmailStatus.textContent = "Email copied successfully!";
            copyEmailButton.textContent = "Copied! ✓";
        } catch (error) {
            copyEmailStatus.textContent =
                "Unable to copy. Please copy yveag8@gmail.com manually.";
        }
    });
}


// ===== 10. SKILLS PROGRESS ANIMATION =====
const skillProgressBars = document.querySelectorAll(
    ".skill-progress-fill"
);

const skillsSection = document.getElementById("skills");

if (skillsSection && skillProgressBars.length > 0) {
    const skillsObserver = new IntersectionObserver(
        function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    skillProgressBars.forEach(function (bar) {
                        const progress = Number(bar.dataset.progress);

                        if (Number.isFinite(progress)) {
                            const safeProgress = Math.min(
                                100,
                                Math.max(0, progress)
                            );

                            bar.style.setProperty(
                                "--progress",
                                safeProgress + "%"
                            );

                            bar.classList.add("animate");
                        }
                    });

                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.2
        }
    );

    skillsObserver.observe(skillsSection);
}
