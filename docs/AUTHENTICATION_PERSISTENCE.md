# Authentication Persistence

## Overview

This app implements persistent authentication using Supabase's built-in session management with AsyncStorage for local persistence. Users will remain logged in even after closing and reopening the app.

## How It Works

### 1. Session Storage

- **AsyncStorage**: Sessions are automatically stored in AsyncStorage using Supabase's built-in storage adapter
- **Auto-refresh**: Tokens are automatically refreshed when they're about to expire
- **Persistent sessions**: Sessions persist across app restarts

### 2. Configuration

The Supabase client is configured with persistent storage in `config/supabase.ts`:

```typescript
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
```

### 3. Session Management

#### Automatic Features:

- **Token Refresh**: Tokens are automatically refreshed every 30 minutes
- **App State Detection**: When the app comes to foreground, session validity is checked
- **Background Refresh**: Sessions are refreshed in the background to maintain validity

#### Manual Functions:

- `getCurrentSession()`: Get the current session
- `refreshSession()`: Manually refresh the session
- `isSessionValid()`: Check if the current session is valid

### 4. Auth Context

The `AuthContext` provides:

- **Persistent State**: User state is restored from AsyncStorage on app start
- **Real-time Updates**: Auth state changes are listened to in real-time
- **Loading States**: Proper loading states during authentication checks

### 5. Custom Hook: `usePersistentAuth`

This hook provides enhanced authentication features:

```typescript
const {user, loading, isAuthenticated} = usePersistentAuth();
```

**Features:**

- **App State Monitoring**: Detects when app comes to foreground
- **Session Validation**: Automatically validates session on app foreground
- **Periodic Refresh**: Refreshes session every 30 minutes
- **Error Handling**: Graceful error handling for network issues

### 6. Loading Screen

The app shows a loading screen (`AuthLoadingScreen`) while:

- Fonts are loading
- Authentication state is being determined from persistent storage
- Initial session validation is happening

## Security Features

### Token Management:

- **Automatic Expiration**: Tokens expire and are refreshed automatically
- **Secure Storage**: Tokens are stored securely in AsyncStorage
- **Validation**: Session validity is checked regularly

### Error Handling:

- **Network Issues**: Graceful handling of network connectivity problems
- **Invalid Sessions**: Automatic logout on invalid sessions
- **Refresh Failures**: Proper error handling when token refresh fails

## Usage Examples

### Basic Authentication Check:

```typescript
import {usePersistentAuth} from '@/hooks/usePersistentAuth';

const MyComponent = () => {
  const {user, loading, isAuthenticated} = usePersistentAuth();

  if (loading) return <LoadingSpinner />;

  return isAuthenticated ? <AuthenticatedView /> : <LoginPrompt />;
};
```

### Manual Session Operations:

```typescript
import {refreshSession, isSessionValid} from '@/services/auth';

// Check if session is valid
const isValid = await isSessionValid();

// Manually refresh session
const session = await refreshSession();
```

## Troubleshooting

### Common Issues:

1. **User logged out unexpectedly**:

   - Check network connectivity
   - Verify Supabase project configuration
   - Check if tokens are being refreshed properly

2. **Loading screen stuck**:

   - Check AsyncStorage permissions
   - Verify Supabase client configuration
   - Check for authentication errors in console

3. **Session not persisting**:
   - Ensure AsyncStorage is properly installed
   - Check Supabase auth configuration
   - Verify `persistSession: true` is set

### Debug Information:

The system logs important events:

- Auth state changes
- Session refresh attempts
- App state changes
- Error conditions

Check the console for these logs to debug authentication issues.

## Best Practices

1. **Always use `usePersistentAuth`** instead of `useAuth` for components that need authentication state
2. **Handle loading states** properly to provide good UX
3. **Test on real devices** as simulator behavior may differ
4. **Monitor network connectivity** for better error handling
5. **Implement proper error boundaries** for authentication-related errors
