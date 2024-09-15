// KnapsackComponent.jsx
import React, { useState } from 'react';
import axios from 'axios';

const KnapsackComponent = () => {
  const [items, setItems] = useState([{ weight: '', value: '' }]);
  const [capacity, setCapacity] = useState('');

  const handleChange = (index, event) => {
    const values = [...items];
    values[index][event.target.name] = event.target.value;
    setItems(values);
  };

  const handleAddItem = () => {
    setItems([...items, { weight: '', value: '' }]);
  };

  const handleRemoveItem = (index) => {
    const values = [...items];
    values.splice(index, 1);
    setItems(values);
  };

  const handleSubmit = async () => {
    const formattedItems = items.map(item => ({
      weight: parseFloat(item.weight),
      value: parseFloat(item.value)
    }));
    try {
      const response = await axios.post('https://combinatorics-solver.onrender.com/knapsack', { items: formattedItems, capacity: parseFloat(capacity) });
      console.log('Max Value:', response.data.max_value);
    } catch (error) {
      console.error('Error solving Knapsack problem', error);
    }
  };

  return (
    <div>
      <h2>Knapsack Problem</h2>
      {items.map((item, index) => (
        <div key={index}>
          <input
            type="number"
            name="weight"
            placeholder="Weight"
            value={item.weight}
            onChange={(event) => handleChange(index, event)}
          />
          <input
            type="number"
            name="value"
            placeholder="Value"
            value={item.value}
            onChange={(event) => handleChange(index, event)}
          />
          <button onClick={() => handleRemoveItem(index)}>Remove Item</button>
        </div>
      ))}
      <button onClick={handleAddItem}>Add Item</button>
      <input
        type="number"
        placeholder="Knapsack Capacity"
        value={capacity}
        onChange={(event) => setCapacity(event.target.value)}
      />
      <button onClick={handleSubmit}>Solve Knapsack</button>
    </div>
  );
};

export default KnapsackComponent;

