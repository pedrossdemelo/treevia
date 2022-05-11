import React, { useEffect, useRef, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { Login, Game, Settings, Feedback } from "./pages";
import { Header } from "./components";
import renderWithHeader from "./utils/renderWithHeader";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { toggleTheme } from "./utils";
import * as Icons from "phosphor-react";

export default function App() {
  const { pathname } = useLocation();
  const { name, gravatarEmail } = useSelector(state => state.player);
  const loggedIn = Boolean(name && gravatarEmail);

  return (
    <>
      {renderWithHeader(pathname) && <Header />}

      <main className="max-w-2xl pb-20 mx-auto grow">
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

      <ThemeButton />
    </>
  );
}

function ThemeButton() {
  const isDark = document.documentElement.classList.contains("dark");

  const [currTheme, setCurrTheme] = useState(isDark ? "dark" : "light");

  const [icon, setIcon] = useState(isDark ? "MoonStars" : "SunDim");

  useEffect(() => {
    setIcon(currTheme === "dark" ? "MoonStars" : "SunDim");
  }, [currTheme]);

  const Icon = Icons[icon];

  return (
    <button
      className="fixed bottom-4 right-4 bg-bgcolor p-2 rounded-full flex items-center justify-center"
      onClick={() =>
        toggleTheme() || setCurrTheme(currTheme === "dark" ? "light" : "dark")
      }
    >
      <Icon size="24" weight="bold" />
    </button>
  );
}
