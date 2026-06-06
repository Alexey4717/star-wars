import { type ErrorComponentProps, isNotFound } from '@tanstack/react-router';
import { Button, Result } from 'antd';
import type { ResultStatusType } from 'antd/es/result';

import { SwapiHttpError } from '../../api/SwapiHttpError';

interface RouteErrorOptions {
  notFoundTitle?: string;
  status?: ResultStatusType;
}

interface RouteErrorProps extends ErrorComponentProps {
  entity: string;
  notFoundTitle?: string;
  status?: ResultStatusType;
}

const RetryButton = ({ reset }: Pick<ErrorComponentProps, 'reset'>) =>
  reset ? (
    <Button type="primary" onClick={reset}>
      Попробовать снова
    </Button>
  ) : null;

export const RouteError = ({
  error,
  reset,
  entity,
  notFoundTitle,
  status = 'error',
}: RouteErrorProps) => {
  if (isNotFound(error)) {
    return (
      <Result
        status="404"
        title={notFoundTitle ?? 'Запись не найдена'}
        subTitle={typeof error.data === 'string' ? error.data : undefined}
        extra={<RetryButton reset={reset} />}
      />
    );
  }

  if (error instanceof SwapiHttpError && error.status === 404) {
    return (
      <Result
        status="404"
        title={notFoundTitle ?? 'Запись не найдена'}
        subTitle={error.message}
        extra={<RetryButton reset={reset} />}
      />
    );
  }

  return (
    <Result
      status={status}
      title={`Не удалось загрузить ${entity}`}
      subTitle={error.message}
      extra={<RetryButton reset={reset} />}
    />
  );
};

export const createRouteError = (entity: string, options?: RouteErrorOptions) => {
  const RouteErrorComponent = (props: ErrorComponentProps) => (
    <RouteError
      entity={entity}
      notFoundTitle={options?.notFoundTitle}
      status={options?.status}
      {...props}
    />
  );

  return RouteErrorComponent;
};

/** Fallback для defaultErrorComponent в router.ts */
export const ErrorBoundary = createRouteError('страницу', {
  notFoundTitle: 'Страница не найдена',
});
