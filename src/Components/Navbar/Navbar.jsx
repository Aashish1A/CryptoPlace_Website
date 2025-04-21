import React, { useContext } from "react";
import logo from "../../assets/logo.png";
import arrow from "../../assets/arrow_icon.png";
import { CoinContext } from "../../Context/CoinContext";

const Navbar = () => {

  const {setCurrency} = useContext(CoinContext);

  const currencyHandler = (e) => {
    switch (e.target.value){
      case "usd": {
        setCurrency({name: "usd", symbol: "$"});
        break;
      }
      case "inr":{
        setCurrency({name: "inr", symbol: "₹"})
        break;
      }
      case "eur":{
        setCurrency({name: "eur", symbol: "€"})
        break;
      }
      default: {
        setCurrency({name: "inr", symbol: "₹"})
        break;
      }
    }
  }

  return (
    <div className="flex items-center justify-between text-[#ddd] py-5 px-[5%] md:py-5 md:px-[10%] border-b border-[#efd4d4]">
      <img src={logo} alt="" className="max-w-[max(12vw,120px)]" />
      <ul className="md:flex space-x-6 hidden">
      <li className="border-b-2 border-transparent hover:border-white">Home</li>
        <li className="border-b-2 border-transparent hover:border-white">Features</li>
        <li className="border-b-2 border-transparent hover:border-white">Pricing</li>
        <li className="border-b-2 border-transparent hover:border-white">Blog</li>
      </ul>
      <div className="flex items-center space-x-4">
        <select onChange={currencyHandler} className="bg-transparent border-2 border-white text-white py-1 px-2 rounded">
          <option value="usd" className="bg-[#09005c] text-white">USD</option>
          <option value="inr" className="bg-[#09005c] text-white">INR</option>
          <option value="eur" className="bg-[#09005c] text-white">EUR</option>
        </select>
        <button className="flex items-center gap-2 md:gap-2.5 py-2 px-4 md:py-2.5 md:px-6 rounded-3xl font-medium text-[#393939] bg-white border-0 cursor-pointer text-[14px] md:text-base">
          Sign up <img src={arrow} alt="arrow_icon" className="w-3" />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
