import React from 'react';
import ReactNative from 'react-native';
import {
  Text,
  View
} from 'react-native';
import BreakdownRow from '../componets/BreakdownRow';
import breakdown from '../styles/breakdown';
import images from '../config/images';

// Override our Image and Text to have specific sizes
const Image = ({ style, ...props }) => <ReactNative.Image style={[breakdown.imageSize, style]} {...props} />;

export default class MatchBreakdown2019 extends React.Component {

  checkImage() {
    return (
      <Image source={images.check} />
    );
  }

  xImage() {
    return (
      <Image source={images.clear} />
    );
  }

  tempProps() {
    return {
      ...this.props,
      redBreakdown: {
        "adjustPoints": 0,
        "autoPoints": 0,
        "bay1": "Panel",
        "bay2": "None",
        "bay3": "None",
        "bay4": "None",
        "bay5": "None",
        "bay6": "Panel",
        "bay7": "None",
        "bay8": "Panel",
        "cargoPoints": 9,
        "completeRocketRankingPoint": true,
        "completedRocketFar": false,
        "completedRocketNear": false,
        "endgameRobot1": "HabLevel1",
        "endgameRobot2": "HabLevel1",
        "endgameRobot3": "HabLevel3",
        "foulCount": 0,
        "foulPoints": 0,
        "habClimbPoints": 3,
        "habDockingRankingPoint": false,
        "habLineRobot1": "None",
        "habLineRobot2": "CrossedHabLineInTeleop",
        "habLineRobot3": "None",
        "hatchPanelPoints": 12,
        "lowLeftRocketFar": "PanelAndCargo",
        "lowLeftRocketNear": "None",
        "lowRightRocketFar": "None",
        "lowRightRocketNear": "Panel",
        "midLeftRocketFar": "PanelAndCargo",
        "midLeftRocketNear": "None",
        "midRightRocketFar": "None",
        "midRightRocketNear": "Panel",
        "preMatchBay1": "Panel",
        "preMatchBay2": "Cargo",
        "preMatchBay3": "Cargo",
        "preMatchBay6": "Panel",
        "preMatchBay7": "Cargo",
        "preMatchBay8": "Panel",
        "preMatchLevelRobot1": "HabLevel1",
        "preMatchLevelRobot2": "HabLevel1",
        "preMatchLevelRobot3": "HabLevel1",
        "rp": 1,
        "sandStormBonusPoints": 0,
        "techFoulCount": 1,
        "teleopPoints": 24,
        "topLeftRocketFar": "PanelAndCargo",
        "topLeftRocketNear": "None",
        "topRightRocketFar": "None",
        "topRightRocketNear": "Panel",
        "totalPoints": 24
      },
      blueBreakdown: {
        "adjustPoints": 0,
        "autoPoints": 3,
        "bay1": "Panel",
        "bay2": "Panel",
        "bay3": "Panel",
        "bay4": "None",
        "bay5": "None",
        "bay6": "Panel",
        "bay7": "Panel",
        "bay8": "Panel",
        "cargoPoints": 9,
        "completeRocketRankingPoint": false,
        "completedRocketFar": false,
        "completedRocketNear": false,
        "endgameRobot1": "HabLevel1",
        "endgameRobot2": "HabLevel2",
        "endgameRobot3": "HabLevel1",
        "foulCount": 0,
        "foulPoints": 10,
        "habClimbPoints": 3,
        "habDockingRankingPoint": false,
        "habLineRobot1": "None",
        "habLineRobot2": "None",
        "habLineRobot3": "CrossedHabLineInSandstorm",
        "hatchPanelPoints": 12,
        "lowLeftRocketFar": "None",
        "lowLeftRocketNear": "PanelAndCargo",
        "lowRightRocketFar": "Panel",
        "lowRightRocketNear": "None",
        "midLeftRocketFar": "Panel",
        "midLeftRocketNear": "None",
        "midRightRocketFar": "None",
        "midRightRocketNear": "PanelAndCargo",
        "preMatchBay1": "Panel",
        "preMatchBay2": "Panel",
        "preMatchBay3": "Panel",
        "preMatchBay6": "Panel",
        "preMatchBay7": "Panel",
        "preMatchBay8": "Panel",
        "preMatchLevelRobot1": "HabLevel1",
        "preMatchLevelRobot2": "HabLevel2",
        "preMatchLevelRobot3": "HabLevel1",
        "rp": 2,
        "sandStormBonusPoints": 3,
        "techFoulCount": 0,
        "teleopPoints": 24,
        "topLeftRocketFar": "None",
        "topLeftRocketNear": "PanelAndCargo",
        "topRightRocketFar": "Panel",
        "topRightRocketNear": "None",
        "totalPoints": 37
      }
    }
  }

