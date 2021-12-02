/**
 * Function to make the hamburger menu functional
 */
function navigation_slide () {
    const burger = document.querySelector('.burger');
    const navigation = document.querySelector('.primary-navigation');
    const navigation_links = document.querySelectorAll('.primary-navigation li');

    burger.addEventListener('click', () => {
        if(navigation.getAttribute("state") == "active") {
            navigation.setAttribute("state", "inactive");
        } else {
            navigation.setAttribute("state", "active");
        }

        navigation_links.forEach( (link, index) => {
            if (link.style.animation) {
                link.style.animation = ""
            } else
                link.style.animation = `naviagtionLinkFade 0.5s ease forwards ${index / 5 + 0.3}s`
        })

        burger.classList.toggle('toggle');
    })
}

function navigation_shadow () {
    var navbar = document.querySelector(".primary-header");
    if (window.pageYOffset > 0) {
        navbar.classList.add("shadow")
    } else {
        navbar.classList.remove("shadow");
    }
}

function toggle_events () {
    const upcoming = document.querySelector(".events-upcoming");
    const old = document.querySelector(".events-old");

    if (upcoming.classList.contains("hidden")) {
        upcoming.classList.remove("hidden");
        old.classList.add("hidden");
    } else {
        upcoming.classList.add("hidden");
        old.classList.remove("hidden");
    }
}

async function fetch_events() {
    let res = await fetch("https://codechef-api.azurewebsites.net/api/events")
    let json = await res.json()
    const { old, upcoming } = json;
    const events_upcoming = document.querySelector(".events-upcoming")
    const events_old = document.querySelector(".events-old")
    
    let index = 0, html = ''
    upcoming.forEach( event => {
        if (index % 2 == 0)
            html += `<div class="event-upcoming"><div class="event-item event-image"><img src="${event.image}" alt="image"></div><div class="event-line"></div><div class="event-item event-details"><div class="event-name">Name: ${event.name}</div><div class="event-venue">Venue: ${event.venue}</div><div class="event-date">Date: ${event.date}-${event.month}-${event.year}</div><div class="event-time">Time: ${event.hour}:${event.minutes}</div><div class="event-description">${event.description}</div></div></div>`
        else
            html += `<div class="event-upcoming"><div class="event-item event-details"><div class="event-name">Name: ${event.name}</div><div class="event-venue">Venue: ${event.venue}</div><div class="event-date">Date: ${event.date}-${event.month}-${event.year}</div><div class="event-time">Time: ${event.hour}:${event.minutes}</div><div class="event-description">${event.description}</div></div><div class="event-line"></div><div class="event-item event-image"><img src="${event.image}" alt="image"></div></div>`
        index++;
    })
    events_upcoming.innerHTML = html

    index = 0, html = ''
    old.forEach( event => {
        if (index % 2 == 0)
            html += `<div class="event-old"><div class="event-item event-image"><img src="${event.image}" alt="image"></div><div class="event-line"></div><div class="event-item event-details"><div class="event-name">Name: ${event.name}</div><div class="event-venue">Venue: ${event.venue}</div><div class="event-date">Date: ${event.date}-${event.month}-${event.year}</div><div class="event-time">Time: ${event.hour}:${event.minutes}</div><div class="event-description">${event.description}</div></div></div>`
        else
            html += `<div class="event-old"><div class="event-item event-details"><div class="event-name">Name: ${event.name}</div><div class="event-venue">Venue: ${event.venue}</div><div class="event-date">Date: ${event.date}-${event.month}-${event.year}</div><div class="event-time">Time: ${event.hour}:${event.minutes}</div><div class="event-description">${event.description}</div></div><div class="event-line"></div><div class="event-item event-image"><img src="${event.image}" alt="image"></div></div>`
        index++;
    })
    events_old.innerHTML = html
}

function navigation_scroll() {
    const about_link = document.getElementById('about-link');
    const about = document.getElementById('about');
    const event_link = document.getElementById('event-link');
    const events = document.getElementById('events');
    const contact_link = document.getElementById('contact-link');
    const contact = document.getElementById('contact');
    const burger = document.querySelector('.burger');
    
    about_link.addEventListener("click", () => {
        window.scroll(0, about.offsetTop - 100)
        burger.click();
    })
    
    event_link.addEventListener("click", () => {
        window.scroll(0, events.offsetTop - 100)
        burger.click();
    })
    
    contact_link.addEventListener("click", () => {
        window.scroll(0, contact.offsetTop - 100)
        burger.click();
    })
}

/**
 * Initialises all the functions.
 * Add your function which needs to run at start to this function 
 */
async function initialise() {
    navigation_slide();
    window.onscroll = () => navigation_shadow();
    document.getElementById("events-toggle").onclick = () => toggle_events();
    await fetch_events();
    navigation_scroll();
}

initialise()