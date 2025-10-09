-- CreateTable
CREATE TABLE "users" (
    "user_id" UUID NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "profile" VARCHAR(20) NOT NULL DEFAULT 'USER',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "recruiter_profiles" (
    "profile_id" UUID NOT NULL,
    "application_email" VARCHAR(255) NOT NULL,
    "recruiterId" UUID NOT NULL,
    "companyId" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "recruiter_profiles_pkey" PRIMARY KEY ("profile_id")
);

-- CreateTable
CREATE TABLE "candidate_profiles" (
    "profile_id" UUID NOT NULL,
    "first_name" VARCHAR(255) NOT NULL,
    "last_name" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(255) NOT NULL,
    "message" TEXT NOT NULL,
    "candidateId" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "candidate_profiles_pkey" PRIMARY KEY ("profile_id")
);

-- CreateTable
CREATE TABLE "company" (
    "company_id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "industry" VARCHAR(255) NOT NULL,
    "contactEmail" VARCHAR(255) NOT NULL,
    "headOffice" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "company_pkey" PRIMARY KEY ("company_id")
);

-- CreateTable
CREATE TABLE "applications" (
    "application_id" UUID NOT NULL,
    "message" TEXT NOT NULL,
    "candidateEmail" VARCHAR(255) NOT NULL,
    "firstName" VARCHAR(255) NOT NULL,
    "lastName" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(255) NOT NULL,
    "candidateId" UUID NOT NULL,
    "advertisementId" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "applications_pkey" PRIMARY KEY ("application_id")
);

-- CreateTable
CREATE TABLE "advertisements" (
    "advertisement_id" UUID NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "short_description" VARCHAR(255) NOT NULL,
    "full_description" VARCHAR(255) NOT NULL,
    "wages" VARCHAR(255) NOT NULL,
    "city" VARCHAR(255) NOT NULL,
    "workingTime" VARCHAR(255) NOT NULL,
    "remoteWork" VARCHAR(255) NOT NULL,
    "companyId" UUID NOT NULL,
    "recruiterId" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "advertisements_pkey" PRIMARY KEY ("advertisement_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "recruiter_profiles_recruiterId_key" ON "recruiter_profiles"("recruiterId");

-- CreateIndex
CREATE UNIQUE INDEX "candidate_profiles_candidateId_key" ON "candidate_profiles"("candidateId");

-- AddForeignKey
ALTER TABLE "recruiter_profiles" ADD CONSTRAINT "recruiter_profiles_recruiterId_fkey" FOREIGN KEY ("recruiterId") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recruiter_profiles" ADD CONSTRAINT "recruiter_profiles_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "company"("company_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidate_profiles" ADD CONSTRAINT "candidate_profiles_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "applications" ADD CONSTRAINT "applications_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "applications" ADD CONSTRAINT "applications_advertisementId_fkey" FOREIGN KEY ("advertisementId") REFERENCES "advertisements"("advertisement_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "advertisements" ADD CONSTRAINT "advertisements_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "company"("company_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "advertisements" ADD CONSTRAINT "advertisements_recruiterId_fkey" FOREIGN KEY ("recruiterId") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
