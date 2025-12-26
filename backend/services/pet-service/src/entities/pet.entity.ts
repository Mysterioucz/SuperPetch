import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  AfterLoad,
} from "typeorm";

@Entity("pets")
export class Pet {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "owner_id" })
  ownerId: string;

  // Basic Info
  @Column({ length: 100 })
  name: string;

  @Column({
    name: "pet_type",
    type: "enum",
    enum: ["dog", "cat", "bird", "rabbit", "hamster", "other"],
  })
  petType: string;

  // Virtual field for frontend compatibility
  species?: string;

  @AfterLoad()
  setComputed() {
    // Map petType to species for frontend (capitalize first letter)
    if (this.petType) {
      this.species =
        this.petType.charAt(0).toUpperCase() + this.petType.slice(1);
    }
  }

  @Column({ length: 100, nullable: true })
  breed: string;

  @Column({ name: "mixed_breed", default: false })
  mixedBreed: boolean;

  @Column({
    type: "enum",
    enum: ["male", "female", "unknown"],
  })
  gender: string;

  // Physical
  @Column({ name: "date_of_birth", type: "date", nullable: true })
  dateOfBirth: Date;

  @Column({ name: "age_years", type: "int", nullable: true })
  ageYears: number;

  @Column({ name: "age_months", type: "int", nullable: true })
  ageMonths: number;

  @Column({
    name: "weight_kg",
    type: "decimal",
    precision: 6,
    scale: 2,
    nullable: true,
  })
  weightKg: number;

  @Column({
    type: "enum",
    enum: ["tiny", "small", "medium", "large", "giant"],
    nullable: true,
  })
  size: string;

  @Column({ length: 50, nullable: true })
  color: string;

  // Characteristics
  @Column({
    name: "energy_level",
    type: "enum",
    enum: ["low", "medium", "high", "very_high"],
    nullable: true,
  })
  energyLevel: string;

  @Column({ type: "text", array: true, nullable: true })
  temperament: string[];

  @Column({ name: "good_with_children", nullable: true })
  goodWithChildren: boolean;

  @Column({ name: "good_with_dogs", nullable: true })
  goodWithDogs: boolean;

  @Column({ name: "good_with_cats", nullable: true })
  goodWithCats: boolean;

  @Column({ name: "house_trained", nullable: true })
  houseTrained: boolean;

  // Health
  @Column({ name: "spayed_neutered", nullable: true })
  spayedNeutered: boolean;

  @Column({ default: false })
  vaccinated: boolean;

  @Column({ name: "vaccination_date", type: "date", nullable: true })
  vaccinationDate: Date;

  @Column({ default: false })
  microchipped: boolean;

  @Column({ name: "microchip_number", length: 50, nullable: true })
  microchipNumber: string;

  @Column({ name: "has_special_needs", default: false })
  hasSpecialNeeds: boolean;

  @Column({ name: "special_needs_description", type: "text", nullable: true })
  specialNeedsDescription: string;

  @Column({
    name: "medical_conditions",
    type: "text",
    array: true,
    nullable: true,
  })
  medicalConditions: string[];

  @Column({ type: "text", array: true, nullable: true })
  medications: string[];

  // Status & Purpose
  @Column({
    type: "enum",
    enum: ["available", "pending", "adopted", "breeding", "hidden", "deceased"],
    default: "available",
  })
  status: string;

  @Column({ name: "is_stray", default: false })
  isStray: boolean;

  @Column({ name: "rescue_story", type: "text", nullable: true })
  rescueStory: string;

  // For Breeding
  @Column({ name: "pedigree_certified", default: false })
  pedigreeCertified: boolean;

  @Column({ name: "pedigree_number", length: 100, nullable: true })
  pedigreeNumber: string;

  @Column({ name: "genetic_tests_done", default: false })
  geneticTestsDone: boolean;

  @Column({ name: "genetic_test_results", type: "jsonb", nullable: true })
  geneticTestResults: any;

  @Column({ name: "breeding_history", type: "jsonb", nullable: true })
  breedingHistory: any;

  // Media
  @Column({ type: "text", array: true, nullable: true })
  photos: string[];

  @Column({ type: "text", array: true, nullable: true })
  videos: string[];

  @Column({ name: "primary_photo_url", type: "text", nullable: true })
  primaryPhotoUrl: string;

  // Location
  @Column({ type: "decimal", precision: 10, scale: 8, nullable: true })
  latitude: number;

  @Column({ type: "decimal", precision: 11, scale: 8, nullable: true })
  longitude: number;

  @Column({ length: 100, nullable: true })
  city: string;

  @Column({ length: 50, nullable: true })
  country: string;

  // Description
  @Column({ type: "text", nullable: true })
  description: string;

  @Column({
    name: "adoption_fee",
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: true,
  })
  adoptionFee: number;

  // ML Features
  @Column({ name: "embedding_data", type: "text", nullable: true })
  embeddingData: string;

  // Moderation
  @Column({ default: false })
  approved: boolean;

  @Column({ name: "approved_by", nullable: true })
  approvedBy: string;

  @Column({
    name: "approved_at",
    type: "timestamp with time zone",
    nullable: true,
  })
  approvedAt: Date;

  @Column({ default: false })
  flagged: boolean;

  @Column({ name: "flag_reason", type: "text", nullable: true })
  flagReason: string;

  // Timestamps
  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @Column({
    name: "deleted_at",
    type: "timestamp with time zone",
    nullable: true,
  })
  deletedAt: Date;

  // Stats (cached)
  @Column({ name: "view_count", default: 0 })
  viewCount: number;

  @Column({ name: "like_count", default: 0 })
  likeCount: number;

  @Column({ name: "match_count", default: 0 })
  matchCount: number;
}
