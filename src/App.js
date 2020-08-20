import React, { useState, useEffect } from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data)
    })
  }, [])

  async function handleAddRepository() {

    const response = await api.post('/repositories', {
      title: `Desafio ReactJS ${Date.now()}`,
      url: "https://github.com/josepholiveira",
      techs: ["React", "Node.js"],
    });

    const repositorie = response.data;

    setRepositories([...repositories, repositorie]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);
    setRepositories(repositories.filter(repository => repository.id !== id));
  }
  /**
   * <button onClick={() => handleRemoveRepository(repositorie.id)}>
                Remover
              </button>
   */
  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repositorie => (
          <li key={repositorie.id}>
            {repositorie.title}
            <button onClick={() => handleRemoveRepository(repositorie.id)}>
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
