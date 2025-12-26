-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- ============================================
-- ENUMS
-- ============================================

DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('user', 'business', 'admin', 'moderator');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE verification_status AS ENUM ('pending', 'verified', 'rejected');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE pet_status AS ENUM ('available', 'pending', 'adopted', 'breeding', 'hidden', 'deceased');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE pet_type AS ENUM ('dog', 'cat', 'bird', 'rabbit', 'hamster', 'other');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE gender AS ENUM ('male', 'female', 'unknown');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE energy_level AS ENUM ('low', 'medium', 'high', 'very_high');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE size AS ENUM ('tiny', 'small', 'medium', 'large', 'giant');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE home_type AS ENUM ('apartment', 'house_small', 'house_medium', 'house_large', 'farm');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE experience_level AS ENUM ('beginner', 'intermediate', 'advanced', 'expert');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE match_status AS ENUM ('pending', 'accepted', 'rejected', 'expired');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE swipe_action AS ENUM ('like', 'pass', 'super_like');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE report_type AS ENUM ('spam', 'abuse', 'fraud', 'inappropriate_content', 'fake_listing', 'other');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE report_status AS ENUM ('pending', 'investigating', 'resolved', 'dismissed');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE booking_status AS ENUM ('pending', 'confirmed', 'completed', 'cancelled');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE payment_status AS ENUM ('pending', 'completed', 'failed', 'refunded');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- ============================================
-- USERS TABLE
-- ============================================

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    password_hash VARCHAR(255),
    role user_role DEFAULT 'user',
    verification_status verification_status DEFAULT 'pending',

    -- OAuth fields
    google_id VARCHAR(255) UNIQUE,
    apple_id VARCHAR(255) UNIQUE,
    line_id VARCHAR(255) UNIQUE,

    -- Profile basics
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    display_name VARCHAR(100),
    avatar_url TEXT,
    bio TEXT,
    date_of_birth DATE,

    -- Location
    country VARCHAR(50),
    city VARCHAR(100),
    postal_code VARCHAR(20),
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),

    -- Trust & Security
    trust_score DECIMAL(3,2) DEFAULT 0.00 CHECK (trust_score >= 0 AND trust_score <= 5),
    identity_verified BOOLEAN DEFAULT FALSE,
    identity_document_url TEXT,

    -- Flags
    is_active BOOLEAN DEFAULT TRUE,
    is_blocked BOOLEAN DEFAULT FALSE,
    email_verified BOOLEAN DEFAULT FALSE,
    phone_verified BOOLEAN DEFAULT FALSE,

    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP WITH TIME ZONE,
    deleted_at TIMESTAMP WITH TIME ZONE
);

-- Indexes for users
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_verification_status ON users(verification_status);
CREATE INDEX idx_users_latitude ON users(latitude);
CREATE INDEX idx_users_longitude ON users(longitude);
CREATE INDEX idx_users_created_at ON users(created_at);

-- ============================================
-- USER PREFERENCES TABLE
-- ============================================

CREATE TABLE user_preferences (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

    -- Lifestyle
    home_type home_type,
    has_yard BOOLEAN DEFAULT FALSE,
    has_children BOOLEAN DEFAULT FALSE,
    children_ages INTEGER[],
    has_other_pets BOOLEAN DEFAULT FALSE,
    other_pets_types pet_type[],

    -- Experience
    experience_level experience_level DEFAULT 'beginner',
    years_of_experience INTEGER DEFAULT 0,
    preferred_pet_types pet_type[],
    preferred_pet_sizes size[],
    preferred_energy_levels energy_level[],

    -- Constraints
    max_age INTEGER,
    min_age INTEGER,
    special_needs_ok BOOLEAN DEFAULT FALSE,
    medical_conditions_ok BOOLEAN DEFAULT FALSE,

    -- Preferences
    willing_to_travel_km INTEGER DEFAULT 50,
    preferred_gender gender[],

    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

    UNIQUE(user_id)
);

-- ============================================
-- PETS TABLE
-- ============================================

