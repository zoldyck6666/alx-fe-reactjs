import { useState } from "react";
import { searchUsers, fetchUserData } from "../services/githubService";

export default function Search() {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [minRepos, setMinRepos] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [queryParams, setQueryParams] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setPage(1);

    const params = { query, location, minRepos };
    setQueryParams(params);

    try {
      const data = await searchUsers(params, 1);
      setUsers(data.items);
      setTotalCount(data.total_count);
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  const loadMore = async () => {
    const nextPage = page + 1;
    setLoading(true);
    setError(null);

    try {
      const data = await searchUsers(queryParams, nextPage);
      setUsers((prev) => [...prev, ...data.items]);
      setPage(nextPage);
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={handleSearch} className="space-y-4 max-w-md mx-auto">
        <input
          type="text"
          placeholder="Username or keywords"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Location (optional)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          placeholder="Minimum repos (optional)"
          value={minRepos}
          onChange={(e) => setMinRepos(e.target.value)}
          min={0}
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {error && <p className="text-red-600 text-center mt-4">{error}</p>}

      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </ul>

      {users.length > 0 && users.length < totalCount && (
        <div className="flex justify-center mt-6">
          <button
            onClick={loadMore}
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
}

function UserCard({ user }) {
  const [details, setDetails] = useState(null);

  // Fetch user details on mount
  useState(() => {
    let isMounted = true;
    fetchUserData(user.login)
      .then((data) => {
        if (isMounted) setDetails(data);
      })
      .catch(() => {
        if (isMounted) setDetails(null);
      });
    return () => {
      isMounted = false;
    };
  }, [user.login]);

  return (
    <li className="bg-white p-4 rounded shadow flex flex-col items-center">
      <img
        src={user.avatar_url}
        alt={`${user.login} avatar`}
        className="w-24 h-24 rounded-full mb-2"
      />
      <a
        href={user.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 font-semibold hover:underline"
      >
        {user.login}
      </a>
      {details ? (
        <div className="text-center mt-2 text-gray-700 text-sm">
          <p>{details.location || "No location info"}</p>
          <p>Repos: {details.public_repos}</p>
        </div>
      ) : (
        <p className="text-sm text-gray-500 mt-2">Loading info...</p>
      )}
    </li>
  );
}
