-- Migration: Add species column to pets table
-- This adds a species column for frontend compatibility while keeping pet_type for enum validation

-- Add the species column
ALTER TABLE pets ADD COLUMN IF NOT EXISTS species VARCHAR(50);

-- Populate species from pet_type (capitalize first letter)
UPDATE pets
SET species = CONCAT(UPPER(SUBSTRING(pet_type::text, 1, 1)), SUBSTRING(pet_type::text, 2))
WHERE species IS NULL;

-- Create index on species for filtering
CREATE INDEX IF NOT EXISTS idx_pets_species ON pets(species);

-- Verify the migration
DO $$
DECLARE
    species_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO species_count FROM pets WHERE species IS NOT NULL;
    RAISE NOTICE 'Migration completed. Updated % pet records with species data.', species_count;
END $$;
