# GymFit 💪

A modern dark-themed fitness app built with Expo + React Native.

## Included
- Home dashboard
- Workout plans: Chest, Back, Shoulder, Arms, Legs, Full Body
- Exercise instructions
- Rest timer
- Progress tracking
- Water tracker
- Diet / meal plan
- Achievements
- Profile and settings
- Custom GymFit Android icon

## Run locally
```bash
npm install
npx expo start
```

Then scan the QR code with Expo Go, or run:
```bash
npx expo start --android
```

## Build Android APK with EAS
1. Install EAS:
```bash
npm install -g eas-cli
```
2. Login:
```bash
eas login
```
3. Configure the project:
```bash
eas build:configure
```
4. Build:
```bash
eas build -p android --profile preview
```

For a directly installable APK, the `preview` profile is configured with internal distribution.

## Important
This is a complete working starter app. Exercise images/videos, cloud accounts, push notifications, online database and real authentication can be added as the next version.
