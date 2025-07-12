import { useState, useEffect } from 'react'
import './App.css'
const API_KEY = import.meta.env.VITE_APP_API_KEY
import CoinInfo from "./Components/CoinInfo"
import SideNav from "./Components/SideNav"

function App() {
  const [list, setList] = useState(null)
  const [filteredResults, setFilteredResults] = useState([])
  const [searchInput, setSearchInput] = useState("")

  useEffect(() => {
    const fetchAllCoinData = async () => {
      const response = await fetch(
        "https://min-api.cryptocompare.com/data/all/coinlist?&api_key=" + API_KEY
      )
      const json = await response.json()
      setList(json)
    }

    fetchAllCoinData().catch(console.error)
  }, [])

  const searchItems = searchValue => {
    setSearchInput(searchValue)
    if (searchValue !== "") {
      const filteredData = Object.keys(list.Data).filter((item) => 
        Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      )
      setFilteredResults(filteredData)
    } else {
      setFilteredResults(Object.keys(list.Data))
    }
  }

  return (
    <>
      <SideNav />
      <div className="whole-page">
        <h1>My Crypto List</h1>
        <input
          type="text"
          placeholder="Search..."
          onChange={(inputString) => searchItems(inputString.target.value)}
        />
        <ul>
          {searchInput.length > 0
            ? filteredResults &&
              filteredResults
                .filter((coin) =>
                  list.Data[coin].IsTrading &&
                  list.Data[coin].Algorithm !== "N/A" &&
                  list.Data[coin].ProofType !== "N/A"
                )
                .map((coin) => (
                  <CoinInfo
                    key={coin}
                    image={list.Data[coin].ImageUrl}
                    name={list.Data[coin].FullName}
                    symbol={list.Data[coin].Symbol}
                  />
                ))
            : list &&
              Object.entries(list.Data)
                .filter(([, coinData]) =>
                  coinData.IsTrading &&
                  coinData.Algorithm !== "N/A" &&
                  coinData.ProofType !== "N/A"
                )
                .map(([coin]) => (
                  <CoinInfo
                    key={coin}
                    image={list.Data[coin].ImageUrl}
                    name={list.Data[coin].FullName}
                    symbol={list.Data[coin].Symbol}
                  />
                ))}
        </ul>
      </div>
    </>
  )
}

export default App