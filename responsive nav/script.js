document.addEventListener('DOMContentLoaded', function () {
    gsap.registerPlugin(CustomEase);
    CustomEase.create(
        "hop",
        "M0,0 C0.354,0 0.464,0.133 0.498,0.502 0.532,0.872 0.651,1,1,1"
    );

    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');
    const link = document.querySelectorAll('.link');
    const socialLinks = document.querySelector('.socials p');
    let isAnimating = false; // Changed from const to let

    const splitTextIntoSpans = (selector) => {
        let elements = document.querySelectorAll(selector);
        elements.forEach((element) => {
            let text = element.innerText;
            let splitText = text
                .split("")
                .map(char => `<span>${char === " " ? "&nbsp;&nbsp" : char}</span>`)
                .join("");
            element.innerHTML = splitText;
        });
    };

    splitTextIntoSpans(".header h1");

    menuToggle.addEventListener('click', () => {
        if (isAnimating) return;

        isAnimating = true;

        if (menuToggle.classList.contains('closed')) {
            // Opening animation
            menuToggle.classList.remove('closed');

            gsap.to(menu, {
                clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
                ease: 'hop',
                duration: 1.5,
                onStart: () => {
                    menu.style.pointerEvents = 'all';
                },
                onComplete: () => {
                    isAnimating = false;
                }
            });

            gsap.to(link, {
                y: 0,
                opacity: 1,
                stagger: 0.1,
                delay: 0.85,
                duration: 1,
                ease: 'power3.out'
            });

            gsap.to(socialLinks, {
                y: 0,
                opacity: 1,
                stagger: 0.05,
                delay: 0.85,
                duration: 1,
                ease: 'power3.out'
            });

            gsap.to(".video-wrapper", {
                clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
                ease: 'hop',
                duration: 1.5,
                delay: 0.5,
            });

            gsap.to(".header h1 span", {
                Y: 0,
                stagger: 0.09,
                delay: 0.75,
                duration: 1.5,
                ease: 'power4.out',
            });

            gsap.to(".header h1 span", {
                y: -10,
                scale: 1.2,
                stagger: 0.05,
                delay: 0.5,
                duration: 1.5,
                ease: 'power4.out',
            });

        } else {
            // Closing animation
            menuToggle.classList.remove("opened");
            menuToggle.classList.add("closed");

            gsap.to(menu, {
                clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
                ease: 'hop',
                duration: 1.5,
                onStart: () => {
                    menu.style.pointerEvents = 'none';
                },
                onComplete: () => {
                    isAnimating = false;
                }
            });

            gsap.to(link, {
                y: 20,
                opacity: 0,
                stagger: 0.1,
                duration: 1,
                ease: 'power3.in',
            });

            gsap.to(socialLinks, {
                y: 20,
                opacity: 0,
                stagger: 0.05,
                duration: 1,
                ease: 'power3.in',
            });

            gsap.to(".video-wrapper", {
                clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
                ease: 'hop',
                duration: 1.5,
                delay: 0.5,
            });

            gsap.to(".header h1 span", {
                rotateY: 0,
                stagger: 0.05,
                delay: 0.5,
                duration: 1,
                ease: 'power4.in',
            });

            gsap.to(".header h1 span", {
                y: 0,
                scale: 1,
                stagger: 0.05,
                delay: 0.5,
                duration: 1,
                ease: 'power4.in',
            });
        }
    });
});
