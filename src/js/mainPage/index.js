import Rellax from 'rellax';
import Swiper from 'swiper';

import {
  changeColorForImprovementSection,
  changeColorForBudgetSection,
  changeColorForControlSection,
  changeColorForPowerSection,
  changeCubeColorToDefault
} from '../changeColor';
import {
  cubesRandomLevitation,
  makeMainCubeBigger,
  transformMainCubeToDefaultSize,
  mainCubeToDefaultSize,
  moveCubesToTopForColorSections,
  moveCubesToDefaultPosition,
  moveCubesToTopForWhiteSections
} from '../cubesAnimation';
import { RATE_WSXGA_SCROLL, WSXGA_ANIMATION_DELAY, WSGA_ANIMATION_DELAY, MAIN_PAGE_TOGGLE_CONTENT } from '../constants';

import toggleMenu from '../toggleMenu';
import hoverLinkInMenu from '../hoverLinkInMenu';
import toggleContentByScroll from '../toggleContentByScroll';
import { sectionImageParallax } from '../scrollParallax';

import changeHeaderVisibility from '../menuAnimation';
import isWSXGABreakpoint from '../isWSXGABreakpoint';

const superviseSection = window.document.querySelector('.supervise-section');
const expertiseSection = window.document.querySelector('.expertise-section');
const toolsetSection = window.document.querySelector('.toolset-section');
const advantageSection = window.document.querySelector('.advantage-section');
const budgetSection = window.document.querySelector('.budget-section');
const controlSection = window.document.querySelector('.control-section');
const powerSection = window.document.querySelector('.power-section');
const improvementSection = window.document.querySelector('.improvement-section');
const superviseSectionScrollPosition = superviseSection.offsetTop;
const expertiseSectionScrollPosition = expertiseSection.offsetTop;
const toolsetSectionScrollPosition = toolsetSection.offsetTop;
const advantageSectionScrollPosition = advantageSection.offsetTop;
const budgetSectionScrollPosition = budgetSection.offsetTop;
const controlSectionScrollPosition = controlSection.offsetTop;
const powerSectionScrollPosition = powerSection.offsetTop;
const improvementSectionScrollPosition = improvementSection.offsetTop;

let scrollPreviousPosition = 0;

initProject();
toggleMenu();
hoverLinkInMenu();
cubesRandomLevitation();
(() => new Rellax('.letter-parallax'))();

window.addEventListener('resize', () => {
  if (document.documentElement.clientWidth <= 1024) {
    (() =>
      new Swiper('.swiper-container', {
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      }))();
  }
});

window.addEventListener('scroll', initProject);

function initProject() {
  const scrolled = window.pageYOffset;

  if (scrolled < advantageSectionScrollPosition || scrolled > improvementSectionScrollPosition) {
    changeCubeColorToDefault();
    mainCubeToDefaultSize();
    moveCubesToTopForWhiteSections(superviseSectionScrollPosition, advantageSectionScrollPosition);
  }

  if (scrolled >= advantageSectionScrollPosition && scrolled <= budgetSectionScrollPosition) {
    changeColorForBudgetSection(advantageSectionScrollPosition);
  }

  if (scrolled >= advantageSectionScrollPosition && scrolled <= powerSectionScrollPosition) {
    makeMainCubeBigger(advantageSectionScrollPosition);
    moveCubesToTopForColorSections(advantageSectionScrollPosition);
  }

  if (scrolled > budgetSectionScrollPosition && scrolled <= controlSectionScrollPosition) {
    changeColorForControlSection(budgetSectionScrollPosition);
  }

  if (scrolled > controlSectionScrollPosition && scrolled <= powerSectionScrollPosition) {
    changeColorForPowerSection(controlSectionScrollPosition);
  }

  if (scrolled > powerSectionScrollPosition && scrolled <= improvementSectionScrollPosition) {
    const scrollDelayForAnimation = isWSXGABreakpoint() ? WSXGA_ANIMATION_DELAY : WSGA_ANIMATION_DELAY;

    const sectionScrollPosition = powerSectionScrollPosition + scrollDelayForAnimation;
    changeColorForImprovementSection(sectionScrollPosition);
    transformMainCubeToDefaultSize(sectionScrollPosition);
    moveCubesToDefaultPosition(sectionScrollPosition);
  }

  // For Parallax Scroll of patterns/squares
  const middleOfScreenHeight = RATE_WSXGA_SCROLL / 2;
  const middleOfScreenBeforeSuperviseSection = superviseSectionScrollPosition - middleOfScreenHeight;
  const middleOfScreenBeforeExpertiseSection = expertiseSectionScrollPosition - middleOfScreenHeight;
  const middleOfScreenAfterExpertiseSection = expertiseSectionScrollPosition + middleOfScreenHeight;
  const middleOfScreenBeforeToolsetSection = toolsetSectionScrollPosition - middleOfScreenHeight;
  const middleOfScreenAfterToolsetSection = toolsetSectionScrollPosition + middleOfScreenHeight;
  const middleOfScreenBeforeAdvantageSection = advantageSectionScrollPosition - middleOfScreenHeight;
  const middleOfScreenAfterAdvantageSection = advantageSectionScrollPosition + middleOfScreenHeight;
  const middleOfScreenBeforeImprovementSection = improvementSectionScrollPosition - middleOfScreenHeight;
  if (scrolled < middleOfScreenBeforeExpertiseSection) {
    const superviseElement = window.document.querySelector('#supervise .inner-section-image');
    sectionImageParallax(superviseElement, middleOfScreenBeforeSuperviseSection);
  }

  if (scrolled > middleOfScreenBeforeExpertiseSection && scrolled < middleOfScreenAfterExpertiseSection) {
    const expertiseElement = window.document.querySelector('#expertise .inner-section-image');
    sectionImageParallax(expertiseElement, middleOfScreenBeforeExpertiseSection);
  }

  if (scrolled > middleOfScreenBeforeToolsetSection && scrolled < middleOfScreenAfterToolsetSection) {
    const toolsetPattern = window.document.querySelector('#toolset .inner-section-image');
    sectionImageParallax(toolsetPattern, middleOfScreenBeforeToolsetSection);
  }

  if (scrolled > middleOfScreenBeforeAdvantageSection && scrolled < middleOfScreenAfterAdvantageSection) {
    const advantagePattern = window.document.querySelector('#advantage .inner-section-image');
    sectionImageParallax(advantagePattern, middleOfScreenBeforeAdvantageSection);
  }

  if (scrolled > middleOfScreenBeforeImprovementSection) {
    const improvementPattern = window.document.querySelector('#improvement .inner-section-image');
    sectionImageParallax(improvementPattern, middleOfScreenBeforeImprovementSection);
  }

  toggleContentByScroll(MAIN_PAGE_TOGGLE_CONTENT.sectionContainer, MAIN_PAGE_TOGGLE_CONTENT.delayBetweenSection);

  changeHeaderVisibility(scrollPreviousPosition, scrolled);
  scrollPreviousPosition = scrolled;
}
