"use client";

import { useEffect, useState } from "react";

export default function StatsPage() {
  const [stats, setStats] = useState<any[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const res = await fetch("/api/stats-detail");
    const data = await res.json();

    setStats(data);
  }

  return (
    <div style={{ padding: "40px" }}>
      <h1>Statistik Pencarian</h1>

      <br />

      {stats.map((item, index) => (
        <div
          key={index}
          style={{
            marginBottom: "10px",
          }}
        >
          {item.keyword} : {item.total}
        </div>
      ))}
    </div>
  );
}