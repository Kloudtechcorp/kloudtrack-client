export type UserDetails = {
  id: number;
  username: string;
  role: string;
  stations:
    | {
        id: string;
        type: string;
        name: string;
      }[]
    | [];
};

export type SignIn = { username: string; password: string };
