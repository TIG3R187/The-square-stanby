const slides = [
    {
        src: "Thesquarepictures/LOBBY 6.jpeg",
        label: "Lobby View",
        position: "center center",
        driftX: "-1.15%",
        driftY: "-0.35%",
        zoomEnd: "1.09"
    },
    {
        src: "Thesquarepictures/LOBBY 4.jpeg",
        label: "Reception Angle",
        position: "center center",
        driftX: "1.1%",
        driftY: "-0.25%",
        zoomEnd: "1.08"
    },
    {
        src: "Thesquarepictures/LOBBY 2.jpeg",
        label: "Front Lounge",
        position: "center center",
        driftX: "-0.9%",
        driftY: "0.3%",
        zoomEnd: "1.085"
    },
    {
        src: "Thesquarepictures/meeting room.jpeg",
        label: "Meeting Room",
        position: "center center",
        driftX: "0.95%",
        driftY: "-0.2%",
        zoomEnd: "1.075"
    },
    {
        src: "Thesquarepictures/Meeting room 2.jpeg",
        label: "Conference Space",
        position: "center center",
        driftX: "-1.25%",
        driftY: "0.25%",
        zoomEnd: "1.09"
    },
    {
        src: "Thesquarepictures/dedicated desk.jpeg",
        label: "Dedicated Desk",
        position: "center center",
        driftX: "0.8%",
        driftY: "-0.45%",
        zoomEnd: "1.08"
    },
    {
        src: "Thesquarepictures/Gym.jpeg",
        label: "Wellness Area",
        position: "center center",
        driftX: "-0.85%",
        driftY: "-0.25%",
        zoomEnd: "1.075"
    },
    {
        src: "Thesquarepictures/1776007717685.jpeg",
        label: "Workspace Detail",
        position: "center center",
        driftX: "1.05%",
        driftY: "0.2%",
        zoomEnd: "1.08"
    }
];

const slideContainer = document.querySelector("[data-slides]");
const dotsContainer = document.querySelector("[data-dots]");
const slideLabel = document.querySelector("[data-slide-label]");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const AUTO_ROTATE_MS = 9500;
const TRANSITION_MS = 1200;

let currentIndex = Math.floor(Math.random() * slides.length);
let activeFrameIndex = 0;
let autoRotateId = null;
let transitionToken = 0;

const imageCache = new Map();
const frames = buildFrames();
const dotNodes = buildDots();

slideContainer.id = "carousel-slides";
dotsContainer.setAttribute("role", "toolbar");

primeCarousel();

function buildFrames() {
    return Array.from({ length: 2 }, (_, slot) => {
        const slideNode = document.createElement("div");
        slideNode.className = "carousel__slide";
        slideNode.dataset.slot = String(slot);

        const imageNode = document.createElement("img");
        imageNode.className = "carousel__image";
        imageNode.alt = "";
        imageNode.decoding = "async";
        imageNode.draggable = false;
        imageNode.loading = "eager";

        slideNode.appendChild(imageNode);
        slideContainer.appendChild(slideNode);

        return {
            node: slideNode,
            image: imageNode,
            slideIndex: -1
        };
    });
}

function buildDots() {
    return slides.map((slide, index) => {
        const dotNode = document.createElement("button");
        dotNode.type = "button";
        dotNode.className = "carousel-meta__dot";
        dotNode.setAttribute("aria-label", `Show ${slide.label}`);
        dotNode.setAttribute("aria-controls", "carousel-slides");
        dotNode.dataset.index = String(index);

        dotNode.addEventListener("click", () => {
            showSlide(index);
            restartAutoRotate();
        });

        dotNode.addEventListener("keydown", (event) => {
            if (event.key === "ArrowRight" || event.key === "ArrowDown") {
                event.preventDefault();
                showSlide(index + 1);
                focusDot((index + 1) % slides.length);
                restartAutoRotate();
            }

            if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
                event.preventDefault();
                showSlide(index - 1);
                focusDot((index - 1 + slides.length) % slides.length);
                restartAutoRotate();
            }

            if (event.key === "Home") {
                event.preventDefault();
                showSlide(0);
                focusDot(0);
                restartAutoRotate();
            }

            if (event.key === "End") {
                event.preventDefault();
                showSlide(slides.length - 1);
                focusDot(slides.length - 1);
                restartAutoRotate();
            }
        });

        dotsContainer.appendChild(dotNode);
        return dotNode;
    });
}

function focusDot(index) {
    const dot = dotNodes[index];

    if (dot) {
        dot.focus({ preventScroll: true });
    }
}

