export type CarStatus = "Available" | "Booked" | "Maintenance";
export type Transmission = "Manual" | "Automatic";

export interface Car {
  id: string;
  name: string;
  pricePerDay: number;
  seats: number;
  transmission: Transmission;
  fuelType: string;
  status: CarStatus;
  cardColor: string;
  tagline: string;
}

export const featuredCars: Car[] = [
  {
    id: "1",
    name: "Toyota Vios 2022",
    pricePerDay: 2500,
    seats: 5,
    transmission: "Automatic",
    fuelType: "Gasoline",
    status: "Available",
    cardColor: "#1a1a2e",
    tagline: "Smooth city rides",
  },
  {
    id: "2",
    name: "Honda City 2023",
    pricePerDay: 2800,
    seats: 5,
    transmission: "Automatic",
    fuelType: "Gasoline",
    status: "Available",
    cardColor: "#16213e",
    tagline: "Comfort on every road",
  },
  {
    id: "3",
    name: "Toyota Fortuner 2022",
    pricePerDay: 4500,
    seats: 7,
    transmission: "Automatic",
    fuelType: "Diesel",
    status: "Available",
    cardColor: "#0f3460",
    tagline: "Power meets elegance",
  },
  {
    id: "4",
    name: "Mitsubishi Montero 2021",
    pricePerDay: 4000,
    seats: 7,
    transmission: "Automatic",
    fuelType: "Diesel",
    status: "Booked",
    cardColor: "#1b1b2f",
    tagline: "Built for every terrain",
  },
  {
    id: "5",
    name: "Toyota HiAce 2022",
    pricePerDay: 5500,
    seats: 12,
    transmission: "Manual",
    fuelType: "Diesel",
    status: "Available",
    cardColor: "#162447",
    tagline: "Group travel made easy",
  },
  {
    id: "6",
    name: "Suzuki Ertiga 2023",
    pricePerDay: 2200,
    seats: 7,
    transmission: "Automatic",
    fuelType: "Gasoline",
    status: "Available",
    cardColor: "#1f4068",
    tagline: "Family-friendly adventures",
  },
];
