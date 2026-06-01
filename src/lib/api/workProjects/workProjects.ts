import { createClient } from '@/lib/supabase/server';
import { getSupabaseStatic } from '@/lib/supabase/static';
import { logPostgrestError } from '@/lib/api/apiUtils/apiUtils';
import { QueryData } from '@supabase/supabase-js';

export async function getAllWorkProjects() {
  const supabase = await createClient();

  const query = supabase
    .from('work_projects')
    .select('*')
    .order('display_order', { ascending: true });

  type WorkProjectsType = QueryData<typeof query>;
  const { data: projects, error } = await query;

  if (error) {
    logPostgrestError('Error fetching work projects:', error);
    return [] as WorkProjectsType;
  }

  return (projects ?? []) as WorkProjectsType;
}

export async function getAllWorkProjectSlugs() {
  const { data, error } = await getSupabaseStatic()
    .from('work_projects')
    .select('slug')
    .order('display_order', { ascending: true });

  if (error) {
    logPostgrestError('Error fetching work project slugs:', error);
    return [];
  }

  return data ?? [];
}

export async function getWorkProjectBySlug(slug: string) {
  const supabase = await createClient();

  const query = supabase
    .from('work_projects')
    .select('*, decisions:work_decisions(*), articles:work_articles(*)')
    .eq('slug', slug)
    .single();

  type WorkProjectType = QueryData<typeof query>;
  const { data: project, error } = await query;

  if (error) {
    logPostgrestError(`Error fetching work project with slug ${slug}:`, error);
    return null;
  }

  return project as WorkProjectType;
}
