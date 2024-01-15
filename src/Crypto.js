import React, { useState, useEffect } from "react";
import { Card, Input, Select } from "antd";

function Crypto() {
    const apiUrl = "https://api.coingecko.com/api/v3/exchange_rates";

    const defaultOne = "Bitcoin";
    const defaultTwo = "Ether";

    const [inputValue, setInputValue] = useState('0');
    const [result, setResult] = useState('0');
    const [rates, setRates] = useState([]);
    const [selectOne, setSelectOne] = useState(defaultOne);
    const [selectTwo, setSelectTwo] = useState(defaultTwo);

    useEffect(()=>{
      handleApiCall();
    },[]);
    
    async function handleApiCall(){
      const response = await fetch(apiUrl);
      const jsonData = await response.json();
      const data = Object.entries(jsonData.rates);
      const tempArray = data.map((item)=>{
        return {
          value: item[1].name,
          label: item[1].name,
          rate: item[1].value,
        }
      })
      setRates(tempArray);
    }

    useEffect(()=>{

      if(rates.length == 0) return;

      const firstObj = rates.find((item)=>{
        return item.value === selectOne
      }) 
      const secondObj = rates.find((item)=>{
        return item.value === selectTwo
      }) 
      const temp = (inputValue * secondObj.rate)/firstObj.rate;
      setResult(temp.toFixed(6));

    },[inputValue,selectOne,selectTwo])

    return (
        <div className="container">
            <Card
                style={{
                    width: 500,
                }}
            >
              <h1 style={{marginBottom:'20px'}}>Crypto Converter</h1>
                <Input
                    defaultValue={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <div className="select-box-wrapper">
                    <Select
                        defaultValue={defaultOne}
                        className="select-box"
                        onChange={(value) => setSelectOne(value)}
                        options={rates}
                    />
                    <Select
                        defaultValue={defaultTwo}
                        className="select-box"
                        onChange={(value) => setSelectTwo(value)}
                        options={rates}
                    />
                </div>
                <h3>
                    {inputValue} {selectOne} = {result} {selectTwo}
                </h3>
            </Card>
        </div>
    );
}

export default Crypto;
