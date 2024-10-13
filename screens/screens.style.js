import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../constants/theme';

const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    width: SIZES.width,
    height: 75,
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent: {
    backgroundColor: "rgba(173, 255, 47, 0.9)",
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    marginHorizontal: 10,
  },
  dragHandleContainer: {
    alignItems: "center",
    paddingVertical: 10,
  },
  dragHandleContainerFixed: {
    position: "absolute",
    bottom: 90,
    left: 0,
    right: 0,
    alignItems: "center",
    paddingVertical: 10,
  },
  dragHandle: {
    width: 100,
    height: 5,
    backgroundColor: "#71727A",
    borderRadius: 2.5,
  },
  flexContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  flexSpace: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 25,
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#111",
    alignItems: "center",
    justifyContent: "center",
  },
  markerContainer: {
    alignItems: "center",
  },
  imageContainer: {
    borderWidth: 5,
    borderColor: "#000",
    borderRadius: 15,
    overflow: "hidden",
    marginBottom: 3,
  },
  markerImage: {
    width: 50,
    height: 50,
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: 25,
    height: 25,
    borderRadius: 15,
    backgroundColor: "#000",
  },
  flexSpace: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  box: {
    height: 40,
    backgroundColor: COLORS.lightInput,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  boxIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.black,
    alignItems: "center",
    justifyContent: "center",
  },
  triangle: {
    width: 0,
    height: 0,
    borderLeftWidth: 20,
    borderRightWidth: 20,
    borderBottomWidth: 40,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "red",
    position: "absolute",
    top: "50%",
    left: "50%",
    marginLeft: -20,
    marginTop: -20,
  },
  paycontainer: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  footer : {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 100,
    paddingHorizontal: 20,
    gap: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: 'black',
    marginBottom: 150, // Metni biraz yukarı çekmek için marginBottom ekledik

  },
});

export default homeStyles;