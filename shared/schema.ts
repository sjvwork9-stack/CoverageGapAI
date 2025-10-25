import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, boolean, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const policyAnalyses = pgTable("policy_analyses", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  propertyAddress: text("property_address").notNull(),
  propertyType: text("property_type").notNull(),
  constructionYear: integer("construction_year").notNull(),
  squareFootage: integer("square_footage").notNull(),
  replacementCost: decimal("replacement_cost", { precision: 12, scale: 2 }).notNull(),
  dwellingCoverage: decimal("dwelling_coverage", { precision: 12, scale: 2 }).notNull(),
  personalPropertyCoverage: decimal("personal_property_coverage", { precision: 12, scale: 2 }).notNull(),
  liabilityCoverage: decimal("liability_coverage", { precision: 12, scale: 2 }).notNull(),
  deductible: decimal("deductible", { precision: 10, scale: 2 }).notNull(),
  lossOfUseCoverage: decimal("loss_of_use_coverage", { precision: 12, scale: 2 }).notNull(),
  hasFloodCoverage: boolean("has_flood_coverage").notNull().default(false),
  hasEarthquakeCoverage: boolean("has_earthquake_coverage").notNull().default(false),
  claimsLast5Years: integer("claims_last_5_years").notNull().default(0),
  hasMortgage: boolean("has_mortgage").notNull().default(false),
  overallScore: integer("overall_score").notNull(),
  riskLevel: text("risk_level").notNull(),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const insertPolicyAnalysisSchema = createInsertSchema(policyAnalyses).omit({
  id: true,
  createdAt: true,
});

export type InsertPolicyAnalysis = z.infer<typeof insertPolicyAnalysisSchema>;
export type PolicyAnalysis = typeof policyAnalyses.$inferSelect;
