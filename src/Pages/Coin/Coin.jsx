import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CoinContext } from '../../Context/CoinContext';

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
    
    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency}&days=10`, options)
      .then(res => res.json())
      .then(res => setHistoricalData(res))
      .catch(err => console.error(err));
  }

  useEffect(()=> {
    fetchCoinData();
  },[currency])

  useEffect(()=> {
    fetchHistoricalData();
  }, [])

  if(coinData, historicalData){
    return (
      <div className=''>
          <div className="">
            <img src={coinData.image.large} alt="" />
            <p><b>{coinData.name} ({coinData.symbol.toUpperCase()})</b></p>
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