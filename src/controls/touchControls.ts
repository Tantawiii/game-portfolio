import nipplejs from 'nipplejs';
import { type Camera, Euler, Vector3 } from 'three';
import type { PlayerState } from './playerState';

const MOVE_SPEED = 4.5;
const LOOK_SPEED = 0.0035;
const TMP_DIR = new Vector3();
const TMP_RIGHT = new Vector3();

type JoystickCollection = ReturnType<typeof nipplejs.create>;

export function isTouchDevice(): boolean {
  return window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
}

export class TouchControls {
  private readonly camera: Camera;
  private readonly player: PlayerState;
  private readonly euler = new Euler(0, 0, 0, 'YXZ');
  private joystickVector = { x: 0, y: 0 };
  private joystick: JoystickCollection | null = null;
  private lookTouchId: number | null = null;
  private lastX = 0;
  private lastY = 0;

  constructor(camera: Camera, player: PlayerState, joystickZone: HTMLElement, lookZone: HTMLElement) {
    this.camera = camera;
    this.player = player;
    this.euler.setFromQuaternion(camera.quaternion);
    this.setupJoystick(joystickZone);
    this.setupLook(lookZone);
  }

  private setupJoystick(zone: HTMLElement): void {
    this.joystick = nipplejs.create({
      zone,
      mode: 'static',
      position: { left: '80px', bottom: '90px' },
      color: 'white',
      size: 100,
    });
    this.joystick.on('move', (evt) => {
      const force = Math.min(evt.data.force, 1.5) / 1.5;
      const angle = evt.data.angle.radian;
      this.joystickVector.x = Math.cos(angle) * force;
      this.joystickVector.y = Math.sin(angle) * force;
    });
    this.joystick.on('end', () => {
      this.joystickVector.x = 0;
      this.joystickVector.y = 0;
    });
  }

  private setupLook(zone: HTMLElement): void {
    zone.addEventListener('touchstart', (e) => {
      const touch = e.changedTouches[0];
      this.lookTouchId = touch.identifier;
      this.lastX = touch.clientX;
      this.lastY = touch.clientY;
    });
    zone.addEventListener('touchmove', (e) => {
      if (!this.player.enabled) return;
      for (const touch of Array.from(e.changedTouches)) {
        if (touch.identifier !== this.lookTouchId) continue;
        const dx = touch.clientX - this.lastX;
        const dy = touch.clientY - this.lastY;
        this.lastX = touch.clientX;
        this.lastY = touch.clientY;

        this.euler.y -= dx * LOOK_SPEED;
        this.euler.x -= dy * LOOK_SPEED;
        this.euler.x = Math.max(-Math.PI / 2.2, Math.min(Math.PI / 2.2, this.euler.x));
        this.camera.quaternion.setFromEuler(this.euler);
      }
    });
    zone.addEventListener('touchend', (e) => {
      for (const touch of Array.from(e.changedTouches)) {
        if (touch.identifier === this.lookTouchId) this.lookTouchId = null;
      }
    });
  }

  update(delta: number): void {
    if (!this.player.enabled) return;
    const { x, y } = this.joystickVector;
    if (x === 0 && y === 0) return;

    const forward = y * MOVE_SPEED * delta;
    const strafe = x * MOVE_SPEED * delta;

    const dir = this.camera.getWorldDirection(TMP_DIR);
    dir.y = 0;
    dir.normalize();
    const right = TMP_RIGHT.set(dir.z, 0, -dir.x);

    this.camera.position.addScaledVector(dir, forward);
    this.camera.position.addScaledVector(right, strafe);
    this.player.clampToRoom(this.camera.position);
  }
}
