import React from 'react'

function Form(props) {
    const { values, submit, inputChange, checkboxChange, errors } = props

    const onSubmit = evt => {
        evt.preventDefault();
        submit()
    }

    const onCheckboxChange = evt => {
        const { name, checked } = evt.target
        checkboxChange(name, checked)
    }

    const onInputChange = evt => {
        const { name, value } = evt.target
        inputChange(name, value)
    }
    return (
      <form className='form-container' onSubmit={onSubmit}>
        <div className="form">
            <h3>Add a User</h3>
            <div className='errors'>
                <div>{errors.email}</div>
                <div>{errors.name}</div>
                <div>{errors.password}</div>
            </div>
            <div className='form-input'>
                <label>Email:&nbsp;
                    <input
                        value={values.email}
                        onChange={onInputChange}
                        name='email'
                        type='email'
                    />
                </label>
                <label>Name:&nbsp;
                    <input
                        value={values.name}
                        onChange={onInputChange}
                        name='name'
                        type='text'
                    />
                </label>
                <label>password:&nbsp;
                    <input
                        value={values.password}
                        onChange={onInputChange}
                        name='password'
                        type='password'
                    />
                </label>
                <label>
                    <input
                        //value='check'
                        onChange={onCheckboxChange}
                        name='terms'
                        type='checkbox'
                        checked={values.terms}
                    />
                    I accept the terms of service
                </label>
            </div>
            <button>submit</button>
        
        </div>
      </form>
    );
  }
  
  export default Form;