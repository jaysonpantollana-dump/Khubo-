export interface Listing {
  id: string;
  title: string;
  location: string;
  description: string;
  price: number;
  rating: number;
  image: string;
  gallery: string[];
  category: string;
  date: string;
  amenities: string[];
  reviews: {
    id: string;
    userName: string;
    userImage: string;
    date: string;
    comment: string;
    rating: number;
  }[];
  host?: {
    name: string;
    image: string;
    reviews: number;
    rating: number;
    hostingDuration: string;
    work: string;
    location: string;
  };
}

export interface Category {
  label: string;
  icon: string;
  emoji: string;
}
