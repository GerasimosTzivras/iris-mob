import React, { Suspense, lazy } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../screens/Home/HomeScreen";
import CategoriesScreen from "../screens/Categories/CategoriesScreen";
import RecipeScreen from "../screens/Recipe/RecipeScreen";
import RecipesListScreen from "../screens/RecipesList/RecipesListScreen";
import DrawerContainer from "../screens/DrawerContainer/DrawerContainer";
import IngredientScreen from "../screens/Ingredient/IngredientScreen";
import SearchScreen from "../screens/Search/SearchScreen";
import IngredientsDetailsScreen from "../screens/IngredientsDetails/IngredientsDetailsScreen";
import CreateScreen from "../screens/Create/CreateScreen";
import DocumentsMenuScreen from "../screens/DocumentsMenu/DocumentsMenuScreen";
import ToolsMenuScreen from "../screens/ToolsMenu/ToolsMenuScreen";
import LoginScreen from "../screens/Login/LoginScreen";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "react-query";
const PendingScreen = lazy(() =>
  import("../modules/documents/screens/Pending/PendingScreen")
);
const InfoScreen = lazy(() =>
  import("../modules/documents/screens/Info/InfoScreen")
);
const ViewScreen = lazy(() => import("../modules/documents/screens/View"));

const Stack = createStackNavigator();

function MainNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={LoginScreen} />
      <Stack.Screen name="Create" component={LoginScreen} />
      <Stack.Screen name="Categories" component={CategoriesScreen} />
      <Stack.Screen name="Documents" component={DocumentsMenuScreen} />
      <Stack.Screen name="Tasks" component={CategoriesScreen} />
      <Stack.Screen name="Tools" component={ToolsMenuScreen} />
      <Stack.Screen name="Recipe" component={RecipeScreen} />
      <Stack.Screen name="RecipesList" component={RecipesListScreen} />
      <Stack.Screen name="Pending" component={PendingScreen} />
      <Stack.Screen name="Info" component={InfoScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="ViewDocument" component={ViewScreen} />
      <Stack.Screen name="Ingredient" component={IngredientScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen
        name="IngredientsDetails"
        component={IngredientsDetailsScreen}
      />
    </Stack.Navigator>
  );
}

const Drawer = createDrawerNavigator();

function DrawerStack() {
  return (
    <Drawer.Navigator
      drawerPosition="left"
      initialRouteName="Main"
      drawerStyle={{
        width: 250,
      }}
      screenOptions={{ headerShown: false }}
      drawerContent={({ navigation }) => (
        <DrawerContainer navigation={navigation} />
      )}
    >
      <Drawer.Screen name="Main" component={MainNavigator} />
    </Drawer.Navigator>
  );
}
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      cacheTime: 0,
      suspense: true,
    },
  },
});

export default function AppContainer() {
  return (
    <RecoilRoot>
      <Suspense fallback={<LoadingFallback />}>
        <NavigationContainer>
          <QueryClientProvider client={queryClient}>
            <DrawerStack />
          </QueryClientProvider>
        </NavigationContainer>
      </Suspense>
    </RecoilRoot>
  );
}

function LoadingFallback() {
  return (
    <div>
      <p>Loading...</p>
    </div>
  );
}

console.disableYellowBox = true;
