DROP "job_board";

CREATE DATABASE "job_board";

CREATE TABLE IF NOT EXISTS "users" (
    "user_id" CHAR(32) PRIMARY KEY,
    "email" VARCHAR(255) NOT NULL UNIQUE,
    "password" VARCHAR(255) NOT NULL,
    "user_profile" VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS "candidate_profile" (
    "c_profile_id" VARCHAR(32) PRIMARY KEY,
    "first_name" VARCHAR(255) NOT NULL,
    "last_name" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(255) NOT NULL,
    "message" TEXT,
    "user" VARCHAR(32) REFERENCES "users" ("user_id")
);

CREATE TABLE IF NOT EXISTS "recruiter" (
    "recruiter_id" CHAR(32) PRIMARY KEY,
    "company" VARCHAR (255) NOT NULL UNIQUE,
    "application_email" VARCHAR(255) NOT NULL UNIQUE,
    "user" VARCHAR(32) REFERENCES "users" ("user_id"),
    "company" VARCHAR(32) REFERENCES "company" ("company_id")
);

CREATE TABLE IF NOT EXISTS "company" (
    "company_id" CHAR(32) PRIMARY KEY,
    "name" VARCHAR (255) NOT NULL,
    "industry" VARCHAR(255) NOT NULL,
    "contact_email" VARCHAR(255) NOT NULL,
    "head_office_address" VARCHAR(255) NOT NULL
);
/* Je me suis arrete par la ;) */


CREATE TABLE IF NOT EXISTS place_amenity (
    place_id CHAR(36) NOT NULL,
    amenity_id CHAR(36) NOT NULL,
    PRIMARY KEY (place_id, amenity_id),
    FOREIGN KEY (place_id) REFERENCES places(id) ON DELETE CASCADE,
    FOREIGN KEY (amenity_id) REFERENCES amenities(id) ON DELETE CASCADE
);