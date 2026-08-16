import type { Camera } from 'three';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';
import type { PlayerState } from './playerState';

const MOVE_SPEED = 22;
const DAMPING = 8;

export class DesktopControls {
  readonly controls: PointerLockControls;
  private readonly player: PlayerState;

  constructor(camera: Camera, domElement: HTMLElement, player: PlayerState) {
    this.player = player;
    this.controls = new PointerLockControls(camera, domElement);

    domElement.addEventListener('click', () => {
      if (this.player.enabled) this.controls.lock();
    });

    document.addEventListener('keydown', (e) => this.onKey(e.code, true));
    document.addEventListener('keyup', (e) => this.onKey(e.code, false));
  }

  private onKey(code: string, down: boolean): void {
    switch (code) {
      case 'KeyW':
      case 'ArrowUp':
        this.player.moveForward = down;
        break;
      case 'KeyS':
      case 'ArrowDown':
        this.player.moveBackward = down;
        break;
      case 'KeyA':
      case 'ArrowLeft':
        this.player.moveLeft = down;
        break;
      case 'KeyD':
      case 'ArrowRight':
        this.player.moveRight = down;
        break;
    }
  }

  isLocked(): boolean {
    return this.controls.isLocked;
  }

  unlock(): void {
    this.controls.unlock();
  }

  update(delta: number): void {
    const p = this.player;
    const damp = Math.exp(-DAMPING * delta);
    p.velocity.x *= damp;
    p.velocity.z *= damp;

    if (this.controls.isLocked && p.enabled) {
      const forward = Number(p.moveForward) - Number(p.moveBackward);
      const right = Number(p.moveRight) - Number(p.moveLeft);
      const len = Math.hypot(forward, right) || 1;
      p.velocity.z -= (forward / len) * MOVE_SPEED * delta;
      p.velocity.x += (right / len) * MOVE_SPEED * delta;

      this.controls.moveRight(p.velocity.x * delta);
      this.controls.moveForward(-p.velocity.z * delta);

      const object = this.controls.object;
      p.clampToRoom(object.position);
    }
  }
}
