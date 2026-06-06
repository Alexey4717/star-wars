import {
  BugOutlined,
  CarOutlined,
  GlobalOutlined,
  RocketOutlined,
  TeamOutlined,
  TruckOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Badge } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

function menuLabel(label: string, badge?: number) {
  if (!badge) {
    return label;
  }

  return (
    <span
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
      }}
    >
      <span>{label}</span>
      <Badge count={badge} size="small" color="blue" showZero />
    </span>
  );
}

export const navItems: MenuItem[] = [
  {
    key: '/characters',
    icon: <TeamOutlined />,
    label: menuLabel('Персонажи', 82),
  },
  {
    key: '/films',
    icon: <VideoCameraOutlined />,
    label: menuLabel('Фильмы', 6),
    disabled: true,
  },
  {
    key: '/planets',
    icon: <GlobalOutlined />,
    label: 'Планеты',
    disabled: true,
  },
  {
    key: '/species',
    icon: <BugOutlined />,
    label: 'Виды',
    disabled: true,
  },
  {
    key: '/starships',
    icon: <RocketOutlined />,
    label: 'Звездолёты',
    disabled: true,
  },
  {
    key: '/transports',
    icon: <TruckOutlined />,
    label: 'Транспорт',
    disabled: true,
  },
  {
    key: '/vehicles',
    icon: <CarOutlined />,
    label: 'Транспортные средства',
    disabled: true,
  },
];
