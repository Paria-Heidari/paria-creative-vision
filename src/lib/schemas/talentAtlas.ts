import { z } from 'zod';

export const CreateCandidateSchema = z.object({
  full_name: z.string().min(1, 'Full name is required'),
  email: z.email('Invalid email address'),
  campaign_id: z.string().min(1, 'Campaign is required'),
});

export type CreateCandidateInput = z.infer<typeof CreateCandidateSchema>;

export const UpdateCandidateStageSchema = z.object({
  stage: z.enum(['applied', 'screening', 'interview', 'hired', 'on_hold']),
});

export type UpdateCandidateStageInput = z.infer<
  typeof UpdateCandidateStageSchema
>;

export const CreateCampaignSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  status: z.enum(['active', 'draft']),
  partner_company: z.string().min(1).nullable().optional(),
});

export type CreateCampaignInput = z.infer<typeof CreateCampaignSchema>;
