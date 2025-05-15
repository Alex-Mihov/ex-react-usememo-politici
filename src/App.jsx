import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [politicians, setPoliticians] = useState([])

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

  return (

    <>
      <div className="politicians-list">
        {
          politicians.map(p => (
            <div key={p.id} className="politician-card">
              <h4 className="politician-name">{p.name}</h4>
              <img src={p.image} alt={p.name} className="politician-image" />
              <h5 className="politician-position">{p.position}</h5>
              <p className="politician-biography">{p.biography}</p>
            </div>
          ))
        }
      </div>
    </>




  )
}

export default App
