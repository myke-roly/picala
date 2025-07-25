# Deep Link Testing Guide

## Overview

This guide explains how to test deep links in the Picala app, including email verification links and custom app scheme links.

## Testing Email Verification Links

### 1. iOS Simulator Testing

```bash
# Test with a sample verification link
xcrun simctl openurl booted "exp://192.168.0.247:8081/verify-email?token=test_token&type=signup"

# Test with actual Supabase verification link
xcrun simctl openurl booted "https://urykybvnondzczssbdya.supabase.co/auth/v1/verify?token=YOUR_TOKEN&type=signup&redirect_to=http://localhost:3000"
```

### 2. Android Emulator Testing

```bash
# Test with a sample verification link
adb shell am start -W -a android.intent.action.VIEW -d "exp://192.168.0.247:8081/verify-email?token=test_token&type=signup" com.picala.app

# Test with actual Supabase verification link
adb shell am start -W -a android.intent.action.VIEW -d "https://urykybvnondzczssbdya.supabase.co/auth/v1/verify?token=YOUR_TOKEN&type=signup&redirect_to=http://localhost:3000" com.picala.app
```

### 3. Web Browser Testing

1. Open the app in a web browser
2. Register a new account
3. Check your email for the verification link
4. Click the verification link
5. The app should handle the verification automatically

## Testing Custom App Scheme

### 1. iOS Simulator

```bash
# Test custom app scheme
xcrun simctl openurl booted "picala://verify-email"
```

### 2. Android Emulator

```bash
# Test custom app scheme
adb shell am start -W -a android.intent.action.VIEW -d "picala://verify-email" com.picala.app
```

## Expected Behavior

### Email Verification Flow

1. **Valid Token**:

   - App opens to `/verify-email` screen
   - Shows loading state
   - Verifies email with Supabase
   - Shows success message
   - Redirects to login after 2 seconds

2. **Invalid Token**:

   - App opens to `/verify-email` screen
   - Shows error message
   - Provides helpful guidance

3. **Missing Parameters**:
   - App opens to `/verify-email` screen
   - Shows error message
   - Suggests requesting new verification email

### Deep Link Handling

- **Supabase Links**: Automatically detected and processed
- **Custom Scheme**: Handled by app scheme handler
- **Web URLs**: Processed in web environment
- **Error Handling**: Graceful fallbacks with user-friendly messages

## Troubleshooting

### Common Issues

1. **"Failed to parse manifest JSON"**:

   - Clear Metro cache: `npx expo start --clear`
   - Restart the development server
   - Check `app.json` format

2. **Deep link not opening app**:

   - Verify app is installed and running
   - Check URL scheme configuration in `app.json`
   - Ensure correct bundle identifier/package name

3. **Verification not working**:

   - Check console logs for errors
   - Verify token format and validity
   - Ensure Supabase configuration is correct

4. **Storage errors**:
   - Clear app data/cache
   - Restart the app
   - Check storage implementation

### Debug Information

The app provides detailed logging:

```javascript
// Deep link reception
LOG Deep link received: [URL]

// URL processing
LOG Processing email verification link: [URL]
LOG Extracted params: {token: true, type: "signup"}

// Verification process
LOG Verifying email with token...
LOG Email verified successfully!

// Navigation
LOG Redirecting to verification screen...
```

### Testing Checklist

- [ ] App opens from deep link
- [ ] Verification screen loads correctly
- [ ] Token is extracted properly
- [ ] Email verification succeeds
- [ ] Success message is displayed
- [ ] Redirect to login works
- [ ] Error handling works for invalid tokens
- [ ] Error handling works for missing parameters

## Production Considerations

### URL Scheme Configuration

Ensure your `app.json` has proper deep link configuration:

```json
{
  "expo": {
    "scheme": "picala",
    "ios": {
      "bundleIdentifier": "com.picala.app",
      "associatedDomains": ["applinks:your-domain.com"]
    },
    "android": {
      "package": "com.picala.app",
      "intentFilters": [
        {
          "action": "VIEW",
          "autoVerify": true,
          "data": [
            {
              "scheme": "picala"
            }
          ],
          "category": ["BROWSABLE", "DEFAULT"]
        }
      ]
    }
  }
}
```

### Supabase Configuration

1. Set up proper redirect URLs in Supabase dashboard
2. Configure email templates with correct deep links
3. Test with real email verification flows

### Security Considerations

- Validate tokens server-side
- Implement proper error handling
- Use HTTPS for all production URLs
- Consider token expiration handling
