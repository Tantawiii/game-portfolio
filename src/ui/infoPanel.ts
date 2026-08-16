import type { GameEntry } from '../data/games';

const panel = document.getElementById('info-panel')!;
const title = document.getElementById('info-title')!;
const engine = document.getElementById('info-engine')!;
const description = document.getElementById('info-description')!;
const tagsEl = document.getElementById('info-tags')!;
const link = document.getElementById('info-link') as HTMLAnchorElement;
const closeBtn = document.getElementById('info-panel-close')!;

let onCloseCallback: (() => void) | null = null;

export function initInfoPanel(onClose: () => void): void {
  onCloseCallback = onClose;
  closeBtn.addEventListener('click', () => closeInfoPanel());
  panel.addEventListener('click', (e) => {
    if (e.target === panel) closeInfoPanel();
  });
  document.addEventListener('keydown', (e) => {
    if (e.code === 'Escape' && isInfoPanelOpen()) closeInfoPanel();
  });
}

export function isInfoPanelOpen(): boolean {
  return !panel.classList.contains('hidden');
}

export function openInfoPanel(game: GameEntry): void {
  title.textContent = game.title;
  engine.textContent = `Made with ${game.engine}`;
  description.textContent = game.description;
  link.href = game.itchUrl;

  tagsEl.innerHTML = '';
  for (const tag of game.tags) {
    const span = document.createElement('span');
    span.textContent = tag;
    tagsEl.appendChild(span);
  }

  panel.classList.remove('hidden');
}

export function closeInfoPanel(): void {
  panel.classList.add('hidden');
  onCloseCallback?.();
}
