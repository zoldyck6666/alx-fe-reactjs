const BASE_URL = "https://api.github.com/search/users";

/**
 * Builds GitHub search query string with advanced filters.
 * @param {Object} params
 * @param {string} params.username
 * @param {string} params.location
 * @param {string|number} params.minRepos
 */
export async function searchUsers({ username, location, minRepos }, page = 1) {
  if (!username) throw new Error("Username is required");

  // Build search query string
  let query = `${username} in:login`;

  if (location) {
    query += ` location:${location}`;
  }

  if (minRepos) {
    query += ` repos:>=${minRepos}`;
  }

  const url = `${BASE_URL}?q=${encodeURIComponent(query)}&page=${page}&per_page=30`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.statusText}`);
  }
  return response.json();
}
