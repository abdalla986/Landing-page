/**
 *  
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
const sections = document.getElementsByTagName("section");
const fragment = document.createDocumentFragment();
const unorderedList = document.querySelector("ul");
/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
// create new <a> element inside <li> element.
function navMenuItem(id, secName) {
    const itemMarkup = `<li><a class="menu__link" href="#${id}">${secName}</a></li>`;
    return itemMarkup;
}

// return the section bound position relative to the viewport.
function sectionInView(item) {
    const sectionBounding = item.getBoundingClientRect();
    return (sectionBounding.top >= 0 && sectionBounding.top <= 200);
}

// event listener function to scroll to the appropriate section of the page.
function clickScroll(evt) {
    evt.preventDefault();
    const getAttr = this.getAttribute("href"); 
    const distanceOfParentNode = document.querySelector(getAttr).offsetTop; 
    scroll({
      top: distanceOfParentNode,
      behavior: "smooth"
    });
    // this MDN doc https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this.
    // offsetTop MDN doc https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetTop.
    // scroll MDN doc https://developer.mozilla.org/en-US/docs/Web/API/Element/scroll.
  }
/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav - passes the "id" and "data-nav" attributes as an arguments and create <li> thin
// append any new item as a last child in the Document Fragment.
function buildTheNav() {
    for (const section of sections) {
        const section_Id = section.getAttribute("id");
        const section_Name = section.getAttribute("data-nav");
        newItem = document.createElement('li');
        newItem.innerHTML = navMenuItem(section_Id, section_Name);
        fragment.appendChild(newItem);
    }
    unorderedList.appendChild(fragment);
}

// Add class 'active' to section when near top of viewport
// functionality to distinguish the section when it in view.
function activeSection() {
    for (const section of sections) {
        if(sectionInView(section)) {
            section.classList.add("your-active-class");
        }else{
            section.classList.remove("your-active-class");
        }
    }
}

// Scroll to anchor ID using scrollTO event

/**
 * End Main Functions
 * Begin Events
 * 
*/
// event listener runs when the user scroll.
document.addEventListener("scroll", activeSection);

// Build menu 
buildTheNav();

// Scroll to section on link click
// get all <a> that inside <li> and run event listener function "clickScroll" when the user click on section link.
const sectionLinks = document.querySelectorAll("li a");

for (const link of sectionLinks) {
  link.addEventListener("click", clickScroll);
}
// Set sections as active

//Get the button: using w3schools.com help
topButton = document.getElementById("topBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    topButton.style.display = "block";
  } else {
    topButton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}
