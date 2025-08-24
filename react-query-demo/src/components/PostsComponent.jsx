// src/components/PostsComponent.jsx
import React from "react";
import { useQuery } from "react-query";

const fetchPosts = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  // just return json, don't assign any 'error' variable
  return res.json();
};

const PostsComponent = () => {
  const { data, isLoading, isError, refetch } = useQuery("posts", fetchPosts);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Something went wrong while fetching posts.</div>;

  return (
    <div>
      <button onClick={() => refetch()}>Refetch Posts</button>
      <ul>
        {data.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default PostsComponent;
