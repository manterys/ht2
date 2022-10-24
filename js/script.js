// Global
const page = document.querySelector('.page')

// Loader
const appLoader = () => {
    const loader = document.querySelector('.loader')
    if (!loader) return
    
    
    function load() {
        setTimeout(() => {
            loader.style.opacity = 0
            loader.style.display = 'none'
            
            page.classList.add('loaded')
            setTimeout(() => (page.style.opacity = 1), 1000)
        }, 2800)
    }   
    load()
}
appLoader()

// Animation
const appAnimation = () => {
    // const animR = document.querySelector('.animation-right')
    // const animL = document.querySelector('.animation-left')
    const animTextTop = document.querySelectorAll('.anim-text-top')
    const projectImg = document.querySelectorAll('.project-img')

    window.addEventListener('scroll', anim)

    anim()

    function anim() {
    const triggerBottom = window.innerHeight / 1.7
    const triggerTop = window.innerHeight / 1.2

    animTextTop.forEach(anim => {
        const animTop = anim.getBoundingClientRect().top

        if(animTop < triggerTop) {
            anim.classList.add('showText')
        }
        else {
            anim.classList.remove('showText')
        }
    })
    
    projectImg.forEach(anim => {
        const animTop = anim.getBoundingClientRect().top

        if(animTop < triggerBottom) {
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


// Counter
const appIntObserver = () => {
    const statistics = document.querySelector('.statistics')
    const projectImg = document.querySelectorAll('.counter')
    
    let CounterObserver = new IntersectionObserver(
        (entries, observer) => {
            let [entry] = entries;
            if (!entry.isIntersecting) return;
            
            startCount.forEach(counter => {
                counter.innerText = '0'
                
                const updateCounter = () => {
                    const target = +counter.getAttribute('data-target')
                    const count = +counter.innerText
                    
                    const increment = target / 70
                    
                    if(count < target) {
                        counter.innerText = `${Math.ceil(count + increment)}`
            setTimeout(updateCounter, 40)
        } else {
            counter.innerText = target
        }
    }
    
    updateCounter()
})

// observer.unobserve(statistics) - observation is only one time
observer.unobserve(statistics)

},
{
    root: null,
    threshold: window.innerWidth > 768 ? 0.3 : 0.2,
}
)
CounterObserver.observe(statistics)
}

// appIntObserver()


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