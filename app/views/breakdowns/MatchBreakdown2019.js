import React from 'react';
import {
  View
} from 'react-native';
import BreakdownRow from '../../components/BreakdownRow';
import MatchBreakdown from '../breakdowns/MatchBreakdown';
import breakdownStyle from '../../styles/breakdown';
import Icon from "../../components/Icon";
// import Image from 'react-native-remote-svg';
import Svg, {
  Circle,
  Ellipse,
  G,
  Text,
  TSpan,
  TextPath,
  Path,
  Polygon,
  Polyline,
  Line,
  Rect,
  Use,
  Image,
  Symbol,
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
  ClipPath,
  Pattern,
  Mask,
} from 'react-native-svg';


// import ReactNative from 'react-native';
// const Image = ({ style, ...props }) => <ReactNative.Image style={[breakdownStyle.imageSize, style]} {...props} />;

// import SvgComponent from '../../images/svgs/temp';
// import { ReactComponent as Logo } from './../../images/svgs/baseline-trip_origin-24px.svg';

export default class MatchBreakdown2019 extends MatchBreakdown {

  getSandstormBonusFor(breakdown, robotNumber) {
    if (breakdown["habLineRobot" + robotNumber] == "CrossedHabLineInSandstorm") {
      let result = breakdown["preMatchLevelRobot" + robotNumber]
      if (result.includes("HabLevel")) {
        return `Level ${result.substr(-1)}`
      }
    }
    return "--"
  }

  getHABClimbFor(breakdown, robotNumber) {
    let result = breakdown["endgameRobot" + robotNumber]
    if (result.includes("HabLevel")) {
      return `Level ${result.substr(-1)}`
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
        cargoCount++
      }
    }
    return (
      // <Icon
      //   name="trip_origin"
      //   // color="#ccc"
      //   // size={25}
      // />

      // SvgComponent

      // console.log("TEST")
      // Logo
      // SvgComponent


      // <Svg
      //   height="100"
      //   width="100"
      // >
      //   <Rect x="0" y="0" width="100" height="100" fill="black" />
      //   <Circle cx="50" cy="50" r="30" fill="yellow" />
      //   <Circle cx="40" cy="40" r="4" fill="black" />
      //   <Circle cx="60" cy="40" r="4" fill="black" />
      //   <Path d="M 40 60 A 10 10 0 0 0 60 60" stroke="black" />
      // </Svg>

      // `1 | ${panelCount} / ${cargoCount}`
    )
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
      <View style={breakdownStyle.container}>

        <BreakdownRow data={["Teams", this.props.redTeams, this.props.blueTeams]} vertical={true} subtotal={true} />

        <BreakdownRow data={["Robot 1 Sandstorm Bonus",
          this.getSandstormBonusFor(this.props.redBreakdown, 1),
          this.getSandstormBonusFor(this.props.blueBreakdown, 1)]} />

        <BreakdownRow data={["Robot 2 Sandstorm Bonus",
          this.getSandstormBonusFor(this.props.redBreakdown, 2),
          this.getSandstormBonusFor(this.props.blueBreakdown, 2)]} />

        <BreakdownRow data={["Robot 3 Sandstorm Bonus",
          this.getSandstormBonusFor(this.props.redBreakdown, 3),
          this.getSandstormBonusFor(this.props.blueBreakdown, 3)]} />

        <BreakdownRow data={["Total Sandstorm Bonus",
          this.props.redBreakdown.sandStormBonusPoints,
          this.props.blueBreakdown.sandStormBonusPoints]} total={true} />

        <BreakdownRow data={["Cargo Ship",
          this.getCargoShipDataFor(this.props.redBreakdown),
          this.getCargoShipDataFor(this.props.blueBreakdown)]} />

        <BreakdownRow data={["Rocket 1",
          this.getRocketShipDataFor(this.props.redBreakdown, "Near"),
          this.getRocketShipDataFor(this.props.blueBreakdown, "Near")]} />

        <BreakdownRow data={["Rocket 2",
          this.getRocketShipDataFor(this.props.redBreakdown, "Far"),
          this.getRocketShipDataFor(this.props.blueBreakdown, "Far")]} />

        <BreakdownRow data={["Total Points: Hatch Panels / Cargo",
          `${this.props.redBreakdown.hatchPanelPoints} / ${this.props.redBreakdown.cargoPoints}`,
          `${this.props.blueBreakdown.hatchPanelPoints} / ${this.props.blueBreakdown.cargoPoints}`]} subtotal={true} />

        <BreakdownRow data={["Robot 1 HAB Climb",
          this.getHABClimbFor(this.props.redBreakdown, 1),
          this.getHABClimbFor(this.props.blueBreakdown, 1)]} />

        <BreakdownRow data={["Robot 2 HAB Climb",
          this.getHABClimbFor(this.props.redBreakdown, 2),
          this.getHABClimbFor(this.props.blueBreakdown, 2)]} />

        <BreakdownRow data={["Robot 3 HAB Climb",
          this.getHABClimbFor(this.props.redBreakdown, 3),
          this.getHABClimbFor(this.props.blueBreakdown, 3)]} />

        <BreakdownRow data={["HAB Climb Points",
          this.props.redBreakdown.habClimbPoints,
          this.props.blueBreakdown.habClimbPoints]} subtotal={true} />

        <BreakdownRow data={["Total Teleop",
          this.props.redBreakdown.teleopPoints,
          this.props.blueBreakdown.teleopPoints]} total={true} />

        <BreakdownRow data={["Complete Rocket",
          this.props.redBreakdown.completeRocketRankingPoint ? this.checkImage() : this.xImage(),
          this.props.blueBreakdown.completeRocketRankingPoint ? this.checkImage() : this.xImage()]} />

        <BreakdownRow data={["HAB Docking",
          this.props.redBreakdown.habDockingRankingPoint ? this.checkImage() : this.xImage(),
          this.props.blueBreakdown.habDockingRankingPoint ? this.checkImage() : this.xImage()]} />

        <BreakdownRow data={["Fouls",
          ["+", this.props.redBreakdown.foulPoints],
          ["+", this.props.blueBreakdown.foulPoints]]} />

        <BreakdownRow data={["Adjustments",
          this.props.redBreakdown.adjustPoints,
          this.props.blueBreakdown.adjustPoints]} />

        <BreakdownRow data={["Total Score",
          this.props.redBreakdown.totalPoints,
          this.props.blueBreakdown.totalPoints]} total={true} />

        {this.props.compLevel == "qm" ? <BreakdownRow data={["Ranking Points",
          ["+", this.props.redBreakdown.rp, " RP"],
          ["+", this.props.blueBreakdown.rp, " RP"]]} /> : null}

      </View>
    );
  }
}
