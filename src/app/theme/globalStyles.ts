import { createGlobalStyle } from 'antd-style';

export const GlobalStyles = createGlobalStyle(({ theme }) => ({
  '*, *::before, *::after': {
    boxSizing: 'border-box',
  },

  html: {
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
    textRendering: 'optimizeLegibility',
  },

  body: {
    margin: 0,
    fontFamily: theme.fontFamily,
    fontSize: theme.fontSize,
    lineHeight: theme.lineHeight,
    color: theme.colorText,
    background: theme.colorBgLayout,
  },

  '#root': {
    minHeight: '100svh',
    width: '100%',
  },
}));
