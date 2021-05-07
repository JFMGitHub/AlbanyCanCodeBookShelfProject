import React, { useState } from "react";
import axios from "axios";

function SearchPage() {
  const [searchValue, setSearchValue] = useState("");

  const search = async (e) => {
    e.preventDefault();
    try {
      const response = await axios(
        `http://localhost:3001/api/book/search/${searchValue}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      console.log(response);
    } catch (err) {
      return console.log(err);
    }
  };

  return (
    <div>
      <input
        type="text"
        id="searchvalue"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <button type="submit" onClick={search}>
        Search
      </button>
    </div>
  );
}
export default SearchPage;