CREATE TABLE pets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    owner_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

    -- Basic Info
    name VARCHAR(100) NOT NULL,
    pet_type pet_type NOT NULL,
    breed VARCHAR(100),
    mixed_breed BOOLEAN DEFAULT FALSE,
    gender gender NOT NULL,

    -- Physical
    date_of_birth DATE,
    age_years INTEGER,
    age_months INTEGER,
    weight_kg DECIMAL(6,2),
    size size,
    color VARCHAR(50),

    -- Characteristics
    energy_level energy_level,
    temperament TEXT[],
    good_with_children BOOLEAN,
    good_with_dogs BOOLEAN,
    good_with_cats BOOLEAN,
    house_trained BOOLEAN,

    -- Health
    spayed_neutered BOOLEAN,
    vaccinated BOOLEAN,
    vaccination_date DATE,
    microchipped BOOLEAN,
    microchip_number VARCHAR(50),
    has_special_needs BOOLEAN DEFAULT FALSE,
    special_needs_description TEXT,
    medical_conditions TEXT[],
    medications TEXT[],

    -- Status & Purpose
    status pet_status DEFAULT 'available',
    is_stray BOOLEAN DEFAULT FALSE,
    rescue_story TEXT,

    -- For Breeding
    pedigree_certified BOOLEAN DEFAULT FALSE,
    pedigree_number VARCHAR(100),
    genetic_tests_done BOOLEAN DEFAULT FALSE,
    genetic_test_results JSONB,
    breeding_history JSONB,

    -- Media
    photos TEXT[],
    videos TEXT[],
    primary_photo_url TEXT,

    -- Location
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    city VARCHAR(100),
    country VARCHAR(50),

    -- Description
    description TEXT,
    adoption_fee DECIMAL(10,2),

    -- ML Features (computed)
    embedding VECTOR(128), -- For ML similarity search (requires pgvector extension)

    -- Moderation
    approved BOOLEAN DEFAULT FALSE,
    approved_by UUID REFERENCES users(id),
    approved_at TIMESTAMP WITH TIME ZONE,
    flagged BOOLEAN DEFAULT FALSE,
    flag_reason TEXT,

    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE,

    -- Stats (cached)
    view_count INTEGER DEFAULT 0,
    like_count INTEGER DEFAULT 0,
    match_count INTEGER DEFAULT 0
);

-- Indexes for pets
CREATE INDEX idx_pets_owner_id ON pets(owner_id);
CREATE INDEX idx_pets_type ON pets(type);
CREATE INDEX idx_pets_status ON pets(status);
CREATE INDEX idx_pets_breed ON pets(breed);
CREATE INDEX idx_pets_latitude ON pets(latitude);
CREATE INDEX idx_pets_longitude ON pets(longitude);
CREATE INDEX idx_pets_approved ON pets(approved);
CREATE INDEX idx_pets_is_stray ON pets(is_stray);
CREATE INDEX idx_pets_created_at ON pets(created_at);

-- Full-text search on pets
CREATE INDEX idx_pets_search ON pets USING gin(to_tsvector('english',
    COALESCE(name, '') || ' ' ||
    COALESCE(breed, '') || ' ' ||
    COALESCE(description, '')
));

-- ============================================
-- SWIPES TABLE
-- ============================================

CREATE TABLE swipes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    pet_id UUID NOT NULL REFERENCES pets(id) ON DELETE CASCADE,
    action swipe_action NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

    UNIQUE(user_id, pet_id)
);

CREATE INDEX idx_swipes_user_id ON swipes(user_id);
CREATE INDEX idx_swipes_pet_id ON swipes(pet_id);
CREATE INDEX idx_swipes_action ON swipes(action);
CREATE INDEX idx_swipes_created_at ON swipes(created_at);

-- ============================================
-- MATCHES TABLE
-- ============================================

CREATE TABLE matches (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    pet_id UUID NOT NULL REFERENCES pets(id) ON DELETE CASCADE,
    owner_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

    status match_status DEFAULT 'pending',

    -- ML scores
    compatibility_score DECIMAL(5,4), -- 0-1
    lifestyle_match_score DECIMAL(5,4),
    experience_match_score DECIMAL(5,4),
    location_score DECIMAL(5,4),

    -- Timestamps
    matched_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    accepted_at TIMESTAMP WITH TIME ZONE,
    rejected_at TIMESTAMP WITH TIME ZONE,
    expires_at TIMESTAMP WITH TIME ZONE,

    -- Communication
    chat_room_id VARCHAR(100),
    last_message_at TIMESTAMP WITH TIME ZONE,

    -- Outcome
    adopted BOOLEAN DEFAULT FALSE,
    adoption_date DATE,
    adoption_notes TEXT,

    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

    UNIQUE(user_id, pet_id)
);

