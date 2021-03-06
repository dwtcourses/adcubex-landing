import {
  CUBE_LEFT_SIDE_ELEMENT_OPTIONS,
  CUBE_RIGHT_SIDE_ELEMENT_OPTIONS,
  CUBE_BOTTOM_SIDE_ELEMENT_OPTIONS,
  RATE_WSXGA_SCROLL
} from './constants';
import getScrollPosition from './getScrollPosition';

export function changeColorForBudgetSection(sectionScrollPosition) {
  const rateForMakeChangeCubeColorFaster = 800;
  const sectionScrollPositionForMainCube = sectionScrollPosition - rateForMakeChangeCubeColorFaster;

  changeColor(
    CUBE_LEFT_SIDE_ELEMENT_OPTIONS.defaultColor,
    CUBE_LEFT_SIDE_ELEMENT_OPTIONS.redColor,
    [CUBE_LEFT_SIDE_ELEMENT_OPTIONS],
    sectionScrollPositionForMainCube
  );

  changeColor(
    CUBE_RIGHT_SIDE_ELEMENT_OPTIONS.defaultColor,
    CUBE_RIGHT_SIDE_ELEMENT_OPTIONS.redColor,
    [CUBE_RIGHT_SIDE_ELEMENT_OPTIONS],
    sectionScrollPositionForMainCube
  );

  changeColor(
    CUBE_BOTTOM_SIDE_ELEMENT_OPTIONS.defaultColor,
    CUBE_BOTTOM_SIDE_ELEMENT_OPTIONS.redColor,
    [CUBE_BOTTOM_SIDE_ELEMENT_OPTIONS],
    sectionScrollPositionForMainCube
  );
}

export function changeColorForControlSection(sectionScrollPosition) {
  changeColor(
    CUBE_LEFT_SIDE_ELEMENT_OPTIONS.redColor,
    CUBE_LEFT_SIDE_ELEMENT_OPTIONS.blueColor,
    [CUBE_LEFT_SIDE_ELEMENT_OPTIONS],
    sectionScrollPosition
  );

  changeColor(
    CUBE_RIGHT_SIDE_ELEMENT_OPTIONS.redColor,
    CUBE_RIGHT_SIDE_ELEMENT_OPTIONS.blueColor,
    [CUBE_RIGHT_SIDE_ELEMENT_OPTIONS],
    sectionScrollPosition
  );

  changeColor(
    CUBE_BOTTOM_SIDE_ELEMENT_OPTIONS.redColor,
    CUBE_BOTTOM_SIDE_ELEMENT_OPTIONS.blueColor,
    [CUBE_BOTTOM_SIDE_ELEMENT_OPTIONS],
    sectionScrollPosition
  );
}

export function changeColorForPowerSection(sectionScrollPosition) {
  changeColor(
    CUBE_LEFT_SIDE_ELEMENT_OPTIONS.blueColor,
    CUBE_LEFT_SIDE_ELEMENT_OPTIONS.purpleColor,
    [CUBE_LEFT_SIDE_ELEMENT_OPTIONS],
    sectionScrollPosition
  );

  changeColor(
    CUBE_RIGHT_SIDE_ELEMENT_OPTIONS.blueColor,
    CUBE_RIGHT_SIDE_ELEMENT_OPTIONS.purpleColor,
    [CUBE_RIGHT_SIDE_ELEMENT_OPTIONS],
    sectionScrollPosition
  );

  changeColor(
    CUBE_BOTTOM_SIDE_ELEMENT_OPTIONS.blueColor,
    CUBE_BOTTOM_SIDE_ELEMENT_OPTIONS.purpleColor,
    [CUBE_BOTTOM_SIDE_ELEMENT_OPTIONS],
    sectionScrollPosition
  );
}

export function changeColorForImprovementSection(sectionScrollPosition) {
  changeColor(
    CUBE_LEFT_SIDE_ELEMENT_OPTIONS.purpleColor,
    CUBE_LEFT_SIDE_ELEMENT_OPTIONS.defaultColor,
    [CUBE_LEFT_SIDE_ELEMENT_OPTIONS],
    sectionScrollPosition
  );

  changeColor(
    CUBE_RIGHT_SIDE_ELEMENT_OPTIONS.purpleColor,
    CUBE_RIGHT_SIDE_ELEMENT_OPTIONS.defaultColor,
    [CUBE_RIGHT_SIDE_ELEMENT_OPTIONS],
    sectionScrollPosition
  );

  changeColor(
    CUBE_BOTTOM_SIDE_ELEMENT_OPTIONS.purpleColor,
    CUBE_BOTTOM_SIDE_ELEMENT_OPTIONS.defaultColor,
    [CUBE_BOTTOM_SIDE_ELEMENT_OPTIONS],
    sectionScrollPosition
  );
}

export function changeCubeColorToDefault() {
  changeSelectorElementsProperty(CUBE_LEFT_SIDE_ELEMENT_OPTIONS, CUBE_LEFT_SIDE_ELEMENT_OPTIONS.defaultColor);
  changeSelectorElementsProperty(CUBE_RIGHT_SIDE_ELEMENT_OPTIONS, CUBE_RIGHT_SIDE_ELEMENT_OPTIONS.defaultColor);
  changeSelectorElementsProperty(CUBE_BOTTOM_SIDE_ELEMENT_OPTIONS, CUBE_BOTTOM_SIDE_ELEMENT_OPTIONS.defaultColor);
}

function changeColor(fromColor, toColor, selectorsArr, startPosition) {
  const maxPerChangeValue = 1;
  const minPerChangeValue = 0;
  const currentColor = { red: 0, green: 0, blue: 0 };
  const scrolled = getScrollPosition();
  let perChange = (scrolled - startPosition) / RATE_WSXGA_SCROLL;

  if (perChange < minPerChangeValue) {
    perChange = minPerChangeValue;
  }

  if (perChange > maxPerChangeValue) {
    perChange = maxPerChangeValue;
  }

  Object.keys(currentColor).forEach(key => {
    currentColor[key] =
      fromColor[key] > toColor[key]
        ? Math.round(fromColor[key] - (fromColor[key] - toColor[key]) * perChange)
        : Math.round(fromColor[key] + (toColor[key] - fromColor[key]) * perChange);
  });

  for (let i = 0; i < selectorsArr.length; i++) {
    changeSelectorElementsProperty(selectorsArr[i], currentColor);
  }
}

function changeSelectorElementsProperty(selectorOptions, currentColor) {
  const selectorElements = document.querySelectorAll(selectorOptions.selector);
  const { property } = selectorOptions;
  const { red, green, blue } = currentColor;

  for (let i = 0; i < selectorElements.length; i++) {
    const color = `rgb(${red}, ${green}, ${blue})`;
    if (selectorElements[i].style[property] !== color) {
      selectorElements[i].style[property] = `rgb(${red}, ${green}, ${blue})`;
    }
  }
}
