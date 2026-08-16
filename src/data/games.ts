export interface GameEntry {
  id: string;
  title: string;
  description: string;
  tags: string[];
  engine: string;
  coverImage: string;
  itchUrl: string;
}

export const games: GameEntry[] = [
  {
    id: 'knighthood-wannabe',
    title: 'Knighthood Wannabe',
    description:
      'An in-development 2D action RPG that blends challenging combat with an ever-changing storyline shaped by your choices.',
    tags: ['Adventure', 'Platformer', 'RPG', '2D', 'Fantasy'],
    engine: 'Unity',
    coverImage: 'covers/knighthood-wannabe.webp',
    itchUrl: 'https://tantawii.itch.io/knighthood-wannabe',
  },
  {
    id: 'choot-choot',
    title: 'Choot Choot!',
    description:
      'Fight from the caboose: manage coal, shoot the machines, draft upgrades between waves, and keep the engine on the rails.',
    tags: ['Survival', '2D', 'Roguelike', 'Pixel Art'],
    engine: 'Phaser',
    coverImage: 'covers/choot-choot.webp',
    itchUrl: 'https://tantawii.itch.io/choot-choot',
  },
  {
    id: 'room-bound',
    title: 'Room Bound',
    description:
      'Wake up inside a labyrinth of rooms that shift forever except when levered. Navigate, open doors, and manipulate the environment to progress.',
    tags: ['Puzzle', '2D', 'Top-Down'],
    engine: 'Phaser',
    coverImage: 'covers/room-bound.webp',
    itchUrl: 'https://tantawii.itch.io/room-bound',
  },
  {
    id: 'estlem',
    title: 'Estlem',
    description:
      'A fast-paced arcade puzzle game — play catch with a friend or solo, dodging obstacles with neon-inspired retro visuals.',
    tags: ['Puzzle', 'Local Co-Op', 'Sci-fi'],
    engine: 'Phaser',
    coverImage: 'covers/estlem.webp',
    itchUrl: 'https://tantawii.itch.io/estlem',
  },
  {
    id: 'space-shooter-command',
    title: 'Space Shooter Command',
    description:
      'Command your ship using only your voice — issue vocal commands to manage weapons, shields, and maneuvers while surviving enemy waves.',
    tags: ['Action', 'Voice-Controlled', 'Singleplayer'],
    engine: 'Unity',
    coverImage: 'covers/space-shooter-command.webp',
    itchUrl: 'https://tantawii.itch.io/space-shooter-command',
  },
  {
    id: 'sciace-battles',
    title: 'Sciace Battles',
    description:
      'Space Battles VR — an intense first-person VR survival shooter defending humanity against alien forces in deep space.',
    tags: ['Simulation', 'VR', 'First-Person', 'Space'],
    engine: 'Unity',
    coverImage: 'covers/sciace-battles.webp',
    itchUrl: 'https://tantawii.itch.io/sciace-battles',
  },
  {
    id: 'raccoon-trails',
    title: 'Raccoon Trails',
    description:
      'A bouncy 2D momentum-based platformer made with a couple of friends for the Godot Wild Jam #88.',
    tags: ['Platformer', '2D', 'Physics'],
    engine: 'Godot',
    coverImage: 'covers/raccoon-trails.webp',
    itchUrl: 'https://popcar2.itch.io/raccoon-trails',
  },
  {
    id: 'message-under-fire',
    title: 'Message Under Fire',
    description:
      'Play as a soldier in the midst of war, collecting comrades’ dog tags and delivering them back to their families.',
    tags: ['Platformer', 'Puzzle', 'War', 'Side Scroller'],
    engine: 'Unity',
    coverImage: 'covers/message-under-fire.webp',
    itchUrl: 'https://circusfreaks666.itch.io/message-under-fire',
  },
];
