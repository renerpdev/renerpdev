"use client"

import React from "react"

function Button() {
  const send = async () => {
    await fetch("/api/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: "John Doe",
        email: "test@gmail.com",
        description: "here goes the body",
        topics: ["UX", "DEV"]
      })
    })
  }

  return (
    <button onClick={send} className={"bg-cyan-600 p-1 text-white uppercase"}>
      contact me
    </button>
  )
}

export default Button
