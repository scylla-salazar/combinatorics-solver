// HamiltonianCycleComponent.jsx
import React, { useState } from 'react';
import axios from 'axios';

const HamiltonianCycleComponent = () => {
  const [matrix, setMatrix] = useState([[0, 1, 0], [1, 0, 1], [0, 1, 0]]);

  const handleChange = (rowIndex, colIndex, value) => {
    const newMatrix = [...matrix];
    newMatrix[rowIndex][colIndex] = value;
    setMatrix(newMatrix);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('https://combinatorics-solver.onrender.com/hamiltonian_cycle', { graph: matrix });
      console.log('Cycle:', response.data.cycle);
    } catch (error) {
      console.error('Error solving Hamiltonian Cycle problem', error);
    }
  };

  return (
    <div>
      <h2>Hamiltonian Cycle Problem</h2>
      {matrix.map((row, rowIndex) => (
        <div key={rowIndex}>
          {row.map((col, colIndex) => (
            <input
              key={colIndex}
              type="number"
              value={col}
              onChange={(e) => handleChange(rowIndex, colIndex, parseInt(e.target.value))}
            />
          ))}
        </div>
      ))}
      <button onClick={handleSubmit}>Solve Hamiltonian Cycle</button>
    </div>
  );
};

export default HamiltonianCycleComponent;

