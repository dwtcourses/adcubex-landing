import {
  changeColorForImprovementSection,
  changeColorForBudgetSection,
  changeColorForControlSection,
  changeColorForPowerSection,
  changeMenuItemsColorToWhite,
  changeBackgroundColorToWhite,
  changeMenuItemsColorToBlack,
  changeCubeColorToDefault
} from './changeColor';
import { toggleCube, toggleCubes } from './toggleCubes';
import { toggleTextOfSection } from './toggleTextOfSection';
import { changeActiveMenuLinkToBlack, changeActiveMenuLinkToRed } from './menu';
import { scrollParallaxBgLetters, scrollParallaxPattern } from './scrollParallax';

// const superviseSection = window.document.querySelector('.supervise-section');
const expertiseSection = window.document.querySelector('.expertise-section');
// const toolsetSection = window.document.querySelector('.toolset-section');
const advantageSection = window.document.querySelector('.advantage-section');
const budgetSection = window.document.querySelector('.budget-section');
const controlSection = window.document.querySelector('.control-section');
const powerSection = window.document.querySelector('.power-section');
const improvementSection = window.document.querySelector('.improvement-section');
// const superviseSectionScrollPosition = superviseSection.offsetTop;
const expertiseSectionScrollPosition = expertiseSection.offsetTop;
// const toolsetSectionScrollPosition = toolsetSection.offsetTop;
const advantageSectionScrollPosition = advantageSection.offsetTop;
const budgetSectionScrollPosition = budgetSection.offsetTop;
const controlSectionScrollPosition = controlSection.offsetTop;
const powerSectionScrollPosition = powerSection.offsetTop;
const improvementSectionScrollPosition = improvementSection.offsetTop;

initProject();

window.addEventListener('scroll', initProject);

function initProject() {
  const scrolled = window.pageYOffset;

  // ToDo: Find solution for remove "300"
  if (scrolled < advantageSectionScrollPosition || scrolled > improvementSectionScrollPosition - 300) {
    changeBackgroundColorToWhite();
    changeCubeColorToDefault();
  }

  if (scrolled > budgetSectionScrollPosition && scrolled < powerSectionScrollPosition) {
    changeMenuItemsColorToWhite();
  }

  if (scrolled < budgetSectionScrollPosition || scrolled > improvementSectionScrollPosition) {
    changeMenuItemsColorToBlack();
  }

  if (scrolled >= advantageSectionScrollPosition && scrolled <= budgetSectionScrollPosition) {
    changeColorForBudgetSection(advantageSectionScrollPosition);
  }

  if (scrolled > budgetSectionScrollPosition && scrolled <= controlSectionScrollPosition) {
    changeColorForControlSection(budgetSectionScrollPosition);
  }

  if (scrolled > controlSectionScrollPosition && scrolled <= powerSectionScrollPosition) {
    changeColorForPowerSection(controlSectionScrollPosition);
  }

  // ToDo: Find solution for remove "300"
  if (scrolled > powerSectionScrollPosition && scrolled <= improvementSectionScrollPosition - 300) {
    changeColorForImprovementSection(powerSectionScrollPosition);
  }

  // TODO: Find solution for remove "20"
  if (scrolled > budgetSectionScrollPosition - 20) {
    changeActiveMenuLinkToBlack();
  }

  // TODO: Find solution for remove "20"
  if (scrolled < budgetSectionScrollPosition - 20) {
    changeActiveMenuLinkToRed();
  }

  if (
    scrolled >= advantageSectionScrollPosition + (budgetSectionScrollPosition - advantageSectionScrollPosition) / 2 &&
    scrolled <= budgetSectionScrollPosition + (controlSectionScrollPosition - budgetSectionScrollPosition) / 2
  ) {
    const budgetBgLetter = window.document.querySelector('#budget > svg');
    scrollParallaxBgLetters(budgetSectionScrollPosition, budgetBgLetter, advantageSectionScrollPosition);
  }

  if (
    scrolled >= budgetSectionScrollPosition + (controlSectionScrollPosition - budgetSectionScrollPosition) / 2 &&
    scrolled <= controlSectionScrollPosition + (powerSectionScrollPosition - controlSectionScrollPosition) / 2
  ) {
    const controlBgLetter = window.document.querySelector('#control > svg');
    scrollParallaxBgLetters(controlSectionScrollPosition, controlBgLetter, budgetSectionScrollPosition);
  }

  if (
    scrolled >= controlSectionScrollPosition + (powerSectionScrollPosition - controlSectionScrollPosition) / 2 &&
    scrolled <= powerSectionScrollPosition + (improvementSectionScrollPosition - powerSectionScrollPosition) / 2
  ) {
    const powerBgLetter = window.document.querySelector('#power > svg');
    scrollParallaxBgLetters(powerSectionScrollPosition, powerBgLetter, controlSectionScrollPosition);
  }

  if (scrolled < expertiseSectionScrollPosition) {
    const supervisePattern = window.document.querySelector('#supervise .inner-section-image');
    scrollParallaxPattern(supervisePattern);
  }

  toggleCube();
  toggleCubes();
  toggleTextOfSection();
}
