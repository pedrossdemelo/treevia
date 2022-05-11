import React from "react";
import { useSelector } from "react-redux";
import md5 from "crypto-js/md5";
import { useHistory } from "react-router-dom";

export function Header() {
  const name = useSelector(state => state.player.name);
  const gravatarEmail = useSelector(state => state.player.gravatarEmail);
  const highScore = useSelector(state => state.player.highScore);
  const hashedImageUrl = md5(gravatarEmail).toString();
  const history = useHistory();

  return (
    <header className="bg-bgcolor2 m-4 py-2 gap-8 px-4 h-14 rounded-xl flex items-center justify-between overflow-hidden">
      <h1 className="text-xl text-center shrink-0">High score: {highScore}</h1>
      <div className="flex justify-end gap-4 grow items-center">
        <h1 className="text-xl shrink line-clamp-1 overflow-ellipsis">{name}</h1>
        <img
          src={`https://www.gravatar.com/avatar/${hashedImageUrl}`}
          alt={name}
          className="rounded-full h-10 shrink-0"
          onClick={() => history.push("/settings")}
        />
      </div>
    </header>
  );
}

export default Header;
