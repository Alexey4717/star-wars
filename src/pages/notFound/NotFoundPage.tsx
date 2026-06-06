import { Button, Result } from 'antd';

interface NotFoundPageProps {
  onGoHome?: () => void;
}

export const NotFoundPage = ({ onGoHome }: NotFoundPageProps) => (
  <Result
    status="404"
    title="Страница не найдена"
    subTitle="Запрошенный адрес не существует."
    extra={
      onGoHome ? (
        <Button type="primary" onClick={onGoHome}>
          На главную
        </Button>
      ) : undefined
    }
  />
);
