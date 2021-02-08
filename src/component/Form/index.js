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

const Form = () => {
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
      console.log( snakeToCamel(property) ); 
      newObj = renameKey(formData, property, snakeToCamel(property))
    }

    console.log(newObj);
    
  };

  return (
    <form onSubmit={handleSubmit} method="post">
      <h3>Tell us about yourself</h3>
      <label>
        First Name
        <input name="first_name" type="text" onChange={handleChange} />
      </label>
      <br />
      <label>
        Last Name
        <input name="last_name" type="text" onChange={handleChange} />
      </label>

      <label>
        Email
      <input name="email" type="text" onChange={handleChange} /></label>
      <label>Phone Number<input name="phone_number" type="text" onChange={handleChange} /></label>

      <br />
      
      <h3>Where do you live</h3>
      <label>
        Street Address
        <input name="street_address" type="text" onChange={handleChange} />
      </label>
      <label>
        Post Code
        <input name="post_code" type="text" onChange={handleChange} />
      </label>
      <label>
        Country
        <select name="country" defaultValue="" onChange={handleChange} required>
          <option value="" selected disabled hidden>Choose here</option>
          <option value="Canada">Canada</option>
          <option value="Usa">USA</option>
        </select>
      </label>
      <button type="submit">Submit</button>
    </form >
  );
};

export default Form