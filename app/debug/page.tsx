"use client"

import { useEffect, useState } from "react"

export default function DebugPage() {
  const [debug, setDebug] = useState({
    url: "",
    keyPrefix: "",
    canConnect: false,
    error: "",
  })

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "NOT SET"
        const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "NOT SET"
        
        setDebug({
          url: url.substring(0, 50) + "...",
          keyPrefix: key.substring(0, 50) + "...",
          canConnect: false,
          error: "",
        })

        // Try to fetch from Supabase
        const response = await fetch(`${url}/rest/v1/`, {
          headers: {
            "apikey": key,
            "Authorization": `Bearer ${key}`,
          },
        })
        
        setDebug((prev) => ({
          ...prev,
          canConnect: response.ok,
          error: response.ok ? "" : `HTTP ${response.status}`,
        }))
      } catch (error) {
        setDebug((prev) => ({
          ...prev,
          error: error instanceof Error ? error.message : "Unknown error",
        }))
      }
    }

    checkConnection()
  }, [])

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Supabase Debug Info</h1>
      <pre className="bg-gray-100 p-4 rounded">
        {JSON.stringify(debug, null, 2)}
      </pre>
    </div>
  )
}
