import React from "react";
import { Route, Switch } from "react-router-dom";
import { Login, Game, Settings, Feedback } from "./pages";
import { Header } from "./components";
import renderWithHeader from "./utils/renderWithHeader";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

export default function App() {
  const { pathname } = useLocation();
  const { name, gravatarEmail } = useSelector(state => state.player);
  const loggedIn = Boolean(name && gravatarEmail);

  return (
    <>
      {renderWithHeader(pathname) && <Header />}

      <main className="max-w-2xl mb-4 mx-auto grow">
        <Switch>
          <Route exact path="/">
            {loggedIn ? <Redirect to="/game" /> : <Login />}
          </Route>
          <Route path="/game">
            {loggedIn ? <Game /> : <Redirect to="/" />}
          </Route>
          <Route path="/settings">
            {loggedIn ? <Settings /> : <Redirect to="/" />}
          </Route>
          <Route path="/feedback">
            {loggedIn ? <Feedback /> : <Redirect to="/" />}
          </Route>
        </Switch>
      </main>
    </>
  );
}
