import React from 'react';

const ResultDisplay = ({ result }) => {
  return (
    <div>
      <h3>Result</h3>
      {result ? <pre>{JSON.stringify(result, null, 2)}</pre> : <p>No result yet.</p>}
    </div>
  );
};

export default ResultDisplay;

