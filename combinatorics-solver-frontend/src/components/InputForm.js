import React from 'react';
import TSPComponent from './TSPComponent';
import KnapsackComponent from './KnapsackComponent';
import GraphColoringComponent from './GraphColoringComponent';
import HamiltonianCycleComponent from './HamiltonianCycleComponent';
import PartitionsComponent from './PartitionsComponent';
import BinPackingComponent from './BinPackingComponent';

function InputForm({ problem, onSubmit }) {
  const handleSubmit = (data) => {
    onSubmit(data);
  };

  return (
    <div>
      <h2>Input Form</h2>
      {problem === 'tsp' && <TSPComponent onSubmit={handleSubmit} />}
      {problem === 'knapsack' && <KnapsackComponent onSubmit={handleSubmit} />}
      {problem === 'graph-coloring' && <GraphColoringComponent onSubmit={handleSubmit} />}
      {problem === 'hamiltonian-cycle' && <HamiltonianCycleComponent onSubmit={handleSubmit} />}
      {problem === 'bin-packing' && <BinPackingComponent onSubmit={handleSubmit} />}
      {problem === 'partitions' && <PartitionsComponent onSubmit={handleSubmit} />}
    </div>
  );
}

export default InputForm;

