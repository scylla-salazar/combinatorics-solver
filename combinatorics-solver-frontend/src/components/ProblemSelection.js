import React from 'react';

const ProblemSelection = ({ onSelectProblem }) => {
  return (
    <div>
      <h3>Select a Problem</h3>
      <select onChange={(e) => onSelectProblem(e.target.value)}>
        <option value="">--Select a Problem--</option>
        <option value="tsp">Traveling Salesman Problem</option>
        <option value="knapsack">Knapsack Problem</option>
        <option value="graph_coloring">Graph Coloring Problem</option>
        <option value="hamiltonian_cycle">Hamiltonian Cycle Problem</option>
        <option value="bin_packing">Bin Packing Problem</option>
        <option value="partitions">Partitions Problem</option>
      </select>
    </div>
  );
};

export default ProblemSelection;

