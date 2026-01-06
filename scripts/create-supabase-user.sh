#!/bin/bash

# Create user in Supabase using admin API
# Email: rahulmedhe05@gmail.com
# Password: Cafe@5678

PROJECT_URL="https://ixbdsfpkfgrynmqecbqf.supabase.co"
SERVICE_ROLE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml4YmRzZnBrZmdyeW5tcWVjYnFmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NzYzNTAyNCwiZXhwIjoyMDgzMjExMDI0fQ.K-F3Lvr7czOpMHknME1lNWSNjQs2z1vUpYbgHqZTMtk"

echo "Creating user in Supabase..."
echo ""
echo "Project URL: $PROJECT_URL"
echo ""

# Create the user
curl -X POST "${PROJECT_URL}/auth/v1/admin/users" \
  -H "apikey: ${SERVICE_ROLE_KEY}" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "rahulmedhe05@gmail.com",
    "password": "Cafe@5678",
    "email_confirm": true,
    "user_metadata": {
      "full_name": "Admin User"
    }
  }'

echo ""
echo ""
echo "User creation complete!"
echo "You can now login with:"
echo "  Email: rahulmedhe05@gmail.com"
echo "  Password: Cafe@5678"
