import { useState } from "react";
import { fetchUserData } from "../services/githubService";

const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    setUser(null);

    try {
      const data = await fetchUserData(username);
      setUser(data);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <form onSubmit={handleSearch} className="mb-4">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter GitHub username"
          className="border p-2 w-full rounded"
        />
        <button
          type="submit"
          className="mt-2 bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          Search
        </button>
      </form>

      {loading && <p>Loading...</p>}

      {error && <p>Looks like we cant find the user</p>}

      {user && (
        <div className="bg-gray-100 p-4 rounded shadow">
          <img src={user.avatar_url} alt={user.login} className="w-20 h-20 rounded-full mb-2" />
          <h2 className="text-lg font-bold">{user.name || user.login}</h2>
          <a
            href={user.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            View Profile
          </a>
        </div>
      )}
    </div>
  );
};

export default Search;
