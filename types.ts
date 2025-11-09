
export type Orientation = 'Portrait' | 'Landscape' | 'Square';
export type ImageSize = 'HD' | '2K' | '4K';
export type View = 'generator' | 'library' | 'pricing' | 'admin';

export interface User {
  id: string;
  email: string;
  credits: number;
  googleId?: string;
  role: 'USER' | 'ADMIN';
}

export interface Image {
  id: string;
  userId: string;
  prompt: string;
  orientation: Orientation;
  size: ImageSize;
  imageUrl: string;
  createdAt: Date;
}

export interface Payment {
  id: string;
  userId: string;
  amount: number;
  creditsAdded: number;
  stripeChargeId: string;
  status: 'PENDING' | 'SUCCESS' | 'FAILED';
  createdAt: Date;
}

export interface CreditPackage {
    id: string;
    name: string;
    credits: number;
    price: number;
    description: string;
    isPopular?: boolean;
}
   