import { animate, stagger, hover, inView, press } from "https://cdn.jsdelivr.net/npm/motion@latest/+esm"

const tocke = document.querySelectorAll('.tocka');
const body = document.querySelector('body');

const svg = document.querySelector('.crta1')
const path = svg.querySelector('path')
const logo = document.querySelector(".logo");

const linki = document.querySelectorAll('header ul li');
hover(linki, (element) => {
    animate(element, {scale: 1.1});

    return () => animate(element, {scale: 1});
})

let y = null;
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('header ul a');

const scroll = () => {
    const distance = window.scrollY;
    const totalDistance = svg.clientHeight - window.innerHeight;
    const pathLength = path.getTotalLength();

    const prag = 200;

    if (distance < prag) {
        path.style.strokeDasharray = `${pathLength}`;
        path.style.strokeDashoffset = `${pathLength}`;
        return;
    }

    const adjustedDistance = distance - prag;

    const slowdownFactor = 2.5;
    const adjustedTotalDistance = (totalDistance - prag) * slowdownFactor;

    // Izračunaj odstotek
    const percentage = adjustedDistance / adjustedTotalDistance;

    const clampedPercentage = Math.max(0, Math.min(1, percentage));

    path.style.strokeDasharray = `${pathLength}`;
    path.style.strokeDashoffset = `${pathLength * (1 - clampedPercentage)}`;
}

scroll();

const SedanjifSize = parseFloat(window.getComputedStyle(logo).fontSize);
const fSize = (Math.round(SedanjifSize));
const sirinaOkna = window.innerWidth;

function logoScroll(logo, linki) {
    let y = null;
    const magrin = 9;
    const ease = 'easeOut';

    return function () {
        const { top } = logo.getBoundingClientRect();
        const currentPageYOffset = window.pageYOffset;
        let stickyActive = false;

        if (sirinaOkna >= 665) {
            if (top < 10 && y === null && !stickyActive) {
                y = currentPageYOffset;
                // console.log(y);
                logo.style.fontSize = getComputedStyle(logo).fontSize;
                animate(logo, { fontSize: [fSize + 'px', fSize/3 + 'px'] });
                logo.classList.add("sticky");
                logo.style.mixBlendMode = 'difference'
                if (linki.length > 1) {
                    animate(linki[0], {x: -magrin +'rem'}, {ease: ease})
                    animate(linki[1], {x: -magrin +'rem'}, {ease: ease, delay: 0.05})
                    animate(linki[2], {x: magrin +'rem'}, {ease: ease})
                    animate(linki[3], {x: magrin +'rem'}, {ease: ease, delay: 0.05})
                }
            } else if (currentPageYOffset < y) {
                logo.classList.remove("sticky");
                logo.style.mixBlendMode = 'normal';
                animate(logo, { fontSize: fSize + 'px' }, {delay: 0.2});
                if (linki.length > 1) {
                    animate(linki[1], {x: '0rem'}, {ease: ease, delay: 0.05})
                    animate(linki[0], {x: '0rem'}, {ease: ease})
                    animate(linki[3], {x: '0rem'}, {ease: ease, delay: 0.05})
                    animate(linki[2], {x: '0rem'}, {ease: ease})
                }
                y = null;
            }
        }
    };
}
const logoAni = logoScroll(logo, linki);


function zaznavanjeLink(sections, navLinks) {
    let top = window.scrollY;
    let firstOffset = sections[0].offsetTop - 150;

    if (top < firstOffset) {
        navLinks.forEach(link => link.classList.remove('active'));
        return;
    }

    let found = false;
    sections.forEach((sec, i) => {
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');
        if (
            (!found && top >= offset && top < offset + height) ||
            (i === sections.length - 1 &&
                window.innerHeight + window.scrollY >=
                    document.body.offsetHeight - 2)
        ) {
            navLinks.forEach(link => link.classList.remove('active'));
            const activeLink = document.querySelector(
                'header ul a[href="#' + id + '"]'
            );
            if (activeLink) {
                activeLink.classList.add('active');
            }
            found = true;
        }
    });
}

