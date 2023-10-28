import React, { useLayoutEffect } from "react";
import { FlatList, Text, View, TouchableHighlight, Image } from "react-native";
import styles from "./styles";
import { getRecipes, getCategoryName } from "../../data/MockDataAPI";

export default function PendingScreen(props) {
  const { navigation, route } = props;

  const item = route?.params?.category;
  const recipesArray = getRecipes(item.id);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params?.title,
      headerRight: () => <View />,
    });
  }, []);

  const onPressRecipe = (item) => {
    navigation.navigate("Recipe", { item });
  };

  const renderRecipes = ({ item }) => (
    <TouchableHighlight
      underlayColor="rgba(73,182,77,0.9)"
      onPress={() => onPressRecipe(item)}
    >
      <View
        style={{
          borderColor: "black",
          borderWidth: "2px",
          marginLeft: "2%",
          marginRight: "2%",
        }}
      >
        <Text>{item.photo_url}</Text>
        <Text>{item.title}</Text>
        <TableCellItem label="Θέμα" value={item.title} />
        <Text>{getCategoryName(item.categoryId)}</Text>
      </View>
    </TouchableHighlight>
  );

  return (
    <View>
      <FlatList
        vertical
        showsVerticalScrollIndicator={false}
        numColumns={1}
        data={recipesArray}
        renderItem={renderRecipes}
        keyExtractor={(item) => `${item.recipeId}`}
      />
    </View>
  );
}

function TableCellItem({ label, value }) {
  return (
    <>
      <Text>
        <b>{label}:</b> {value}
      </Text>
    </>
  );
}
