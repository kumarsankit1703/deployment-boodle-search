import React, { useEffect, useState } from "react";

function SearchBar() {
  const [input, setInput] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [cache, setCache] = useState({});

  const fetchData = async () => {

    if (cache[input]) {
      console.log("returning data from cache");
      setSearchData(cache[input]);
      return;
    }

    const data = await fetch(
      `https://dummyjson.com/recipes/search?q=${input}`
    );

    const json = await data.json();

    setSearchData(json?.recipes);

    setCache((prev) => ({
      ...prev,
      [input]: json.recipes
    }));
  };

  useEffect(() => {

    const timer = setTimeout(fetchData, 300);

    return () => {
      clearTimeout(timer);
    };

  }, [input]);

  return (
    <div>
      <input
        onBlur={() => setIsActive(false)}
        onFocus={() => setIsActive(true)}
        className="input-search"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      {isActive && (
        <div className="search-container">
          {searchData?.map((item) => (
            <span onClick={(e) => setInput(e.target.value)} className="reciepe-item" key={item.id}>
              {item.name}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBar;