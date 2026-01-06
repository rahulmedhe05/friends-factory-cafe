import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://ixbdsfpkfgrynmqecbqf.supabase.co"
const serviceRoleKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml4YmRzZnBrZmdyeW5tcWVjYnFmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NzYzNTAyNCwiZXhwIjoyMDgzMjExMDI0fQ.K-F3Lvr7czOpMHknME1lNWSNjQs2z1vUpYbgHqZTMtk"

const supabase = createClient(supabaseUrl, serviceRoleKey)

async function createUser() {
  try {
    console.log("Creating user in Supabase...")
    console.log("URL:", supabaseUrl)
    console.log("")
    
    const { data, error } = await supabase.auth.admin.createUser({
      email: "rahulmedhe05@gmail.com",
      password: "Cafe@5678",
      email_confirm: true,
      user_metadata: {
        full_name: "Admin User"
      }
    })

    if (error) {
      console.error("Error creating user:", error)
      process.exit(1)
    }

    console.log("✅ User created successfully!")
    console.log("User ID:", data.user.id)
    console.log("Email:", data.user.email)
    console.log("")
    console.log("You can now login with:")
    console.log("  Email: rahulmedhe05@gmail.com")
    console.log("  Password: Cafe@5678")
  } catch (error) {
    console.error("Error:", error)
    process.exit(1)
  }
}

createUser()
