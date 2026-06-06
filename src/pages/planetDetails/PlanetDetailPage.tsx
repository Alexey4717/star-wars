import { Page } from '@/common/ui/Page/Page';

interface PlanetDetailPageProps {
  planetId: string;
}

export const PlanetDetailPage = ({ planetId }: PlanetDetailPageProps) => (
  <Page title={`Планета ${planetId}`}>Детали планеты {planetId}</Page>
);
