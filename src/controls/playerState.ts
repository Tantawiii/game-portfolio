import { Vector3 } from 'three';
import { ROOM } from '../data/exhibitLayout';

const WALL_MARGIN = 0.6;

export class PlayerState {
  moveForward = false;
  moveBackward = false;
  moveLeft = false;
  moveRight = false;
  velocity = new Vector3();
  /** Movement/interaction disabled while the info panel or a menu is open. */
  enabled = true;

  reset(): void {
    this.moveForward = false;
    this.moveBackward = false;
    this.moveLeft = false;
    this.moveRight = false;
    this.velocity.set(0, 0, 0);
  }

  clampToRoom(position: Vector3): void {
    const maxX = ROOM.halfWidth - WALL_MARGIN;
    const maxZ = ROOM.halfLength - WALL_MARGIN;
    position.x = Math.min(Math.max(position.x, -maxX), maxX);
    position.z = Math.min(Math.max(position.z, -maxZ), maxZ);
  }
}
