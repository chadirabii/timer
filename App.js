import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

export default function App() {
  const [seconds, setSeconds] = useState(55);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [customInterval, setCustomInterval] = useState();
  const [isStarted, setIsStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isReseted, setIsReseted] = useState(false);
  //setInterval fonction tab9a t3awed f fonction bel milliseconds
  const startTimer = () => {
    setIsStarted(true);
    setIsPaused(false);
    setIsReseted(false);
    setCustomInterval(
      setInterval(() => {
        changeTime();
      }, 1000)
    );
  };

  //ta3ml pause ll fonction mta3 l interval => yahbes l wa9t ma 3adch ta3ml +1
  const stopTimer = () => {
    clearInterval(customInterval);
    setIsStarted(false);
    setIsPaused(true);
  };

  //reset ll wa9t yarj3 lkol 00
  const clear = () => {
    setSeconds(0);
    setMinutes(0);
    setHours(0);
    clearInterval(customInterval);
    setIsStarted(false);
    setIsReseted(true);
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

  return (
    <View style={styles.container}>
      {/* kn l wa9t a9al ml 10 yektb 0 3l ysaar */}
      <Text style={styles.textTimer}>
        {hours < 10 ? "0" + hours : hours}:
        {minutes < 10 ? "0" + minutes : minutes}:
        {seconds < 10 ? "0" + seconds : seconds}
      </Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Start"
          disabled={isStarted ? true : false}
          onPress={startTimer}
        />
        <Button
          title="Pause"
          disabled={
            (seconds === 0 && minutes === 0 && hours === 0) ||
            (isPaused ? true : false)
          }
          onPress={stopTimer}
        />

        <Button
          title="Reset"
          disabled={
            (seconds === 0 && minutes === 0 && hours === 0) ||
            (isReseted ? true : false)
          }
          onPress={clear}
        />
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
