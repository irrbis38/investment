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
  toggleMobileMenu();
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

// get all header elements that toggle active className
function getHeaderElements() {
  // set all classes of header elements, that toggle class '.active' by burger button
  const headerClasses = [
    ".header",
    ".header__burger",
    ".auth",
    ".header__logo",
    ".header__panel",
    ".header__nav",
  ];
  // get all header elemtns by class name
  return headerClasses.map((item) => document.querySelector(item));
}

function toggleMobileMenu() {
  const headerElements = getHeaderElements();

  const burgerButton = document.querySelector(".header__burger");

  // set listener for burger button
  burgerButton.addEventListener("click", () => {
    if (!burgerButton.classList.contains("active")) {
      createHeaderTimeline("-28px");
    } else {
      createHeaderTimeline("0");
    }
    headerElements.forEach((el) => el.classList.toggle("active"));
    document.body.classList.toggle("lock");
  });
}

// animation for show / hide mobile menu
function createHeaderTimeline(value) {
  return gsap
    .timeline({ duration: 0.1, ease: Power3.easeOut })
    .to([".header__logo", ".header__panel"], {
      y: value,
    });
}

// hide mobile menu by risize if window.innnerWidht > 1280px
const mqMD = window.matchMedia("(min-width: 1281px)");

mqMD.addEventListener("change", () => {
  // if mobile menu is active and window resize
  // close mobile menu if windown.innerWidth more than 1280px
  if (window.innerWidth > 1280) {
    // fix '.header__nav' transition
    removeHeaderNavTransition();

    // move down logo and '.header__panel'
    createHeaderTimeline("0");

    // unfix body
    document.body.classList.remove("lock");

    // remove class 'active' for all header elements
    const headerElements = getHeaderElements();
    headerElements.forEach((el) => el.classList.remove("active"));
  } else {
    // fix '.header__nav' transition
    removeHeaderNavTransition();
  }
});

function removeHeaderNavTransition() {
  return gsap
    .timeline()
    .set(".header__nav", { display: "none" })
    .set(".header__nav", { clearProps: "all" }, "+=0.4");
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
  mainPageAnimation();
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
      dragSize: "auto",
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
    spaceBetween: 36,
    grabCursor: true,
    scrollbar: {
      el: ".ic__scrollbar",
      draggable: true,
      dragSize: "auto",
    },
    breakpoints: {
      577: {
        spaceBetween: 43,
      },
      769: {
        spaceBetween: 51,
      },
      993: {
        spaceBetween: 59,
      },
    },
  });
}

function mainPageAnimation() {
  const intro_images = Array.from(
    document.querySelectorAll(".intro__image img")
  );
  const intro_about_all = Array.from(
    document.querySelectorAll(".intro__about")
  );
  const intro_panel = document.querySelector(".intro__panel");
  const intro_container = document.querySelector(".intro__container");
  const info_inner = document.querySelector(".info__inner");
  const info_background = document.querySelector(".info__background");
  const info_club = document.querySelector(".info__club");
  const resons_slides = Array.from(document.querySelectorAll(".resons__slide"));

  introAnimationByScroll(intro_images, intro_panel, intro_about_all);
  pinIntroContainer(intro_container);
  // hideIntroContainer(intro_container);
  parallaxInfoInner(info_inner);
  pinInfoBackground(info_background);
  parallaxInfoClub(info_club);
  translateResonsSlides(resons_slides);
}

function introAnimationByScroll(images, panel, aboutAll) {
  // console.log(images);
  const TL = gsap.timeline();

  TL.to(images, {
    scale: 1.1,
    ease: Power2.easeOut,
    scrollTrigger: {
      target: images,
      trigger: "body",
      start: "top top",
      end: "+=1000",
      scrub: true,
    },
  })
    .to(
      aboutAll,
      {
        y: -100,
        ease: Power3.easeOut,
        scrollTrigger: {
          target: aboutAll,
          trigger: "body",
          start: "top top",
          end: "+=300",
          scrub: true,
        },
      },
      0
    )
    .to(
      panel,
      {
        y: -100,
        ease: Power3.easeOut,
        scrollTrigger: {
          target: panel,
          trigger: "body",
          start: "top top",
          end: "+=300",
          scrub: true,
        },
      },
      0
    );
}

