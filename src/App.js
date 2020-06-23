import React, { useState } from "react";

import api from './services/api'

import "./styles.css";
import { useEffect } from "react";

function App() {

  const [repositories, setRepositories] = useState([]);
  
  useEffect(()=>{
      api.get("repositories").then(response => {
          setRepositories(response.data);
      })
  },[])

  async function handleAddRepository() {
    const response = await api.post("repositories",{
        "title": `Repo teste ${Date.now()}`,
        "url": "http://github.com/pauloabq/teste1", 
        "techs": ["B","TypeScript", "C"]
    })
    const repository = response.data;
    setRepositories([...repositories, repository])
  }

  async function handleRemoveRepository(id) {
    const newRepos = [...repositories]
    const indexRepo = newRepos.findIndex(repo => repo.id === id)
    try{
        await api.delete(`repositories/${id}`)
        newRepos.splice(indexRepo, 1);
        setRepositories(newRepos)
    } catch(error) {
        console.log('error')
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
        <li key={repository.id}>
          {repository.title}

          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
