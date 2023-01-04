import ReactDOM from 'react-dom/client';
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, json, Navigate} from 'react-router-dom';
import {default as Posts } from './Posts.js'
import {default as Login } from './Login.js'
import {default as Register } from './Register.js'
import {default as CreatePost } from './CreatePost.js'



const App = ()=> {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({});
  const token = window.localStorage.getItem("token")
  

const getPosts = async() => {
  await fetch('https://strangers-things.herokuapp.com/api/2209-ftb-et-web-am/posts')
    .then(response => {
      return response.json();
    })
    .then( json => setPosts(json.data.posts))
    .catch(error => console.error (error))

}
  const tokenLogin = async(token) => {
    
    await fetch('https://strangers-things.herokuapp.com/api/2209-ftb-et-web-am/users/me', {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
}).then(response => response.json())
  .then(result => {
      const user = result.data;
      console.log(user);
        setUser(user)
  })
  .catch(console.error);
  }
  useEffect(()=> {
    getPosts ()
    if(token){
   tokenLogin (token)
    }
  }, [])
  return (
    <div>
      <h1>Stranger Things</h1>
      <nav>
        <Link to='/posts'>Posts ({posts.length})</Link>
        <Link to='/login'>Login</Link>
        <Link to='/register'>Register</Link>
      </nav>
      <Routes>
        <Route exact path = '/' element = {<Navigate to = '/login'/>} />
        <Route path='/posts' element= { <Posts posts={posts} getPosts={getPosts} />  }/> 
        <Route path='/login' element={ <Login user={user}  setUser={setUser} tokenLogin={tokenLogin}/>} /> 
        <Route path='/register' element={ <Register tokenLogin={tokenLogin}/>} /> 
        <Route path='/create-post' element={ <CreatePost/>} />
      </Routes> 
    </div>

  );
};
const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(<HashRouter><App /></HashRouter>);
