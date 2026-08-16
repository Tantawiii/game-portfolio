const screen = document.getElementById('loading-screen')!;
const fill = document.getElementById('loading-bar-fill')!;
const introHint = document.getElementById('intro-hint')!;

export function setLoadingProgress(ratio: number): void {
  fill.style.width = `${Math.round(Math.min(1, Math.max(0, ratio)) * 100)}%`;
}

export function hideLoadingScreen(): void {
  screen.style.opacity = '0';
  setTimeout(() => screen.classList.add('hidden'), 600);
  introHint.classList.remove('hidden');
}
