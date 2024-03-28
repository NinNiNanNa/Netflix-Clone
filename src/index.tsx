import ReactDOM from "react-dom/client";
import App from "./App";
import GlobalStyle from "./GlobalStyle";
import "./assets/fonts/font.css";
import { ThemeProvider } from "styled-components";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { theme } from "./theme";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const client = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  // <React.StrictMode>
  <QueryClientProvider client={client}>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <App />
      <ReactQueryDevtools initialIsOpen={true} />
    </ThemeProvider>
  </QueryClientProvider>
  // </React.StrictMode>
);
