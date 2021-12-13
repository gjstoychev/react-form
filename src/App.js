import './App.css'
import React, { useState } from 'react'

function App() {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    inputColor: '',
    buttonColor: '',
    buttonLabel: 'Submit'
  })

  const updateInput = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }

  const changeBorderStyle = () => {
    const inputColor = `#${getRandomInt(100000, 999999)}`;

    setUser({
      ...user,
      inputColor
    })
  }

  const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min

  const onSubmit = () => {
    setUser({
      ...user,
      buttonColor: '',
      buttonLabel: 'Loading...'
    })

    const query = {
      first_name: user.firstName,
      last_name: user.lastName,
      email: user.email
    }

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({query})
    }

    fetch('https://reqres.in/api/posts', requestOptions) // fetch('https://localhost:4000/api/user', requestOptions)
      .then(res => {
        setUser({
          ...user,
          buttonColor: '#3CB371',
          buttonLabel: 'Success'
        })
        return res
      })
      .catch(err => {
        setUser({
          ...user,
          buttonColor: '#FA8072',
          buttonLabel: 'Error'
        })
        return err
      })
    }

  const inputStyle = {
    border: `2px solid ${user.inputColor}`
  }

  const buttonStyle = {
    backgroundColor: user.buttonColor
  }

  return (
    <div className="app-container">
      <div>
        <input 
          type="text"
          name="firstName"
          placeholder="First Name"
          style={inputStyle}
          onChange={updateInput}
          onBlur={changeBorderStyle}
        />
      </div>

      <div>
        <input 
          type="text"
          name="lastName"
          placeholder="Last Name"
          style={inputStyle}
          onChange={updateInput}
          onBlur={changeBorderStyle}
        />
      </div>

      <div>
        <input 
          type="email"
          name="email"
          placeholder="Email"
          className="input-item"
          style={inputStyle}
          onChange={updateInput}
          onBlur={changeBorderStyle}
        />
      </div>

      <button
        style={buttonStyle}
        onClick={onSubmit}
      >
        {user.buttonLabel}
      </button>
    </div>
  )
}

export default App
