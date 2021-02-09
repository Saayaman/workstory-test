import React, { useState, Fragment } from 'react';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';


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


  const handleChange = (e, name) => {
    updateFormData({
      ...formData,
      [!e.target.name ? name : e.target.name]: e.target.value.trim()
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
        <div className={styles.formColumn} key={form.title}>
          <h3>{form.title}</h3>
          {form.fields.map(field => {
            return field.type === "dropdown" ? (

            <FormControl key={field.label}>
              <InputLabel>{field.label}</InputLabel>
              <Select
                value={formData[field.name]}
                onChange={(e) => handleChange(e, field.name)}
              >
                {field.options.map(option => 
                  <MenuItem value={option}>{option}</MenuItem>
                )}
              </Select>
            </FormControl>
            ) : (
            <TextField
              key={field.label}
              label={field.label}
              type={field.type}
              name={field.name}
              onChange={handleChange}
            />
            )
          }
          )}
        </div>
      )}
      <Button variant="contained" color="primary" type="submit">Submit</Button>
    </form >
  );
};

export default Form