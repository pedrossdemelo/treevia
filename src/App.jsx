import React from "react";
import { Route, Switch } from "react-router-dom";
import { Login, Game, Settings, Feedback } from "./pages";
import { Header } from "./components";
import renderWithHeader from "./utils/renderWithHeader";
import { useLocation } from "react-router-dom";

export default function App() {
  const { pathname } = useLocation();

  return (
    <>
      {renderWithHeader(pathname) && <Header />}

      <main className="max-w-2xl mb-4 mx-auto grow">
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/game">
            <Game />
          </Route>
          <Route path="/settings">
            <Settings />
          </Route>
          <Route path="/feedback">
            <Feedback />
          </Route>
        </Switch>
      </main>
    </>
  );
}
