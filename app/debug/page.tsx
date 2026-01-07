"use client"

import { useEffect, useState } from "react"

export default function DebugPage() {
  const [debug, setDebug] = useState({
    url: "checking...",
    keyPrefix: "checking...",
  })

  useEffect(() => {
    // Simple check - just read the values
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "NOT SET"
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "NOT SET"
    
    const urlDisplay = url === "NOT SET" ? "NOT SET" : url.substring(0, 40) + "..."
    const keyDisplay = key === "NOT SET" ? "NOT SET" : key.substring(0, 40) + "..."
    
    setDebug({
      url: urlDisplay,
      keyPrefix: keyDisplay,
    })
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
