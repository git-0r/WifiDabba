export interface OnboardingStep {
  id: string;
  image: string;
  title: string;
  description: string;
}

export interface User {
  name: string;
  email: string;
}

export interface ApiUser {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
  username: string;
  address: {
    street: string;
    city: string;
    zipcode: string;
  };
  company: {
    name: string;
  };
}
