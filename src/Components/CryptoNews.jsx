import { useEffect, useState } from "react"
const API_KEY = import.meta.env.VITE_APP_API_KEY

function CryptoNews() {
  const [newsList, setNewsList] = useState(null)

  useEffect(() => {
    const fetchNews = async () => {
      const response = await fetch(
        `https://min-api.cryptocompare.com/data/v2/news/?lang=EN&api_key=${API_KEY}`
      )
      const json = await response.json()
      setNewsList(json)
    }

    fetchNews().catch(console.error)
  }, [])

  return (
    <div>
      <ul>
        {newsList && newsList.Data && newsList.Data.map((news) => (
          <li key={news.id}>
            <a href={news.url} target="_blank" rel="noreferrer">
              {news.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CryptoNews 