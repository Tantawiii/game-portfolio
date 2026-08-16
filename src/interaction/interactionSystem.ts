import { type Camera, type Mesh, Raycaster, Vector2 } from 'three';
import { games } from '../data/games';

const MAX_DISTANCE = 4;
const CENTER = new Vector2(0, 0);

export class InteractionSystem {
  private readonly raycaster = new Raycaster();
  private readonly interactables: Mesh[];
  private readonly camera: Camera;
  private focusedGameId: string | null = null;

  onFocusChange: (title: string | null) => void = () => {};
  onSelect: (gameId: string) => void = () => {};

  constructor(camera: Camera, interactables: Mesh[]) {
    this.camera = camera;
    this.interactables = interactables;
    this.raycaster.far = MAX_DISTANCE;
  }

  update(): void {
    this.raycaster.setFromCamera(CENTER, this.camera);
    const hits = this.raycaster.intersectObjects(this.interactables, false);
    const gameId = hits.length > 0 ? (hits[0].object.userData.gameId as string) : null;

    if (gameId !== this.focusedGameId) {
      this.focusedGameId = gameId;
      if (gameId) {
        const game = games.find((g) => g.id === gameId);
        this.onFocusChange(game ? game.title : null);
      } else {
        this.onFocusChange(null);
      }
    }
  }

  trySelect(): void {
    if (this.focusedGameId) {
      this.onSelect(this.focusedGameId);
    }
  }
}
