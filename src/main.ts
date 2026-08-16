import { Clock, LoadingManager, type Mesh, TextureLoader } from 'three';
import './styles/main.css';
import { createScene } from './scene/createScene';
import { buildRoom } from './scene/room';
import { buildEnvironment } from './scene/environment';
import { buildExhibit } from './scene/exhibit';
import { games } from './data/games';
import { exhibitLayout } from './data/exhibitLayout';
import { PlayerState } from './controls/playerState';
import { DesktopControls } from './controls/desktopControls';
import { TouchControls, isTouchDevice } from './controls/touchControls';
import { InteractionSystem } from './interaction/interactionSystem';
import { hideLoadingScreen, setLoadingProgress } from './ui/loadingScreen';
import { initInfoPanel, openInfoPanel, isInfoPanelOpen } from './ui/infoPanel';
import { setPrompt, enableMobileUi, onMobileInteract } from './ui/ui';

const canvas = document.getElementById('scene') as HTMLCanvasElement;
const { scene, camera, renderer } = createScene(canvas);

buildRoom(scene);
buildEnvironment(scene);

const manager = new LoadingManager();
manager.onProgress = (_url: string, loaded: number, total: number) => setLoadingProgress(loaded / total);
manager.onLoad = () => hideLoadingScreen();
const loader = new TextureLoader(manager);

const interactables: Mesh[] = [];
for (const game of games) {
  const transform = exhibitLayout[game.id];
  if (!transform) continue;
  const exhibit = buildExhibit(game, transform, loader);
  scene.add(exhibit.group);
  interactables.push(exhibit.poster);
}
// LoadingManager only fires onLoad once a load has been requested; poster textures cover that.
if (interactables.length === 0) hideLoadingScreen();

const player = new PlayerState();
const desktopControls = new DesktopControls(camera, renderer.domElement, player);

const mobile = isTouchDevice();
let touchControls: TouchControls | null = null;
if (mobile) {
  enableMobileUi();
  const joystickZone = document.getElementById('joystick-zone')!;
  const lookZone = document.getElementById('look-zone')!;
  touchControls = new TouchControls(camera, player, joystickZone, lookZone);
}

const interaction = new InteractionSystem(camera, interactables);
interaction.onFocusChange = (title) => setPrompt(title);
interaction.onSelect = (gameId) => {
  const game = games.find((g) => g.id === gameId);
  if (!game) return;
  player.enabled = false;
  player.reset();
  if (!mobile) desktopControls.unlock();
  openInfoPanel(game);
};

initInfoPanel(() => {
  player.enabled = true;
});

if (mobile) {
  onMobileInteract(() => {
    if (!isInfoPanelOpen()) interaction.trySelect();
  });
}

document.addEventListener('keydown', (e) => {
  if (e.code === 'KeyE' && !isInfoPanelOpen()) interaction.trySelect();
});

const clock = new Clock();

function animate(): void {
  requestAnimationFrame(animate);
  const delta = Math.min(clock.getDelta(), 0.1);

  if (!mobile) desktopControls.update(delta);
  touchControls?.update(delta);

  if (player.enabled) interaction.update();

  renderer.render(scene, camera);
}

animate();
