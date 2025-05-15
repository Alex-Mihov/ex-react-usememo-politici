import { useEffect, useMemo, useState, memo } from 'react'

import './App.css'

function App() {
  // Stato per memorizzare l'array dei politici
  const [politicians, setPoliticians] = useState([])
  // Stato per memorizzare il testo di ricerca
  const [search, setSearch] = useState("")

  // Componente card del politico ottimizzato con memo
  const PoliticianCard = memo(({ politician }) => {
    // Log per debug che mostra quando il componente viene renderizzato
    console.log(`render: ${politician.name}`);

    // Rendering della card del politico
    return (
      <div className="politician-card">
        <h4 className="politician-name">{politician.name}</h4>
        <img src={politician.image} alt={politician.name} className="politician-image" />
        <h5 className="politician-position">{politician.position}</h5>
        <p className="politician-biography">{politician.biography}</p>
      </div>
    )
  })

  // Effect hook per recuperare i dati dei politici all'avvio
  useEffect(() => {
    // Funzione asincrona per chiamare l'API
    async function fetchPoliticians() {
      try {
        // Chiamata GET all'endpoint
        const response = await fetch('http://localhost:5000/politicians');
        // Conversione della risposta in JSON
        const data = await response.json();
        // Aggiornamento dello stato con i dati ricevuti
        setPoliticians(data);
      } catch (error) {
        // Gestione degli errori
        console.error(error);
      }
    }

    // Chiamata della funzione
    fetchPoliticians();
  }, []); // Array vuoto indica che l'effect viene eseguito solo al mount

  // Memo hook per memorizzare i politici filtrati
  const filteredPoliticians = useMemo(() => {
    // Filtra i politici in base al testo di ricerca
    return politicians.filter(p =>
      (p.name + ' ' + p.biography).toLowerCase().includes(search.toLowerCase())
    )
  }, [politicians, search]) // Ricalcola solo quando cambiano politicians o search

  // Rendering del componente
  return (
    <div>
      {/* Input per la ricerca */}
      <input type="text"
        placeholder='Cerca per nome o biografia'
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      {/* Lista delle card dei politici */}
      <div className="politicians-list">
        {filteredPoliticians.map(p => <PoliticianCard key={p.id} politician={p} />)}
      </div>
    </div>
  )
}

export default App
