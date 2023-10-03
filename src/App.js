import { Route, Routes } from "react-router";
import { Nav } from "./components/nav";
import { Dex } from "./pages/dex";
import "./App.scss";
import React from "react";
const App = () => {
  const routes = [{ path: "/", element: <Dex /> }];

  return (
    <>
      <Routes>
        {routes.map((route, key) => (
          <Route path={route.path} element={route.element} key={key} />
        ))}
      </Routes>
    </>
  );
};
export default App;
