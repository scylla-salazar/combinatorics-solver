import React from 'react';

const problems = [
  { value: 'tsp', label: 'Traveling Salesman Problem' },
  { value: 'knapsack', label: 'Knapsack Problem' },
  { value: 'graph-coloring', label: 'Graph Coloring Problem' },
  { value: 'hamiltonian-cycle', label: 'Hamiltonian Cycle Problem' },
  { value: 'bin-packing', label: 'Bin Packing Problem' },
  { value: 'partitions', label: 'Partitions Problem' },
];

function ProblemSelection({ onSelectProblem }) {
  const handleChange = (e) => {
    onSelectProblem(e.target.value);
  };

  return (
    <div>
      <h2>Select a problem</h2>
      <select onChange={handleChange}>
        <option value="">-- Select Problem --</option>
        {problems.map((problem) => (
          <option key={problem.value} value={problem.value}>
            {problem.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default ProblemSelection;

