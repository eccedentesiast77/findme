"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [websites, setWebsites] = useState<any[]>([]);
  const [suggestions, setSuggestions] =
    useState<any[]>([]);

  useEffect(() => {
    loadWebsites();
  }, []);

  async function loadWebsites() {
    const res = await fetch(
      "/api/list-website"
    );

    const data = await res.json();

    setWebsites(data);
  }

  async function handleSearch(
    searchText?: string
  ) {
    const keyword =
      searchText || query;

    const res = await fetch(
      "/api/search",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          query: keyword,
        }),
      }
    );

    const data = await res.json();

    setResults(data.results);
    setSuggestions([]);
  }

  function handleChange(
    value: string
  ) {
    setQuery(value);

    if (!value.trim()) {
      setSuggestions([]);
      return;
    }

    const filtered =
      websites.filter((item: any) =>
        item.keyword
          .toLowerCase()
          .includes(
            value.toLowerCase()
          )
      );

    setSuggestions(
      filtered.slice(0, 5)
    );
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "40px",
        fontFamily:
          "Arial, sans-serif",
      }}
    >
      <h1
        style={{
          fontSize: "60px",
          fontWeight: "bold",
          color: "#2563eb",
          marginBottom: "30px",
        }}
      >
        FindMe
      </h1>

      <div
        style={{
          position: "relative",
          marginBottom: "40px",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "10px",
          }}
        >
          <input
            value={query}
            onChange={(e) =>
              handleChange(
                e.target.value
              )
            }
            onKeyDown={(e) => {
              if (
                e.key === "Enter"
              ) {
                handleSearch();
              }
            }}
            placeholder="Cari..."
            style={{
              flex: 1,
              padding: "15px",
              border:
                "1px solid #ccc",
              borderRadius: "8px",
              fontSize: "16px",
            }}
          />

          <button
            onClick={() =>
              handleSearch()
            }
            style={{
              backgroundColor:
                "#2563eb",
              color: "white",
              border: "none",
              padding:
                "15px 25px",
              borderRadius:
                "8px",
              cursor: "pointer",
            }}
          >
            Cari
          </button>
        </div>

        {suggestions.length >
          0 && (
          <div
            style={{
              position:
                "absolute",
              width: "100%",
              background:
                "white",
              border:
                "1px solid #ddd",
              marginTop: "5px",
              borderRadius:
                "8px",
              overflow:
                "hidden",
              zIndex: 100,
            }}
          >
            {suggestions.map(
              (
                item,
                index
              ) => (
                <div
                  key={index}
                  onClick={() => {
                    setQuery(
                      item.keyword
                    );

                    handleSearch(
                      item.keyword
                    );
                  }}
                  style={{
                    padding:
                      "12px",
                    cursor:
                      "pointer",
                    borderBottom:
                      "1px solid #eee",
                  }}
                >
                  🔍{" "}
                  {
                    item.keyword
                  }
                </div>
              )
            )}
          </div>
        )}
      </div>

      {results.length > 0 && (
        <p
          style={{
            marginBottom:
              "20px",
            color: "#666",
          }}
        >
          {results.length} hasil
          ditemukan
        </p>
      )}

      {results.length === 0 &&
        query && (
          <p
            style={{
              color: "#666",
            }}
          >
            Tidak ada hasil
            ditemukan.
          </p>
        )}

      {results.map(
        (item, index) => (
          <div
            key={index}
            style={{
              marginBottom:
                "35px",
            }}
          >
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color:
                  "#1a0dab",
                fontSize:
                  "24px",
                textDecoration:
                  "none",
                fontWeight:
                  "bold",
              }}
            >
              {item.title}
            </a>

            <div
              style={{
                color:
                  "green",
                marginTop:
                  "5px",
                fontSize:
                  "14px",
              }}
            >
              {item.url}
            </div>

            <div
              style={{
                color:
                  "#444",
                marginTop:
                  "8px",
                lineHeight:
                  "1.6",
              }}
            >
              {
                item.description
              }
            </div>
          </div>
        )
      )}
    </main>
  );
}