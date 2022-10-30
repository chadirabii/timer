import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

export default function App() {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [customInterval, setCustomInterval] = useState();

  //setInterval fonction tab9a t3awed f fonction bel milliseconds
  const startTimer = () => {
    setCustomInterval(
      setInterval(() => {
        changeTime();
      }, 1000)
    );
  };

  //ta3ml pause ll fonction mta3 l interval => yahbes l wa9t ma 3adch ta3ml +1
  const stopTimer = () => {
    clearInterval(customInterval);
  };

  //reset ll wa9t yarj3 lkol 00
  const clear = () => {
    setSeconds(0);
    setMinutes(0);
    setHours(0);
    clearInterval(customInterval);
  };

  //kn l seconds >60 => l minutes +1 w seconds =0 --- kifkif 3l hours kn minutes >60 => hours +1 w minutes =0
  const changeTime = () => {
    setSeconds((prevState) => {
      if (prevState + 1 == 60) {
        setMinutes((prevState) => {
          if (prevState + 1 == 60) {
            setHours((prevState) => prevState + 1);
            return 0;
          }
          return prevState + 1;
        });
        return 0;
      }
      return prevState + 1;
    });
  };
  //disable start button after it's been clicked
  const [startDisabled, setStartDisabled] = useState(false);
  const [stopDisabled, setStopDisabled] = useState(true);
  const [clearDisabled, setClearDisabled] = useState(true);

  return (
    <View style={styles.container}>
      {/* kn l wa9t a9al ml 10 yektb 0 3l ysaar */}
      <Text style={styles.textTimer}>
        {hours < 10 ? "0" + hours : hours}:
        {minutes < 10 ? "0" + minutes : minutes}:
        {seconds < 10 ? "0" + seconds : seconds}
      </Text>
      <View style={styles.buttonContainer}>
        <Button title="Start" onPress={startTimer} />
        <Button title="Pause" disabled={seconds === 0} onPress={stopTimer} />
        <Button title="Reset" disabled={seconds === 0} onPress={clear} />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e9ecef",
    alignItems: "center",
    justifyContent: "center",
  },
  textTimer: {
    fontSize: 40,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "50%",
    marginTop: 20,
  },
});
