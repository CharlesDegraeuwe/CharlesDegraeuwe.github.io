import workRepository from "/workRepository.js";
import workComoponent from "/workComponent.js";

const init = function () {
  const component = new workComoponent();
  const repo = new workRepository();
};

window.onload = init;
