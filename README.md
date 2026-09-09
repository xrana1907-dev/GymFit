# GymFit Fixed

This is a cleaned, minimal Expo/React Native GymFit app intended to avoid startup crashes and blank screens.

## GitHub APK build

1. Upload all files in this project to your GitHub repository root.
2. Keep the repository secret `EXPO_TOKEN`.
3. Open **Actions** -> **Build GymFit Android APK** -> **Run workflow**.
4. After the workflow finishes, download **GymFit-APK** from the Artifacts section.

## Important

- Do not upload the ZIP itself as one file. Extract it first and upload the project files/folders.
- `.github/workflows/build-apk.yml` must remain in exactly that folder.
- The Android package is `com.gymfit.app`.
