import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Button,
  ScrollView,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import { useDispatch, useSelector } from "react-redux";
import {
  currencyDetail,
  currencyDetailsByUserId,
  currencyRegister,
  currencySell,
  sendMail,
} from "../actions/currencyActions";
import Slider from "@react-native-community/slider";

const SingleCurrency = (props) => {
  const { id, price } = props.route.params;
  const [sel, setSell] = useState(false);
  const [buy, setBuy] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [solde, setSolde] = useState(0);
  const [soldeSell, setSoldeSell] = useState(0);
  const [soldeBuy, setSoldeBuy] = useState(0);
  const [localCrncy, setLocalCrncy] = useState("");
  let subject = "Payement passed sucessfully";
  let textSell = "you selled successfully";
  let textBuy = "you Buyed successfully";

  const dispatch = useDispatch();
  const currencyDetails = useSelector((state) => state.currencyDetails);
  const { currency } = currencyDetails;

  const userWallet = useSelector((state) => state.userWallet);
  const { wallet } = userWallet;

  const userLogged = useSelector((state) => state.userLogin);
  userLogged && console.log(userLogged.userInfo.email);
  const user = useSelector((state) => state.user);
  var result = [];
  let dates = [];
  let prices = [];
  var nowHour = new Date().getHours();

  for (var i = nowHour; i <= 24; i++) {
    if (i > 12) {
      result.push(i + "PM");
    } else {
      result.push(i + "AM");
    }
  }

  const decimals = (num) => {
    let number = parseFloat(num).toFixed(2);
    return number;
  };

  function msToTime(duration) {
    var hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
    hours = hours < 10 ? "0" + hours : hours;
    return hours;
  }

  const sell = () => {
    setSell(!sel);
    buy && setBuy(!buy);
  };
  const buySection = () => {
    setBuy(!buy);
    sel && setSell(!sel);
  };
  currency &&
    currency.map((dataC) => {
      const time = msToTime(dataC.time);
      dates.push(time);
      prices.push(parseInt(dataC.priceUsd));
    });

  const calculValue = (soldeBuy, price) => {
    return (soldeBuy * 1) / price;
  };
  const calculPrice = (soldeSell, price) => {
    return soldeSell * price;
  };
  useEffect(() => {
    dispatch(currencyDetail(id));
    if (user) {
      setUserInfo(user.userInfo);
      setLocalCrncy(user.userInfo.localCrncy);
      setSolde(user.userInfo.solde);
      dispatch(currencyDetailsByUserId(userInfo.id));
    }
  }, [dispatch, userInfo, user, solde, localCrncy]);

  return (
    <ScrollView>
      <View style={{ alignItems: "center" }}>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ fontSize: 20, padding: 20, color: "black" }}>
            {id.toUpperCase()}
          </Text>
          <Text style={{ fontSize: 18, padding: 20, color: "black" }}>
            ${price}
          </Text>
        </View>

        {userInfo && (
          <View
            style={{
              alignItems: "center",
              backgroundColor: "#003f5c",
              height: 50,
              width: "95%",
              flexDirection: "row",
              justifyContent: "space-between",
              padding: 20,
              borderRadius: 36,
            }}
          >
            <Text style={{ color: "white" }}>Solde : {decimals(solde)}</Text>
            <Text style={{ color: "white" }}>Currency : {localCrncy}</Text>
            {wallet && wallet.value > 0 && (
              <Text style={{ color: "white" }}>
                Value of {wallet && wallet.cryp_name} : {wallet && wallet.value}
              </Text>
            )}
          </View>
        )}

        {currency !== null ? (
          <LineChart
            data={{
              labels: dates && dates,
              datasets: [
                {
                  data: prices && prices,
                },
              ],
            }}
            width={Dimensions.get("window").width - 35} // from react-native
            height={300}
            yAxisLabel="$"
            yAxisSuffix="k"
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundColor: "#e26a00",
              backgroundGradientFrom: "#003f5c",
              backgroundGradientTo: "#003f5c",
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: "6",
                strokeWidth: ".5",
                stroke: "#ffa726",
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        ) : (
          <Text>no data here</Text>
        )}

        {wallet && wallet.value > 0 && solde > 0 && wallet.cryp_name === id && (
          <TouchableOpacity
            style={styles.loginBtn}
            onPress={() => buySection()}
          >
            <Text style={{ color: "white" }}>SELL</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.loginBtn} onPress={() => sell()}>
          <Text style={{ color: "white" }}>BUY</Text>
        </TouchableOpacity>

        {buy && wallet && wallet.value > 0 && (
          <View style={(styles.sellesView, { marginTop: 24 })}>
            <Text>Choose Your Solde</Text>
            <Slider
              style={{ width: 200, height: 40 }}
              minimumValue={0}
              maximumValue={wallet && wallet.value}
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="#000000"
              onValueChange={(soldeSell) => {
                setSoldeSell(soldeSell);
              }}
            />
            {wallet && wallet.value > 0 && wallet.cryp_name === id && (
              <>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                  }}
                >
                  <Text>Currency value : </Text>
                  <Text>{soldeSell}</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                  }}
                >
                  <Text>price : </Text>
                  <Text>${calculPrice(soldeSell, decimals(price))}</Text>
                </View>

                <TouchableOpacity
                  style={styles.sellesButton}
                  onPress={async () => {
                    await dispatch(
                      currencySell(
                        userInfo.id,
                        id,
                        soldeSell,
                        calculPrice(soldeSell, decimals(price))
                      )
                    );
                    await dispatch(currencyDetailsByUserId(userInfo.id));

                    await dispatch(
                      sendMail(
                        userLogged.userInfo.email,
                        subject,
                        textSell,
                        id,
                        soldeSell,
                        calculPrice(soldeSell, decimals(price))
                      )
                    );
                    props.navigation.navigate("Currency");
                  }}
                >
                  <Text style={{ color: "white" }}>SELL</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        )}

        {sel && (
          <View style={styles.sellesView}>
            <Text>Choose Your Solde</Text>
            <Slider
              style={{ width: "80%", height: 40 }}
              minimumValue={0}
              maximumValue={solde && solde}
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="#000000"
              onValueChange={(soldeBuy) => {
                setSoldeBuy(soldeBuy);
              }}
            />
            {soldeBuy !== 0 && (
              <>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                  }}
                >
                  <Text>Currency value : </Text>
                  <Text>{calculValue(decimals(soldeBuy), price)}</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                  }}
                >
                  <Text>Solde : </Text>
                  <Text>{decimals(soldeBuy)}</Text>
                </View>

                <TouchableOpacity
                  style={styles.sellesButton}
                  onPress={async () => {
                    await dispatch(
                      currencyRegister(
                        userInfo.id,
                        id,
                        calculValue(decimals(soldeBuy), price),
                        soldeBuy
                      )
                    );
                    await dispatch(currencyDetailsByUserId(userInfo.id));
                    await dispatch(
                      sendMail(
                        userLogged.userInfo.email,
                        subject,
                        textBuy,
                        id,
                        calculValue(decimals(soldeBuy), price),
                        soldeBuy
                      )
                    );
                    props.navigation.navigate("Currency");
                  }}
                >
                  <Text style={{ color: "white" }}>BUY</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  loginBtn: {
    width: "80%",
    backgroundColor: "#003f5c",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10,
  },
  sellesView: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
  },
  sellesButton: {
    width: "60%",
    backgroundColor: "#003f5c",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10,
  },
});
export default SingleCurrency;