function normalizeIndex(index) {
    return (index + slides.length) % slides.length;
}

function loadImage(index) {
    const slide = slides[normalizeIndex(index)];

    if (!imageCache.has(slide.src)) {
        const image = new Image();
        image.decoding = "async";
        image.src = slide.src;

        const ready = typeof image.decode === "function"
            ? image.decode().catch(() => undefined)
            : new Promise((resolve) => {
                image.onload = resolve;
                image.onerror = resolve;
            });

        imageCache.set(slide.src, ready);
    }

    return imageCache.get(slide.src);
}

function hydrateFrame(frame, index) {
    const slide = slides[normalizeIndex(index)];

    frame.slideIndex = normalizeIndex(index);
    frame.image.src = slide.src;
    frame.image.style.objectPosition = slide.position;
    frame.image.style.setProperty("--drift-x", slide.driftX);
    frame.image.style.setProperty("--drift-y", slide.driftY);
    frame.image.style.setProperty("--zoom-end", slide.zoomEnd);
    frame.image.style.setProperty("--zoom-start", "1.03");
}

function updateMeta() {
    slideLabel.textContent = slides[currentIndex].label;

    dotNodes.forEach((node, nodeIndex) => {
        const isActive = nodeIndex === currentIndex;
        node.classList.toggle("is-active", isActive);
        node.setAttribute("aria-pressed", String(isActive));
        node.setAttribute("aria-current", isActive ? "true" : "false");
    });
}

function preloadNearby() {
    loadImage(currentIndex + 1);
    loadImage(currentIndex - 1);
}

function warmImageCache() {
    slides.forEach((_, index) => {
        if (index === currentIndex || index === normalizeIndex(currentIndex + 1)) {
            return;
        }

        window.setTimeout(() => {
            loadImage(index);
        }, 250 * index);
    });
}

async function primeCarousel() {
    await loadImage(currentIndex);
    hydrateFrame(frames[activeFrameIndex], currentIndex);
    frames[activeFrameIndex].node.classList.add("is-active");
    updateMeta();
    preloadNearby();
    warmImageCache();
    startAutoRotate();
}

async function showSlide(index) {
    const targetIndex = normalizeIndex(index);

    if (targetIndex === currentIndex) {
        return;
    }

    const token = ++transitionToken;
    await loadImage(targetIndex);

    if (token !== transitionToken) {
        return;
    }

    const nextFrameIndex = activeFrameIndex === 0 ? 1 : 0;
    const incomingFrame = frames[nextFrameIndex];
    const outgoingFrame = frames[activeFrameIndex];

    hydrateFrame(incomingFrame, targetIndex);
    incomingFrame.node.classList.remove("is-active", "is-exiting");

    requestAnimationFrame(() => {
        incomingFrame.node.classList.add("is-active");
        outgoingFrame.node.classList.remove("is-active");
        outgoingFrame.node.classList.add("is-exiting");
    });

    currentIndex = targetIndex;
    activeFrameIndex = nextFrameIndex;
    updateMeta();
    preloadNearby();

    window.setTimeout(() => {
        outgoingFrame.node.classList.remove("is-exiting");
    }, TRANSITION_MS + 60);
}

function nextSlide() {
    showSlide(currentIndex + 1);
}

function stopAutoRotate() {
    if (autoRotateId) {
        window.clearInterval(autoRotateId);
        autoRotateId = null;
    }
}

function startAutoRotate() {
    if (prefersReducedMotion.matches || slides.length < 2) {
        return;
    }

    stopAutoRotate();
    autoRotateId = window.setInterval(nextSlide, AUTO_ROTATE_MS);
}

function restartAutoRotate() {
    stopAutoRotate();
    startAutoRotate();
}

document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
        stopAutoRotate();
        return;
    }

    startAutoRotate();
});

window.addEventListener("keydown", (event) => {
    if (event.defaultPrevented) {
        return;
    }

    if (event.key === "ArrowRight") {
        event.preventDefault();
        showSlide(currentIndex + 1);
        restartAutoRotate();
    }

    if (event.key === "ArrowLeft") {
        event.preventDefault();
        showSlide(currentIndex - 1);
        restartAutoRotate();
    }
});

if (typeof prefersReducedMotion.addEventListener === "function") {
    prefersReducedMotion.addEventListener("change", restartAutoRotate);
} else if (typeof prefersReducedMotion.addListener === "function") {
    prefersReducedMotion.addListener(restartAutoRotate);
}
