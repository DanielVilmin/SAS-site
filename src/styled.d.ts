import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      lightGray: string;
      background: string;
      cardBg: string;
      selection: string;
      border: string;
      white: string;
    };
  }
}