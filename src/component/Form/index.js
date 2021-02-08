import React, { useState } from 'react';

const snakeToCamel = (str) => str.replace(
  /([-_][a-z])/g,
  (group) => group.toUpperCase().replace('_', '')
);

const renameKey = (obj, oldKey, newKey) => {    
  Object.defineProperty(obj, newKey, Object.getOwnPropertyDescriptor(obj, oldKey)); 
  delete obj[oldKey]; 
  return obj;
}

const Form = ({ mockData = {}}) => {
  const [formData, updateFormData] = useState({});


  const handleChange = (e) => {

    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim()
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    let newObj = {}

    for ( var property in formData) {
      const changedName = snakeToCamel(property)
      if(changedName !== property) {
        newObj = renameKey(formData, property, changedName)
      }
    }

    console.log(newObj);
    
  };

  if(mockData === null) {
    return <div>Loading...</div>
  }

  return (
    <form onSubmit={handleSubmit} method="post">
      {mockData.questions.map(form => 
        <>
          <h3>{form.title}</h3>
          {form.fields.map(field => {
            return field.type === "dropdown" ? (
            <label>
              {field.label}
              <select name={field.name} defaultValue="" onChange={handleChange} required>
                <option value="" selected disabled hidden>Choose here</option>
                {field.options.map(option =>
                  <option value={option}>{option}</option>
                )}
              </select>
            </label>
            ) : (
            <label>
              {field.label}
              <input name={field.name} type={field.type} onChange={handleChange} />
            </label>
            )
          }
          )}
        </>
      )}
      <button type="submit">Submit</button>
    </form >
  );
};

export default Form