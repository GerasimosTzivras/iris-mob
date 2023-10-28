import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import styles from "./styles";
import MenuButton from "../../components/MenuButton/MenuButton";

export default function DrawerContainer(props) {
  const { navigation } = props;
  return (
    <View style={styles.content}>
      <View style={styles.container}>
        <MenuButton
          title="HOME"
          source={require("../../../assets/icons/home.png")}
          onPress={() => {
            navigation.navigate("Home");
            navigation.closeDrawer();
          }}
        />
        <MenuButton
          title="Νέο έγγραφο"
          source={require("../../../assets/icons/home.png")}
          onPress={() => {
            navigation.navigate("Create");
            navigation.closeDrawer();
          }}
        />
        <MenuButton
          title="CATEGORIES"
          source={require("../../../assets/icons/category.png")}
          onPress={() => {
            navigation.navigate("Categories");
            navigation.closeDrawer();
          }}
        />
        <MenuButton
          title="Έγγραφα"
          source={require("../../../assets/icons/category.png")}
          onPress={() => {
            navigation.navigate("Documents");
            navigation.closeDrawer();
          }}
        />
        <MenuButton
          title="Εργασίες"
          source={require("../../../assets/icons/category.png")}
          onPress={() => {
            navigation.navigate("Pending");
            navigation.closeDrawer();
          }}
        />
        <MenuButton
          title="Εργαλεία"
          source={require("../../../assets/icons/category.png")}
          onPress={() => {
            navigation.navigate("Tools");
            navigation.closeDrawer();
          }}
        />
        <MenuButton
          title="SEARCH"
          source={require("../../../assets/icons/search.png")}
          onPress={() => {
            navigation.navigate("Search");
            navigation.closeDrawer();
          }}
        />
      </View>
    </View>
  );
}

DrawerContainer.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }),
};
