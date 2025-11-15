# Wifi Dabba - Take-Home Assignment

This is the completed take-home assignment for the Frontend Developer position at Wifi Dabba.

### Quick Test (APK)

A pre-built APK is available for immediate testing.

**[Download the APK from the latest GitHub Release](https://github.com/git-0r/WifiDabba/releases/latest)**

---

## Features Implemented

This project successfully fulfills all requirements outlined in the assignment brief.

### 1. Onboarding Flow

- A 3-step, swipeable onboarding experience.
- Uses a `FlatList` with `pagingEnabled` for smooth swiping.
- Features a footer with animated pagination dots that react to the user's scroll.
- The "Continue" button dynamically changes to "Get Started" on the last slide.

### 2. Authentication / Sign-in

- Clicking "Get Started" opens a **modal bottom sheet** directly over the Onboarding screen, providing a seamless UX.
- The sheet presents "Sign Up" and "Login" options.
- The "Sign Up" form collects **Name** and **Email**.
- User data is saved locally using **AsyncStorage** and managed globally with **React Context** (`AuthContext`).
- The app's navigation is state-aware; a successful sign-up automatically navigates the user to the main app interface.

### 3. Custom Tab Bar

- **Tab 1 (Home):** Displays a "Welcome" greeting to the signed-in user, showing their **Name** and **Email** in a styled card.
- **Tab 2 (Settings):** Displays a list view showing the logged-in user's details.

### 4. Table View / API Integration

- The **Settings** screen fetches and displays a list of users from the `https://jsonplaceholder.typicode.com/users` endpoint.
- Tapping on any user from the API list navigates to a **User Details** screen.
- The **User Details** screen fetches and displays detailed information for the selected user from `https://jsonplaceholder.typicode.com/users/{userId}`.

### 5. Optional Enhancements

- **Modern Aesthetics:** All screens (Onboarding, Auth, Home, Settings, Details) were custom-styled with a modern, "card-based" UI, icons, and a clean typographic hierarchy.
- **Centralized Theme System:** The app is built on a clean theme system using a custom `useTheme()` hook. It fully supports **Light and Dark modes** by defining all colors centrally in `constants/Colors.ts`.
- **Component Modularity:** Large components (`OnboardingScreen`, `AuthSheet`) were refactored into smaller, memoized child components for performance and maintainability.
- **Logout Functionality:** A logout button with a confirmation dialog was added to the Settings screen, demonstrating full auth-state lifecycle management.
- **Pull-to-Refresh:** The API user list on the Settings screen can be refreshed using a native `RefreshControl`.
- **API Service Layer:** All `fetch` logic was abstracted into a dedicated `services/api.ts` file, separating data logic from view components.
- **Error Handling:** All API-connected screens feature `isLoading` and `error` states, showing loading spinners and user-friendly error messages with a "Retry" option.

---

## Tech Stack

- **Framework:** React Native (with Expo SDK)
- **Language:** TypeScript
- **UI Components:** `@gorhom/bottom-sheet`
- **State Management:** React Context (`AuthContext`)
- **Local Storage:** `@react-native-async-storage/async-storage`
- **Styling:** Centralized `useTheme` hook, `StyleSheet`

---

## How to Run Locally

Follow these instructions to run the app in your local development environment.

### Prerequisites

- Node.js (LTS version)
- Git
- [Expo Go app](https://expo.dev/go) on your physical device (iOS or Android)

### Setup Instructions

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/git-0r/WifiDabba.git
    cd WifiDabba
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Run the application:**

    ```bash
    npx expo start
    ```

4.  **Open the app:**
    - Scan the QR code printed in your terminal with the **Expo Go** app on your phone.
