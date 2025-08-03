const BASE_URL = "https://api.github.com";

export async function searchUsers(params = {}, page = 1) {
  // Build the search query string for the GitHub API
  // params can have: q (search term), location, minRepos
  let query = params.q || "";
  
  if (params.location) {
    query += ` location:${params.location}`;
  }

  if (params.minRepos) {
    query += ` repos:>=${params.minRepos}`;
  }

  // Construct the full API URL with query and pagination (per_page = 30 by default)
  const url = `${BASE_URL}/search/users?q=${encodeURIComponent(query)}&page=${page}&per_page=30`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();

  return data; // data has { total_count, incomplete_results, items: [...] }
}
