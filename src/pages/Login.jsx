import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken, setName, setEmail } from "../store/actions";
import { getToken } from "../utils";
import * as Icons from "phosphor-react";

function Login() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [state, setState] = useState({
    name: "",
    email: "",
  });
  const { name, email } = state;

  async function handlePlay() {
    const newToken = await getToken();
    if (!newToken) return;
    dispatch(setToken(newToken));
    history.push("/game");
    dispatch(setName(name));
    dispatch(setEmail(email));
  }

  function handleChange(e) {
    const { value, name: key } = e.target;
    setState({ ...state, [key]: value });
  }

  return (
    <div className="flex flex-col items-center p-4 rounded-xl gap-4 mx-4 mt-[min(10vh,100px)]">
      <div className="flex justify-center gap-4">
        <Icons.Tree weight="fill" size="50px" color="#84cc16" />
        <h1
          className="text-6xl font-bold bg-clip-text bg-gradient-to-r
        text-transparent from-lime-500 to-green-500"
        >
          Treevia
        </h1>
      </div>

      <p className="text-lg text-center leading-tight font-medium opacity-70 mb-4">
        The trivia game with more than{" "}
        <span className="bg-clip-text bg-gradient-to-r text-transparent font-title from-lime-500 to-green-500 font-bold text-xl">
          tree thousand
        </span>{" "}
        verified questions
      </p>

      <input
        name="name"
        placeholder="Choose a nickname"
        value={name}
        onChange={handleChange}
        className="px-5 h-16 rounded-lg w-[min(360px,80vw)]"
      />
      <input
        name="email"
        placeholder="Email"
        value={email}
        onChange={handleChange}
        className="px-5 h-16 rounded-lg w-[min(360px,80vw)]"
      />
      <button
        onClick={handlePlay}
        // email regex
        disabled={
          !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) ||
          name.length < 3
        }
        type="button"
        className="px-5 h-16 flex items-center justify-between rounded-lg
        w-[min(360px,80vw)] text-left bg-gradient-to-r from-lime-500
        to-green-500 font-bold text-white text-lg disabled:bg-gray-200/50
        disabled:text-gray-300 disabled:[background-image:none] tracking-wide"
      >
        <span>Play</span>
        <Icons.ArrowRight weight="bold" size="24px" className="ml-2" />
      </button>
    </div>
  );
}

export default Login;
