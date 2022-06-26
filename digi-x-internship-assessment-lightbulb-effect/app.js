// select the lightbulb from dom.
const lightBulb = document.getElementById("bulb");

// attach an event listener that will toggle the lightbulb classes on click.
lightBulb.addEventListener("click", function () {
  lightBulb.classList.toggle("bulb-on");
  lightBulb.classList.toggle("bulb-off");
});
