import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    red: string;
    black: {
      darker: string;
      lighter: string;
    };
    white: {
      lighter: string;
      darker: string;
    };
    green: string;
  }
}
