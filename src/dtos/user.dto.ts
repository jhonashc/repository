export interface CreateUserDto {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  avatarUrl?: string;
  roles?: string[];
}

export interface UpdateUserDto extends Partial<CreateUserDto> {}
