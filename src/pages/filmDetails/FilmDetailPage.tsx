import { Page } from '@/common/ui/Page/Page';

interface FilmDetailPageProps {
  filmId: string;
}

export const FilmDetailPage = ({ filmId }: FilmDetailPageProps) => (
  <Page title={`Фильм ${filmId}`}>Детали фильма {filmId}</Page>
);
