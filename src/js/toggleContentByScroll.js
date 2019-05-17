export default function toggleContentByScroll(selector, delay) {
  const scrolled = window.pageYOffset;
  const sections = window.document.querySelectorAll(`.${selector}`);

  sections.forEach((section, index) => {
    const nextSection = sections[index + 1];
    const scrollPositionOfCurrentSection = section.offsetTop;
    const scrollPositionOfNextSection = nextSection ? nextSection.offsetTop : document.documentElement.scrollHeight;
    const scrollDifferenceBetweenSections = scrollPositionOfNextSection - scrollPositionOfCurrentSection;
    const scrollDelay = scrollDifferenceBetweenSections / delay;
    const scrollPositionWhenShouldToggleText = scrollDelay + scrollPositionOfCurrentSection;

    if (scrolled > scrollPositionWhenShouldToggleText && scrolled < scrollPositionOfNextSection) {
      nextSection && nextSection.classList.add(`${selector}--active`);
    }
  });
}
