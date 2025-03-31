const sliderContent = [
    "LuminaPad",
    "PulseEar",
    "ZenithWatch",
    "AeroCharge",
    "NimbusCam",
    "Eclipse Drive",
    "TerraHub",
    "QuantumKey",
    "MeshRouter",
    "AuraBeam"
];

let currentImageIndex = 1;
let currentContentIndex = 0;
const totalImages = sliderContent.length;
let isAnimating = false;

function splitTextIntoSpans(selector) {
    let element = document.querySelector(selector);
    if (!element) return;

    let text = element.innerText;
    let splitText = text
        .split("")
        .map(char => `<span>${char === " " ? "&nbsp;" : char}</span>`)
        .join("");
    element.innerHTML = splitText;
}

document.addEventListener("click", function () {
    if (isAnimating) return;
    isAnimating = true;

    let activeContent = document.querySelector(".slider-content-active");
    if (!activeContent) {
        console.error("No active content found!");
        isAnimating = false;
        return;
    }

    splitTextIntoSpans(".slider-content-active h1");
    gsap.to(".slide-active img", { scale: 2, duration: 2, ease: "power3.out" });

    gsap.to(".slider-content-active h1 span", {
        top: "-175px",
        stagger: 0.05,
        ease: "power3.out",
        duration: 0.5,
        onComplete: () => {
            gsap.to(".slider-content-active", { top: "-175px", duration: 0.25, ease: "power3.out" });
        },
    });

    currentContentIndex = (currentContentIndex + 1) % totalImages;
    let nextText = sliderContent[currentContentIndex];

    const newContentHTML = `<div class="slider-content slider-content-next" style="top: 200px;"><h1>${nextText}</h1></div>`;
    document.querySelector(".slider").insertAdjacentHTML("beforeend", newContentHTML);

    splitTextIntoSpans(".slider-content-next h1");
    gsap.set(".slider-content-next h1 span", { top: "200px" });

    gsap.to(".slider-content-next", {
        top: "50%",
        duration: 1.125,
        ease: "power3.out",
        onComplete: () => {
            document.querySelector(".slider-content-active").remove();
            document.querySelector(".slider-content-next").classList.replace("slider-content-next", "slider-content-active");
        },
    });

    currentImageIndex = (currentImageIndex % totalImages) + 1;
    const newSlideHTML = `
        <div class="slide-next">
            <div class="slide-next-img">
                <img src="./${currentImageIndex}.jpg" alt="">
            </div>
        </div>`;

    document.querySelector(".slider").insertAdjacentHTML("beforeend", newSlideHTML);

    gsap.to(".slide-next:last-child .slide-next-img", {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 1.5,
        ease: "power3.out",
        delay: 0.5,
    });

    gsap.to(".slide-next-img", {
        width: "100vw",
        height: "100vh",
        duration: 2,
        ease: "power3.out",
        onComplete: () => {
            const currentActiveSlide = document.querySelector(".slide-active");
            if (currentActiveSlide) currentActiveSlide.remove();

            const nextSlide = document.querySelector(".slide-next");
            if (nextSlide) {
                nextSlide.classList.replace("slide-next", "slide-active");
            }

            isAnimating = false;
        },
    });
});