function pinIntroContainer(intro_container) {
  // let heightDelta = 0;
  // if (window.innerHeight < 700) {
  //   heightDelta = 700 - window.innerHeight;
  // }

  // window.addEventListener("resize", () => {
  //   if (window.innerHeight < 700) {
  //     heightDelta = 700 - window.innerHeight;
  //   } else {
  //     heightDelta = 0;
  //   }
  // });
  return ScrollTrigger.create({
    trigger: "body",
    // start: () => `top top-=${heightDelta}`,
    start: "top top",
    endTrigger: "body",
    end: "bottom -=100",
    pin: intro_container,
    pinSpacing: false,
    scrub: true,
    // markers: true,
  });
}

// function hideIntroContainer(intro_container) {
//   return ScrollTrigger.create({
//     target: intro_container,
//     trigger: ".intro",
//     start: "100%",
//     endTrigger: "body",
//     end: "bottom bottom-=1000",
//     toggleClass: {
//       targets: "main",
//       className: "hidden",
//     },
//     // markers: true,
//   });
// }

function parallaxInfoInner(info_inner) {
  return gsap.from(info_inner, {
    y: -150,
    scrollTrigger: {
      trigger: ".info",
      start: "top bottom",
      end: "top center",
      scrub: true,
      // markers: true,
    },
  });
}

function pinInfoBackground(info_background) {
  const TL = gsap.timeline();
  // TL.to(info_background, {
  //   y: 300,
  //   scrollTrigger: {
  //     trigger: ".more__link",
  //     start: "center bottom",
  //     end: "top top+=8%",
  //     scrub: true,
  //     // markers: true,
  //   },
  // })
  TL.set(info_background, {
    width: "100vw",
  });
  TL.to(info_background, {
    scrollTrigger: {
      trigger: info_background,
      start: "center center",
      endTrigger: ".ic__link",
      end: "bottom center-=1%",
      pin: info_background,
      scrub: true,
      // markers: true,
    },
  });

  // .to(".info__background-wrapper", {
  //   y: "300",
  //   scrollTrigger: {
  //     trigger: ".ic__link",
  //     start: "top center",
  //     endTrigger: ".footer",
  //     end: "bottom bottom",
  //     scrub: true,
  //   },
  // });
}

function parallaxInfoClub(info_club) {
  return gsap.to(info_club, {
    y: -200,
    scrollTrigger: {
      trigger: info_club,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
      // markers: true,
    },
  });
}

function translateResonsSlides(resons_slides) {
  let transformValue = 0;
  resons_slides.forEach((slide) => {
    transformValue += 8;
    return gsap.from(slide, {
      autoAlpha: 0,
      yPercent: transformValue,
      scrollTrigger: {
        trigger: slide,
        start: "top bottom",
        end: "top center",
        scrub: true,
      },
    });
  });
}

// initial animation

window.addEventListener("load", () => {
  const intro = document.querySelector(".intro");
  if (intro) {
    initialAnimation();
  }
});

function initialAnimation() {
  const TL = gsap.timeline();

  TL.to(".overlay__blue", {
    autoAlpha: 0,
    duration: 1.2,
  })
    .from(
      ".intro__title",
      {
        yPercent: 20,
        duration: 1,
        ease: Power1.easeNone,
      },
      0
    )
    .from(
      ".intro__line",
      {
        width: "40%",
        duration: 1,
        ease: Power1.easeOut,
      },
      0
    )
    .from(
      ".intro__signup",
      {
        yPercent: 90,
        duration: 1,
        ease: Power1.easeOut,
      },
      0
    )
    .from(
      ".intro__image img",
      {
        scale: 1.3,
        duration: 1.2,
        ease: Power3.easeOut,
      },
      0
    )
    .from(
      ".intro__next",
      {
        scale: 0.5,
        duration: 1.2,
        ease: Power3.easeOut,
      },
      0
    );
}