  getSandstormBonusFor(breakdown, robotNumber) {
    if (breakdown["habLineRobot" + robotNumber] == "CrossedHabLineInSandstorm") {
      if (breakdown["preMatchLevelRobot" + robotNumber] == "HabLevel1") {
        return "Level 1"
      } else if (breakdown["preMatchLevelRobot" + robotNumber] == "HabLevel2") {
        return "Level 2"
      }
    }
    return "--"
  }

  getCargoShipDataFor(breakdown) {
    var panelCount = 0
    var cargoCount = 0

    for (let i = 1; i <= 8; i++) {
      if (breakdown["bay" + i].includes("Panel")) {
        panelCount++
      }
      if (breakdown["bay" + i].includes("Cargo")) {
        panelCount++
      }
    }
    return `${panelCount} / ${cargoCount}`
  }

  getRocketShipDataFor(breakdown, rocketLocation) {
    var locations = [
      "topLeftRocket",
      "topRightRocket",
      "midLeftRocket",
      "midRightRocket",
      "lowLeftRocket",
      "lowRightRocket"
    ]
    var panelCount = 0
    var cargoCount = 0
    locations.forEach(location => {
      if (breakdown[location + rocketLocation].includes("Panel")) {
        panelCount++
      }
      if (breakdown[location + rocketLocation].includes("Cargo")) {
        cargoCount++
      }
    });
    return `${panelCount} / ${cargoCount}`
  }


