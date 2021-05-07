import { useState } from "react";
import Bookshelf from "../Bookshelf/BookShelf";
import axios from "axios";

function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [token, setToken] = useState("");

  const login = async () => {
    setIsLoading(true);

    try {
      const response = await axios("http://localhost:3001/api/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        data: {
          username,
          password
        }
      });

      setToken(response.data.token);
      setUsername("");
    } catch (error) {
      console.error(error);

      if (error.response && error.response.status === 401) {
        setErrorMessage("Invalid username or password");
      } else setErrorMessage("We are sorry, unexpected error occurred.");
    }

    setPassword("");
    setIsLoading(false);
  };

  const logout = () => {
    setToken("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login();
  };

  if (token) {
    return <Bookshelf token={token} logout={logout} />;
  } else {
    return (
      <div className="container mt-2 mb-5">
        <h1>Login</h1>
        <form
          className="form-inline mb-2"
          method="POST"
          onSubmit={handleSubmit}
        >
          <div className="form-group">
            <label htmlFor="username" className="mr-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="form-control mr-3"
              required={true}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="mr-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="form-control mr-3"
              required={true}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isLoading}
          >
            Login
          </button>
        </form>

        {isLoading && <p>Loading ...</p>}
        {errorMessage && (
          <div className="alert alert-danger" role="alert">
            {errorMessage}
          </div>
        )}
      </div>
    );
  }
}

export default Signin;
