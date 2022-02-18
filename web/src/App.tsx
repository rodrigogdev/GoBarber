/* eslint-disable react/jsx-no-constructed-context-values */
import React from "react";
import { BrowserRouter } from "react-router-dom";

import AppProvider from "./hooks";

import GlobalStyle from "./styles/global";

import { Routers } from "./routes";

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routers />
      </AppProvider>

      <GlobalStyle />
    </BrowserRouter>
  );
}

export default App;
