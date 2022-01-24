import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { startMockAPIServer } from "./main/content/mockAPI/MockAPI";
import ProductListing from "./main/content/Components/ProductListing";
import ProductDetails from "./main/content/Components/ProductDetails";
import { LogBox } from "react-native";
import * as Sentry from "sentry-expo";
import { ErrorBoundary } from "@sentry/react";
import FallbackError from "./main/content/Components/FallbackError";
import { SENTRY_DNS } from "@env";

// TODO: Figure out root cause of this issue
LogBox.ignoreLogs(["Overwriting fontFamily", "Constants.deviceYearClass"]);

// sentry logging
Sentry.init({
  dsn: `${SENTRY_DNS}`,
  enableInExpoDevelopment: true,
  debug: true,
  tracesSampleRate: 0.01,
});

const Stack = createNativeStackNavigator();

// start mock server
if (window.server) {
  server.shutdown();
}
window.server = startMockAPIServer({ environment: "production" });

const App = () => (
  <ErrorBoundary fallback={FallbackError}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Product Listing" component={ProductListing} />
        <Stack.Screen name="Product Details" component={ProductDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  </ErrorBoundary>
);

export default App;
