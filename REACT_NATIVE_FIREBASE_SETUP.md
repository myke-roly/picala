# React Native Firebase Setup Guide

This guide will help you set up React Native Firebase for your Expo app.

## 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or "Add project"
3. Enter a project name (e.g., "picala-app")
4. Choose whether to enable Google Analytics (optional)
5. Click "Create project"

## 2. Enable Authentication

1. In your Firebase project console, click on "Authentication" in the left sidebar
2. Click "Get started"
3. Go to the "Sign-in method" tab
4. Enable "Email/Password" authentication:
   - Click on "Email/Password"
   - Toggle the "Enable" switch
   - Click "Save"

## 3. Add Android App

1. In your Firebase project console, click on the gear icon (⚙️) next to "Project Overview"
2. Select "Project settings"
3. Scroll down to the "Your apps" section
4. Click the Android icon (🤖) to add an Android app
5. Enter your Android package name (found in `app.json` under `expo.android.package`)
6. Enter app nickname (e.g., "picala-android")
7. Click "Register app"
8. Download the `google-services.json` file

## 4. Add iOS App

1. In the same "Your apps" section, click the iOS icon (🍎) to add an iOS app
2. Enter your iOS bundle ID (found in `app.json` under `expo.ios.bundleIdentifier`)
3. Enter app nickname (e.g., "picala-ios")
4. Click "Register app"
5. Download the `GoogleService-Info.plist` file

## 5. Configure Your App

### For Development (Expo Go)

Since you're using Expo, you'll need to configure the Firebase project settings:

1. In Firebase Console, go to "Project settings"
2. Under "General" tab, scroll down to "Your apps"
3. Make sure both Android and iOS apps are registered
4. The configuration will be handled automatically by React Native Firebase

### For Production (EAS Build)

1. Place `google-services.json` in the `android/app/` directory
2. Place `GoogleService-Info.plist` in the `ios/` directory
3. These files will be included in your build

## 6. Update app.json

Make sure your `app.json` has the correct package names:

```json
{
  "expo": {
    "android": {
      "package": "com.yourcompany.picala"
    },
    "ios": {
      "bundleIdentifier": "com.yourcompany.picala"
    }
  }
}
```

## 7. Test Your Setup

1. Start your Expo development server: `npm start`
2. Try to register a new account using the registration form
3. Try to sign in with the created account
4. Verify that you can sign out and sign back in

## Troubleshooting

- **"Firebase App named '[DEFAULT]' already exists"**: This usually means Firebase is being initialized multiple times.
- **"auth/operation-not-allowed"**: Make sure you've enabled Email/Password authentication in the Firebase Console.
- **"auth/invalid-api-key"**: Double-check that you've registered the correct apps in Firebase Console.

## Important Notes

- React Native Firebase automatically handles configuration from the native files
- No need for environment variables with React Native Firebase
- The `.env` file is no longer needed and can be deleted
- Make sure your package names in `app.json` match what you registered in Firebase Console
