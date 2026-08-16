import {
  CircleGeometry,
  Group,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  PlaneGeometry,
  SpotLight,
  type Texture,
  type TextureLoader,
  SRGBColorSpace,
} from 'three';
import type { GameEntry } from '../data/games';
import type { ExhibitTransform } from '../data/exhibitLayout';

const POSTER_HEIGHT = 2.2;
// Covers are pre-letterboxed to a 700x1000 canvas during the asset pipeline step.
const COVER_ASPECT = 700 / 1000;
const FRAME_MARGIN = 0.12;

export interface Exhibit {
  group: Group;
  poster: Mesh;
}

export function buildExhibit(
  game: GameEntry,
  transform: ExhibitTransform,
  loader: TextureLoader,
): Exhibit {
  const group = new Group();
  group.position.copy(transform.position);
  group.rotation.y = transform.rotationY;

  const posterWidth = POSTER_HEIGHT * COVER_ASPECT;

  const frame = new Mesh(
    new PlaneGeometry(posterWidth + FRAME_MARGIN, POSTER_HEIGHT + FRAME_MARGIN),
    new MeshStandardMaterial({ color: 0x0a0a0a, roughness: 0.6 }),
  );
  frame.position.z = -0.02;
  group.add(frame);

  const posterMat = new MeshBasicMaterial({ color: 0x2a2a35 });
  const poster = new Mesh(new PlaneGeometry(posterWidth, POSTER_HEIGHT), posterMat);
  poster.userData.gameId = game.id;
  group.add(poster);

  loader.load(`${import.meta.env.BASE_URL}${game.coverImage}`, (texture: Texture) => {
    texture.colorSpace = SRGBColorSpace;
    posterMat.map = texture;
    posterMat.color.set(0xffffff);
    posterMat.needsUpdate = true;
  });

  const spot = new SpotLight(0xfff2d8, 8, 6, Math.PI / 6, 0.5, 1.5);
  spot.position.set(0, 1.4, 1.6);
  spot.target = poster;
  group.add(spot);
  group.add(spot.target);

  const marker = new Mesh(
    new CircleGeometry(0.9, 32),
    new MeshStandardMaterial({ color: 0x2f2f3d, roughness: 1, emissive: 0x1a1a26, emissiveIntensity: 0.3 }),
  );
  marker.rotation.x = -Math.PI / 2;
  marker.position.set(0, -transform.position.y + 0.01, 1.1);
  group.add(marker);

  return { group, poster };
}
