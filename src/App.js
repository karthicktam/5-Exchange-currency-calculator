// API used https://www.exchangerate-api.com/ -->
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExchangeAlt } from "@fortawesome/free-solid-svg-icons";
import "./styles.css";

const currenyArr = [
  "AED",
  "ARS",
  "AUD",
  "BGN",
  "BRL",
  "BSD",
  "CAD",
  "CHF",
  "CLP",
  "CNY",
  "COP",
  "CZK",
  "DKK",
  "DOP",
  "EGP",
  "EUR",
  "FJD",
  "GBP",
  "GTQ",
  "HKD",
  "HRK",
  "HUF",
  "IDR",
  "ILS",
  "INR",
  "ISK",
  "JPY",
  "KRW",
  "KZT",
  "MXN",
  "MYR",
  "NOK",
  "NZD",
  "PAB",
  "PEN",
  "PHP",
  "PKR",
  "PLN",
  "PYG",
  "RON",
  "RUB",
  "SAR",
  "SEK",
  "SGD",
  "THB",
  "TRY",
  "TWD",
  "UAH",
  "USD",
  "UYU",
  "VND",
  "ZAR"
];

const Select = (props) => {
  const {
    currencyArr,
    selectedOption,
    handleChange,
    enteredValue,
    handleInput,
    readOnly
  } = props;

  return (
    <div className="currency">
      <select value={selectedOption} onChange={handleChange}>
        {currencyArr.map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>
      <input
        type="number"
        placeholder="0"
        value={enteredValue}
        onChange={handleInput}
        readOnly={readOnly}
      />
    </div>
  );
};

export default function App() {
  const [selectedOption, setSelected] = useState("AED");
  const [enteredValue, setEntered] = useState(1);
  const [selectedCurrent, setCurrency] = useState("1 EUR = 1.184192 USD");
  const [oppositeOption, setOption] = useState("EUR");
  const [findedValue, setFinded] = useState(0.23);

  const calculate = (selected, opposite, entered) => {
    fetch(`https://api.exchangerate-api.com/v4/latest/${selected}`)
      .then((res) => res.json())
      .then((res) => {
        const rate = res.rates[opposite];
        setCurrency(`1 ${selected} = ${rate} ${opposite}`);
        setFinded((entered * rate).toFixed(2));
      });
  };

  const handleChange = (e) => {
    setSelected(e.target.value);
  };

  const handleInput = (e) => {
    setEntered(e.target.value);
  };

  const handleOppositeChange = (e) => {
    setOption(e.target.value);
  };

  const xchangeHandler = () => {
    const selected = selectedOption;
    const opposite = oppositeOption;

    setSelected(opposite);
    setOption(selected);

    calculate(opposite, selected, enteredValue);
  };

  useEffect(() => {
    calculate(selectedOption, oppositeOption, enteredValue);
  }, [enteredValue, oppositeOption, selectedOption]);

  return (
    <div className="container">
      <Select
        currencyArr={currenyArr}
        readOnly={false}
        handleChange={handleChange}
        selectedOption={selectedOption}
        enteredValue={enteredValue}
        handleInput={handleInput}
      />
      <div className="middle">
        <button onClick={xchangeHandler}>
          <FontAwesomeIcon className="icon" icon={faExchangeAlt} />
        </button>
        <div className="rate">{selectedCurrent}</div>
      </div>
      <Select
        currencyArr={currenyArr}
        readOnly={true}
        handleChange={handleOppositeChange}
        selectedOption={oppositeOption}
        enteredValue={findedValue}
        handleInput={(e) => {
          setEntered(e.target.value);
          calculate(selectedOption, oppositeOption, enteredValue);
        }}
      />
    </div>
  );
}
