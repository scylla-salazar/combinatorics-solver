// GraphColoringComponent.jsx
import React, { useState } from 'react';
import axios from 'axios';

const GraphColoringComponent = () => {
  const [graph, setGraph] = useState({ A: ['B', 'C'], B: ['A'], C: ['A'] });
  const [node, setNode] = useState('');
  const [neighbors, setNeighbors] = useState('');

  const handleAddNode = () => {
    setGraph({ ...graph, [node]: neighbors.split(',').map(n => n.trim()) });
    setNode('');
    setNeighbors('');
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('https://combinatorics-solver.onrender.com/graph_coloring', { graph });
      console.log('Color Assignment:', response.data.color_assignment);
    } catch (error) {
      console.error('Error solving Graph Coloring problem', error);
    }
  };

  return (
    <div>
      <h2>Graph Coloring Problem</h2>
      <input
        type="text"
        placeholder="Node"
        value={node}
        onChange={(e) => setNode(e.target.value)}
      />
      <input
        type="text"
        placeholder="Neighbors (comma-separated)"
        value={neighbors}
        onChange={(e) => setNeighbors(e.target.value)}
      />
      <button onClick={handleAddNode}>Add Node</button>
      <pre>{JSON.stringify(graph, null, 2)}</pre>
      <button onClick={handleSubmit}>Solve Graph Coloring</button>
    </div>
  );
};

export default GraphColoringComponent;