CREATE INDEX idx_matches_user_id ON matches(user_id);
CREATE INDEX idx_matches_pet_id ON matches(pet_id);
CREATE INDEX idx_matches_owner_id ON matches(owner_id);
CREATE INDEX idx_matches_status ON matches(status);
CREATE INDEX idx_matches_matched_at ON matches(matched_at);

-- ============================================
-- REVIEWS TABLE
-- ============================================

CREATE TABLE reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reviewer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    reviewee_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    match_id UUID REFERENCES matches(id) ON DELETE SET NULL,

    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,

    -- Review aspects
    communication_rating INTEGER CHECK (communication_rating >= 1 AND communication_rating <= 5),
    reliability_rating INTEGER CHECK (reliability_rating >= 1 AND reliability_rating <= 5),
    pet_care_rating INTEGER CHECK (pet_care_rating >= 1 AND pet_care_rating <= 5),

    -- Flags
    is_visible BOOLEAN DEFAULT TRUE,
    flagged BOOLEAN DEFAULT FALSE,

    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

    UNIQUE(reviewer_id, reviewee_id, match_id)
);

CREATE INDEX idx_reviews_reviewer_id ON reviews(reviewer_id);
CREATE INDEX idx_reviews_reviewee_id ON reviews(reviewee_id);
CREATE INDEX idx_reviews_rating ON reviews(rating);
CREATE INDEX idx_reviews_created_at ON reviews(created_at);

-- ============================================
-- BUSINESS PROFILES TABLE
-- ============================================

CREATE TABLE business_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

    business_name VARCHAR(255) NOT NULL,
    business_type VARCHAR(100), -- 'veterinary', 'grooming', 'training', 'pet_store', 'shelter'
    description TEXT,

    -- Contact
    business_email VARCHAR(255),
    business_phone VARCHAR(20),
    website_url TEXT,

    -- Location
    address TEXT,
    city VARCHAR(100),
    country VARCHAR(50),
    postal_code VARCHAR(20),
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),

    -- Verification
    verified BOOLEAN DEFAULT FALSE,
    license_number VARCHAR(100),
    license_document_url TEXT,

    -- Media
    logo_url TEXT,
    cover_photo_url TEXT,
    photos TEXT[],

    -- Business hours
    business_hours JSONB,

    -- Stats
    average_rating DECIMAL(3,2) DEFAULT 0.00,
    total_reviews INTEGER DEFAULT 0,

    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

    UNIQUE(user_id)
);

CREATE INDEX idx_business_profiles_user_id ON business_profiles(user_id);
CREATE INDEX idx_business_profiles_business_type ON business_profiles(business_type);
CREATE INDEX idx_business_profiles_latitude ON business_profiles(latitude);
CREATE INDEX idx_business_profiles_longitude ON business_profiles(longitude);
CREATE INDEX idx_business_profiles_verified ON business_profiles(verified);

-- ============================================
-- SERVICES TABLE (Marketplace)
-- ============================================

CREATE TABLE services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    business_id UUID NOT NULL REFERENCES business_profiles(id) ON DELETE CASCADE,

    name VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100), -- 'veterinary_care', 'grooming', 'training', 'boarding', etc.

    -- Pricing
    price DECIMAL(10,2),
    price_unit VARCHAR(50), -- 'per_session', 'per_hour', 'per_day', 'per_month'
    discount_percentage INTEGER,

    -- Service details
    duration_minutes INTEGER,
    max_capacity INTEGER,

    -- Media
    photos TEXT[],

    -- Availability
    is_active BOOLEAN DEFAULT TRUE,
    is_bookable BOOLEAN DEFAULT TRUE,

    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_services_business_id ON services(business_id);
CREATE INDEX idx_services_category ON services(category);
CREATE INDEX idx_services_is_active ON services(is_active);

