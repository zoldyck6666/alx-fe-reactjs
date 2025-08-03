// src/services/githubService.js

export async function searchUsers(params, page = 1) {
  const { query, location, minRepos } = params;

  let searchQuery = query || "";
  if (location) searchQuery += ` location:${location}`;
  if (minRepos) searchQuery += ` repos:>=${minRepos}`;

  const url = `https://api.github.com/search/users?q=${encodeURIComponent(searchQuery)}&page=${page}&per_page=30`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }
  return response.json();
}

export async function fetchUserData(username) {
  const response = await fetch(`https://api.github.com/users/${username}`);
  if (!response.ok) {
    throw new Error("Failed to fetch user data");
  }
  return response.json();
}
