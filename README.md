# GymFit Fixed v2

This version fixes the Prebuild failure caused by missing icon/adaptive-icon files.

Important: the GitHub Actions workflow creates the icon files before Expo prebuild, so the build does not depend on whether the `assets` folder was uploaded. It also aligns React Native to Expo SDK 54 (0.81.5).

Keep the repository secret `EXPO_TOKEN`. Run Actions -> Build GymFit Android APK -> Run workflow. The finished APK is uploaded as `GymFit-APK`.
