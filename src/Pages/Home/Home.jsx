import React, { useContext, useEffect, useState } from 'react'
import { CoinContext } from '../../Context/CoinContext';
import { Link } from 'react-router-dom';

const Home = () => {

    const {allCoin, currency} = useContext(CoinContext);  
    const [displayCoin, setDisplayCoin] = useState([]);

    const [input, setInput] = useState("");

    const inputHandler = (e) => {
        setInput(e.target.value);
        if(e.target.value===''){
            setDisplayCoin(allCoin);
        }
    }

    const searchHandler = async (e) => {
        e.preventDefault();
        const coins = await allCoin.filter((item) => {
            return item.name.toLowerCase().includes(input.toLowerCase());
        })
        setDisplayCoin(coins);
    }

    useEffect(() => {
        setDisplayCoin(allCoin);
    }, [allCoin])

  return (
    <div className='py-0 px-2.5 pb-25'>
        <div className='max-w-xl my-20 mx-auto flex flex-col items-center text-center gap-7'>
            <h1 className='text-[max(4vw,36px)] font-bold'>Largest <br /> Crypto Marketplace</h1>
            <p className='w-[75%] text-[#e3e3e3] line-clamp-2'>Welcome to the worlds' largest cryptocurrency marketplace. Sign up to explore more about cryptos.</p>
            <form onSubmit={searchHandler} className='p-2 w-[80%] bg-white rounded text-[20px] flex justify-between items-center gap-2.5'>
                <input onChange={inputHandler} value={input} list='coingecko' className='text-black flex-1 text-base outline-none pl-2.5 w-25 sm:w-full' type="text" placeholder='Search crypto..'  required/>
                <datalist id='coingecko'>
                    {allCoin.map((item, index)=> (<option key={index} value={item.name} />))}
                </datalist>
                <button type='submit' className='border-0 bg-[#7927ff] text-white text-base py-2.5 px-7 rounded cursor-pointer'>Search</button>
            </form>
        </div>
        {/* Crypto Table */}
        <div className="max-w-[800px] m-auto bg-[linear-gradient(rgba(84,3,255,0.15),rgba(105,2,153,0.15))] rounded-2xl">
            <div className="grid grid-cols-[0.5fr_minmax(0,3fr)_minmax(0,1fr)_minmax(0,1fr)] md:grid-cols-[0.5fr_minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.5fr)]  py-4 px-5 items-center border-1 border-b-[#3c3c3c] text-[13px] sm:text-base">
                <p>#</p>
                <p>Coins</p>
                <p>Price</p>
                <p className='text-center'>24H Change</p>
                <p className='text-right hidden md:block'>Market Cap</p>
            </div>
            {
                displayCoin.slice(0,10).map((item, index)=>(
                    <Link to={`/coin/${item.id}`} key={index} className="grid grid-cols-[0.5fr_minmax(0,3fr)_minmax(0,1fr)_minmax(0,1fr)] md:grid-cols-[0.5fr_minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.5fr)]  py-4 px-5 items-center border-1 border-b-[#3c3c3c] text-[13px] sm:text-base ">
                        <p>{item.market_cap_rank}</p>
                        <div className='flex items-center gap-2.5'>
                            <img src={item.image} alt="" className='w-6 sm:w-9' />
                            <p>{item.name + " - " + item.symbol}</p>
                        </div>
                        <p>{currency.symbol} {item.current_price.toLocaleString()}</p>
                        <p className={`text-center ${item.price_change_percentage_24h>0?"text-[#00D515]":"text-[#ff4646]"}`}>{Math.floor(item.price_change_percentage_24h*100)/100}</p>
                        <p className='text-right hidden md:block'>{currency.symbol} {item.market_cap.toLocaleString()}</p>
                    </Link>
                ))
            }
        </div>
    </div>
  )
}

// CG-kQ1ZwQmfUf8QtzBUKhxS8TEi
export default Home