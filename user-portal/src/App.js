import React, { useState, useEffect } from 'react';
import './App.css';
import Form from './Form'
import formSchema from './validation/formSchema'
import axios from 'axios'
import * as yup from 'yup'
 


const initialValues = {
  email: '',
  name: '',
  password: '',
  terms: false
}

const initialErrors = {
  email: '',
  name: '',
  password: '',
}

const initialUsers = [{
  name: 'violeta',
  email: 'violeta@dimov.com',
  password: 'helloworld',
  terms:true
}]

const initDisabled = true



function App() {

  //States//
  const [users, setUsers] = useState(initialUsers)
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState(initialErrors)
  const [disabled, setDisabled] = useState(initDisabled)
  //const [acceptdTerms, setAcceptedTerms] = useState(false)
  //console.log(values.email)
  //Networking//

  // const getUsers = () => {
  //   axios.get('https://reqres.in/api/users')
  //     .then(res => {
  //       console.log(res.data)
  //       setUsers(res.data)
  //     })
  //     .catch(err => {
  //       debugger
  //     })
  // }

  const postUsers = () => {
    axios.post('https://reqres.in/api/users', values)
      .then(res => {
        setUsers([...users, res.data])
        setValues(initialValues)
      })
      .catch(err => {
        debugger
      })
      
  }

  //Action//

  const inputChange = (name, value) => {
    yup
      .reach(formSchema, name)
      .validate(value)
      .then(valid => {
        setErrors({
          ...errors,
          [name]: "",
        })
      })
      .catch(err => {
        setErrors({
          ...errors,
          [name]: err.errors[0],
        })
      })
      setValues({
        ...values, [name]: value
      })
  }

  const checkboxChange = (name, isChecked) => {
    setValues({
      ...values,
        [name]: isChecked,
      
    })
  }

  
  const onSubmit = () => {
    const newUsers = {
      email: values.email,
      name: values.name,
      password: values.password,
      terms: values.terms
    } 
    //debugger
    postUsers(newUsers)
    console.log(values.email)
  }

  useEffect(() => {
    formSchema.isValid(values)
      .then(valid => {
        setDisabled(!valid)
      })
  }, [values])
  
  console.log(users.terms);
  return (
    <div className="App">
      <header><h1>Users</h1></header>
      <Form
        values={values}
        inputChange={inputChange}
        checkboxChange={checkboxChange}
        submit={onSubmit}
        //disabled={disabled}
        errors={errors}
      />
      {
        <div className='user'>
            <pre>{JSON.stringify(users, null, 2)}</pre>
        </div>
        
        // users.map(user => {
        //   return (
        //     <div className='user'>
        //       <h2>{user.name}</h2>
        //       <p>Email: {user.email}</p>
        //       <p>Accepted the terms of service : {user.terms}</p>
        //     </div>
        //   )
        // })
      }
      
    </div>
  );
}

export default App;
