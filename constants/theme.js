import { Dimensions } from 'react-native'
const { height, width } = Dimensions.get('window');

const COLORS = {
  primary: "#BDFE06",
  transparent: "transparent",
  blue: "#4267B2",
  red: "#D80000",
  green: "#2AC65F",
  white: "#FBFBFB",
  lightWhite: "#FFFFFF",
  lightBlue: "#6885C1",
  lightRed: "#EB9C9B",
  lightGreen: "#73ADA1",
  black: "#121212",
  dark: "#3D3A45",
  gray: "#8C8896",
  lightGrey: "#CACACA",
  lightBlack: "#292929",
  nagivationPrimary: "#2E2E2E",
  description: "#71727A",
  lightInput: "#F5F5F5",
  lightBack: "#E8E8E8",
  lightBorder: "#DDDDDD",
};


const SIZES = {
    xSmall: 10,
    small: 14,
    medium: 16,
    large: 18,
    xLarge: 20,
    xxLarge: 44,
    height,
    width
};

const TEXT = {
    xxSmall: 11,
    xSmall: 13,
    small: 15,
    medium: 17,
    large: 19,
    xLarge: 27,
    xxLarge: 32,
};


const SHADOWS = {
    small: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 2,
    },
    medium: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 5.84,
        elevation: 5,
    },
    large: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 7.84,
        elevation: 10,
    },
};


export { COLORS, SIZES, SHADOWS, TEXT };