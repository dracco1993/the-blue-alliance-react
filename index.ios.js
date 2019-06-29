"use strict";

import { AppRegistry, Alert } from "react-native";
import { NativeModules } from "react-native";

import MatchBreakdown2015 from "./app/views/breakdowns/MatchBreakdown2015";
import MatchBreakdown2016 from "./app/views/breakdowns/MatchBreakdown2016";
import MatchBreakdown2017 from "./app/views/breakdowns/MatchBreakdown2017";
import MatchBreakdown2018 from "./app/views/breakdowns/MatchBreakdown2018";
import MatchBreakdown2019 from "./app/views/breakdowns/MatchBreakdown2019";
import EventInsights2016 from "./app/views/event-insights/EventInsights2016";
import EventInsights2017 from "./app/views/event-insights/EventInsights2017";
import EventInsights2018 from "./app/views/event-insights/EventInsights2018";
import EventInsights2019 from "./app/views/event-insights/EventInsights2019";

AppRegistry.registerComponent("MatchBreakdown2015", () => MatchBreakdown2015);
AppRegistry.registerComponent("MatchBreakdown2016", () => MatchBreakdown2016);
AppRegistry.registerComponent("MatchBreakdown2017", () => MatchBreakdown2017);
AppRegistry.registerComponent("MatchBreakdown2018", () => MatchBreakdown2018);
AppRegistry.registerComponent("MatchBreakdown2019", () => MatchBreakdown2019);
AppRegistry.registerComponent("EventInsights2016", () => EventInsights2016);
AppRegistry.registerComponent("EventInsights2017", () => EventInsights2017);
AppRegistry.registerComponent("EventInsights2018", () => EventInsights2018);
AppRegistry.registerComponent("EventInsights2019", () => EventInsights2019);

ErrorUtils.setGlobalHandler(function(e, isFatal) {
  console.log("No good things...");
  console.log(e);
  console.log(isFatal);

  const isAppRegistryError = e.message.includes(
    "AppRegistry.registerComponent"
  );

  // Figure out if the error being throw is an unregistered view error

  // If it is, just alert the user and restart?
  if (isAppRegistryError) {
    Alert.alert(
      "This is a test",
      "An unexpected error has occurred. Please restart to continue.",
      [
        {
          text: "buttonText",
          onPress: () => {
            console.log("TEST");
            // console.log(RNRestart);
            NativeModules.DevSettings.reload();

            // Immediately reload the React Native Bundle
            // require("RNRestart").Restart();

            // RNRestart.Restart();
          }
        }
      ],
      { cancelable: false }
    );
  } else {
    require("ExceptionsManager").handleException(e, isFatal);
  }

  // If it's not, something else is wrong and we
  // should just do what the default handler does
  // require("ExceptionsManager").handleException(e, isFatal);

  // try {
  //   throw new Error("NOPE");
  //   require("ExceptionsManager").handleException(e, isFatal);
  // } catch (ee) {
  //   console.log("Failed to print error: ", ee.message);
  // }
});
