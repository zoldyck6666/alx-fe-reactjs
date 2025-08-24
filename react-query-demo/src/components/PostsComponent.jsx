// src/components/PostsComponent.jsx
import React from "react";
import { useQuery } from "react-query";

const fetchPosts = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  return res.json();
};

const PostsComponent = () => {
  const { data, isLoading, isError, refetch } = useQuery("posts", fetchPosts, {
    cacheTime: 1000 * 60 * 5,           // cache data for 5 minutes
    staleTime: 1000 * 60,               // data considered fresh for 1 minute
    refetchOnWindowFocus: false,        // don't refetch automatically on window focus
    keepPreviousData: true               // keep previous data while fetching new
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Something went wrong while fetching posts.</div>; // <-- NO 'error', use isError

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
