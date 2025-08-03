import { useState } from "react";
import Search from "./components/Search";
import { searchUsers } from "./services/githubService";

export default function SearchPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [queryParams, setQueryParams] = useState(null);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const handleSearch = async (params) => {
    setLoading(true);
    setError(null);
    setPage(1);
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
      <Search onSearch={handleSearch} />

      {loading && <p className="text-center mt-4">Loading...</p>}
      {error && <p className="text-center mt-4 text-red-600">{error}</p>}

      {!loading && users.length === 0 && queryParams && (
        <p className="text-center mt-4">No users found.</p>
      )}

      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
        {users.map((user) => (
          <li
            key={user.id}
            className="bg-white p-4 rounded shadow flex flex-col items-center"
          >
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
            {/* For detailed info like location and repo count, you must fetch user details separately */}
            <UserDetails username={user.login} />
          </li>
        ))}
      </ul>

      {/* Load More button */}
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

// Component to fetch and display user details (location and public repos count)
function UserDetails({ username }) {
  const [details, setDetails] = useState(null);

  useState(() => {
    let isMounted = true;

    fetch(`https://api.github.com/users/${username}`)
      .then((res) => res.json())
      .then((data) => {
        if (isMounted) setDetails(data);
      });

    return () => {
      isMounted = false;
    };
  }, [username]);

  if (!details) return <p className="text-sm text-gray-500">Loading info...</p>;

  return (
    <div className="text-center mt-2 text-gray-700 text-sm">
      <p>{details.location || "No location info"}</p>
      <p>Repos: {details.public_repos}</p>
    </div>
  );
}
