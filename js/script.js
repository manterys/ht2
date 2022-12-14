// Global
const page = document.querySelector('.page')

// Loader
const appLoader = () => {
    const loader = document.querySelector('.loader')
    if (!loader) return
    
    function load() {
        setTimeout(() => {
            loader.style.opacity = 0
            setTimeout(() => (page.style.opacity = 1), 1000)
            page.classList.add('loaded')
    
            setTimeout(() => (loader.style.display = 'none'), 1000)
        }, 3000)
    }   
    load()
}
appLoader()


// Page Transition
// https://www.youtube.com/watch?v=jEaN8PpyezM
const appPageTransition = () => {
    const link = document.querySelector('.nav a')
    const transition_el = document.querySelector('.transition')
    link.addEventListener('click', (e) => {
        e.preventDefault()
        transition_el.classList.add('slide')
        setTimeout(() => {
            window.location = link.href
        }, 900)
    })
}
appPageTransition()


// Animation
const appAnimation = () => {
    const animTextTop = document.querySelectorAll('.anim-text-top')
    const projectImg = document.querySelectorAll('.project-img')

    window.addEventListener('scroll', anim)
    
    anim()
    
    function anim() {
        const triggerImg = window.innerHeight / 1.7
        const triggerText = window.innerHeight / 1.1
        
        animTextTop.forEach(anim => {
            const animTop = anim.getBoundingClientRect().top
            
            if(animTop < triggerText) {
            anim.classList.add('showText')
        }
        else {
            anim.classList.remove('showText')
        }
    })
    
    projectImg.forEach(anim => {
        const animTop = anim.getBoundingClientRect().top

        if(animTop < triggerImg) {
            anim.classList.add('showImg')
        }
    })
    }
}
appAnimation()


// Menu Button
const appMenuBtn = () => {
    const menuBtn = document.getElementById('menu-btn')
    if(!menuBtn) return

    menuBtn.addEventListener('click', () => page.classList.toggle('menuActive'))

    const nav = document.querySelector('.nav')
    nav.querySelectorAll('.nav a').forEach(function(link) {
        link.addEventListener("click", function(e) {
            page.classList.remove('menuActive')
        })
    })
}
appMenuBtn()


// Single Letter Animation
// https://www.youtube.com/watch?v=GUEB9FogoP8
const appLetterAnimation = () => {
    const text = document.querySelector('.lead')
    const contentText = text.textContent
    const splitText = contentText.split('')
    text.textContent = ""
    
    for (let i = 0; i < splitText.length; i++) {
        text.innerHTML += "<span>" + splitText[i] + "</span>"
    }

    let char = 0
    let timer = setInterval(animLetter, 15)
    
    function animLetter() {
        const span = text.querySelectorAll('.lead span')[char]
        span.classList.add('fade')
        char++
        if(char === splitText.length) {
            complete()
            return;
        }
    }
    
    function complete() {
        clearInterval(timer)
        timer = null
    }
}


// Intersection Observer
const appIntObserver = () => {
    const observerSection = document.querySelector('.about')
    const lead = document.querySelector('.lead')
    
    let LetterObserver = new IntersectionObserver(
        (entries, observer) => {
            let [entry] = entries;
            if (!entry.isIntersecting) return;
            
            lead.style.opacity = "1"
            appLetterAnimation()

// observer.unobserve(observerSection) - observation is only one time
observer.unobserve(observerSection)

},
{
    root: null,
    threshold: window.innerWidth > 768 ? 0.3 : 0.2,
}
)
LetterObserver.observe(observerSection)
}
appIntObserver()


// Faq
const appFaq = () => {
    const faq = document.querySelectorAll('.question')

    faq.forEach(faq => {
        faq.addEventListener('click', () => {
            faq.parentNode.classList.toggle('active')
        })
    })
}
appFaq()


// Button Scroll Top
const appBtnTop = () => {
    const pxShow = 600;
    const btnTop = document.querySelector(".btn-go-top")
    if (!btnTop) return
    if (window.scrollY >= pxShow) btnTop.classList.add("visible")
    window.addEventListener('scroll', function() {
        if (window.scrollY >= pxShow) {
            if(!btnTop.classList.contains('visible')) btnTop.classList.add("visible")
        } else {
            btnTop.classList.remove("visible")
        }
    });
}
appBtnTop()


// Move to
const appMoveTo = () => {
    const easeFunctions = {
        easeInQuad: function (t, b, c, d) {
            t /= d
        return c * t * t + b
    },
    easeOutQuad: function (t, b, c, d) {
        t /= d
        return -c * t* (t - 2) + b
    },
    easeInOutQuad: function (t, b, c, d) {
        t /= d/2
        if (t < 1) return c/2*t*t + b
        t--
        return -c/2 * (t*(t-2) - 1) + b
    },
    easeInOutCubic: function (t, b, c, d) {
        t /= d/2
        if (t < 1) return c/2*t*t*t + b
        t -= 2
        return c/2*(t*t*t + 2) + b
    }
    }

    const triggers = document.querySelectorAll('.smoothscroll')

    const moveTo = new MoveTo({
        tolerance: 30,
        duration: 2000,
        easing: 'easeInOutCubic',
        container: window
    }, easeFunctions)

    triggers.forEach(function(trigger) {
        moveTo.registerTrigger(trigger)
    })
}
appMoveTo()