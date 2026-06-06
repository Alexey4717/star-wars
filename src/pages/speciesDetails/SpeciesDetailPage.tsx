import { Page } from '@/common/ui/Page/Page';

interface SpeciesDetailPageProps {
  speciesId: string;
}

export const SpeciesDetailPage = ({ speciesId }: SpeciesDetailPageProps) => (
  <Page title={`Вид ${speciesId}`}>Детали вида {speciesId}</Page>
);
