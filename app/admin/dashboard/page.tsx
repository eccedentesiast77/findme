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
        padding: "40px",
      }}
    >
      <h1>
        Dashboard Admin
      </h1>

      <br />

      <div
        style={{
          border:
            "1px solid #ccc",
          padding: "20px",
          marginBottom: "20px",
        }}
      >
        <h2>
          Total Website
        </h2>

        <h1>
          {totalWebsite}
        </h1>
      </div>

      <div
        style={{
          border:
            "1px solid #ccc",
          padding: "20px",
          marginBottom: "20px",
        }}
      >
        <h2>
          Total Search
        </h2>

        <h1>
          {totalSearch}
        </h1>
      </div>

      <div
        style={{
          border:
            "1px solid #ccc",
          padding: "20px",
          marginBottom: "20px",
        }}
      >
        <h2>
          Top Search
        </h2>

        <h1>
          {topSearch}
        </h1>
      </div>

      <button
        onClick={() =>
          (window.location.href =
            "/admin/list")
        }
        style={{
          padding:
            "10px 20px",
          marginRight:
            "10px",
        }}
      >
        Kelola Website
      </button>

      <button
        onClick={() =>
          (window.location.href =
            "/admin/add")
        }
        style={{
          padding:
            "10px 20px",
          marginRight:
            "10px",
        }}
      >
        Tambah Website
      </button>

      <button
        onClick={() =>
          (window.location.href =
            "/admin/stats")
        }
        style={{
          padding:
            "10px 20px",
        }}
      >
        Statistik
      </button>
    </div>
  );
}