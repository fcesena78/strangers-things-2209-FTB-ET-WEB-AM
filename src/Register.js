import React, {useState} from "react";

const Register = (props) => {
const [username, setUsername]  = useState ("")  
const [password, setPassword]  = useState ("")
const {tokenLogin, } = props
const registerUser = (user, pass) => {
    fetch('https://strangers-things.herokuapp.com/api/2209-ftb-et-web-am/users/register', {
  method: "POST",
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    user: {
      username: username,
      password: password
    }
  })
}).then(response => response.json())
  .then(result => {
    console.log(result);
    const token = result.data.token
   window.localStorage.setItem("token", token)
    return token
  })
  .then(token => tokenLogin(token))
  .catch(console.error);
}
return (
<div>
<form onSubmit={ev => {
    ev.preventDefault()
    registerUser(username, password)
}}>
    <input 
    placeholder="username..."
    value={username}
    onChange={ev => setUsername (ev.target.value)}
    />
    <input 
    placeholder="password..." 
    type="password"
    value={password}
    onChange={ev => setPassword (ev.target.value)}
    />
    <button>Register</button>
</form>
</div>
)
}

export default Register