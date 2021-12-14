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

    const apiUrl = 'http://localhost:4000/api/user'

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        first_name: user.firstName,
        last_name: user.lastName,
        email: user.email
      })
    }

    fetch(apiUrl, requestOptions)
      .then(res => {
        if (res.status === 200) {
          setUser({
            ...user,
            buttonColor: '#3CB371',
            buttonLabel: 'OK'
          })
        }

        if (res.status >= 400) {
          setUser({
            ...user,
            buttonColor: '#FA8072',
            buttonLabel: 'Error'
          })
        }
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
