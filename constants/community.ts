export type Person = {
  id: number;
  name: string;
  handle: string;
  bio: string;
  followers: number;
  color: string;
  following: boolean;
};

export type Conversation = {
  id: number;
  name: string;
  handle: string;
  color: string;
  lastMessage: string;
  time: string;
  unread: number;
};

export const people: Person[] = [
  {
    id: 1,
    name: "Maya Green",
    handle: "@mayagrows",
    bio: "Urban jungle enthusiast. 60+ plants and counting.",
    followers: 1240,
    color: "#16a34a",
    following: false,
  },
  {
    id: 2,
    name: "Leo Fernandez",
    handle: "@leostropicals",
    bio: "Monstera hoarder & propagation nerd.",
    followers: 856,
    color: "#0ea5e9",
    following: true,
  },
  {
    id: 3,
    name: "Priya Nair",
    handle: "@priyaplants",
    bio: "Succulent & cactus collector. Desert vibes only.",
    followers: 2310,
    color: "#f59e0b",
    following: false,
  },
  {
    id: 4,
    name: "Tomasz Kowalski",
    handle: "@tomsgarden",
    bio: "Outdoor gardener. Roses, herbs, and everything green.",
    followers: 543,
    color: "#8b5cf6",
    following: false,
  },
  {
    id: 5,
    name: "Aisha Bello",
    handle: "@aishablooms",
    bio: "Peace lilies and calatheas are my love language.",
    followers: 1780,
    color: "#ec4899",
    following: true,
  },
  {
    id: 6,
    name: "Daniel Osei",
    handle: "@danthegardener",
    bio: "Turning my balcony into a rainforest, one pot at a time.",
    followers: 692,
    color: "#ef4444",
    following: false,
  },
  {
    id: 7,
    name: "Sofia Rossi",
    handle: "@sofiasleaves",
    bio: "Fiddle leaf fig whisperer. Bright indirect light only.",
    followers: 3020,
    color: "#14b8a6",
    following: false,
  },
  {
    id: 8,
    name: "Kenji Tanaka",
    handle: "@kenjibonsai",
    bio: "Bonsai artist. Patience is the best fertilizer.",
    followers: 4150,
    color: "#a16207",
    following: false,
  },
];

export const conversations: Conversation[] = [
  {
    id: 1,
    name: "GreenLeaf Nursery",
    handle: "@greenleaf",
    color: "#16a34a",
    lastMessage: "Your Monstera order has shipped! Track it here.",
    time: "9:41 AM",
    unread: 2,
  },
  {
    id: 2,
    name: "Maya Green",
    handle: "@mayagrows",
    color: "#0ea5e9",
    lastMessage: "That fiddle leaf is thriving! What soil mix do you use?",
    time: "Yesterday",
    unread: 1,
  },
  {
    id: 3,
    name: "Plant Care Support",
    handle: "@support",
    color: "#f59e0b",
    lastMessage: "Happy to help with your snake plant's yellow leaves.",
    time: "Yesterday",
    unread: 0,
  },
  {
    id: 4,
    name: "Priya Nair",
    handle: "@priyaplants",
    color: "#ec4899",
    lastMessage: "Swapping succulent cuttings this weekend?",
    time: "Mon",
    unread: 0,
  },
  {
    id: 5,
    name: "Bloom & Grow Co.",
    handle: "@bloomandgrow",
    color: "#8b5cf6",
    lastMessage: "New arrivals just dropped — check out the rare aroids.",
    time: "Sun",
    unread: 0,
  },
];
