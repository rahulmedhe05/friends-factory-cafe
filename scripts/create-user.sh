#!/bin/bash
# Script to create a user in Supabase

# Make sure you have .env.local with real credentials before running this

if [ ! -f .env.local ]; then
  echo "Error: .env.local file not found"
  exit 1
fi

# Load environment variables
export $(cat .env.local | grep -v '^#' | xargs)

# Check if credentials are set
if [[ "$NEXT_PUBLIC_SUPABASE_URL" == *"your-project"* ]] || [[ "$NEXT_PUBLIC_SUPABASE_ANON_KEY" == *"your-anon-key"* ]]; then
  echo "Error: Please update .env.local with your real Supabase credentials"
  echo "Get them from: https://supabase.com/dashboard/project/_/settings/api"
  exit 1
fi

echo "Creating user with email: rahulmedhe05@gmail.com"
echo "Password: Cafe@5678"
echo ""
echo "Option 1: Sign up via the browser"
echo "1. Visit http://localhost:3000/auth/sign-up"
echo "2. Enter email: rahulmedhe05@gmail.com"
echo "3. Enter password: Cafe@5678"
echo "4. Confirm password: Cafe@5678"
echo "5. Click Sign Up"
echo ""
echo "Option 2: Use Supabase Dashboard"
echo "1. Visit https://supabase.com/dashboard"
echo "2. Go to Authentication > Users"
echo "3. Click 'Create New User'"
echo "4. Enter email: rahulmedhe05@gmail.com"
echo "5. Enter password: Cafe@5678"
echo "6. Enable 'Auto confirm user'"
echo "7. Click Create User"
