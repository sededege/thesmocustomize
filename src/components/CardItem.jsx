import { useState } from "react";
import { GiTwoCoins } from "react-icons/gi";

const CardItem = ({ item, cat, agregar }) => {
  return (
    <div
      onClick={() => {
        agregar(cat, item);
      }}
      className="shadow-xl rounded-lg p-4"
    >
    
       

        <img
          src={`http://localhost:5173/src/assets/images/${cat}/${item.id}.png`}
          alt="Background Image"
          className="rounded-t-lg"
        />
     <p className=" right-2 bg-red-500 px-4 rounded-b-lg font-regular text-[0.8rem] items-center text-white">
          {item.rarity}
        </p>
      <p className="mt-2 mb-2 text-sky-500 ">{item.name}</p>
      <div className="flex justify-between items-center">
        <p className="">Supply</p>
        <p className="mt-2 text-white-500 ">100/{item.supply}</p>
      </div>

      <div className="flex justify-between">
        <p className="">Price</p>
        <div className="flex items-center gap-2">
          <img
            className="w-4 h-4"
            src="https://cryptologos.cc/logos/solana-sol-logo.png"
          />
          <p className="">{item.price}</p>
        </div>
      </div>
      <div className="flex justify-between">
        <p className="">Points</p>
        <div className="flex items-center gap-1">
          <GiTwoCoins className="text-yellow-400" />
          <p className="">{item.points}</p>
        </div>
      </div>
    </div>
  );
};

export default CardItem;
