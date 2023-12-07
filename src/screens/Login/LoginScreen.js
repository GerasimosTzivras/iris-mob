import React from "react";
import {
  SafeAreaView,
  Text,
  View,
  Button,
  ImageBackground,
  BackHandler,
} from "react-native";

import useLogin from "./useLogin";
import { Input } from "@rneui/base";
import { useAuth } from "./utils/store";

export default function LoginScreen(props) {
  const { navigation } = props;
  const { token, profile } = useAuth();
  const [text, onChangeText] = React.useState("");
  const [password, onChangePassword] = React.useState("");
  const { loading, error, onSubmit } = useLogin();

  function handleSubmit(evt) {
    evt.preventDefault();
    const validated = Object.assign({
      username: text,
      password: password,
    });
    onSubmit(validated);
    if (token) {
      navigation.navigate("Documents");
    }
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
      <ImageBackground
        source={require("../../shared/assets/login-wallpaper.jpg")}
        style={{ height: "100vh", width: "100%" }}
      >
        <View style={{ alignSelf: "center", width: "80%", marginTop: "20%" }}>
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
              marginBottom: "10%",
            }}
          >
            Σύστημα Ηλεκτρονικής Διαχείρισης Εγγράφων
          </Text>

          <Input
            placeholder="Όνομα χρήστη"
            value={text}
            inputContainerStyle={{ borderBottomColor: "white" }}
            onChangeText={onChangeText}
            autoCompleteType="username"
            textContentType="username"
            inputStyle={{ color: "white" }}
            placeholderTextColor="white"
            keyboardType="email-address"
          />

          <Input
            placeholder="Κωδικός"
            value={password}
            inputContainerStyle={{ borderBottomColor: "white" }}
            onChangeText={onChangePassword}
            autoCompleteType="password"
            textContentType="password"
            inputStyle={{ color: "white" }}
            placeholderTextColor="white"
            keyboardType="number-pad"
          />
          <Button
            color="danger"
            title="Έξοδος"
            onPress={() => BackHandler.exitApp()}
          />

          <Button
            type="outline"
            color="primary"
            onPress={handleSubmit}
            title="Σύνδεση"
          />
        </View>
        <View>
          <Text
            style={{
              color: "white",
              fontSize: 10,
              alignSelf: "center",
              marginTop: "25%",
            }}
          >
            © 2023, Κέντρο Μηχανογράφησης Γενικού Επιτελείου Αεροπορίας
          </Text>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}
