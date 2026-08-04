import { ROLES } from '@/lib/auth0/roles';
import { withAuth } from '@/lib/auth0/withAuth';
import { createAdminClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';

export const POST = withAuth([ROLES.ADMIN], async (req: NextRequest) => {
  const supabase = createAdminClient();

  const form = await req.formData();
  const file = form.get('file') as File | null;
  const title = form.get('title') as string;
  const description = form.get('description') as string | null;
  const locationCity = form.get('location_city') as string | null;
  const locationCountry = form.get('location_country') as string | null;
  const displayOrder = Number(form.get('display_order') ?? 1);
  const published = form.get('published') === 'true';
  const categoryId = form.get('category_id') as string;
  const subcategoryId = form.get('subcategory_id') as string;

  if (!file || !title || !categoryId || !subcategoryId) {
    return NextResponse.json(
      { error: 'Missing required field' },
      { status: 400 },
    );
  }

  const { data: sub, error: subError } = await supabase
    .from('subcategories')
    .select('name, category:categories(name)')
    .eq('id', subcategoryId)
    .single();

  if (subError || !sub) {
    return NextResponse.json(
      { error: 'Subcategory not found' },
      { status: 400 },
    );
  }
  // convert the uploaded file into raw binary data
  // Buffer.form - wraps that into a Node.js Buffer which will be accepted by Sharp & upabase.storage.upload()
  const buffer = Buffer.from(await file.arrayBuffer());

  // Sharp - Read dimensions from file
  const { width = 0, height = 0 } = await sharp(buffer).metadata();
  const aspectRatio = width && height ? width / height : 1.5;

  const ext = file.type.split('/')[1];
  const filePath = `${sub.category.name}/${sub.name}/${sub.category.name}-${sub.name}-${crypto.randomUUID()}.${ext}`;
  const storagePath = `creative-vision-pics/${filePath}`;

  // Upload to Storage (bucket takes path without bucket prefix)
  const { error: uploadError } = await supabase.storage
    .from('creative-vision-pics')
    .upload(filePath, buffer, {
      contentType: file.type,
      upsert: false,
    });

  if (uploadError) {
    return NextResponse.json({ error: uploadError.message }, { status: 500 });
  }

  // Insert DB row
  const { data, error: insertError } = await supabase
    .from('photos')
    .insert({
      title,
      description: description || null,
      storage_path: storagePath,
      subcategory_id: subcategoryId,
      display_order: displayOrder,
      published,
      location_city: locationCity || null,
      location_country: locationCountry || null,
      width,
      height,
      aspect_ratio: aspectRatio,
    })
    .select()
    .single();

  if (insertError) {
    await supabase.storage.from('creative-vision-pics').remove([filePath]);
    return NextResponse.json({ error: insertError.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
});
