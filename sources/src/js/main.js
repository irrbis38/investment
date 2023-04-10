document.addEventListener("DOMContentLoaded", function (event) {
  headerInit();

  // intro
  const intro = document.querySelector(".intro");
  if (intro) {
    introInit();
  }
});

// init GSAP ScrollTrigger
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

  const firstPaginationItem = document.querySelector(".pagination").children[0];

  // initial styles for first '.pagination__item'
  gsap.set(firstPaginationItem, {
    scale: 1.42,
    opacity: 1,
  });

  introSignupHandler();
  introAnimationByNumber(pagItems);
  nextBtn.addEventListener("click", () => {
    introAnimationByNext(pagItems);
  });

  resonsSliderInit();
  infoCenterSliderInit();
}

function introSignupHandler() {
  const introSingnup = document.querySelector(".intro__signup");
  const startGradient =
    "linear-gradient(277.24deg, #071b64 33.49%, #265792 104.72%)";
  const endGradient =
    "linear-gradient(277.66deg, #071B64 -57.44%, #3368A5 105.08%)";
  const introBG = document.querySelector(".intro__bg");

  const introArrow = introSingnup.querySelector(
    ".intro__signup .svg-image-intro-arrow-up-45-white"
  );
  const duration = 0.2;

  const props = {
    introArrow,
    introBG,
    startGradient,
    endGradient,
    duration,
  };

  // intro__signup handlers

  introSingnup.addEventListener("mouseenter", () => {
    introSignupPlay({ ...props, direction: "forward" });
  });

  introSingnup.addEventListener("mouseleave", () => {
    introSignupPlay({ ...props, direction: "backward" });
  });
}

function introSignupPlay(props) {
  const {
    introArrow,
    introBG,
    startGradient,
    endGradient,
    duration,
    direction,
  } = props;
  // timeline for intro__signup arrow

  const introTL = gsap.timeline();

  if (direction === "forward") {
    return introTL
      .to(introArrow, duration, { rotate: 45 })
      .fromTo(
        introBG,
        duration,
        { background: startGradient },
        { background: endGradient },
        0
      );
  } else {
    return introTL
      .to(introArrow, duration, { rotate: 0 })
      .fromTo(
        introBG,
        duration,
        { background: endGradient },
        { background: startGradient },
        0
      );
  }
}

// animation slides and pagination by pagination

function introAnimationByNumber(pagItems) {
  pagItems.forEach((item) =>
    item.addEventListener("click", (e) => {
      const nextActiveButton = e.target;
      const isActive = nextActiveButton.classList.contains("active");
      if (!isActive) {
        const prevActiveButton = pagItems.find((item) =>
          item.classList.contains("active")
        );
        const prevBtnIndex = Number(prevActiveButton.dataset.index);
        const nextBtnIndex = pagItems.indexOf(nextActiveButton);

        // set class 'active' to next pagination item
        pagItems.forEach((item) => item.classList.remove("active"));
        nextActiveButton.classList.add("active");

        // slider animation depend direction
        if (prevBtnIndex < nextBtnIndex) {
          introSliderAnimation(prevBtnIndex, nextBtnIndex, "forward", false);
        } else if (prevBtnIndex > nextBtnIndex) {
          introSliderAnimation(prevBtnIndex, nextBtnIndex, "backward", false);
        }
        // pagination animation
        paginationAnimation(nextBtnIndex, prevActiveButton, nextActiveButton);
      }
    })
  );
}

// animation slides and pagination by 'Next' button
function introAnimationByNext(pagItems) {
  const prevActiveIndex = pagItems.findIndex((item) =>
    item.classList.contains("active")
  );
  const prevActiveNumber = pagItems[prevActiveIndex];
  const nextActiveNumber =
    prevActiveIndex === pagItems.length - 1
      ? pagItems[0]
      : pagItems[prevActiveIndex + 1];

  // if last item is active
  if (prevActiveIndex === pagItems.length - 1) {
    paginationAnimation(0, prevActiveNumber, nextActiveNumber);
    setActiveItem(pagItems, 0);
    introSliderAnimation(prevActiveIndex, 0, "backward", true);
  } else {
    paginationAnimation(
      prevActiveIndex + 1,
      prevActiveNumber,
      nextActiveNumber
    );
    setActiveItem(pagItems, prevActiveIndex + 1);
    introSliderAnimation(
      prevActiveIndex,
      prevActiveIndex + 1,
      "forward",
      false
    );
  }
}

function setActiveItem(items, idx) {
  items.forEach((item) => item.classList.remove("active"));
  items[idx].classList.add("active");
}

