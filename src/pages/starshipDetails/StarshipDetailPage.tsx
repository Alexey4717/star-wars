import { Page } from '@/common/ui/Page/Page';

interface StarshipDetailPageProps {
  starshipId: string;
}

export const StarshipDetailPage = ({ starshipId }: StarshipDetailPageProps) => (
  <Page title={`Звездолёт ${starshipId}`}>Детали звездолёта {starshipId}</Page>
);
