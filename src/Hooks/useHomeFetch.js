import React from "react";
import API from "../API";

import { isPersistedState } from "../helpers";

const initialState = {
  page: 0,
  results: [],
  total_pages: 0,
  total_results: 0,
};

export const useHomeFetch = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [state, setState] = React.useState(initialState);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [isLoadingMore, setIsLoadingMore] = React.useState(false);

  const fetchMovies = async (page, searchTerm = "") => {
    try {
      setError(false);
      setLoading(true);

      const movies = await API.fetchMovies(searchTerm, page);

      setState((prev) => ({
        ...movies,
        results:
          page > 1 ? [...prev.results, ...movies.results] : [...movies.results],
      }));
    } catch (error) {
      setError(true);
    }
    setLoading(false);
  };

  //initial render and search
  React.useEffect(() => {
    if (!searchTerm) {
      const sessionState = isPersistedState("homeState");
      if (sessionState) {
        setState(sessionState);
        return;
      }
    }
    //wipe out prev searchTerm
    setState(initialState);
    fetchMovies(1, searchTerm);
  }, [searchTerm]);

  // Load More
  React.useEffect(() => {
    if (!isLoadingMore) return;
    fetchMovies(state.page + 1, searchTerm);
    setIsLoadingMore(false);
  }, [isLoadingMore, searchTerm, state.page]);

  //Write to sessionStorage
  React.useEffect(() => {
    if (!searchTerm) sessionStorage.setItem("homeState", JSON.stringify(state));
  }, [searchTerm, state]);

  return { state, loading, error, searchTerm, setSearchTerm, setIsLoadingMore };
};
