import React, { Component } from "react";
import axios from "axios";
import Post from "../../../components/Post/Post";
import "./Posts.css";
import { Link } from "react-router-dom";
class Posts extends Component {
  state = {
    posts: []
  };
  componentDidMount() {
    axios
      .get("/posts")
      .then(response => {
        const postsControl = response.data.slice(0, 6);
        const updatePosts = postsControl.map(post => {
          return {
            ...post,
            author: "sanu"
          };
        });
        this.setState({ posts: updatePosts });
      })
      .catch(error => {
        // this.setState({ error: true });
        // console.log(this.state.error);
        console.log(error);
      });
  }

  selectPost = id => {
    this.setState({ selectedPost: id });
  };

  render() {
    let posts = (
      <p style={{ textAlign: "center", color: "red" }}>
        Something went wrong !!
      </p>
    );
    if (!this.state.error) {
      posts = this.state.posts.map(post => {
        return (
          <Link to={"/" + post.id} key={post.id}>
            <Post
              title={post.title}
              author={post.author}
              clicked={() => this.selectPost(post.id)}
            />
          </Link>
        );
      });
    }
    return <section className="Posts">{posts}</section>;
  }
}

export default Posts;
