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
  const pagItems = Array.from(document.querySelectorAll(".pagination__item"));
  const nextBtn = document.querySelector(".intro__btn");

  introSignupHandler();
  introPaginationByNumber(pagItems);
  nextBtn.addEventListener("click", () => introPaginationByNext(pagItems));
}

function introSignupHandler() {
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

// move pagination__pointer by pagination

function introPaginationByNumber(pagItems) {
  pagItems.forEach((item) =>
    item.addEventListener("click", (e) => {
      const currBtn = e.target;
      const isActive = currBtn.classList.contains("active");
      if (!isActive) {
        pagItems.forEach((item) => item.classList.remove("active"));
        currBtn.classList.add("active");

        // check index of active item
        const index = pagItems.indexOf(currBtn);
        setNewPosition(index);
      }
    })
  );
}

// move pagination__pointer by 'Next' button
function introPaginationByNext(pagItems) {
  const activeIndex = pagItems.findIndex((item) =>
    item.classList.contains("active")
  );

  // if last item is active
  if (activeIndex === pagItems.length - 1) {
    setNewPosition(0);
    setActiveItem(pagItems, 0);
  } else {
    setNewPosition(activeIndex + 1);
    setActiveItem(pagItems, activeIndex + 1);
  }
}

function setActiveItem(items, idx) {
  items.forEach((item) => item.classList.remove("active"));
  items[idx].classList.add("active");
}

// set new pagination__pointer position
function setNewPosition(idx) {
  const pointer = document.querySelector(".pagination__pointer");
  const nextBtn = document.querySelector(".intro__btn");
  const pagItems = Array.from(document.querySelectorAll(".pagination__item"));

  let newPosition = "0";

  switch (idx) {
    case 0:
      newPosition = "0";
      break;
    case 1:
      newPosition = "45.5px";
      break;
    case 2:
      newPosition = "92.5px";
      break;

    default:
      break;
  }

  const tl = gsap.timeline();
  tl.set([nextBtn, ...pagItems], { disabled: true })
    .to(pointer, {
      duration: 1,
      ease: Power3.easeOut,
      x: newPosition,
    })
    .set([nextBtn, ...pagItems], { disabled: false });
}
