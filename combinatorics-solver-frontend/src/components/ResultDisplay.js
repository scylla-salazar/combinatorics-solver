import React from 'react';

function ResultDisplay({ result }) {
  return (
    <div>
      <h2>Result</h2>
      <pre>{JSON.stringify(result, null, 2)}</pre>
    </div>
  );
}

export default ResultDisplay;