  render() {
    return (
      <View style={breakdown.container}>

        <BreakdownRow data={["Teams", this.props.redTeams, this.props.blueTeams]} vertical={true} subtotal={true} />

        <BreakdownRow data={["Robot 1 Sandstorm Bonus",
          this.getSandstormBonusFor(this.tempProps().redBreakdown, 1),
          this.getSandstormBonusFor(this.tempProps().blueBreakdown, 1)]} />

        <BreakdownRow data={["Robot 2 Sandstorm Bonus",
          this.getSandstormBonusFor(this.tempProps().redBreakdown, 2),
          this.getSandstormBonusFor(this.tempProps().blueBreakdown, 2)]} />

        <BreakdownRow data={["Robot 3 Sandstorm Bonus",
          this.getSandstormBonusFor(this.tempProps().redBreakdown, 3),
          this.getSandstormBonusFor(this.tempProps().blueBreakdown, 3)]} />

        <BreakdownRow data={["Total Sandstorm Bonus",
          this.tempProps().redBreakdown.sandStormBonusPoints,
          this.tempProps().blueBreakdown.sandStormBonusPoints]} subtotal={true} />

        <BreakdownRow data={["Cargo Ship: # Hatch Panels / # Cargo",
          this.getCargoShipDataFor(this.tempProps().redBreakdown),
          this.getCargoShipDataFor(this.tempProps().blueBreakdown)]} />

        <BreakdownRow data={["Rocket 1: # Hatch Panels / # Cargo",
          this.getRocketShipDataFor(this.tempProps().redBreakdown, "Near"),
          this.getRocketShipDataFor(this.tempProps().blueBreakdown, "Near")]} />

        <BreakdownRow data={["Rocket 2: # Hatch Panels / # Cargo",
          this.getRocketShipDataFor(this.tempProps().redBreakdown, "Far"),
          this.getRocketShipDataFor(this.tempProps().blueBreakdown, "Far")]} />

        <BreakdownRow data={["Total Points: Hatch Panels / Cargo",
          `${this.tempProps().redBreakdown.hatchPanelPoints} / ${this.tempProps().redBreakdown.cargoPoints}`,
          `${this.tempProps().blueBreakdown.hatchPanelPoints} / ${this.tempProps().blueBreakdown.cargoPoints}`]} subtotal={true}/>

        <BreakdownRow data={["Total Auto",
          this.tempProps().redBreakdown.autoPoints,
          this.tempProps().blueBreakdown.autoPoints]} total={true} />

        <BreakdownRow data={["Scale Ownership + Boost (seconds)",
          [this.tempProps().redBreakdown.teleopScaleOwnershipSec, " + ", this.tempProps().redBreakdown.teleopScaleBoostSec],
          [this.tempProps().blueBreakdown.teleopScaleOwnershipSec, " + ", this.tempProps().blueBreakdown.teleopScaleBoostSec]]} />

        <BreakdownRow data={["Switch Ownership + Boost (seconds)",
          [this.tempProps().redBreakdown.teleopSwitchOwnershipSec, " + ", this.tempProps().redBreakdown.teleopSwitchBoostSec],
          [this.tempProps().blueBreakdown.teleopSwitchOwnershipSec, " + ", this.tempProps().blueBreakdown.teleopSwitchBoostSec]]} />

        <BreakdownRow data={["Ownership Points",
          this.tempProps().redBreakdown.teleopOwnershipPoints,
          this.tempProps().blueBreakdown.teleopOwnershipPoints]} subtotal={true} />

        <BreakdownRow data={["Force Cubes Total (Played)",
          [this.tempProps().redBreakdown.vaultForceTotal, " (", this.tempProps().redBreakdown.vaultForcePlayed, ")"],
          [this.tempProps().blueBreakdown.vaultForceTotal, " (", this.tempProps().blueBreakdown.vaultForcePlayed, ")"]]} />

        <BreakdownRow data={["Levitate Cubes Total (Played)",
          [this.tempProps().redBreakdown.vaultLevitateTotal, " (", this.tempProps().redBreakdown.vaultLevitatePlayed, ")"],
          [this.tempProps().blueBreakdown.vaultLevitateTotal, " (", this.tempProps().blueBreakdown.vaultLevitatePlayed, ")"]]} />

        <BreakdownRow data={["Boost Cubes Total (Played)",
          [this.tempProps().redBreakdown.vaultBoostTotal, " (", this.tempProps().redBreakdown.vaultBoostPlayed, ")"],
          [this.tempProps().blueBreakdown.vaultBoostTotal, " (", this.tempProps().blueBreakdown.vaultBoostPlayed, ")"]]} />

        <BreakdownRow data={["Vault Total Points",
          this.tempProps().redBreakdown.vaultPoints,
          this.tempProps().blueBreakdown.vaultPoints]} subtotal={true} />

        <BreakdownRow data={["Robot 1 Endgame",
          this.tempProps().redBreakdown.endgameRobot1,
          this.tempProps().blueBreakdown.endgameRobot1]} />

        <BreakdownRow data={["Robot 2 Endgame",
          this.tempProps().redBreakdown.endgameRobot2,
          this.tempProps().blueBreakdown.endgameRobot2]} />

        <BreakdownRow data={["Robot 3 Endgame",
          this.tempProps().redBreakdown.endgameRobot3,
          this.tempProps().blueBreakdown.endgameRobot3]} />

        <BreakdownRow data={["Park/Climb Points",
          this.tempProps().redBreakdown.endgamePoints,
          this.tempProps().blueBreakdown.endgamePoints]} subtotal={true} />

        <BreakdownRow data={["Total Teleop",
          this.tempProps().redBreakdown.teleopPoints,
          this.tempProps().blueBreakdown.teleopPoints]} total={true} />

        <BreakdownRow data={["Auto Quest",
          this.tempProps().redBreakdown.autoQuestRankingPoint ? this.checkImage() : this.xImage(),
          this.tempProps().blueBreakdown.autoQuestRankingPoint ? this.checkImage() : this.xImage()]} />

        <BreakdownRow data={["Face The Boss",
          this.tempProps().redBreakdown.faceTheBossRankingPoint ? this.checkImage() : this.xImage(),
          this.tempProps().blueBreakdown.faceTheBossRankingPoint ? this.checkImage() : this.xImage()]} />

        <BreakdownRow data={["Fouls",
          ["+", this.tempProps().redBreakdown.foulPoints],
          ["+", this.tempProps().blueBreakdown.foulPoints]]} />

        <BreakdownRow data={["Adjustments",
          this.tempProps().redBreakdown.adjustPoints,
          this.tempProps().blueBreakdown.adjustPoints]} />

        <BreakdownRow data={["Total Score",
          this.tempProps().redBreakdown.totalPoints,
          this.tempProps().blueBreakdown.totalPoints]} total={true} />

        {this.tempProps().compLevel == "qm" ? <BreakdownRow data={["Ranking Points",
          ["+", this.tempProps().redBreakdown.rp, " RP"],
          ["+", this.tempProps().blueBreakdown.rp, " RP"]]} /> : null}

      </View>
    );
  }
}
