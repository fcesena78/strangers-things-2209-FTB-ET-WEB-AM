import React  from "react";
import { Link } from "react-router-dom";

const Posts = (props) => {
    const posts = props.posts;
    const token = window.localStorage.getItem("token")

    
    console.log(posts)
    return (
        <div>
            {
            token ?
            <Link to='/create-post'>Create Post</Link>
                : null
            }
            {posts.length ? 
           posts.map (post =>{
            console.log(post)
            return (
                <div key={post._id} className={'singlePost'}>
                    
                    <h1>{post.title}</h1>
                    <h2>{post.price}</h2>
                    <h3>{post.description}</h3>
                    <h4>{post.location}</h4>
                    <h5>will deliver:{post.willDeliver ? 'yes': 'no'}</h5>
                </div>
            )
           })
        : null
        }
        </div>
    )
}

export default Posts