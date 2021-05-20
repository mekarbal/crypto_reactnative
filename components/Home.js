import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { register, login, addUser } from "../actions/userActions";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Home = (props) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);

  const { error } = userLogin;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [signed, setSigned] = useState(true);

  const signup = async () => {
    dispatch(register(email, password));
    setSigned(false);

    // props.navigation.navigate("Currency");
  };

  const signin = async () => {
    await dispatch(login(email, password));
    props.navigation.navigate("Currency");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Crypto</Text>
      {error && (
        <Text style={{ fontWeight: "bold", color: "#fb5b5a", padding: 12 }}>
          {error}
        </Text>
      )}
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Email..."
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          secureTextEntry
          style={styles.inputText}
          placeholder="Password..."
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setPassword(text)}
        />
      </View>

      <TouchableOpacity style={styles.loginBtn} onPress={() => signin()}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
      {signed && (
        <TouchableOpacity style={styles.loginBtn} onPress={() => signup()}>
          <Text style={styles.loginText}>Signup</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#003f5c",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#fb5b5a",
    marginBottom: 40,
  },
  inputView: {
    width: "80%",
    backgroundColor: "#465881",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
  },
  inputText: {
    height: 50,
    color: "white",

    borderColor: "red",
  },
  forgot: {
    color: "white",
    fontSize: 11,
  },
  loginBtn: {
    width: "80%",
    backgroundColor: "#fb5b5a",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10,
  },
  loginText: {
    color: "white",
  },
});
