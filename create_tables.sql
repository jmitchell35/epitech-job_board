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


CREATE TABLE IF NOT EXIST "application" (
    "application_id" CHAR(32) PRIMARY KEY,
    "message" TEXT,
    "company" VARCHAR(32) REFERENCES "company" ("company_id"),
    "candidate" VARCHAR(32) REFERENCES "candidate_profile" ("c_profile_id"),
    "job_advertisement" VARCHAR(32) REFERENCES "job_adverstisement" ("job_adverstisement_id"),
    "candidate_email" VARCHAR (255) NOT NULL,
    "first_name" VARCHAR (255) NOT NULL,
    "last_name" VARCHAR (255) NOT NULL,
    "phone" VARCHAR (255) NOT NULL
);

CREATE TABLE IF NOT EXIST "job_adverstisement" (
    "job_adverstisement_id" CHAR(32) PRIMARY KEY,
    "title" VARCHAR (255) NOT NULL,
    "short_description" TEXT,
    "full_description" TEXT,
    "wages" VARCHAR (255) NOT NULL,
    "city" VARCHAR (255) NOT NULL,
    "working_time" VARCHAR (255) NOT NULL,
    "remote_work" VARCHAR (255) NOT NULL,
    "company" VARCHAR(32) REFERENCES "company" ("company_id"),
    "recruiter" VARCHAR(32) REFERENCES "recruiter" ("recruiter_id")
);

/* Je me suis arrete par la 0_0 */