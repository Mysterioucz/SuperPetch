import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ name: "password_hash", nullable: true })
  password: string;

  @Column({ name: "first_name", nullable: true })
  firstName: string;

  @Column({ name: "last_name", nullable: true })
  lastName: string;

  @Column({ name: "display_name", nullable: true })
  displayName: string;

  @Column({ name: "avatar_url", nullable: true })
  avatarUrl: string;

  @Column({ nullable: true })
  bio: string;

  @Column({ name: "date_of_birth", type: "date", nullable: true })
  dateOfBirth: Date;

  @Column({
    type: "enum",
    enum: ["user", "business", "admin", "moderator"],
    default: "user",
  })
  role: string;

  @Column({
    name: "verification_status",
    type: "enum",
    enum: ["pending", "verified", "rejected"],
    default: "pending",
  })
  verificationStatus: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  country: string;

  @Column({ nullable: true })
  city: string;

  @Column({ name: "postal_code", nullable: true })
  postalCode: string;

  @Column({ type: "decimal", precision: 10, scale: 8, nullable: true })
  latitude: number;

  @Column({ type: "decimal", precision: 11, scale: 8, nullable: true })
  longitude: number;

  @Column({
    name: "trust_score",
    type: "decimal",
    precision: 3,
    scale: 2,
    default: 0.0,
  })
  trustScore: number;

  @Column({ name: "identity_verified", default: false })
  identityVerified: boolean;

  @Column({ name: "identity_document_url", nullable: true })
  identityDocumentUrl: string;

  @Column({ name: "is_active", default: true })
  isActive: boolean;

  @Column({ name: "is_blocked", default: false })
  isBlocked: boolean;

  @Column({ name: "email_verified", default: false })
  emailVerified: boolean;

  @Column({ name: "phone_verified", default: false })
  phoneVerified: boolean;

  @Column({ name: "google_id", unique: true, nullable: true })
  googleId: string;

  @Column({ name: "apple_id", unique: true, nullable: true })
  appleId: string;

  @Column({ name: "line_id", unique: true, nullable: true })
  lineId: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @Column({
    name: "last_login",
    type: "timestamp with time zone",
    nullable: true,
  })
  lastLogin: Date;

  @Column({
    name: "deleted_at",
    type: "timestamp with time zone",
    nullable: true,
  })
  deletedAt: Date;
}
