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
  ImageBackground,
} from "react-native";
import styles from "./styles";
import { recipes } from "../../data/dataArrays";
import MenuImage from "../../components/MenuImage/MenuImage";
import { getCategoryName } from "../../data/MockDataAPI";
import { SelectList } from "react-native-dropdown-select-list";
import Label from "../../shared/components/Label/Label";
import useLogin from "./useLogin";
import { Icon, Input } from "@rneui/base";

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
    navigation.navigate("Categories", { item });
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
      {/* <TextInput
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
      /> */}
      {/* <View style={{ alignItems: "center", height: "100%", width: "100%" }}> */}
      <ImageBackground
        source={require("../../shared/assets/login-wallpaper.jpg")}
        style={{ height: "100vh", width: "100%" }}
      >
        <View style={{ alignSelf: "center", width: "80%", marginTop: "20%" }}>
          <View style={{ alignSelf: "center" }}>
            <Image
              source={require("../../shared/assets/favicon.png")}
              // style={styles.welcomeImage}
            />
          </View>

          <Text
            style={{
              color: "#1890ff",
              fontSize: 20,
              alignSelf: "center",
              color: "white",
            }}
          >
            Iris
          </Text>
          <Text
            style={{
              color: "#1890ff",
              fontSize: 10,
              alignSelf: "center",
              color: "white",
            }}
          >
            Σύστημα Ηλεκτρονικής Διαχείρισης Εγγράφων
          </Text>

          <Input
            placeholder="Όνομα χρήστη"
            value={data.name}
            inputContainerStyle={{ borderBottomColor: "white" }}
            onChangeText={(text) => setData({ ...data, name: text })}
            autoCompleteType="username"
            textContentType="username"
            inputStyle={{ color: "white" }}
            placeholderTextColor="white"
            keyboardType="email-address"
          />

          <Input
            placeholder="Κωδικός"
            value={data.password}
            inputContainerStyle={{ borderBottomColor: "white" }}
            onChangeText={(text) => setData({ ...data, password: text })}
            autoCompleteType="password"
            textContentType="password"
            inputStyle={{ color: "white" }}
            placeholderTextColor="white"
            keyboardType="number-pad"
          />
          <Button
            icon={<Icon name="logout" type="antdesign" color="white" />}
            type="outline"
            buttonStyle={{ backgroundColor: "#ff4d4f" }}
            title=" Έξοδος"
            titleStyle={{ color: "white" }}
            onPress={() => BackHandler.exitApp()}
          />

          <Button
            icon={<Icon name="login" type="antdesign" color="white" />}
            type="outline"
            buttonStyle={{ backgroundColor: "#1890ff" }}
            titleStyle={{ color: "white" }}
            onPress={() => navigation.navigate("Main")}
            title=" Σύνδεση"
          />
        </View>
        <View style={styles.tabBarInfoContainer}>
          <Text style={{ color: "#1890ff", fontSize: 10, alignSelf: "center" }}>
            © 2023, Κέντρο Μηχανογράφησης Γενικού Επιτελείου Αεροπορίας
          </Text>
        </View>
      </ImageBackground>
      {/* </View> */}
    </SafeAreaView>
  );
}
