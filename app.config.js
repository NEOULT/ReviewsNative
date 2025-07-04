export default {
  expo: {
    name: "ReviewsNative",
    slug: "ReviewsNative",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/peliculas-tv.jpeg",
    scheme: "reviewsnative",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    extra: {
      EXPO_PUBLIC_API_URL: process.env.EXPO_PUBLIC_API_URL || "http://localhost:3000/api",
      "eas": {
        "projectId": "9ef771a0-dda4-4015-bd0a-1cf89ae0a8fa"
      }
    },
    ios: {
      supportsTablet: true
    },
    android: {
      package: "com.ange1024.ReviewsNative",
      adaptiveIcon: {
        foregroundImage: "./assets/images/peliculas-tv.jpeg",
        backgroundColor: "#ffffff"
      },
      edgeToEdgeEnabled: true
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png"
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/peliculas-tv.jpeg",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff"
        }
      ]
    ],
    experiments: {
      typedRoutes: true
    }
  }
};