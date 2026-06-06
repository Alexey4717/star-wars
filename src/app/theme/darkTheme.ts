import type { ThemeConfig } from 'antd';
import { theme } from 'antd';

import { fontHeading, palette } from './palette';

export const darkTheme: ThemeConfig = {
  cssVar: {},
  hashed: false,
  algorithm: theme.darkAlgorithm,
  token: {
    colorPrimary: palette.dark.lightsaberBlue,
    colorBgLayout: palette.dark.space,
    colorBgContainer: palette.dark.panel,
    colorBgElevated: '#1A2338',
    colorBorder: palette.dark.panelBorder,
    colorText: palette.dark.textPrimary,
    colorTextSecondary: palette.dark.textSecondary,
    borderRadius: 8,
    borderRadiusLG: 12,
    boxShadowSecondary: '0 4px 16px rgba(0, 0, 0, 0.35)',
    colorCrawlGold: palette.dark.crawlGold,
    fontFamilyHeading: fontHeading,
  },
  components: {
    Layout: {
      siderBg: palette.dark.panel,
      headerBg: palette.dark.panel,
      bodyBg: palette.dark.space,
    },
    Menu: {
      activeBarBorderWidth: 0,
      darkItemBg: 'transparent',
      itemSelectedBg: palette.dark.hologramGlow,
    },
    Card: {
      paddingLG: 20,
    },
    Segmented: {
      trackBg: '#1A2338',
    },
  },
};
