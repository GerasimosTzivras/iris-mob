import React, { useLayoutEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  Text,
  View,
  Button,
  TouchableHighlight,
  Image,
} from "react-native";
import styles from "./styles";
import { recipes } from "../../data/dataArrays";
import MenuImage from "../../components/MenuImage/MenuImage";
import { getCategoryName } from "../../data/MockDataAPI";
import { SelectList } from "react-native-dropdown-select-list";
import Label from "../../shared/components/Label/Label";
import useLogin from "./useLogin";

export default function LoginScreen(props) {
  const { navigation } = props;
  const [text, onChangeText] = React.useState("Useless Text");
  const [password, onChangePassword] = React.useState("Useless Text");
  const [number, onChangeNumber] = React.useState("");
  const [isEnabled, setIsEnabled] = React.useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const [selected, setSelected] = React.useState("");
  const { loading, error, onSubmit } = useLogin();
  const data = [
    { key: "1", value: "Mobiles", disabled: true },
    { key: "2", value: "Appliances" },
    { key: "3", value: "Cameras" },
    { key: "4", value: "Computers", disabled: true },
    { key: "5", value: "Vegetables" },
    { key: "6", value: "Diary Products" },
    { key: "7", value: "Drinks" },
  ];
  useLayoutEffect(() => {
    navigation.setOptions({
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

  const onPressRecipe = (item) => {
    navigation.navigate("Recipe", { item });
  };

  const renderRecipes = ({ item }) => (
    <TouchableHighlight
      underlayColor="rgba(73,182,77,0.9)"
      onPress={() => onPressRecipe(item)}
    >
      <View style={styles.container}>
        <Image style={styles.photo} source={{ uri: item.photo_url }} />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.category}>{getCategoryName(item.categoryId)}</Text>
      </View>
    </TouchableHighlight>
  );
  function handleSubmit(evt) {
    evt.preventDefault();
    const validated = Object.assign({
      username: text,
      password: password,
    });
    onSubmit(validated);
  }

  return (
    <SafeAreaView>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangePassword}
        value={password}
      />
      <Button
        onPress={handleSubmit}
        title="Learn More"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
    </SafeAreaView>
  );
}
