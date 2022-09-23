// Define Global Variables
let sections = document.querySelectorAll("main section");
let navMenu = document.querySelector(".navbar__menu");
let navLi = document.createElement("ul");
let highlight = `background: #333;color: #fff;transition: ease 0.3s all`;

// End Global Variables
generateNavBar();
// select navbar list items after generate it
let navItems = document.querySelectorAll("ul li");
// Begin helper Functions

function addhigHlight(section) {
  let linkName = section.getAttribute("data-nav");
  section.classList.add("your-active-class");
  navItems.forEach((li)=>{
    if(li.querySelector("a").innerHTML === linkName){
      li.querySelector("a").style.cssText = highlight;
    }
  })
}

function removeHighlight() {
  navItems.forEach((li)=>{
    li.querySelector("a").style.cssText = "";
  })
  sections.forEach((section)=>{
    section.classList.remove("your-active-class");
  })
}

// end helper Functions

// Begin Main Functions



// build the nav
function generateNavBar() {
  sections.forEach((section) => {
    //get value of custom attribute from section (element)
    let valueOfLink = section.getAttribute("data-nav");
    //crate list item with section attribute name and appending it to navList
    navLi.appendChild(createLink(valueOfLink));
  });
  navLi.id = "navbar__list";
  navMenu.appendChild(navLi);
}

// create list item with anchor link
// Build menu with the name of all sections
function createLink(content) {
  let li = document.createElement("li");
  let a = document.createElement("a");
  a.innerHTML = content;
  a.className = "menu__link";
  li.appendChild(a);
  return li;
}

// end Main Functions

// Begin Events
// listen to click in parent of li(links)
navLi.addEventListener("click", scrollToSectionByClick)
function scrollToSectionByClick(event) {
  // check if clicked element is a not ul
  if (event.target.tagName === "A") {
    let targetSection = document.querySelector(`[data-nav="${event.target.innerHTML}"]`)
    targetSection.scrollIntoView({
      behavior: "smooth"
    })
  }
}

window.addEventListener("scroll", highlightSectionAndLink)
function highlightSectionAndLink(){
  sections.forEach((section)=>{
    //64 =>. An additional number to ensure that the desired content is reached
    if(Math.ceil(window.scrollY+64) >= section.offsetTop){
      // remove all Highlight style of all section and links
      removeHighlight();
      // add Highlight to target section and link related to section
      addhigHlight(section);
    }
  })
}
// end Events
