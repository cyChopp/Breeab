import React, { useEffect, useState } from "react";
import "./Feed.css";
import Post from "./Post";
import PostContainer from "./PostContainer";
import db from "./firebase";
import FlipMove from "react-flip-move";

function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    db.collection("posts").onSnapshot((snapshot) =>
      setPosts(snapshot.docs.map((doc) => doc.data()))
    );
  }, []);
  
  return (
    <div className="feed " id="scroll--style">
      <div className="feed--header">
        <h2>Home</h2>
      </div>
      <PostContainer />
      <FlipMove>
        {posts.map((post) => (
          <Post 
            key={post.text}
            displayName={post.displayName}
            userName={post.userName}
            verified={post.verified}
            text={post.text}
            image={post.image}
          />
        ))}
      </FlipMove>
    </div>
  );
}

export default Feed;
