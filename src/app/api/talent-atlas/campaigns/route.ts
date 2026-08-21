import { campaignsStore } from '@/lib/store/talentAtlasStore';
import { ROLES } from '@/lib/auth0/roles';
import { withAuth } from '@/lib/auth0/withAuth';
import { CreateCampaignSchema } from '@/lib/schemas/talentAtlas';
import { NextRequest, NextResponse } from 'next/server';

const readRoles = [ROLES.ADMIN, ROLES.COORDINATOR, ROLES.COMPANY];
const writeRoles = [ROLES.ADMIN, ROLES.COORDINATOR];

const handlerGet = async () => NextResponse.json(campaignsStore);

const handlerPost = async (req: NextRequest) => {
  const parsed = CreateCampaignSchema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed', issues: parsed.error.issues },
      { status: 400 },
    );
  }

  const { title, partner_company } = parsed.data;
  const normalizedCompany = partner_company?.trim().toLowerCase() ?? null;
  const duplicate = campaignsStore.some(
    (c) =>
      c.title.toLowerCase() === title.toLowerCase() &&
      (c.partner_company?.toLowerCase() ?? null) === normalizedCompany,
  );
  if (duplicate) {
    return NextResponse.json(
      { error: 'A campaign with this name and company already exists' },
      { status: 409 },
    );
  }

  const newCampaign = {
    id: `temp-${Date.now()}`,
    applied_count: 0,
    hired_count: 0,
    partner_company: null,
    ...parsed.data,
  };
  campaignsStore.push(newCampaign);
  return NextResponse.json(newCampaign, { status: 201 });
};

export const GET = withAuth(readRoles, handlerGet);
export const POST = withAuth(writeRoles, handlerPost);
