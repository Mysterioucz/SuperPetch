import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("pets")
export class Pet {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  species: string;

  @Column()
  breed: string;

  @Column()
  age: number;

  @Column()
  gender: string;

  @Column()
  size: string;

  @Column({ nullable: true, type: "float" })
  weight: number;

  @Column({ nullable: true })
  color: string;

  @Column("text")
  description: string;

  @Column("simple-array", { nullable: true })
  temperament: string[];

  @Column({ nullable: true })
  healthStatus: string;

  @Column({ default: false })
  vaccinated: boolean;

  @Column({ default: false })
  neutered: boolean;

  @Column({ default: false })
  microchipped: boolean;

  @Column({ nullable: true })
  specialNeeds: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  zipCode: string;

  @Column({ nullable: true, type: "float" })
  adoptionFee: number;

  @Column("simple-array", { nullable: true })
  images: string[];

  @Column({ default: "available" })
  status: string;

  @Column({ nullable: true })
  ownerId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
