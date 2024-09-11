import React, { useState } from 'react';
import ProblemSelection from './components/ProblemSelection';
import InputForm from './components/InputForm';
import ResultDisplay from './components/ResultDisplay';

function App() {
  const [selectedProblem, setSelectedProblem] = useState('');
  const [result, setResult] = useState(null);

  const handleSelectProblem = (problem) => {
    setSelectedProblem(problem);
    setResult(null); // Clear previous result when a new problem is selected
  };

  const handleSubmit = async (formData) => {
    try {
      const response = await fetch(`http://localhost:5000/${selectedProblem}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>Combinatorics Solver</h1>
      <ProblemSelection onSelectProblem={handleSelectProblem} />
      <InputForm problem={selectedProblem} onSubmit={handleSubmit} />
      <ResultDisplay result={result} />
    </div>
  );
}

export default App;

