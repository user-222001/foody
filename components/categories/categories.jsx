"use client";
import React, { useEffect, useState } from "react";
import Data from "../categories/data.cat";

function GameList({ onGamePress }) {
  const [games, setGames] = useState();

  useEffect(() => {
    setGames(Data.GameList);
  }, []);

  return (
    <div className="flex flex-wrap justify-evenly bg-slate-200 py-5  items-center mt-14 ">
      {games?.map((item) => (
        <div
          key={item.id}
          onClick={() => onGamePress(item.name)}
          className="flex flex-col 
            items-center cursor-pointer hover:bg-slate-400 px-16 rounded-md
            "
        >
          <img src={item.image} width={45} height={45} className="pb-5" />
          <h2 className="text-[14px] text-center">{item.name}</h2>
        </div>
      ))}
    </div>
  );
}

export default GameList;
