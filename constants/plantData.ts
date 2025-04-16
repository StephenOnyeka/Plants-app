export type Plant = {
  id: number;
  title: string;
  description: string;
  category: string;
  stars: number;
  image: any;
  price: number;
};

const plantData: Plant[] = [
  {
    id: 1,
    title: "Succulent",
    description: "Thrives indoors all year round.",
    category: "Indoor",
    stars: 4.5,
    image: require("@/assets/plants/7.jpeg"),
    price: 25.99,
  },
  {
    id: 2,
    title: "Fiddle Leaf Fig",
    description: "Perfect for home or office.",
    category: "Indoor",
    stars: 4.7,
    image: require("@/assets/plants/8.jpeg"),
    price: 45.50,
  },
  {
    id: 3,
    title: "Palm Branch",
    description: "Adds a tropical vibe.",
    category: "Outdoor",
    stars: 4.3,
    image: require("@/assets/plants/1.jpeg"),
    price: 30.00,
  },
  {
    id: 4,
    title: "Bird of Paradise",
    description: "Elegant and vibrant.",
    category: "Outdoor",
    stars: 4.8,
    image: require("@/assets/plants/2.jpeg"),
    price: 60.75,
  },
  {
    id: 5,
    title: "Artificial Fiddle Leaf",
    description: "Low maintenance beauty.",
    category: "Indoor",
    stars: 4.6,
    image: require("@/assets/plants/3.jpeg"),
    price: 20.99,
  },
  {
    id: 6,
    title: "Succulent Vase",
    description: "Compact and stylish.",
    category: "Indoor",
    stars: 4.4,
    image: require("@/assets/plants/4.jpeg"),
    price: 15.49,
  },
  {
    id: 7,
    title: "Leafy Green",
    description: "Fresh and vibrant.",
    category: "Garden",
    stars: 4.2,
    image: require("@/assets/plants/5.jpeg"),
    price: 18.25,
  },
  {
    id: 8,
    title: "Artificial Palm",
    description: "Tropical and evergreen.",
    category: "Outdoor",
    stars: 4.9,
    image: require("@/assets/plants/6.jpeg"),
    price: 50.00,
  },
];

export default plantData;