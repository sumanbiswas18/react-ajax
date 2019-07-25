import React, { Component } from "react";
import axios from "axios";
import Post from "../../../components/Post/Post";
import "./Posts.css";
import { Route } from "react-router-dom";
import FullPost from "../FullPost/FullPost";
// import { Link } from "react-router-dom";
class Posts extends Component {
  state = {
    posts: []
  };
  componentDidMount() {
    axios
      .get("/posts")
      .then(response => {
        const postsControl = response.data.slice(0, 4);
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
    // this.props.history.push({ pathname: "/post/" + id });
    this.props.history.push("/post/" + id);
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
          //<Link to={"/" + post.id} key={post.id}>
          <Post
            key={post.id}
            title={post.title}
            author={post.author}
            clicked={() => this.selectPost(post.id)}
          />
          //</Link>
        );
      });
    }
    return (
      <div>
        <section className="Posts">{posts}</section>
        <Route
          path={this.props.match.url + "/:id"}
          exact
          component={FullPost}
        />
      </div>
    );
  }
}

export default Posts;
