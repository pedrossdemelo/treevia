import React from 'react';
import { useSelector } from 'react-redux';
import md5 from 'crypto-js/md5';

export function Header() {
  const name = useSelector((state) => state.player.name);
  const gravatarEmail = useSelector((state) => state.player.gravatarEmail);
  const score = useSelector((state) => state.player.score);
  const hashGerada = md5(gravatarEmail).toString();

  return (
    <header>
      <img
        src={ `https://www.gravatar.com/avatar/${hashGerada}` }
        alt={ name }
      />
      <span>{name}</span>
      <span>{score}</span>
    </header>
  );
}

export default Header;
