import {animate, delay, stagger, hover} from "motion"

const sections = document.querySelectorAll('section');
const text = document.querySelectorAll('.Tanimacija');
const body = document.querySelector('body');
const strani = document.querySelectorAll('.mainSections > div');
const mainSections = document.querySelector('.mainSections');
const navbar = document.querySelector('.nav');
const navbarH1 = document.querySelector('.nav > h1')
const svg = document.querySelectorAll('svg');
const pike = document.querySelector('.pike')
const arrow = document.querySelector('.arrow')
const btnSvg = document.querySelectorAll('button svg')
let main = document.querySelector('main');
let mainWidth = main.offsetWidth;

let isOpen = false;
let currentSection = null;

window.addEventListener('resize', () => {
    mainWidth = main.offsetWidth;
});
// animacije ob naložitvi
const trajanje = 0.2;

animate(text, 
    {y: ['-30px', '0px'], opacity: [0, 1]},
    {duration: 0.5, ease: 'easeOut', delay: stagger(0.1)},
);

 sections.forEach((section) => {
     hover(section, () => {
             const h1 = section.querySelector("h1");
         if (h1) animate(h1, { y: -10 });
         return () => {
             if (h1) animate(h1, { y: 0 });
         };
     });
 });

animate(navbar, {top: ['-60px', 0]}, {duration: 0.5, delay: 0.6});

hover('.zgornjaImg', (img) => {
    animate('.spodnjaImg', { boxShadow: '0 0 12px 4px rgba(75, 75, 75, 0.31)' }, { duration: 0.4 });
    animate(img, { y: -6 }, { duration: 0.4 });

    return () => {
        animate(img, { y: 0 }, { duration: 0.4 });
        animate('.spodnjaImg', { boxShadow: '0 0 12px 4px rgba(74, 74, 74, 0)' }, { duration: 0.4 });
    };
});


btnSvg.forEach(svg => {
    svg.style.display = 'none'
    hover('button', (btn) => {
        animate(btn, {width: '190px'});
        svg.style.display = 'block';
        animate(svg, {opacity: 1});

        return () => {
            animate(btn, {width: '180px'});
            animate(svg, {opacity: 0}).then(() => {svg.style.display = 'none'});
        };
    });
});
// Odpiranje in zapiranje

sections.forEach(section => {
    section.addEventListener('click', () => {
        if (isOpen && currentSection === section) {
            closeAllSections();
            isOpen = false;
            currentSection = null;
        } else if (!isOpen) {
            openSection(section);
            isOpen = true;
            currentSection = section;
        }
    });
});


function openSection(selectedSection) {
    isOpen = true;
    currentSection = selectedSection;
    const selectedSectionWidth = selectedSection.offsetWidth;
    const selectedSectionHeight = selectedSection.offsetHeight
    const scaleX = mainWidth / selectedSectionWidth;
    const scaleY = main.offsetHeight / selectedSectionHeight

  // Zmanjševanje elemmenta
sections.forEach(section => {
    if (section !== selectedSection) {
        animate(section, {opacity: 0}, {duration: 0.2})
        section.classList.remove('Fz-index');
        if (selectedSection.dataset.id === 'produkt') {
            switch (section.dataset.id) {
              case 'produkt':
                break;
              case 'razvoj':
                animate(section, {scaleY: 0}, {duration: trajanje});
                break;
              case 'o nas':
                animate(section, {scaleX: 0}, {duration: trajanje});
                break;
              case 'kontakt':
                animate(section, {scaleX: 0}, {duration: trajanje});
                break;
            }
        }else if(selectedSection.dataset.id === 'razvoj'){
            switch (section.dataset.id) {
                case 'produkt':
                    animate(section, {scaleY: 0}, {duration: trajanje});
                  break;
                case 'razvoj':
                  break;
                case 'o nas':
                  animate(section, {scaleY: 0}, {duration: trajanje});
                  break;
                case 'kontakt':
                  animate(section, {scaleX: 0}, {duration: trajanje});
                  break;
            }
        }else if(selectedSection.dataset.id === 'o nas'){
            switch (section.dataset.id) {
                case 'produkt':
                    animate(section, {scaleX: 0}, {duration: trajanje});
                  break;
                case 'razvoj':
                    animate(section, {scaleY: 0}, {duration: trajanje});
                  break;
                case 'o nas':
                  break;
                case 'kontakt':
                  animate(section, {scaleY: 0}, {duration: trajanje});
                  break;
            }
        }else if(selectedSection.dataset.id === 'kontakt'){
            switch (section.dataset.id) {
                case 'produkt':
                    animate(section, {scaleX: 0}, {duration: trajanje});
                  break;
                case 'razvoj':
                    animate(section, {scaleX: 0}, {duration: trajanje});
                  break;
                case 'o nas':
                    animate(section, {scaleY: 0}, {duration: trajanje});
                  break;
                case 'kontakt':
                  break;
            }
        }
    }
});




// Povečevanje izbrnega elementa
animate(navbar, {top: '-60px'}, {duration: 0.2});
animate(selectedSection, {scaleX: scaleX, scaleY: scaleY}, {duration: trajanje});
animate(selectedSection, {opacity: [1, 0]}, {duration: 1});
selectedSection.classList.add('Fz-index');
animate(body, {backgroundColor: '#000000'}, {duration: trajanje})
setTimeout(() => {
    // navbar
    animate(navbar, {top: ['-60px', 0]}, {duration: 0.5, delay: trajanje})
    navbarH1.innerHTML = selectedSection.dataset.id;
    navbar.style.backgroundColor = 'rgb(var(--grey-700), 0.6)'
    navbar.style.color = 'rgb(var(--white-200))';
    svg.forEach(svg => {
        svg.style.fill = 'rgb(var(--white-200))';
    });
    arrow.style.display = 'block';
    pike.style.display = 'none';
    // prikaz strani
    mainSections.classList.remove('open');
    strani.forEach(stran => {
       if (stran.dataset.id === selectedSection.dataset.id) {
        stran.style.display = 'block'
        stran.classList.add('z-index');
        animate(stran, {opacity: 1}, {duration: trajanje,})
       }else{
        stran.style.display = 'none';
       }
    });
}, trajanje*1000);
}



window.closeAllSections = function() {
    isOpen = false;
    currentSection = null;
    animate(body, {backgroundColor: '#ffffff'}, {duration: trajanje + 0.1})
    sections.forEach(section => {
        // section.style.display = 'flex';
        animate(section, {opacity: 1, scale: 1, scaleX: 1, scaleY:1}, {duration: trajanje + 0.1});
        animate(text, {opacity: 1})
    });
    //skritje strai
    mainSections.classList.add('open');
    strani.forEach(stran => {
        animate(stran, {opacity: 0}, {duration: trajanje + 0.1})
        stran.style.display = 'none';
        stran.classList.remove('z-index');
    })
    //navbar
    animate(navbar, {top: ['-60px', 0]}, {duration: 0.5, delay: 0.6});
    arrow.style.display = 'none';
    pike.style.display = 'block';
    setTimeout(() => {
        navbarH1.innerHTML = 'Chest board'
        navbar.style.backgroundColor = 'rgb(var(--white-200), 0.1)'
        navbar.style.color = 'rgb(var(--grey-700))';
        svg.forEach(svg => {
            svg.style.fill = 'rgb(var(--grey-700))';
        });
    },trajanje*1000 + 0.5);
}
