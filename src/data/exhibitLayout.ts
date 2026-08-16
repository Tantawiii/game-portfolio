import { Vector3 } from 'three';

export interface ExhibitTransform {
  position: Vector3;
  /** Y rotation in radians so the poster faces into the room. */
  rotationY: number;
}

export const ROOM = {
  halfWidth: 5,
  halfLength: 13,
  height: 5,
  wallInset: 0.05,
};

const LEFT_WALL_X = -ROOM.halfWidth + ROOM.wallInset;
const RIGHT_WALL_X = ROOM.halfWidth - ROOM.wallInset;
const SLOT_Z = [-10, -10 / 3, 10 / 3, 10];
const POSTER_Y = 1.9;

/** Maps each game id to its position/orientation on the gallery walls. Add a slot here when adding a new game. */
export const exhibitLayout: Record<string, ExhibitTransform> = {
  'knighthood-wannabe': { position: new Vector3(LEFT_WALL_X, POSTER_Y, SLOT_Z[0]), rotationY: Math.PI / 2 },
  'choot-choot': { position: new Vector3(LEFT_WALL_X, POSTER_Y, SLOT_Z[1]), rotationY: Math.PI / 2 },
  'room-bound': { position: new Vector3(LEFT_WALL_X, POSTER_Y, SLOT_Z[2]), rotationY: Math.PI / 2 },
  estlem: { position: new Vector3(LEFT_WALL_X, POSTER_Y, SLOT_Z[3]), rotationY: Math.PI / 2 },
  'space-shooter-command': { position: new Vector3(RIGHT_WALL_X, POSTER_Y, SLOT_Z[0]), rotationY: -Math.PI / 2 },
  'sciace-battles': { position: new Vector3(RIGHT_WALL_X, POSTER_Y, SLOT_Z[1]), rotationY: -Math.PI / 2 },
  'raccoon-trails': { position: new Vector3(RIGHT_WALL_X, POSTER_Y, SLOT_Z[2]), rotationY: -Math.PI / 2 },
  'message-under-fire': { position: new Vector3(RIGHT_WALL_X, POSTER_Y, SLOT_Z[3]), rotationY: -Math.PI / 2 },
};
