import { ArrowDown, ArrowRight, CaretDown, SignOut } from "phosphor-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout, restartGame, setCategory } from "../store/actions";

function Settings() {
  const history = useHistory();
  const dispatch = useDispatch();
  const category = useSelector(state => state.player.category);

  return (
    <div className="w-[clamp(320px,90vw,600px)] mx-4">
      <h1 className="text-[clamp(30px,6vw,60px)] text-center">Settings</h1>
      <label
        htmlFor="trivia_category"
        className="text-lg block mb-2 font-medium text-center opacity-75"
      >
        Trivia category:{" "}
      </label>
      <div className="relative mb-4">
        <select
          onChange={e => dispatch(setCategory(e.target.value))}
          value={category}
          name="trivia_category"
          className="h-20 bg-bgcolor2 text-lg px-5 appearance-none rounded-lg w-full cursor-pointer font-medium"
        >
          <option value="any">Any Category</option>
          <option value="9">General Knowledge</option>
          <option value="10">Entertainment: Books</option>
          <option value="11">Entertainment: Film</option>
          <option value="12">Entertainment: Music</option>
          <option value="13">Entertainment: Musicals & Theatres</option>
          <option value="14">Entertainment: Television</option>
          <option value="15">Entertainment: Video Games</option>
          <option value="16">Entertainment: Board Games</option>
          <option value="17">Science & Nature</option>
          <option value="18">Science: Computers</option>
          <option value="19">Science: Mathematics</option>
          <option value="20">Mythology</option>
          <option value="21">Sports</option>
          <option value="22">Geography</option>
          <option value="23">History</option>
          <option value="24">Politics</option>
          <option value="25">Art</option>
          <option value="26">Celebrities</option>
          <option value="27">Animals</option>
          <option value="28">Vehicles</option>
          <option value="29">Entertainment: Comics</option>
          <option value="30">Science: Gadgets</option>
          <option value="31">Entertainment: Japanese Anime & Manga</option>
          <option value="32">Entertainment: Cartoon & Animations</option>
        </select>
        <CaretDown
          className="absolute text-txtcolor right-5 my-auto top-1/2 -translate-y-1/2 z-99"
          size="24px"
          weight="bold"
        />
      </div>

      <button
        className="h-20 w-full px-5 text-lg tracking-wide font-bold text-white rounded-lg
        bg-gradient-to-r from-lime-500 to-green-500 flex justify-between items-center"
        type="button"
        onClick={() => history.push("/game") || dispatch(restartGame())}
      >
        <span>Play</span>

        <ArrowRight weight="bold" size="24px" />
      </button>

      <div className="h-[2px] rounded w-full dark:bg-neutral-800 bg-stone-200 my-4" />

      <button
        className="h-20 flex items-center justify-between w-full px-5 font-xl
        font-bold text-white text-lg tracking-wide rounded-lg bg-red-600"
        type="button"
        onClick={() => dispatch(logout()) || history.push("/")}
      >
        <span>Logout</span>

        <SignOut weight="fill" size="24px" color="#fff" />
      </button>
    </div>
  );
}

export default Settings;
