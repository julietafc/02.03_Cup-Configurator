"use strict";

// The model of all features
const features = {
  drinksholder: false,
  led: false,
  propeller: false,
  shield: false,
  solarfan: false,
};

window.addEventListener("DOMContentLoaded", start);

function start() {
  console.log("start");
  // register toggle-clicks
  document.querySelectorAll(".option").forEach((option) => option.addEventListener("click", toggleOption));
}

function toggleOption(event) {
  const target = event.currentTarget;
  const feature = target.dataset.feature;

  // TODO: Toggle feature in "model"

  if (features[feature] === false) {
    features[feature] = true;
  } else {
    features[feature] = false;
  }

  // If feature is (now) turned on:
  // - create featureElement and append to #selected ul
  // - create FLIP-animation to animate featureElement from img in target, to
  //   its intended position. Do it with normal animation or transition class!

  // Else - if the feature (became) turned off:
  // - find the existing featureElement in #selected ul
  // - create FLIP-animation to animate featureElement to img in target
  // - when animation is complete, remove featureElement from the DOM

  // If feature is (now) turned on:
  if (features[feature]) {
    // feature added
    console.log(`Feature ${feature} is turned on!`);

    // - mark target as chosen (add class "chosen")
    target.classList.add("chosen");

    // - un-hide the feature-layer(s) in the #product-preview;
    document.querySelector(`[data-feature=${feature}]`).classList.remove("hide");

    // - create featureElement
    const featureElement = createFeatureElement(feature);
    // and append to #selected ul
    document.querySelector("#selected ul").appendChild(featureElement);
    featureElement.classList.add(`${feature}`);
    // - create FLIP-animation to animate featureElement from img in target, to
    //   its intended position. Do it with normal animation or transition class!
    const firstFrame = document.querySelector("#options").getBoundingClientRect();
    const lastFrame = featureElement.getBoundingClientRect();
    console.log(firstFrame, lastFrame);

    const deltaX = firstFrame.left - lastFrame.left;
    const deltaY = firstFrame.top - lastFrame.top;
    const deltaWith = firstFrame.width / lastFrame.width;
    const deltaHeight = firstFrame.height / lastFrame.height;

    // TODO: More code
    featureElement.animate(
      [
        {
          transformOrigin: "top right",
          transform: `translate(${deltaX}px, ${deltaY}px)
          scale(${deltaWith}, ${deltaHeight})`,
        },
        {
          transformOrigin: "top right",
          transform: "none",
        },
      ],
      {
        duration: 500,
        easing: "ease-in-out",
      }
    );

    // Else - if the feature (became) turned off:
  } else {
    // feature removed
    console.log(`Feature ${feature} is turned off!`);
    // - no longer mark target as chosen
    target.classList.remove("chosen");
    // - hide the feature-layer(s) in the #product-preview
    document.querySelector(`[data-feature=${feature}]`).classList.add("hide");
    // - find the existing featureElement in #selected ul
    // - create FLIP-animation to animate featureElement to img in target
    // - when animation is complete, remove featureElement from the DOM

    // TODO: More code
  }
}

// Create featureElement to be appended to #selected ul - could have used a <template> instead
function createFeatureElement(feature) {
  const li = document.createElement("li");
  li.dataset.feature = feature;

  const img = document.createElement("img");
  img.src = `images/feature_${feature}.png`;
  img.alt = capitalize(feature);

  li.append(img);

  return li;
}

function capitalize(text) {
  return text.substring(0, 1).toUpperCase() + text.substring(1).toLowerCase();
}
