// ==========================================================================
// 1. ANIMACIÓN DE MÁQUINA DE ESCRIBIR (TYPING EFFECT)
// ==========================================================================
const words = ["Ricardo Iniesta.", "un modelador 3D.", "un creador de físicas interactivas."];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typingDelay = 110;    
const erasingDelay = 50;    
const newWordDelay = 2200;  

function type() {
    const currentWord = words[wordIndex];
    const typingTextContainer = document.getElementById("typing-text");
    
    if (!typingTextContainer) return;

    if (isDeleting) {
        typingTextContainer.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingTextContainer.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        setTimeout(type, newWordDelay);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(type, 400);
    } else {
        setTimeout(type, isDeleting ? erasingDelay : typingDelay);
    }
}

// ==========================================================================
// 2. CONTROL DE NAVBAR INTELIGENTE (SCROLL UP / DOWN)
// ==========================================================================
let lastScrollTop = 0;
const headerElement = document.getElementById("main-header");
const scrollThreshold = 10; 

function controlNavbar() {
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    
    if (currentScroll < 0) currentScroll = 0; 
    
    if (Math.abs(lastScrollTop - currentScroll) <= scrollThreshold) return;

    if (currentScroll > lastScrollTop && currentScroll > 60) {
        // Al bajar: Oculta la Navbar compacta
        headerElement.classList.add("nav-hidden");
    } else {
        // Al subir: Muestra de nuevo la Navbar
        headerElement.classList.remove("nav-hidden");
    }
    
    lastScrollTop = currentScroll;
}

// ==========================================================================
// 3. SCROLL REVEAL (ANIMACIÓN DINÁMICA DE APARICIÓN DE VIDEOS)
// ==========================================================================
// ======================================================
// REVEAL DE PROYECTOS ESTILO EDITORIAL
// ======================================================

function initProjectsReveal(){

    const projects =
        document.querySelectorAll(".project");

    const observer =
        new IntersectionObserver(
            (entries)=>{

                entries.forEach(entry=>{

                    if(entry.isIntersecting){

                        entry.target.classList.add("visible");

                    }

                });

            },
            {
                threshold:0.25
            }
        );

    projects.forEach(project=>{

        observer.observe(project);

    });

}

// ==========================================================================
// INICIALIZADOR GLOBAL DOM
// ==========================================================================
document.addEventListener("DOMContentLoaded", ()=>{

    if(words.length){

        setTimeout(type,1000);

    }

    initProjectsReveal();

    window.addEventListener(
        "scroll",
        controlNavbar,
        { passive:true }
    );

});