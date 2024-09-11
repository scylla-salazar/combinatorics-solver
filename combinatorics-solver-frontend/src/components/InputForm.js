import React, { useState } from 'react';

const InputForm = ({ problem, onSubmit }) => {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!problem) return <p>Please select a problem.</p>;

  return (
    <form onSubmit={handleSubmit}>
      <h3>Input for {problem}</h3>

      {/* Render inputs based on the selected problem */}
      {problem === 'tsp' && (
        <>
          <label>Cities (in coordinates):</label>
          <input type="text" name="cities" onChange={handleChange} />
        </>
      )}
      {problem === 'knapsack' && (
        <>
          <label>Items (weights & values):</label>
          <input type="text" name="items" onChange={handleChange} />
          <label>Capacity:</label>
          <input type="text" name="capacity" onChange={handleChange} />
        </>
      )}
      {/* Add similar inputs for other problems here */}

      <button type="submit">Submit</button>
    </form>
  );
};

export default InputForm;

