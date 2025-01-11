import { useState, useEffect } from 'react'
import './App.css'
import {ItemsResult} from './types'

interface Item {
  id: number;
  name: string;
}

function App() {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    async function fetchItems() {
      try {
        const response = await fetch('/api/items');
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        const data: ItemsResult = await response.json();
        setItems([{id:1,name:data.message}]);
      } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
      }
    }

    fetchItems();
  }, []);

  return (
    <>
      <div className="top-bar">
        <img src="/path/to/logo.svg" alt="Logo" className="logo" />
        <h1 className="app-name">Remainer</h1>
        <div className="login-options">
          <button className="login-button">Login</button>
          <button className="login-button">Register</button>
        </div>
      </div>
      <h1>Items List</h1>
      <ul>
        {items.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </>
  )
}

export default App
