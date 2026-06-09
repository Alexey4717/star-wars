import { Result } from 'antd';

interface PageEmptyStateProps {
  entity: string;
  subTitle?: string;
}

export const PageEmptyState = ({ entity, subTitle }: PageEmptyStateProps) => (
  <Result status="info" title="Нет данных" subTitle={subTitle ?? `${entity} не найден`} />
);
