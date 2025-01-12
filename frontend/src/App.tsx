import { useState, useEffect } from 'react'
import './App.css'
import {ItemsResult} from './types'
import Navbar from './components/Navbar'

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
    <div id="root">
      <Navbar />
      
      <div className="container">
        <h1 className="mb-4">Items List</h1>
        <ul className="list-group">
          {items.map(item => (
            <li key={item.id} className="list-group-item">{item.name}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App
