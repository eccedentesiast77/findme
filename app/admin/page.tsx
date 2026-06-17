"use client";

import { useState } from "react";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin() {
    if (
      username === "admin" &&
      password === "123456"
    ) {
      localStorage.setItem(
        "admin_login",
        "true"
      );

      window.location.href =
        "/admin/dashboard";
    } else {
      alert("Username atau Password salah");
    }
  }

  return (
    <div
      style={{
        width: "400px",
        margin: "100px auto",
      }}
    >
      <h1>Login Admin</h1>

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) =>
          setUsername(e.target.value)
        }
        style={{
          width: "100%",
          padding: "10px",
          marginTop: "10px",
        }}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
        style={{
          width: "100%",
          padding: "10px",
          marginTop: "10px",
        }}
      />

      <button
        onClick={handleLogin}
        style={{
          width: "100%",
          padding: "10px",
          marginTop: "10px",
          background: "green",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Login
      </button>
    </div>
  );
}