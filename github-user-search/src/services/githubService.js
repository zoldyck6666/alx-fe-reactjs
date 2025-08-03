// src/services/githubService.js

export async function searchUsers(params, page = 1) {
  if (!params || !params.query) {
    throw new Error("Query parameter is required");
  }

  // Build the search query parts
  const queryParts = [];

  // Base search query (username or keyword)
  queryParts.push(encodeURIComponent(params.query));

  // Add location filter if provided
  if (params.location) {
    queryParts.push(`location:${encodeURIComponent(params.location)}`);
  }

  // Add minimum repos filter if provided
  if (params.minRepos) {
    queryParts.push(`repos:>=${params.minRepos}`);
  }

  // Join all parts with plus signs as GitHub API expects
  const queryString = queryParts.join("+");

  // Construct the full URL
  const url = `https://api.github.com/search/users?q=${queryString}&page=${page}&per_page=30`;

  // Fetch from GitHub API
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
  }

  // Parse and return JSON data
  return response.json();
}
