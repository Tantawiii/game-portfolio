import {
  CanvasTexture,
  Mesh,
  MeshStandardMaterial,
  PlaneGeometry,
  RepeatWrapping,
  type Scene,
} from 'three';
import { ROOM } from '../data/exhibitLayout';

function makeFloorTexture(): CanvasTexture {
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = '#15171f';
  ctx.fillRect(0, 0, size, size);
  ctx.strokeStyle = 'rgba(255,255,255,0.06)';
  ctx.lineWidth = 2;
  const tile = size / 4;
  for (let i = 0; i <= 4; i++) {
    ctx.beginPath();
    ctx.moveTo(i * tile, 0);
    ctx.lineTo(i * tile, size);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, i * tile);
    ctx.lineTo(size, i * tile);
    ctx.stroke();
  }
  const texture = new CanvasTexture(canvas);
  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;
  texture.repeat.set(ROOM.halfWidth, ROOM.halfLength);
  return texture;
}

export function buildRoom(scene: Scene): void {
  const width = ROOM.halfWidth * 2;
  const length = ROOM.halfLength * 2;

  const floorMat = new MeshStandardMaterial({ map: makeFloorTexture(), roughness: 0.9 });
  const floor = new Mesh(new PlaneGeometry(width, length), floorMat);
  floor.rotation.x = -Math.PI / 2;
  scene.add(floor);

  const ceilingMat = new MeshStandardMaterial({ color: 0x11121a, roughness: 1 });
  const ceiling = new Mesh(new PlaneGeometry(width, length), ceilingMat);
  ceiling.rotation.x = Math.PI / 2;
  ceiling.position.y = ROOM.height;
  scene.add(ceiling);

  const wallMat = new MeshStandardMaterial({ color: 0x1c1e2a, roughness: 0.95 });

  const leftWall = new Mesh(new PlaneGeometry(length, ROOM.height), wallMat);
  leftWall.position.set(-ROOM.halfWidth, ROOM.height / 2, 0);
  leftWall.rotation.y = Math.PI / 2;
  scene.add(leftWall);

  const rightWall = new Mesh(new PlaneGeometry(length, ROOM.height), wallMat);
  rightWall.position.set(ROOM.halfWidth, ROOM.height / 2, 0);
  rightWall.rotation.y = -Math.PI / 2;
  scene.add(rightWall);

  const backWall = new Mesh(new PlaneGeometry(width, ROOM.height), wallMat);
  backWall.position.set(0, ROOM.height / 2, -ROOM.halfLength);
  scene.add(backWall);

  const frontWall = new Mesh(new PlaneGeometry(width, ROOM.height), wallMat);
  frontWall.position.set(0, ROOM.height / 2, ROOM.halfLength);
  frontWall.rotation.y = Math.PI;
  scene.add(frontWall);
}
