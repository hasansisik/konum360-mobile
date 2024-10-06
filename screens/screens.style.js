import { StyleSheet } from 'react-native';
import { SIZES } from '../constants/theme';

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
    bottom: 0,
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
});

export default homeStyles;