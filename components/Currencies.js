import React, { useCallback, useEffect, useState } from "react";
import { FlatList, StyleSheet, ScrollView, RefreshControl } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { listCurrencies } from "../actions/currencyActions";
import Item from "./Item";

export default function Currencies(props) {
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();
  const currencyList = useSelector((state) => state.currencyList);
  const { currencies } = currencyList;

  const userLogin = useSelector((state) => state.userLogin);
  const { error } = userLogin;

  const nav = props.navigation;
  const items = [];
  currencies &&
    currencies.slice(0, 10).map((item) => {
      items.push(item);
    });

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    setTimeout(() => {
      setRefreshing(false);
      dispatch(listCurrencies());
    }, 200);
  });

  useEffect(() => {
    function msToTime(duration) {
      var seconds = Math.floor((duration / 1000) % 60),
        minutes = Math.floor((duration / (1000 * 60)) % 60),
        hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

      hours = hours < 10 ? "0" + hours : hours;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      return hours + ":" + minutes;
    }

    if (error) {
      props.navigation.navigate("Login");
    } else {
      dispatch(listCurrencies());
    }
  }, [dispatch, error]);

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <FlatList
        style={{ flex: 1 }}
        data={items}
        renderItem={(props) => <Item item={props.item} navigation={nav} />}
        keyExtractor={(item) => item.id}
      />
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7",
  },
});
