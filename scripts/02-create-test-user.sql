-- Mock auth user for testing
-- Email: rahulmedhe05@gmail.com
-- Password: Cafe@5678

-- This creates test data for local development without real Supabase

-- Create test user in auth.users table
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  invited_at,
  confirmation_token,
  confirmation_sent_at,
  recovery_token,
  recovery_sent_at,
  email_change_token_new,
  email_change,
  email_change_sent_at,
  last_sign_in_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  created_at,
  updated_at,
  phone,
  phone_confirmed_at
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  '00000000-0000-0000-0000-000000000001',
  'authenticated',
  'authenticated',
  'rahulmedhe05@gmail.com',
  -- Password hash for 'Cafe@5678' (use bcrypt)
  crypt('Cafe@5678', gen_salt('bf', 8)),
  NOW(),
  NULL,
  '',
  NULL,
  '',
  NULL,
  '',
  '',
  NULL,
  NOW(),
  '{"provider": "email", "providers": ["email"]}',
  '{"full_name": "Admin User"}',
  FALSE,
  NOW(),
  NOW(),
  NULL,
  NULL
)
ON CONFLICT DO NOTHING;

-- Create profile for the user
INSERT INTO public.profiles (id, full_name, role)
VALUES (
  '00000000-0000-0000-0000-000000000001',
  'Admin User',
  'admin'
)
ON CONFLICT DO NOTHING;
