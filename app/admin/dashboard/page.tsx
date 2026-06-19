"use client";

import { useEffect, useState } from "react";

export default function Dashboard() {
  const [totalWebsite, setTotalWebsite] =
    useState(0);

  const [totalSearch, setTotalSearch] =
    useState(0);

  const [topSearch, setTopSearch] =
    useState("-");

  useEffect(() => {
    const isLogin =
      localStorage.getItem("admin_login");

    if (!isLogin) {
      window.location.href =
        "/admin";
      return;
    }

    loadData();
  }, []);

  async function loadData() {
    const websiteRes = await fetch(
      "/api/list-website"
    );

    const websites =
      await websiteRes.json();

    setTotalWebsite(websites.length);

    const statsRes = await fetch(
      "/api/stats"
    );

    const stats = await statsRes.json();

    setTotalSearch(
      stats.totalSearch
    );

    setTopSearch(
      stats.topSearch
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "#f3f4f6",
        padding: "30px",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <h1
          style={{
            fontSize: "32px",
            fontWeight: "bold",
            marginBottom: "10px",
          }}
        >
          Dashboard Admin 🚀
        </h1>

        <p
          style={{
            color: "#666",
            marginBottom: "30px",
          }}
        >
          Selamat datang di panel
          admin FindMe
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(250px,1fr))",
            gap: "20px",
            marginBottom: "30px",
          }}
        >
          <div
            style={{
              background:
                "linear-gradient(135deg,#2563eb,#1d4ed8)",
              color: "white",
              padding: "25px",
              borderRadius: "15px",
              boxShadow:
                "0 6px 20px rgba(37,99,235,0.3)",
            }}
          >
            <h3>
              🌐 Total Website
            </h3>

            <h1
              style={{
                fontSize:
                  "42px",
                marginTop:
                  "10px",
              }}
            >
              {totalWebsite}
            </h1>
          </div>

          <div
            style={{
              background:
                "linear-gradient(135deg,#16a34a,#15803d)",
              color: "white",
              padding: "25px",
              borderRadius: "15px",
              boxShadow:
                "0 6px 20px rgba(22,163,74,0.3)",
            }}
          >
            <h3>
              🔍 Total Search
            </h3>

            <h1
              style={{
                fontSize:
                  "42px",
                marginTop:
                  "10px",
              }}
            >
              {totalSearch}
            </h1>
          </div>

          <div
            style={{
              background:
                "linear-gradient(135deg,#9333ea,#7e22ce)",
              color: "white",
              padding: "25px",
              borderRadius: "15px",
              boxShadow:
                "0 6px 20px rgba(147,51,234,0.3)",
            }}
          >
            <h3>
              ⭐ Top Search
            </h3>

            <h2
              style={{
                marginTop:
                  "15px",
              }}
            >
              {topSearch}
            </h2>
          </div>
        </div>

        <div
          style={{
            background:
              "white",
            borderRadius:
              "15px",
            padding: "25px",
            boxShadow:
              "0 4px 15px rgba(0,0,0,0.08)",
          }}
        >
          <h2
            style={{
              marginBottom:
                "20px",
            }}
          >
            Menu Admin
          </h2>

          <div
            style={{
              display: "flex",
              gap: "15px",
              flexWrap:
                "wrap",
            }}
          >
            <button
              onClick={() =>
                (window.location.href =
                  "/admin/list")
              }
              style={{
                background:
                  "#2563eb",
                color:
                  "white",
                border:
                  "none",
                padding:
                  "12px 20px",
                borderRadius:
                  "10px",
                cursor:
                  "pointer",
                fontWeight:
                  "bold",
              }}
            >
              📋 Kelola Website
            </button>

            <button
              onClick={() =>
                (window.location.href =
                  "/admin/add")
              }
              style={{
                background:
                  "#16a34a",
                color:
                  "white",
                border:
                  "none",
                padding:
                  "12px 20px",
                borderRadius:
                  "10px",
                cursor:
                  "pointer",
                fontWeight:
                  "bold",
              }}
            >
              ➕ Tambah Website
            </button>

            <button
              onClick={() =>
                (window.location.href =
                  "/admin/stats")
              }
              style={{
                background:
                  "#9333ea",
                color:
                  "white",
                border:
                  "none",
                padding:
                  "12px 20px",
                borderRadius:
                  "10px",
                cursor:
                  "pointer",
                fontWeight:
                  "bold",
              }}
            >
              📊 Statistik
            </button>

            <button
              onClick={() => {
                localStorage.removeItem(
                  "admin_login"
                );

                window.location.href =
                  "/admin";
              }}
              style={{
                background:
                  "#dc2626",
                color:
                  "white",
                border:
                  "none",
                padding:
                  "12px 20px",
                borderRadius:
                  "10px",
                cursor:
                  "pointer",
                fontWeight:
                  "bold",
              }}
            >
              🚪 Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}