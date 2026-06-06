import 'antd/es/theme/interface';

interface AppCustomToken {
  colorCrawlGold: string;
  fontFamilyHeading: string;
}

declare module 'antd/es/theme/interface' {
  interface AliasToken extends AppCustomToken {}
}
