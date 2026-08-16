import { PointLight, type Scene } from 'three';
import { ROOM } from '../data/exhibitLayout';

export function buildEnvironment(scene: Scene): void {
  const lightZPositions = [-8, 0, 8];
  for (const z of lightZPositions) {
    const light = new PointLight(0x88a0ff, 6, 12, 2);
    light.position.set(0, ROOM.height - 0.4, z);
    scene.add(light);
  }
}
