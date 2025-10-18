-- DropForeignKey
ALTER TABLE "public"."advertisements" DROP CONSTRAINT "advertisements_companyId_fkey";

-- DropForeignKey
ALTER TABLE "public"."advertisements" DROP CONSTRAINT "advertisements_recruiterId_fkey";

-- DropForeignKey
ALTER TABLE "public"."applications" DROP CONSTRAINT "applications_advertisementId_fkey";

-- DropForeignKey
ALTER TABLE "public"."applications" DROP CONSTRAINT "applications_candidateId_fkey";

-- DropForeignKey
ALTER TABLE "public"."candidate_profiles" DROP CONSTRAINT "candidate_profiles_candidateId_fkey";

-- DropForeignKey
ALTER TABLE "public"."recruiter_profiles" DROP CONSTRAINT "recruiter_profiles_companyId_fkey";

-- DropForeignKey
ALTER TABLE "public"."recruiter_profiles" DROP CONSTRAINT "recruiter_profiles_recruiterId_fkey";

-- AddForeignKey
ALTER TABLE "recruiter_profiles" ADD CONSTRAINT "recruiter_profiles_recruiterId_fkey" FOREIGN KEY ("recruiterId") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recruiter_profiles" ADD CONSTRAINT "recruiter_profiles_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "company"("company_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidate_profiles" ADD CONSTRAINT "candidate_profiles_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "applications" ADD CONSTRAINT "applications_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "applications" ADD CONSTRAINT "applications_advertisementId_fkey" FOREIGN KEY ("advertisementId") REFERENCES "advertisements"("advertisement_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "advertisements" ADD CONSTRAINT "advertisements_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "company"("company_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "advertisements" ADD CONSTRAINT "advertisements_recruiterId_fkey" FOREIGN KEY ("recruiterId") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
