import React, { useEffect, useState } from "react";
import { fetchSuggestions } from "../../utils/api";
import { debounce } from "lodash";
import styles from "./Autocomplete.module.css";

const Autocomplete = ({ setSelectedItem, onError }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const debouncedSearch = debounce(() => {
      fetchSuggestions(searchTerm)
        .then((_suggestions) => {
          onError(null);
          setSuggestions(_suggestions);
        })
        .catch((error) => onError(`Couldn't fetch suggestions "${error}"`));
    }, 500);

    debouncedSearch();
  }, [onError, searchTerm]);

  const renderSuggestions = () => {
    if (suggestions.length === 0) {
      return (
        <div className={styles.suggestion}>No matching products found</div>
      );
    }

    return suggestions.slice(0, 10).map((suggestion, index) => (
      <div
        key={suggestion.id}
        id={suggestion.id}
        className={styles.suggestion}
        onClick={(e) => {
          setSearchTerm("");
          console.log(e.target.id);
          setSelectedItem(e.target.id);
        }}
        tabindex={`${index + 1}`}
      >
        {suggestion.title}
      </div>
    ));
  };

  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        value={searchTerm}
        className={styles.searchBox}
        placeholder="Search for a product"
        onChange={(e) => setSearchTerm(e.target.value)}
        tabindex="0"
      />
      {searchTerm && renderSuggestions()}
    </div>
  );
};

export const MemoizedAutocomplete = React.memo(Autocomplete);
