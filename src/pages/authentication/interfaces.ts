export interface AuthData {
  email: string;
  password: string;
}

export type AuthAction = {
  type: "email";
  payload: string;
} | {
  type: "password";
  payload: string;
};