// set new pagination__pointer position
function paginationAnimation(idx, unsetActiveItem, setActiveItem) {
  const pointer = document.querySelector(".pagination__pointer");
  const nextBtn = document.querySelector(".intro__btn");
  const pagItems = Array.from(document.querySelectorAll(".pagination__item"));

  let newPosition = "0";

  switch (idx) {
    case 0:
      newPosition = "0";
      break;
    case 1:
      newPosition = "47px";
      break;
    case 2:
      newPosition = "94px";
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
    .to(
      unsetActiveItem,
      {
        duration: 0.3,
        scale: 1,
        opacity: 0.5,
      },
      "-=0.8"
    )
    .to(
      setActiveItem,
      {
        duration: 0.2,
        scale: 1.42,
        opacity: 1,
      },
      "-=0.4"
    )
    .set([nextBtn, ...pagItems], { disabled: false });
}

// intro slider

function introSliderAnimation(
  prevIndex,
  nextIndex,
  direction,
  isForegroundShow
) {
  const { slides, contentItems } = createSlidesArray(prevIndex, nextIndex);

  const { prevSup, prevTitle, prevImg, nextSup, nextTitle, nextImg } =
    defineAnimatedElements(prevIndex, nextIndex);

  const foreground = document.querySelector(".intro__foreground");

  let slidesTo = "-100%";
  let contentItemsTo = "0";

  if (direction === "forward") {
    slidesTo = "-100%";
    contentItemsTo = "0";
  } else if (direction === "backward") {
    slidesTo = "0";
    contentItemsTo = "-100%";
  }

  let duration = isForegroundShow ? 0.8 : 1;

  const TL = gsap
    .timeline({
      defaults: {
        duration: duration,
      },
    })
    .to(slides, { x: slidesTo, ease: Power4.easeOut })
    .to(contentItems, { x: contentItemsTo, ease: Power4.easeOut }, 0)
    .to(prevSup, { x: "30px" }, 0)
    .to(prevTitle, { x: "50px" }, 0)
    .to(prevImg, { scale: "1.2" }, 0)
    .fromTo(nextSup, { x: "30px" }, { x: "0" }, 0)
    .fromTo(nextTitle, { x: "50px" }, { x: "0" }, 0)
    .fromTo(nextImg, { scale: "1.2" }, { scale: "1" }, 0);

  // blue foreground show only slider translate from last item to first
  // only click by nextBtn
  if (isForegroundShow) {
    TL.to(foreground, { x: "0", duration: 0.4, ease: Power4.easeOut }, 0)
      .to(
        foreground,
        { x: "100vw", duration: 0.7, ease: Power4.easeOut },
        "-=0.4"
      )
      .to(foreground, { x: "-100vw", duration: 0 }, "+=0.5");
  }
}

// create set of slides for move
function createSlidesArray(prevIndex, nextIndex) {
  const allSliderItems = Array.from(document.querySelectorAll(".intro__item"));
  const allContentItems = Array.from(
    document.querySelectorAll(".intro__content")
  );
  // slides to be moved
  let slides = [];
  // contentItems to be moved
  let contentItems = [];

  // forward direction
  if (nextIndex > prevIndex) {
    slides = [...allSliderItems.slice(prevIndex + 1, nextIndex + 1)];
    contentItems = [...allContentItems.slice(prevIndex + 1, nextIndex + 1)];

    // backward direction
  } else {
    slides = [...allSliderItems.slice(nextIndex + 1, prevIndex + 1)];
    contentItems = [...allContentItems.slice(nextIndex + 1, prevIndex + 1)];
  }

  return { slides, contentItems };
}

// define animated elements (titles, subtitles and images)
function defineAnimatedElements(prevIdx, nextIdx) {
  const slides = Array.from(document.querySelectorAll(".intro__item"));
  const prevSlide = slides[prevIdx];
  const nextSlide = slides[nextIdx];

  // elements in previous slide to be move
  const prevSup = prevSlide.querySelector(".intro__suptitle");
  const prevTitle = prevSlide.querySelector(".intro__title");
  const prevImg = prevSlide.querySelector("img");

  // elements in next slide to be move
  const nextSup = nextSlide.querySelector(".intro__suptitle");
  const nextTitle = nextSlide.querySelector(".intro__title");
  const nextImg = nextSlide.querySelector("img");

  const items = {
    prevSup,
    prevTitle,
    prevImg,
    nextSup,
    nextTitle,
    nextImg,
  };

  return items;
}

function resonsSliderInit() {
  const swiper = new Swiper(".resons__slider", {
    // Optional parameters
    loop: false,
    slidesPerView: "auto",
    spaceBetween: 38,
    grabCursor: true,
    scrollbar: {
      el: ".resons__scrollbar",
      draggable: true,
    },

    // If we need pagination
    // pagination: {
    //   el: '.swiper-pagination',
    // },

    // // Navigation arrows
    // navigation: {
    //   nextEl: '.swiper-button-next',
    //   prevEl: '.swiper-button-prev',
    // },

    // // And if we need scrollbar
    // scrollbar: {
    //   el: '.swiper-scrollbar',
    // },
  });
}

function infoCenterSliderInit() {
  const swiper = new Swiper(".ic__slider", {
    loop: false,
    slidesPerView: "auto",
    spaceBetween: 59,
    grabCursor: true,
  });
}
