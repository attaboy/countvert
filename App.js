import React, { Component } from 'react';
import {
  AppRegistry,
  Slider,
  StyleSheet,
  Text,
  View
} from 'react-native';

type State = {
  weatherTempF: number,
  ovenTempF: number,

  heightCM: number,
  lengthMM: number,
  weightLB: number
}

export default class TemperatureConverter extends Component<void, State> {
  constructor(props) {
    super(props);
    this.state = {
      weatherTempF: 70,
      ovenTempF: 350,
      heightCM: 175,
      weightLB: 150,
      lengthMM: 305
    };
    [
      'onHeightUpdate',
      'onWeatherUpdate',
      'onOvenUpdate',
      'onWeightUpdate',
      'onLengthUpdate',
    ].forEach((fn) => {
      this[fn] = this[fn].bind(this)
    });
  }

  onWeatherUpdate(v) {
    this.setState({ weatherTempF: v });
  }

  onOvenUpdate(v) {
    this.setState({ ovenTempF: v });
  }

  onHeightUpdate(v) {
    this.setState({ heightCM: v });
  }

  onWeightUpdate(v) {
    this.setState({ weightLB: v });
  }

  onLengthUpdate(v) {
    this.setState({ lengthMM: v });
  }

  fromFToC(f, round) {
    const c = (f - 32) * 5/9;
    const rounder = 1/round;
    const semiRounded = Math.round(c * rounder) / rounder;
    return `${semiRounded}°C`;
  }

  fromFToF(f) {
    return `${f}°F`;
  }

  fromCmToFtIn(cm) {
    const ONE_INCH = 2.54;
    const ONE_FOOT = ONE_INCH * 12;
    let feet = Math.floor(cm / ONE_FOOT);
    const remainder = cm % ONE_FOOT;
    let inches = Math.round(remainder / ONE_INCH);
    if (inches === 12) {
      feet += 1;
      inches = 0;
    }
    return `${feet}′${inches}″`;
  }

  fromCmToCm(cm) {
    return `${cm} cm`;
  }

  fromLbToKg(lb) {
    const kg = lb / 2.2046226218;
    const rounded = Math.round(kg);
    return `${rounded} kg`;
  }

  fromLbToLb(lb) {
    return `${lb} lb`;
  }

  inchesAndFractions(inches, fraction, fractionOf) {
    return `${
      inches > 0 ? inches : ""
    } ${
      fraction > 0 ? `${fraction}/${fractionOf}` : ""
    }″`;
  }

  fromMmToIn(mm) {
    const ONE_INCH = 25.4;
    let inches = Math.floor(mm / ONE_INCH);
    let remainder = mm % ONE_INCH;

    let sixteenths, eighths, quarters, halves;
    sixteenths = Math.round(remainder / ONE_INCH * 16);
    if (sixteenths === 0) {
      return `${inches}″`;
    } else if (sixteenths === 16) {
      inches += 1;
      return `${inches}″`;
    }

    if (sixteenths % 2 === 0) {
      eighths = Math.round(remainder / ONE_INCH * 8);
      if (eighths % 2 === 0) {
        quarters = Math.round(remainder / ONE_INCH * 4);
        if (quarters % 2 === 0) {
          halves = Math.round(remainder / ONE_INCH * 2);
          return this.inchesAndFractions(inches, halves, 2);
        } else {
          return this.inchesAndFractions(inches, quarters, 4);
        }
      } else {
        return this.inchesAndFractions(inches, eighths, 8);
      }
    } else {
      return this.inchesAndFractions(inches, sixteenths, 16);
    }
  }

  fromMmToMm(mm) {
    return `${mm} mm`;
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 30 }}>Measurements</Text>
        <View style={styles.measurements}>
          <View style={styles.group}>
            <View style={styles.groupHeading}>
              <Text style={styles.heading}>Weather</Text>
            </View>
            <View style={styles.groupContent}>
              <Text style={styles.bigValue}>{this.fromFToC(this.state.weatherTempF, 0.5)}</Text>
              <View style={{ width: "100%" }}>
                <Slider minimumValue={-40} maximumValue={120} step={1} onValueChange={this.onWeatherUpdate} value={this.state.weatherTempF}/>
              </View>
              <Text style={styles.bigValue}>{this.fromFToF(this.state.weatherTempF)}</Text>
            </View>
          </View>
          <View style={styles.group}>
            <View style={styles.groupHeading}>
              <Text style={styles.heading}>Cooking</Text>
            </View>
            <View style={styles.groupContent}>
              <Text style={styles.bigValue}>{this.fromFToC(this.state.ovenTempF, 5)}</Text>
              <View style={{ width: "100%" }}>
                <Slider minimumValue={150} maximumValue={600} step={5} onValueChange={this.onOvenUpdate} value={this.state.ovenTempF}/>
              </View>
              <Text style={styles.bigValue}>{this.fromFToF(this.state.ovenTempF)}</Text>
            </View>
          </View>
          <View style={styles.group}>
            <View style={styles.groupHeading}>
              <Text style={styles.heading}>Height</Text>
            </View>
            <View style={styles.groupContent}>
              <Text style={styles.bigValue}>{this.fromCmToCm(this.state.heightCM)}</Text>
              <View style={{ width: "100%" }}>
                <Slider minimumValue={30} maximumValue={220} step={1} onValueChange={this.onHeightUpdate} value={this.state.heightCM}/>
              </View>
              <Text style={styles.bigValue}>{this.fromCmToFtIn(this.state.heightCM)}</Text>
            </View>
          </View>
          <View style={styles.group}>
            <View style={styles.groupHeading}>
              <Text style={styles.heading}>Length</Text>
            </View>
            <View style={styles.groupContent}>
              <Text style={styles.bigValue}>{this.fromMmToMm(this.state.lengthMM)}</Text>
              <View style={{ width: "100%" }}>
                <Slider minimumValue={1} maximumValue={350} step={1} onValueChange={this.onLengthUpdate} value={this.state.lengthMM}/>
              </View>
              <Text style={styles.bigValue}>{this.fromMmToIn(this.state.lengthMM)}</Text>
            </View>
          </View>
          <View style={styles.group}>
            <View style={styles.groupHeading}>
              <Text style={styles.heading}>Weight</Text>
            </View>
            <View style={styles.groupContent}>
              <Text style={styles.bigValue}>{this.fromLbToKg(this.state.weightLB)}</Text>
              <View style={{ width: "100%" }}>
                <Slider minimumValue={10} maximumValue={300} step={5} onValueChange={this.onWeightUpdate} value={this.state.weightLB}/>
              </View>
              <Text style={styles.bigValue}>{this.fromLbToLb(this.state.weightLB)}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 32
  },
  measurements: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    padding: 5
  },
  heading: {
    fontSize: 12,
    lineHeight: 24,
    fontWeight: "bold"
  },
  bigValue: {
    fontSize: 20,
    lineHeight: 24
  },
  group: {
    flex: 1,
    width: "100%",
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 10,
  },
  groupHeading: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  groupContent: {
    flex: 4,
    flexDirection: 'column',
    alignItems: 'center',
  }
});
