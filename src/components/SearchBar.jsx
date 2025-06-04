import React from "react";
import { useState, useEffect, useRef } from "react";
import { IoSearchOutline, IoCloseOutline } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import { FiLoader } from "react-icons/fi";
console.log(motion)

const SearchBar = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState([]);
  const searchRef = useRef(null);
  const inputRef = useRef(null);

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearch(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Focus input when search opens
  useEffect(() => {
    if (showSearch && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showSearch]);

  // Debounced search
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setResults([]);
      return;
    }

    const timer = setTimeout(() => {
      performSearch(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const performSearch = async (query) => {
    setIsSearching(true);
    try {
      // Replace with your actual search API call
      const mockResults = await mockSearchAPI(query);
      setResults(mockResults);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setIsSearching(false);
    }
  };

  const mockSearchAPI = (query) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: 1, title: `Result for "${query}" 1`, type: "opportunity" },
          { id: 2, title: `Result for "${query}" 2`, type: "user" },
          { id: 3, title: `Result for "${query}" 3`, type: "post" },
        ]);
      }, 500);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Handle final search submission
      console.log("Final search:", searchQuery);
      // Redirect to search page or show results
    }
  };

  return (
    <div className="relative" ref={searchRef}>
      {/* Search Trigger Button */}
      <button
        onClick={() => setShowSearch(!showSearch)}
        className="p-2 text-gray-600 hover:text-[#024870] transition-colors relative"
        aria-label="Search"
      >
        <IoSearchOutline className="w-5 h-5" />
        {showSearch && (
          <motion.span
            className="absolute top-0 right-0 w-2 h-2 bg-[#6bd3f3] rounded-full"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          />
        )}
      </button>

      {/* Search Panel */}
      <AnimatePresence>
        {showSearch && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 md:right-auto md:left-1/2 md:-translate-x-1/2 top-full mt-2 w-80 bg-white rounded-lg shadow-xl z-50 border border-gray-100 overflow-hidden"
          >
            <form onSubmit={handleSubmit} className="relative">
              <div className="flex items-center px-3 py-2 border-b border-gray-100">
                <IoSearchOutline className="text-gray-400 mr-2 flex-shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search opportunities, users..."
                  className="flex-grow outline-none text-sm placeholder-gray-400"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="text-gray-400 hover:text-gray-600 ml-2"
                  >
                    <IoCloseOutline className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Loading Indicator */}
              {isSearching && (
                <div className="absolute right-3 top-2.5">
                  <FiLoader className="w-4 h-4 text-[#024870] animate-spin" />
                </div>
              )}

              {/* Search Results */}
              {results.length > 0 && (
                <div className="max-h-96 overflow-y-auto py-1">
                  {results.map((result) => (
                    <div
                      key={result.id}
                      className="px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-50 last:border-0"
                      onClick={() => {
                        // Handle result click
                        console.log("Selected:", result);
                        setShowSearch(false);
                      }}
                    >
                      <div className="font-medium text-gray-800">
                        {result.title}
                      </div>
                      <div className="text-xs text-gray-500 mt-1 capitalize">
                        {result.type}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Empty State */}
              {!isSearching && searchQuery && results.length === 0 && (
                <div className="px-4 py-6 text-center text-gray-500 text-sm">
                  No results found for "{searchQuery}"
                </div>
              )}

              {/* Initial State */}
              {!searchQuery && (
                <div className="px-4 py-6 text-center text-gray-500 text-sm">
                  Type to search opportunities, users, etc.
                </div>
              )}
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;
