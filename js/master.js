// Check if there is local storage opt

let mainColors = localStorage.getItem("color_option");

if (mainColors !== null) {
  //console.log("Not Empty");

  document.documentElement.style.setProperty("--main-color", mainColors);

  // Remove active class from all colors list Item
  document.querySelectorAll(".color-list li").forEach((element) => {
    element.classList.remove("active");

    // add active class on element with data color === local storage Item
    if (element.dataset.color === mainColors) {
      element.classList.add("active");
    }
  });
}

// Random background option

let backgroundOpt = false;

// Var to control the Background interval
let backgroundInterval;

// Check if there's local storage random background item

let backLocalItem = localStorage.getItem("back_opt");

// check if random background local storage is not empty
if (backLocalItem !== null) {
  if (backLocalItem === "true") {
    backgroundOpt = true;
  } else {
    backgroundOpt = false;
  }

  // remove class active from all spans
  document.querySelectorAll(".random-backgrounds span").forEach((span) => {
    span.classList.remove("active");
  });

  if (backLocalItem === "true") {
    document.querySelector(".random-backgrounds .yes").classList.add("active");
  } else {
    document.querySelector(".random-backgrounds .no ").classList.add("active");
  }
}

// Toggle Spin Class On Icon
document.querySelector(".toggle-settings i").onclick = function () {
  // Toggle class fa-spin for rotation on self
  this.classList.toggle("fa-spin");

  // Toggle class open on main setting box
  document.querySelector(".setting-box").classList.toggle("open");
};

// Switch colors
let colors = document.querySelectorAll(".color-list li");

// Loop on all list items
colors.forEach((li) => {
  // Click on every list Items
  li.addEventListener("click", (e) => {
    //console.log(e.target.dataset.color);

    // Set color on root
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );

    // set color on local storage
    localStorage.setItem("color_option", e.target.dataset.color);

    handleActive(e);
  });
});

// switch background option

let randomBackgrounds = document.querySelectorAll(".random-backgrounds span");

// Loop on all list items
randomBackgrounds.forEach((span) => {
  // Click on every span
  span.addEventListener("click", (e) => {
    //console.log(e.target.dataset.color);
    handleActive(e);

    if (e.target.dataset.background === "yes") {
      backgroundOpt = true;
      randomizeImgs();
      localStorage.setItem("back_opt", true);
    } else {
      backgroundOpt = false;
      clearInterval(backgroundInterval);
      localStorage.setItem("back_opt", false);
    }
  });
});
// Select landing page element

let landingElement = document.querySelector(".landing-page");

// Get array of images

let imgsArray = ["05.jpg", "07.jpg", "08.jpg", "10.jpg"];

// function to randomize option

function randomizeImgs() {
  if (backgroundOpt === true) {
    backgroundInterval = setInterval(() => {
      // Get Random Number

      let randomNumber = Math.floor(Math.random() * imgsArray.length);

      // change Background image url

      landingElement.style.backgroundImage =
        'url("imgs/' + imgsArray[randomNumber] + '")';
    }, 6000);
  }
}

randomizeImgs();

// Select Skills Selector
/* let ourSkills = document.querySelector(".skills");

window.onscroll = function () {
  // Skills Offset Top
  let skillsOffsetTop = ourSkills.offsetTop;

  // Skills Outer Height
  let skillsOuterHeight = ourSkills.offsetHeight;

  // Window Height
  let windowHeight = this.innerHeight;

  // Window ScrollTop
  let windowScrollTop = this.pageYOffset;

  if (windowScrollTop >= skillsOffsetTop + skillsOuterHeight - windowHeight) {
    let allSkills = document.querySelectorAll(
      ".skill-box .skill-progress span"
    );

    allSkills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  }
}; */

let skills = document.querySelector(".skills");
window.onscroll = function () {
  let skillstop = skills.offsetTop;
  let skillsheight = skills.offsetHeight;
  let winheight = this.innerHeight;
  let winscrooltop = this.pageYOffset;
  if (winscrooltop >= skillstop + skillsheight - winheight - 100) {
    document.querySelectorAll(" .skill-progress span").forEach((s) => {
      s.style.width = s.dataset.progress;
    });
  }
};

