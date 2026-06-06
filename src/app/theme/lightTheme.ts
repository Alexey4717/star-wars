import type { ThemeConfig } from 'antd';
import { theme } from 'antd';

import { fontHeading, palette } from './palette';

export const lightTheme: ThemeConfig = {
  cssVar: {},
  hashed: false,
  algorithm: theme.defaultAlgorithm,
  token: {
    colorPrimary: palette.light.lightsaberBlue,
    colorBgLayout: palette.light.space,
    colorBgContainer: palette.light.panel,
    colorBgElevated: palette.light.panel,
    colorBorder: palette.light.panelBorder,
    colorText: palette.light.textPrimary,
    colorTextSecondary: palette.light.textSecondary,
    borderRadius: 8,
    borderRadiusLG: 12,
    fontSize: 14,
    fontFamily: 'system-ui, "Segoe UI", Roboto, sans-serif',
    boxShadowSecondary: '0 4px 12px rgba(13, 17, 23, 0.06)',
    colorCrawlGold: palette.light.crawlGold,
    fontFamilyHeading: fontHeading,
  },
  components: {
    Layout: {
      siderBg: palette.light.panel,
      headerBg: palette.light.panel,
      bodyBg: palette.light.space,
    },
    Menu: {
      activeBarBorderWidth: 0,
      itemBorderRadius: 8,
      groupTitleColor: palette.light.textSecondary,
      itemSelectedBg: palette.light.hologramGlow,
    },
    Card: {
      paddingLG: 20,
    },
    Segmented: {
      trackBg: '#EEF2F7',
    },
  },
};
