# Firebase Setup Guide

This guide will help you set up Firebase Authentication for your Expo app.

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

## 3. Get Your Firebase Configuration

1. In your Firebase project console, click on the gear icon (⚙️) next to "Project Overview"
2. Select "Project settings"
3. Scroll down to the "Your apps" section
4. Click the web icon (</>) to add a web app
5. Enter an app nickname (e.g., "picala-web")
6. Click "Register app"
7. Copy the configuration object that looks like this:

```javascript
const firebaseConfig = {
  apiKey: 'your-api-key',
  authDomain: 'your-project-id.firebaseapp.com',
  projectId: 'your-project-id',
  storageBucket: 'your-project-id.appspot.com',
  messagingSenderId: 'your-messaging-sender-id',
  appId: 'your-app-id',
};
```

## 4. Update Your App Configuration

1. Open `config/firebase.ts` in your project
2. Replace the placeholder configuration with your actual Firebase config:

```typescript
const firebaseConfig = {
  apiKey: 'your-actual-api-key',
  authDomain: 'your-actual-project-id.firebaseapp.com',
  projectId: 'your-actual-project-id',
  storageBucket: 'your-actual-project-id.appspot.com',
  messagingSenderId: 'your-actual-messaging-sender-id',
  appId: 'your-actual-app-id',
};
```

## 5. Test Your Setup

1. Start your Expo development server: `npm start`
2. Try to register a new account using the registration form
3. Try to sign in with the created account
4. Verify that you can sign out and sign back in

## Security Rules (Optional)

For additional security, you can set up Firebase Security Rules in the Firebase Console:

1. Go to "Firestore Database" in the Firebase Console
2. Click on "Rules" tab
3. Set up appropriate security rules for your data

## Troubleshooting

- **"Firebase App named '[DEFAULT]' already exists"**: This usually means Firebase is being initialized multiple times. Make sure you're only importing the Firebase config once.
- **"auth/operation-not-allowed"**: Make sure you've enabled Email/Password authentication in the Firebase Console.
- **"auth/invalid-api-key"**: Double-check that you've copied the correct API key from your Firebase project settings.

## Environment Variables (Recommended)

For better security, consider using environment variables for your Firebase configuration:

1. Create a `.env` file in your project root
2. Add your Firebase config:

```
FIREBASE_API_KEY=your-api-key
FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
FIREBASE_APP_ID=your-app-id
```

3. Install `react-native-dotenv` if you haven't already
4. Update your `config/firebase.ts` to use environment variables

Remember to add `.env` to your `.gitignore` file to keep your Firebase credentials secure!
