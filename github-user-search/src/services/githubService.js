// src/services/githubService.js

import axios from "axios";

/**
 * Search GitHub users by query string and page number.
 * 
 * @param {Object} params - The search parameters object, expects { query: string }
 * @param {number} page - The page number for pagination (default 1)
 * @returns {Promise<Object>} - The data from GitHub API containing users and total count
 */
export async function searchUsers(params, page = 1) {
  const query = params.query || "";
  const perPage = 30; // GitHub API default per page

  try {
    const response = await axios.get("https://api.github.com/search/users", {
      params: {
        q: query,
        page,
        per_page: perPage,
      },
    });
    return response.data; // contains { total_count, items: [...] }
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
}
