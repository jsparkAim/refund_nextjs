export interface User {
  id: string;
  phone_number: string | null;
  name: string | null;
  birth_date?: Date | null;
  gender?: string | null;
  pw?: string | null;
  auth_token?: string | null;
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
  NOT_FOUND = "NOT_FOUND",
  PASSWORD_MISMATCH = "PASSWORD_MISMATCH",
  USER_RESTRICTIONS = "USER_RESTRICTIONS",
}

export type CheckUserResponse = {
  status: UserStatus;
};
