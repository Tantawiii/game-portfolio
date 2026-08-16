const crosshair = document.getElementById('crosshair')!;
const prompt = document.getElementById('interact-prompt')!;
const mobileInteract = document.getElementById('mobile-interact')!;
const joystickZone = document.getElementById('joystick-zone')!;
const lookZone = document.getElementById('look-zone')!;
const introHint = document.getElementById('intro-hint')!;

export function setPrompt(title: string | null): void {
  if (title) {
    crosshair.classList.add('active');
    prompt.textContent = `View “${title}”`;
    prompt.classList.remove('hidden');
  } else {
    crosshair.classList.remove('active');
    prompt.classList.add('hidden');
  }
}

export function enableMobileUi(): void {
  mobileInteract.classList.remove('hidden');
  joystickZone.classList.remove('hidden');
  lookZone.classList.remove('hidden');
  crosshair.classList.add('hidden');
  introHint.textContent = 'Drag left to move · drag right to look · tap Interact';
}

export function onMobileInteract(handler: () => void): void {
  mobileInteract.addEventListener('touchstart', (e) => {
    e.preventDefault();
    handler();
  });
}
