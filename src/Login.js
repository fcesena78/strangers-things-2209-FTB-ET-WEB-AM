import React, {useState, useEffect} from "react";

const Login = (props) => {
const {user, setUser, tokenLogin} = props    
const [username, setUsername]  = useState ("")  
const [password, setPassword]  = useState ("")

const token = window.localStorage.getItem("token")

const loginUser = async() => {
    await fetch('https://strangers-things.herokuapp.com/api/2209-ftb-et-web-am/users/login', {
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
    return result;
  })
  .then(data => loggedin(data))
  .then(token => tokenLogin(token))
  .catch(console.error);
}
const loggedin = (result) => {
  if(result.success){
    const token = result.data.token
   window.localStorage.setItem("token", token)
    return token
  }  
}
const logout = ()=> {
    window.localStorage.removeItem('token');
    setUser({});
    window.location.reload(false);
  }

useEffect(() => {
   
    
}, [])
return (
   
<div>
{
token ?
<div>
<h1>Welcome {user.username}</h1>
<button onClick={ev => logout()}>Logout</button>

</div>
:<form onSubmit={ev => {
    ev.preventDefault()
    loginUser(username, password)
}}
>
    +

    +

    +-
    <input 
    placeholder="username..."
    value={username}
    onChange={ev => setUsername(ev.target.value)}
    />
    <input 
    placeholder="password..." 
    type="password"
    value={password}
    onChange={ev => setPassword(ev.target.value)}
    />
    <button>Login</button>
</form>}
</div>

)
}

export default Login