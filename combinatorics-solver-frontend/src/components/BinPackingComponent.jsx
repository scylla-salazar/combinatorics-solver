// BinPackingComponent.jsx
import React, { useState } from 'react';
import axios from 'axios';

const BinPackingComponent = () => {
  const [items, setItems] = useState([]);
  const [item, setItem] = useState('');
  const [binCapacity, setBinCapacity] = useState('');

  const handleAddItem = () => {
    setItems([...items, parseFloat(item)]);
    setItem('');
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('https://combinatorics-solver.onrender.com/bin_packing', { items, bin_capacity: parseFloat(binCapacity) });
      console.log('Bins:', response.data.bins);
    } catch (error) {
      console.error('Error solving Bin Packing problem', error);
    }
  };

  return (
    <div>
      <h2>Bin Packing Problem</h2>
      <input
        type="number"
        placeholder="Item size"
        value={item}
        onChange={(e) => setItem(e.target.value)}
      />
      <button onClick={handleAddItem}>Add Item</button>
      <input
        type="number"
        placeholder="Bin Capacity"
        value={binCapacity}
        onChange={(e) => setBinCapacity(e.target.value)}
      />
      <button onClick={handleSubmit}>Solve Bin Packing</button>
      <pre>{JSON.stringify(items)}</pre>
    </div>
  );
};

export default BinPackingComponent;