// Create popup with the image

let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    // create overlay element
    let overlay = document.createElement("div");

    // add class to the overlay
    overlay.className = "popup-overlay";

    // append overlay to the body
    document.body.appendChild(overlay);

    // create the popup
    let popupBox = document.createElement("div");

    // add class to the popupBox
    popupBox.className = "popup-box";

    if (img.alt !== null) {
      // create heading
      let imgHeading = document.createElement("h3");

      // create text for heading
      let imgText = document.createTextNode(img.alt);

      // append the text to the heading
      imgHeading.appendChild(imgText);

      // append the heading to the popupBox
      popupBox.appendChild(imgHeading);
    }

    // create the close span button
    let closeButton = document.createElement("span");

    // create the close button text
    let closeButtonText = document.createTextNode("X");

    // append text to the close button

    closeButton.appendChild(closeButtonText);

    // append class to the close button
    closeButton.className = "btn-close";

    // append close Button to the popupBox

    popupBox.appendChild(closeButton);

    // create the image

    let popupImg = document.createElement("img");

    // set image source
    popupImg.src = img.src;

    // add image to popup box
    popupBox.appendChild(popupImg);

    // add the popup box to the body

    document.body.appendChild(popupBox);
  });
});

// close Popup

document.addEventListener("click", function (e) {
  if (e.target.className == "btn-close") {
    // remove the current popup

    e.target.parentNode.remove();

    // Remove overlay

    document.querySelector(".popup-overlay").remove();
  }
});

// select all bullets

let bullets = document.querySelectorAll(".nav-bullets .bullet");

let links = document.querySelectorAll(".links a");

function scrollToSomeSection(elements) {
  elements.forEach((element) => {
    element.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}

scrollToSomeSection(bullets);
scrollToSomeSection(links);

// Handle Active function

function handleActive(ev) {
  // Remove Active Class From All Childrens

  ev.target.parentElement.querySelectorAll(".active").forEach((element) => {
    element.classList.remove("active");
  });

  // add class active on the clicked element

  ev.target.classList.add("active");
}

let bulletsSpan = document.querySelectorAll(".bullets-option span");

let bulletsContainer = document.querySelector(".nav-bullets");

let bulletLocalItem = localStorage.getItem("bullets_option");

if (bulletLocalItem !== null) {
  bulletsSpan.forEach((span) => {
    span.classList.remove("active");
  });

  if (bulletLocalItem === "block") {
    bulletsContainer.style.display = "block";

    document.querySelector(".bullets-option .yes").classList.add("active");
  } else {
    bulletsContainer.style.display = "none";

    document.querySelector(".bullets-option .no").classList.add("active");
  }
}

bulletsSpan.forEach((span) => {
  span.addEventListener("click", (e) => {
    if (span.dataset.display === "show") {
      bulletsContainer.style.display = "block";

      localStorage.setItem("bullets_option", "block");
    } else {
      bulletsContainer.style.display = "none";

      localStorage.setItem("bullets_option", "none");
    }

    handleActive(e);
  });
});

// Reset Button
document.querySelector(".reset-options").onclick = () => {
  localStorage.clear();

  // Reload window
  window.location.reload();
};

// Toggle menu

let toggleBtn = document.querySelector(".toggle-menu");

let toggleLikns = document.querySelector(".links");

toggleBtn.onclick = function (e) {
  // stop propagation
  e.stopPropagation();

  // toggle class "menu-active" On Button
  this.classList.toggle("menu-active");

  // toggle class "open" on links
  toggleLikns.classList.toggle("open");
};

//click anywhere outside menu and toggle button

document.addEventListener("click", (e) => {
  if (e.target !== toggleBtn && e.target !== toggleLikns) {
    // check menu is open or not
    if (toggleLikns.classList.contains("open")) {
      // toggle class "menu-active" On Button
      toggleBtn.classList.toggle("menu-active");

      // toggle class "open" on links
      toggleLikns.classList.toggle("open");
    }
  }
});

// stop propag for menu
toggleLikns.onclick = function (e) {
  // stop propagation
  e.stopPropagation();
};
