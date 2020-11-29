import React, { useEffect, useState } from "react";
import "./Home.css";
import Post from "../PostContainer/Post/Post";
import PostContainer from "../PostContainer/PostContainer";
import db from "../../firebase";
import { Link } from "react-router-dom";
import StickyTop from "../../StinckyTop/StickyTop";
import FeedWrapper from "../FeedWrapper";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    db.firestore()
      .collection("posts")
      .orderBy("time", "desc")
      .onSnapshot((snapshot) => {
        setPosts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        console.log(snapshot.docs);
      });
    // const fetchData = async ()=>{
    //   const data =await db.firestore().collection('posts').orderBy('time','desc').get();
    //     data.forEach(doc=>console.log(doc.id))

    //   setPosts(data.docs.map(doc=>({...doc.data(),id:doc.id})))
    // };

    // fetchData();
  }, []);

  return (
    <FeedWrapper>
      <StickyTop header={"Home"}/>
        

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
    </FeedWrapper>
  );
};

export default Home;