-- ============================================
-- SERVICE REVIEWS TABLE
-- ============================================

CREATE TABLE service_reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    service_id UUID NOT NULL REFERENCES services(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,

    photos TEXT[],

    is_visible BOOLEAN DEFAULT TRUE,
    flagged BOOLEAN DEFAULT FALSE,

    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_service_reviews_service_id ON service_reviews(service_id);
CREATE INDEX idx_service_reviews_user_id ON service_reviews(user_id);
CREATE INDEX idx_service_reviews_rating ON service_reviews(rating);

-- ============================================
-- BOOKINGS TABLE
-- ============================================

CREATE TABLE bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    service_id UUID NOT NULL REFERENCES services(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    pet_id UUID REFERENCES pets(id) ON DELETE SET NULL,

    booking_date DATE NOT NULL,
    booking_time TIME,
    duration_minutes INTEGER,

    status booking_status DEFAULT 'pending',

    -- Pricing
    total_amount DECIMAL(10,2),
    payment_status payment_status DEFAULT 'pending',

    notes TEXT,

    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    cancelled_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_bookings_service_id ON bookings(service_id);
CREATE INDEX idx_bookings_user_id ON bookings(user_id);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_booking_date ON bookings(booking_date);

-- ============================================
-- REPORTS TABLE
-- ============================================

CREATE TABLE reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reporter_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

    -- What is being reported
    reported_user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    reported_pet_id UUID REFERENCES pets(id) ON DELETE CASCADE,
    reported_review_id UUID REFERENCES reviews(id) ON DELETE CASCADE,

    report_type report_type NOT NULL,
    description TEXT NOT NULL,
    evidence_urls TEXT[],

    status report_status DEFAULT 'pending',

    -- Moderation
    assigned_to UUID REFERENCES users(id),
    moderator_notes TEXT,
    resolution TEXT,
    resolved_at TIMESTAMP WITH TIME ZONE,

    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_reports_reporter_id ON reports(reporter_id);
CREATE INDEX idx_reports_reported_user_id ON reports(reported_user_id);
CREATE INDEX idx_reports_status ON reports(status);
CREATE INDEX idx_reports_report_type ON reports(report_type);
CREATE INDEX idx_reports_created_at ON reports(created_at);

-- ============================================
-- NOTIFICATIONS TABLE
-- ============================================

CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

    type VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,

    -- Related entities
    related_user_id UUID REFERENCES users(id),
    related_pet_id UUID REFERENCES pets(id),
    related_match_id UUID REFERENCES matches(id),

    data JSONB,

    read BOOLEAN DEFAULT FALSE,
    read_at TIMESTAMP WITH TIME ZONE,

    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_read ON notifications(read);
CREATE INDEX idx_notifications_created_at ON notifications(created_at);

-- ============================================
-- AUDIT LOGS TABLE
-- ============================================

CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,

    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(50) NOT NULL,
    entity_id UUID,

    old_data JSONB,
    new_data JSONB,

    ip_address INET,
    user_agent TEXT,

    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_entity_type ON audit_logs(entity_type);
CREATE INDEX idx_audit_logs_entity_id ON audit_logs(entity_id);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at);

-- ============================================
-- TRIGGERS FOR updated_at
-- ============================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_user_preferences_updated_at BEFORE UPDATE ON user_preferences FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_pets_updated_at BEFORE UPDATE ON pets FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_matches_updated_at BEFORE UPDATE ON matches FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON reviews FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_business_profiles_updated_at BEFORE UPDATE ON business_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON bookings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_reports_updated_at BEFORE UPDATE ON reports FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- SEED DATA (Optional)
-- ============================================

-- Insert admin user
INSERT INTO users (email, role, first_name, last_name, display_name, email_verified, verification_status, trust_score)
VALUES ('admin@petplatform.com', 'admin', 'Admin', 'User', 'Admin', true, 'verified', 5.00);

-- Insert sample moderator
INSERT INTO users (email, role, first_name, last_name, display_name, email_verified, verification_status, trust_score)
VALUES ('moderator@petplatform.com', 'moderator', 'Moderator', 'User', 'Moderator', true, 'verified', 5.00);
