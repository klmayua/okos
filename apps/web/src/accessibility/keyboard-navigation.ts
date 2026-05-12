/**
 * OK.OS — KEYBOARD NAVIGATION UTILITIES
 */

export function handleArrowNavigation(
  event: React.KeyboardEvent,
  items: HTMLElement[],
  orientation: 'horizontal' | 'vertical'
): void {
  if (!items.length) return;
  const currentIndex = items.findIndex((item) => item === document.activeElement);
  let nextIndex = currentIndex;

  const isNext =
    (orientation === 'horizontal' && event.key === 'ArrowRight') ||
    (orientation === 'vertical' && event.key === 'ArrowDown');
  const isPrev =
    (orientation === 'horizontal' && event.key === 'ArrowLeft') ||
    (orientation === 'vertical' && event.key === 'ArrowUp');

  if (isNext) {
    nextIndex = (currentIndex + 1) % items.length;
    event.preventDefault();
  } else if (isPrev) {
    nextIndex = (currentIndex - 1 + items.length) % items.length;
    event.preventDefault();
  }

  if (nextIndex !== currentIndex) {
    items[nextIndex]?.focus();
  }
}
