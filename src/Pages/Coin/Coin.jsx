import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CoinContext } from '../../Context/CoinContext';
import LineChart from '../../Components/LineChart/LineChart';

const Coin = () => {

  const {coinId} = useParams();

  const {currency} = useContext(CoinContext);

  const [coinData, setCoinData] = useState();
  const [historicalData, setHistoricalData] = useState();

  const fetchCoinData = async () => {
    const options = {
      method: 'GET',
      headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-kQ1ZwQmfUf8QtzBUKhxS8TEi'}
    };
    
    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options)
      .then(res => res.json())
      .then(res => setCoinData(res))
      .catch(err => console.error(err));
  }

  const fetchHistoricalData = async () => {
    const options = {
      method: 'GET',
      headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-kQ1ZwQmfUf8QtzBUKhxS8TEi'}
    };
    
    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency}&days=10&interval=daily`, options)
      .then(res => res.json())
      .then(res => setHistoricalData(res))
      .catch(err => console.error(err));
  }

  useEffect(()=> {
    fetchCoinData();
    fetchHistoricalData();
  },[currency])


  if(coinData, historicalData){
    return (
      <div className='py-0 px-20px'>
          <div className="flex flex-col items-center gap-5 my-25 mx-auto mb-12">
            <img src={coinData.image.large} alt="" className='max-w-25' />
            <p className='text-11 font-medium'><b className='text-11 font-medium'>{coinData.name} ({coinData.symbol.toUpperCase()})</b></p>
          </div>
          <div className="max-w-[600px] h-62 m-auto">
            <LineChart historicalData={historicalData} />
          </div>

          <div className="max-w-[600px] my-12 mx-auto flex flex-col coin-info">
            <ul>
              <li>Crypto Market Rank</li>
              <ul>{coinData.market_cap_rank}</ul>
            </ul>
            <ul>
              <li>Current Price</li>
              <ul>{currency.symbol} {coinData.market_data.current_price[currency.name].toLocaleString()}</ul>
            </ul>
            <ul>
              <li>Market Cap</li>
              <ul>{currency.symbol} {coinData.market_data.market_cap[currency.name].toLocaleString()}</ul>
            </ul>
            <ul>
              <li>24 Hour high</li>
              <ul>{currency.symbol} {coinData.market_data.high_24h[currency.name].toLocaleString()}</ul>
            </ul>
            <ul>
              <li>24 Hour Low</li>
              <ul>{currency.symbol} {coinData.market_data.low_24h[currency.name].toLocaleString()}</ul>
            </ul>
          </div>
      </div>
    )
  }else{
    return (
      <div className='grid place-self-center min-h-[80vh]'>
          <div className="w-16 h-16 place-self-center border-5 border-[#bdbdbd] border-t-[#4500c6] rounded-full spin">

          </div>
      </div>
    )
  }
}

export default Coin