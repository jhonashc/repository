export interface LoginUserDto {
  email: string;
  password: string;
}

export interface RegisterUserDto {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  avatarUrl?: string;
}
