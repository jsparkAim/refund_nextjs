export interface User {
  id: string;
  phone_number: string | null;
  name: string | null;
  birth_date?: Date | null;
  gender?: string | null;
  CI?: string | null;
}

export interface UserState {
  user: User | null;
  setUser: (user: User | null) => void;
  updateUser: (partial: Partial<User>) => void;
  clearUser: () => void;
}

export enum UserStatus {
  EXISTING = "EXISTING",
  NEW = "NEW",
  USE_RESTRICTIONS = "USE_RESTRICTIONS",
}

export type CheckUserResponse = {
  status: UserStatus;
};
