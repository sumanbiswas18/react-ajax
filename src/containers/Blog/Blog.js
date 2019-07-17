import React, { Component } from "react";

import axios from "axios";

import Post from "../../components/Post/Post";
import FullPost from "../../components/FullPost/FullPost";
import NewPost from "../../components/NewPost/NewPost";
import "./Blog.css";

class Blog extends Component {
  state = {
    posts: [],
    selectedPost: null,
    error: false
  };
  componentDidMount() {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then(response => {
        const postsControl = response.data.slice(0, 3);
        const updatePosts = postsControl.map(post => {
          return {
            ...post,
            author: "sanu"
          };
        });
        this.setState({ posts: updatePosts });
      })
      .catch(error => {
        this.setState({ error: true });
        console.log(this.state.error);
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
          <Post
            key={post.id}
            title={post.title}
            author={post.author}
            clicked={() => this.selectPost(post.id)}
          />
        );
      });
    }

    return (
      <div>
        <section className="Posts">{posts}</section>
        <section>
          <FullPost id={this.state.selectedPost} />
        </section>
        <section>
          <NewPost />
        </section>
      </div>
    );
  }
}

export default Blog;
