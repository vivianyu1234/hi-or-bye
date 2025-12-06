export type GameState = 'playing' | 'dead' | 'won';

export interface Chemical {
  id: string;
  name: string;
  color: string;
  isLethal: boolean;
}

export interface Room {
  id: number;
  name: string;
  chemicals: [Chemical, Chemical];
}

export const ROOMS: Room[] = [
  {
    id: 1,
    name: 'Pick a substance to take',
    chemicals: [
      { id: 'vape', name: 'Mystery Vape', color: '#4a90d9', isLethal: false },
      { id: 'air-freshener', name: 'Air Freshener', color: '#d94a4a', isLethal: true },
    ],
  },
  {
    id: 2,
    name: 'Pick a substance to take',
    chemicals: [
      { id: 'sleeping-pills', name: 'Sleeping Pills', color: '#E85A4F', isLethal: true },
      { id: 'lynx-deodorant', name: 'Lynx Deodorant', color: '#f5d382', isLethal: false },
    ],
  },
  {
    id: 3,
    name: 'The Final Dream',
    chemicals: [
      { id: 'bleach', name: 'Bleach', color: '#FFFFFF', isLethal: false },
      { id: 'window-cleaner', name: 'Window Cleaner', color: '#4a90d9', isLethal: true },
    ],
  },
];
