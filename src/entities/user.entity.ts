import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("user")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    type: "text",
    name: "first_name",
  })
  firstName: string;

  @Column({
    type: "text",
    name: "last_name",
  })
  lastName: string;

  @Column({
    type: "text",
    unique: true,
  })
  email: string;

  @Column({
    type: "text",
  })
  password: string;

  @Column({
    type: "text",
    name: "avatar_url",
    nullable: true,
  })
  avatarUrl: string;

  @Column({
    type: "text",
    array: true,
    default: ["user"],
  })
  roles: string[];

  @Column({
    type: "boolean",
    default: true,
  })
  status: boolean;

  @CreateDateColumn({
    type: "timestamp",
    name: "created_at",
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: "timestamp",
    name: "updated_at",
  })
  updatedAt: Date;
}
