export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Address {
  address: string;
  city: string;
  state: string;
  stateCode: string;
  postalCode: string;
  country: string;
  coordinates: Coordinates;
}

export interface Hair {
  color: string;
  type: string;
}
export interface Company {
  department: string;
  name: string;
  title: string;
  address: Address;
}
export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  image: string;
  birthDate: string;
  bloodGroup: string;
  height: number;
  weight: number;
  eyeColor: string;
  hair: Hair;
  university: string;
  username: string;
  role: string;
  address: Address;
  company: Company;
}

export interface EmployeesResponse {
  users: Employee[];
  total: number;
  skip: number;
  limit: number;
}
