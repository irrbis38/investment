document.addEventListener("DOMContentLoaded", function (event) {
  headerInit();
});

function headerInit() {
  // custom select by choices.js library

  const selects = document.querySelectorAll(".lang__select");

  selects.forEach((el) => {
    new Choices(el, {
      allowHTML: false,
      searchEnabled: false,
      itemSelectText: "",
    });
  });
}
