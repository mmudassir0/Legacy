export interface User {
  id?: number | any;
  name: string;
  place: string;
  gender: string;
  age: string;
  groups: string[];
  image: File | null;
}
