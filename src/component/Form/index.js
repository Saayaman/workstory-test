import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import styles from "./Form.module.css"

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

const snakeToCamel = (str) => str.replace(
  /([-_][a-z])/g,
  (group) => group.toUpperCase().replace('_', '')
);

const renameKey = (obj, oldKey, newKey) => {    
  Object.defineProperty(obj, newKey, Object.getOwnPropertyDescriptor(obj, oldKey)); 
  delete obj[oldKey]; 
  return obj;
}

const Form = ({ mockData }) => {
  const [formData, updateFormData] = useState({});
  const classes = useStyles();


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
        <div classNames={styles.formColumn} key={form.title}>
          <h3>{form.title}</h3>
          {form.fields.map(field => {
            return field.type === "dropdown" ? (
            //   <label>
            //   {field.label}
            //   <select name={field.name} defaultValue="" onChange={handleChange} required>
            //     <option value="" selected disabled hidden>Choose here</option>
            //     {field.options.map(option =>
            //       <option value={option}>{option}</option>
            //       )}
            //   </select>
            // </label>

            <div key={field.label}>
              <InputLabel>{field.label}</InputLabel>
              <Select
                value={""}
                onChange={handleChange}
              >
                {field.options.map(option => 
                  <MenuItem value={option}>{option}</MenuItem>
                )}
              </Select>
            </div>
            ) : (
            <TextField
              key={field.label}
              label={field.label}
              type={field.type}
              name={field.name}
              onChange={handleChange}
            />
            // <label>
            //   {field.label}
            //   <input name={field.name} type={field.type} onChange={handleChange} />
            // </label>
            )
          }
          )}
        </div>
      )}
      <button type="submit">Submit</button>
    </form >
  );
};

export default Form