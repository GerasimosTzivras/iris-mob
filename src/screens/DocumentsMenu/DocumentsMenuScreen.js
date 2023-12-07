import React, { useLayoutEffect } from "react";
import { FlatList, Text, View, Image, TouchableHighlight } from "react-native";
import styles from "./styles";
import { documentsMenu } from "../../data/dataArraysUpdated";
import { getNumberOfRecipes } from "../../data/MockDataAPI";
import MenuImage from "../../components/MenuImage/MenuImage";
import { Icon } from "../../shared/components/Icon";

export default function DocumentsMenuScreen(props) {
  const { navigation } = props;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleStyle: {
        fontWeight: "bold",
        textAlign: "center",
        alignSelf: "center",
        flex: 1,
      },
      headerLeft: () => (
        <MenuImage
          onPress={() => {
            navigation.openDrawer();
          }}
        />
      ),
      headerRight: () => <View />,
    });
  }, []);

  const onPressCategory = (item) => {
    const title = item.name;
    const category = item;
    navigation.navigate("RecipesList", { category, title });
  };

  const onPressCategoryUp = (item) => {
    const title = item.name;
    const category = item;
    navigation.navigate(item.page);
  };

  const renderCategory = ({ item }) => (
    <TouchableHighlight
      underlayColor="rgba(73,182,77,0.9)"
      onPress={() => onPressCategoryUp(item)}
    >
      <View style={styles.categoriesItemContainer}>
        {/* <Image
          style={styles.categoriesPhoto}
          source={{ uri: item.photo_url }}
        /> */}
        <Icon className={styles.categoriesPhoto} icon={item.icon} />
        <Text style={styles.categoriesName}>{item.name}</Text>
        {/* <Text style={styles.categoriesInfo}>
          {getNumberOfRecipes(item.id)} recipes
        </Text> */}
      </View>
    </TouchableHighlight>
  );

  return (
    <View>
      <FlatList
        data={documentsMenu}
        renderItem={renderCategory}
        keyExtractor={(item) => `${item.id}`}
      />
    </View>
  );
}
