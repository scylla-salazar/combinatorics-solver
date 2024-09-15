// TSPComponent.jsx
import React, { useState } from 'react';
import axios from 'axios';

const TSPComponent = () => {
  const [cities, setCities] = useState([{ x: '', y: '' }]);

  const handleChange = (index, event) => {
    const values = [...cities];
    values[index][event.target.name] = event.target.value;
    setCities(values);
  };

  const handleAddCity = () => {
    setCities([...cities, { x: '', y: '' }]);
  };

  const handleRemoveCity = (index) => {
    const values = [...cities];
    values.splice(index, 1);
    setCities(values);
  };

  const handleSubmit = async () => {
    const formattedCities = cities.map(city => [parseFloat(city.x), parseFloat(city.y)]);
    try {
      const response = await axios.post('https://combinatorics-solver.onrender.com/tsp', { cities: formattedCities });
      console.log('Best Route:', response.data.best_route);
    } catch (error) {
      console.error('Error solving TSP', error);
    }
  };

  return (
    <div>
      <h2>Traveling Salesman Problem</h2>
      {cities.map((city, index) => (
        <div key={index}>
          <input
            type="number"
            name="x"
            placeholder="X-coordinate"
            value={city.x}
            onChange={(event) => handleChange(index, event)}
          />
          <input
            type="number"
            name="y"
            placeholder="Y-coordinate"
            value={city.y}
            onChange={(event) => handleChange(index, event)}
          />
          <button onClick={() => handleRemoveCity(index)}>Remove City</button>
        </div>
      ))}
      <button onClick={handleAddCity}>Add City</button>
      <button onClick={handleSubmit}>Solve TSP</button>
    </div>
  );
};

export default TSPComponent;

