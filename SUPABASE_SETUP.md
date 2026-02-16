# Supabase Setup Guide

This guide will help you set up Supabase for your Expo app.

## 1. Create a Supabase Project

1. Go to [Supabase Console](https://supabase.com/dashboard)
2. Click "New Project"
3. Choose your organization
4. Enter a project name (e.g., "picala-app")
5. Enter a database password (save this securely)
6. Choose a region close to your users
7. Click "Create new project"

## 2. Get Your Project Credentials

1. In your Supabase project dashboard, go to "Settings" → "API"
2. Copy your Project URL and anon public key
3. These will look like:
   - Project URL: `https://your-project-id.supabase.co`
   - anon public key: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

## 3. Configure Environment Variables

1. Create a `.env` file in your project root (if it doesn't exist)
2. Add your Supabase credentials:

```env
EXPO_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
```

3. Make sure `.env` is in your `.gitignore` file

## 4. Update Your App Configuration

1. Open `config/supabase.ts` in your project
2. Replace the placeholder values with your actual Supabase credentials:

```typescript
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || 'https://your-project-id.supabase.co';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-public-key';
```

## 5. Enable Email Authentication

1. In your Supabase dashboard, go to "Authentication" → "Providers"
2. Make sure "Email" is enabled
3. Configure email templates if needed (optional)

## 6. Configure Deep Links for Email Verification

1. In your Supabase dashboard, go to "Authentication" → "URL Configuration"
2. Set **Site URL** to your website URL (e.g., `https://example.com`) or a dummy URL.
3. Under **Redirect URLs**, add the following:
   - `picala://verify-email` (for Development Builds / Production)
   - `exp://<YOUR_IP>:8081/--/verify-email` (for Expo Go - see section 8)
4. Save the changes.

## 7. Set Up Database Tables (Optional)

If you need to store user profiles or additional data:

1. Go to "Table Editor" in your Supabase dashboard
2. Create a `profiles` table:

```sql
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to view their own profile
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

-- Create policy to allow users to update their own profile
CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Create policy to allow users to insert their own profile
CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);
```

## 8. Deep Link Testing & Configuration

### Option A: Development Build / Production (Recommended)
- **Redirect URL in Supabase**: `picala://verify-email`
- **How to Run**: `npx expo run:ios` or `npx expo run:android`
- **Why**: Persistent URL scheme, works exactly like production.

### Option B: Expo Go (Standard)
- **Redirect URL in Supabase**: `exp://<YOUR_IP>:8081/--/verify-email`
  - *Note*: Replace `<YOUR_IP>` with your computer's IP address (e.g., `192.168.1.5`).
  - You can find this IP when running `npx expo start` (look for the LAN URL).
  - The `/--/` part is crucial: it tells Expo Go to pass the deep link path to your app.
- **Important**: If your IP changes (e.g., different Wi-Fi), you must update this URL in Supabase.

### Testing Commands
1. **Simulator (iOS - Dev Build)**: `xcrun simctl openurl booted picala://verify-email`
2. **Emulator (Android - Dev Build)**: `adb shell am start -W -a android.intent.action.VIEW -d "picala://verify-email"`

## 9. Test Your Setup

1. Start your Expo development server: `npm start`
2. Try to register a new account using the registration form
3. Check your email for the verification link
4. Click the verification link - it should open your app
5. Try to sign in with the created account
6. Verify that you can sign out and sign back in

## Troubleshooting

- **"Invalid API key"**: Double-check that you've copied the correct anon key from your Supabase project settings.
- **"Network error"**: Make sure your Supabase project URL is correct and accessible.
- **"User already registered"**: This means the email is already in use. Try signing in instead.
- **"Email not confirmed"**: Check your email for a confirmation link, or disable email confirmation in Supabase settings.
- **Deep links not working**: Make sure your app's URL scheme is properly configured in `app.json` and Supabase settings.

## Security Best Practices

1. **Never expose your service role key** - only use the anon key in your client app
2. **Use Row Level Security (RLS)** - Always enable RLS on your tables
3. **Validate data on the server** - Don't rely only on client-side validation
4. **Use environment variables** - Keep your credentials secure

## Next Steps

- Set up additional authentication providers (Google, GitHub, etc.)
- Create database tables for your app's data
- Set up real-time subscriptions
- Configure storage for file uploads
- Set up Edge Functions for server-side logic

For more information, visit the [Supabase Documentation](https://supabase.com/docs).
