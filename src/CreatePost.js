import React, {useState} from 'react'

const CreatePost = () => {
    const [title, setTitle]  = useState ("")
    const [description, setDescription]  = useState ("")
    const [price, setPrice]  = useState ("")
    const [location, setLocation]  = useState ("")
    const token = window.localStorage.getItem('token')
    const makePost = async() => {
await fetch('https://strangers-things.herokuapp.com/api/2209-ftb-et-web-am/posts', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      post: {
        title: title,
        description: description,
        price: price,
        location: location
      }
    })
  }).then(response => response.json())
    .then(result => {
      console.log(result);
    })
    .catch(console.error);
    }
    const handleSubmit = (ev) => {
        ev.preventDefault ()
        makePost()
    }
  return (
    <div>
        <form onSubmit={ev => handleSubmit(ev)}>
           title:
      <input
      value= {title}
      onChange={ev => setTitle(ev.target.value)}

      /> 
        description:
        <input
      value= {description}
      onChange={ev => setDescription(ev.target.value)}

      /> 
      price:
      <input
      value= {price}
      onChange={ev => setPrice(ev.target.value)}

      /> 
      location:
      <input
      value= {location}
      onChange={ev => setLocation(ev.target.value)}

      /> 
      <button>Submit</button>
        </form>
      

    </div>
  )
}

export default CreatePost
