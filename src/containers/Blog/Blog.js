import React, { Component } from "react";
import { Route, NavLink, Switch, Redirect } from "react-router-dom";
import "./Blog.css";
import Posts from "../Blog/Posts/Posts";
import newPost from "../Blog/NewPost/NewPost";
class Blog extends Component {
  render() {
    return (
      <div className="Blog">
        <header>
          <nav>
            <ul>
              <li>
                <NavLink to="/post/" exact>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={{
                    pathname: "/new-post",
                    hash: "#submit",
                    search: "?quick-submit=true"
                  }}
                >
                  New Post
                </NavLink>
              </li>
            </ul>
          </nav>
        </header>
        {/* <Route path="/" exact render={() => <Posts />} />
        <Route path="/new-post" exact render={() => <h1>Home2</h1>} /> */}
        <Switch>
          <Route path="/new-post" exact component={newPost} />
          <Route path="/post" component={Posts} />
          <Redirect from="/" to="/post" />
        </Switch>
      </div>
    );
  }
}

export default Blog;
