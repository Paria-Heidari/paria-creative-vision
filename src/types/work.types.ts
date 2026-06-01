import type { Database } from '@/types/database.types';

type Tables = Database['public']['Tables'];

export type WorkProjectRow = Tables['work_projects']['Row'];
export type WorkDecisionRow = Tables['work_decisions']['Row'];
export type WorkArticleRow = Tables['work_articles']['Row'];

export type WorkProject = WorkProjectRow & {
  decisions?: WorkDecisionRow[];
  articles?: WorkArticleRow[];
};
