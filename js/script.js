/**
 * Function to make the hamburger menu functional
 */
function navigation_slide () {
    const burger = document.querySelector('.burger');
    const navigation = document.querySelector('.primary-navigation');
    const navigation_links = document.querySelectorAll('.primary-navigation a');

    burger.addEventListener('click', () => {
        navigation.classList.toggle('navigation-active');

        navigation_links.forEach( (link, index) => {
            if (link.style.animation) {
                link.style.animation = ""
            } else
                link.style.animation = `naviagtionLinkFade 0.5s ease forwards ${index / 5 + 0.3}s`
        })

        burger.classList.toggle('toggle');
    })
}

/**
 * Initialises all the functions.
 * Add your function which needs to run at start to this function 
 */
function initialise() {
    navigation_slide();
}

initialise()