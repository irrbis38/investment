document.addEventListener("DOMContentLoaded", function (event) {
  headerInit();

  // intro
  const intro = document.querySelector(".intro");
  if (intro) {
    introInit();
  }
});

// init GSAP
gsap.registerPlugin(ScrollTrigger);

// header logic

function headerInit() {
  langMenuHandler();
  changeLang();
}

function langMenuHandler() {
  const lang = document.querySelector(".lang");

  lang.addEventListener("mouseenter", () => {
    lang.classList.add("active");
  });

  lang.addEventListener("mouseleave", () => {
    lang.classList.remove("active");
  });
}

function changeLang() {
  const lang = document.querySelector(".lang");
  const langSelected = document.querySelector(".lang__selected");
  const langSelectedIcon = langSelected.children[0].children[0];
  const langSelectedContent = langSelected.children[1];
  const langItems = document.querySelectorAll(".lang__item");

  langItems.forEach((langItem) => {
    langItem.addEventListener("click", (e) => {
      // current .lang__item
      const currItem = e.currentTarget;
      const isSelected = currItem.classList.contains("selected");
      if (!isSelected) {
        // add class '.selected'
        langItems.forEach((item) => item.classList.remove("selected"));
        currItem.classList.add("selected");
        lang.classList.remove("active");

        // change content of '.lang__selected'
        const currIconUrl =
          currItem.children[0].children[0].getAttribute("src");
        const currItemContent = currItem.dataset.lang;

        langSelectedIcon.setAttribute("src", currIconUrl);
        langSelectedIcon.setAttribute("alt", currItemContent);
        langSelectedContent.textContent = currItemContent;
      }
    });
  });
}

// intro logic

function introInit() {
  const introSingnup = document.querySelector(".intro__signup");
  const introBG = document.querySelector(".intro__bg");
  const startGradient =
    "linear-gradient(277.24deg, #071b64 33.49%, #265792 104.72%)";
  const endGradient =
    "linear-gradient(277.66deg, #071B64 -57.44%, #3368A5 105.08%)";
  const introArrow = introSingnup.querySelector(
    ".intro__signup .svg-image-intro-arrow-up-45-white"
  );
  const duration = 0.2;

  // timeline for intro__signup arrow

  const introTL = gsap.timeline();

  introTL
    .to(introArrow, duration, { rotate: 45 })
    .fromTo(
      introBG,
      duration,
      { background: startGradient },
      { background: endGradient },
      0
    );

  // intro__signup handlers

  introSingnup.addEventListener("mouseenter", () => {
    introTL.play();
  });

  introSingnup.addEventListener("mouseleave", () => {
    introTL.reverse();
  });
}
