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
    name: 'The Forbidden Room',
    chemicals: [
      { id: 'pill-blue', name: 'Blue Pill', color: '#4a90d9', isLethal: false },
      { id: 'pill-red', name: 'Red Pill', color: '#d94a4a', isLethal: true },
    ],
  },
  {
    id: 2,
    name: 'The Floating Chamber',
    chemicals: [
      { id: 'vial-green', name: 'Green Vial', color: '#4ad94a', isLethal: true },
      { id: 'vial-purple', name: 'Purple Vial', color: '#9a4ad9', isLethal: false },
    ],
  },
  {
    id: 3,
    name: 'The Final Dream',
    chemicals: [
      { id: 'syringe-gold', name: 'Gold Syringe', color: '#d9b44a', isLethal: false },
      { id: 'syringe-silver', name: 'Silver Syringe', color: '#c0c0c0', isLethal: true },
    ],
  },
];
