import { DashboardOverview } from '@/components/features/talentAtlas/DashboardOverview';
import { Auth0Provider } from '@auth0/nextjs-auth0/client';

export default function DashboardPage() {

  return (
    <Auth0Provider >
      <DashboardOverview />
    </Auth0Provider>
  )

}
