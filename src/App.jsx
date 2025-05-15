import { useEffect, useMemo, useState } from 'react'
import './App.css'

function App() {
  const [politicians, setPoliticians] = useState([])
  const [search, setSearch] = useState("")

  useEffect(() => {
    async function fetchPoliticians() {
      try {
        const response = await fetch('http://localhost:5000/politicians');
        const data = await response.json();
        setPoliticians(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchPoliticians();
  }, []);

  const filteredPoliticians = useMemo(() => {
    return politicians.filter(p => (p.name, p.biography).toLowerCase().includes(search.toLowerCase()))
  }, [politicians, search])

  return (
    <div>
      <input type="text"
        placeholder='Cerca per nome o biografia'
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      <div className="politicians-list">
        {
          filteredPoliticians.map(p => (
            <div key={p.id} className="politician-card">
              <h4 className="politician-name">{p.name}</h4>
              <img src={p.image} alt={p.name} className="politician-image" />
              <h5 className="politician-position">{p.position}</h5>
              <p className="politician-biography">{p.biography}</p>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default App
