import { Page } from '@/common/ui/Page/Page';

interface VehicleDetailPageProps {
  vehicleId: string;
}

export const VehicleDetailPage = ({ vehicleId }: VehicleDetailPageProps) => (
  <Page title={`Транспортное средство ${vehicleId}`}>
    Детали транспортного средства {vehicleId}
  </Page>
);
