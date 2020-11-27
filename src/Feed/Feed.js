import React, { useEffect, useState } from "react";
import "./Feed.css";
import Post from "./PostContainer/Post/Post";
import PostContainer from "./PostContainer/PostContainer";
import db from "../firebase";


function Feed() {
  const [posts, setPosts] = useState([]);

  
  useEffect(() => {
    db.firestore().collection("posts").orderBy('time','desc').onSnapshot((snapshot) =>{
      setPosts(snapshot.docs.map((doc) =>({...doc.data(),id:doc.id})))
      console.log(snapshot.docs)
    }
    );
    // const fetchData = async ()=>{
    //   const data =await db.firestore().collection('posts').orderBy('time','desc').get();
    //     data.forEach(doc=>console.log(doc.id))

    //   setPosts(data.docs.map(doc=>({...doc.data(),id:doc.id})))
    // };

    // fetchData();

  }, []);

  return (
    <div className="feed " id="scroll--style">
      <div className="feed--header">
        <h2>Home</h2>
      </div>
      <PostContainer />
        {posts.map((post) => (
          <Post
            displayName={post.displayName}
            userName={post.userName}
            time={post.time}
            verified={post.verified}
            text={post.text}
            image={post.image}
            avatar={post.avatar}
            post={post}
          />
        ))}

    </div>
  );
}

export default Feed;
