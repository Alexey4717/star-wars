interface RoutePendingProps {
  entity: string;
}

export const RoutePending = ({ entity }: RoutePendingProps) => (
  <p aria-live="polite">Загрузка {entity}...</p>
);

export const createRoutePending = (entity: string) => {
  const RoutePendingComponent = () => <RoutePending entity={entity} />;

  return RoutePendingComponent;
};