window.addEventListener('scroll', () => {
    scroll();
    logoAni();
    zaznavanjeLink(sections, navLinks);
})


hover('.razvoj .btn', (btn) => {
    const t = 0.1
    animate(btn, { background: 'rgba(255, 255, 255, 0.2)' }, { duration: t })

    const icon = btn.querySelector('svg')
    animate(icon, { x: '0.5rem' }, { ease: 'easeOut', duration: t, delay: 0.2 })

    return () => {
        animate(btn, { background: 'rgba(255, 255, 255, 0.10)' }, { duration: t })
        if (icon) {
            animate(icon, { x: '0rem' }, { ease: 'easeOut', duration: t })
        }
    }
})


press('.razvoj .btn', (btn) => {
    const section = document.querySelector('.razvoj')
    const index = btn.dataset.index;
    const hidSec = document.querySelector(`.hidRaz${index}`);

    const hidCont = hidSec.querySelector('.hidVsebina');
    const closeBtn = hidSec.querySelector('.closeBtn');

    const originalParent = hidSec.parentNode
    const nextSibling = hidSec.nextSibling;

    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    overlay.style.display = 'flex'
    overlay.style.opacity = '0';

    overlay.appendChild(hidSec);
    section.appendChild(overlay);
    body.style.overflow = 'hidden';
    animate(logo, {opacity: 0}, {duration: 0.1})
    animate(linki, {opacity: 0}, {duration: 0.1})

    linki.forEach(link => {
        link.style.display = 'none'
    });

    animate(overlay, {opacity: 1})
    
    const odpiranje = [
        [hidSec.style.display = 'flex'],
        [hidCont.style.display = 'block'],
        [hidSec, {opacity: 1, width: ['0%', '90%']}],
        [hidSec, {maxHeight: ['100vh', '96vh']}, {duration: 0.1, at: '<'}],
        [closeBtn, {x: [90, 0]}, {delay: 1}],
        ['.hidVsebina > *', {opacity: 1, x: [10, 0]}, {delay: stagger(0.05), at: 0.1}],
    ]
    animate(odpiranje)

    press(closeBtn, (element) => {
        linki.forEach(link => {
            link.style.display = 'inline-block'
        });
        const zapiranje = [
        [closeBtn, {x: [0, 90]}, {duration: 0.2}],
        ['.hidVsebina > *', {opacity: 0, x: [0, 10]}],
        [hidSec, {opacity: 0, width: ['90%', '0%']}, {duration: 0.2}],
        [overlay, {opacity: 0}, {duration: 0.3}],
        [logo, {opacity: 1}, {duration: 0.3, delay: 0.2}],
        [linki, {opacity: 1}, {duration: 0.3, delay: 0.2, at: "<"}]
    ]
    animate(zapiranje)
    
    setTimeout(() => {
        if (originalParent) {
                if (nextSibling) {
                    originalParent.insertBefore(hidSec, nextSibling);
                } else {
                    originalParent.appendChild(hidSec);
                }
            } else {
                 console.warn("Originalni starš elementa hidSec ni bil določen.");
            }
    
            const overlayToRemove = document.querySelector('.overlay');
        if (overlayToRemove && overlayToRemove.parentNode) {
            overlayToRemove.parentNode.removeChild(overlayToRemove);
        }
        hidSec.style.display = 'none'
        hidSec.style.opacity = '0';
    }, 2500);
    
    
        body.style.overflow = 'auto';

        return () => {}
    })

    return () => {}
})



inView('.onas .solar-system', (orbita) => {
    const orbit1 = orbita.querySelector('.orbit1')
    const orbit2 = orbita.querySelector('.orbit2')
    const orbit3 = orbita.querySelector('.orbit3')

    animate(orbit1, {rotate: [0, 360]}, {duration: 5, repeat: Infinity, ease: 'linear',})
    animate(orbit2, {rotate: [360, 0]}, {duration: 8, repeat: Infinity, ease: 'linear', delay: 0.06})
    animate(orbit3, {rotate: [0, 360]}, {duration: 12, repeat: Infinity, ease: 'linear',delay: 0.3})

    return () => {}
}, {margin: '200px 0px 200px 0px'}
);


