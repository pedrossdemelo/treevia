import React from "react";
import { useSelector } from "react-redux";
import md5 from "crypto-js/md5";

export function Header() {
  const name = useSelector(state => state.player.name);
  const gravatarEmail = useSelector(state => state.player.gravatarEmail);
  const score = useSelector(state => state.player.score);
  const hashedImageUrl = md5(gravatarEmail).toString();

  return (
    <header className="bg-bgcolor2 m-4 py-2 px-4 h-14 rounded-xl flex items-center justify-between overflow-hidden">
      <h1 className="text-xl text-center">Score: {score}</h1>
      <div className="flex justify-end gap-4 items-center">
        <h1 className="text-xl">{name}</h1>
        <img
          src={`https://www.gravatar.com/avatar/${hashedImageUrl}`}
          alt={name}
          className="rounded-full h-10"
        />
      </div>
    </header>
  );
}

export default Header;
