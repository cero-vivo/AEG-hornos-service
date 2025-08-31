# Firebase Setup Guide

## Firestore Security Rules

The project includes security rules to allow customer data storage while maintaining security.

### Current Rules (`firestore.rules`)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read access to all documents
    match /{document=**} {
      allow read: if true;
    }
    
    // Allow write access to customers collection for form submissions
    match /customers/{customerId} {
      allow create: if true;        // Anyone can submit the form
      allow read: if true;         // Anyone can read customer data
      allow update: if request.auth != null;  // Only authenticated users can update
      allow delete: if false;       // No one can delete
    }
  }
}
```

## How to Deploy Security Rules

### Method 1: Firebase Console (Recommended)
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project
3. Navigate to **Firestore Database** → **Rules**
4. Replace the existing rules with the content from `firestore.rules`
5. Click **Publish**

### Method 2: Firebase CLI
1. Install Firebase CLI if not already installed:
   ```bash
   npm install -g firebase-tools
   ```

2. Login to Firebase:
   ```bash
   firebase login
   ```

3. Initialize Firebase in your project (if not already done):
   ```bash
   firebase init
   ```

4. Deploy rules:
   ```bash
   firebase deploy --only firestore:rules
   ```

## Required Firebase Configuration

### Enable Firestore Database
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project
3. Click **Firestore Database** in the left sidebar
4. Click **Create database**
5. Choose **Start in production mode** (we'll add rules later)
6. Select your region (choose the closest to your users)

### Environment Variables

Ensure these variables are set in your `.env.local`:

```bash
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

## Testing Firestore Permissions

### Test Data Saving
1. Start the development server:
   ```bash
   npm run dev
   ```

2. Fill out the contact form
3. Check Firestore console for new entries in the `customers` collection

### Verify Rules
You can test the rules using the Firebase Emulator Suite:

```bash
firebase emulators:start --only firestore
```

## Security Best Practices

### For Production
Consider these enhancements for production:

1. **Rate Limiting**: Add rate limiting rules
2. **Validation Rules**: Add field validation in security rules
3. **Authentication**: Consider adding authentication for admin access
4. **Data Retention**: Implement data retention policies

### Enhanced Rules Example
```javascript
// More restrictive rules for production
match /customers/{customerId} {
  allow create: if 
    request.resource.data.nombre is string &&
    request.resource.data.nombre.size() > 0 &&
    request.resource.data.email is string &&
    request.resource.data.email.matches('.*@.*\\..*');
  
  allow read: if true;
  allow update: if request.auth != null;
  allow delete: if false;
}
```

## Troubleshooting

### Common Issues

1. **"Missing or insufficient permissions"**
   - Ensure rules are published in Firebase Console
   - Check that Firestore is enabled for your project
   - Verify environment variables are correct

2. **"Project not found"**
   - Verify the project ID in your environment variables
   - Ensure the Firebase project exists

3. **"Permission denied"**
   - Check that the `customers` collection exists
   - Verify the rules syntax is correct

### Debug Steps
1. Check browser console for detailed error messages
2. Verify Firebase project configuration
3. Test with Firebase Emulator Suite
4. Check Firestore console for active rules

## Next Steps

After setting up security rules:
1. Test customer data persistence
2. Verify email notifications still work
3. Consider adding admin dashboard for customer management
4. Implement photo upload to Firebase Storage (optional)