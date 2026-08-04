import { ROLES } from '@/lib/auth0/roles';
import { withAuth } from '@/lib/auth0/withAuth';
import { createAdminClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export const DELETE = withAuth([ROLES.ADMIN], async (_req, ctx, _session) => {
  const { id } = await ctx.params;
  const supabase = createAdminClient();

  const { data: photo, error: fetchError } = await supabase
    .from('photos')
    .select('storage_path')
    .eq('id', id)
    .single();

  if (fetchError || !photo || !photo.storage_path) {
    return NextResponse.json({ error: 'Photo not found' }, { status: 404 });
  }

  const filePath = photo.storage_path.replace(/^creative-vision-pics\//, '');

  await supabase.storage.from('creative-vision-pics').remove([filePath]);

  const { error: deleteError } = await supabase
    .from('photos')
    .delete()
    .eq('id', id);

  if (deleteError) {
    return NextResponse.json({ error: deleteError.message }, { status: 500 });
  }

  return new NextResponse(null, { status: 204 });
});

export const PATCH = withAuth([ROLES.ADMIN], async (req, ctx, _session) => {
  const { id } = await ctx.params;
  const supabase = createAdminClient();

  const form = await req.formData();
  const title = form.get('title') as string;
  const description = form.get('description') as string | null;
  const locationCity = form.get('location_city') as string | null;
  const locationCountry = form.get('location_country') as string | null;
  const displayOrder = Number(form.get('display_order') ?? 1);
  const published = form.get('published') === 'true';
  const subcategoryId = form.get('subcategory_id') as string | null;

  if (!title) {
    return NextResponse.json({ error: 'Title is required' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('photos')
    .update({
      title,
      description: description || null,
      location_city: locationCity || null,
      location_country: locationCountry || null,
      display_order: displayOrder,
      published,
      ...(subcategoryId ? { subcategory_id: subcategoryId } : {}),
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
});
