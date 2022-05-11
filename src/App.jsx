import { useSelector } from "react-redux";
import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import { Header, ThemeButton } from "./components";
import { Feedback, Game, Login, Settings } from "./pages";
import renderWithHeader from "./utils/renderWithHeader";

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
