import React, { useState } from "react";
import { View, FlatList, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { COLORS, SIZES, TEXT } from "../../constants/theme";
import { ReusableText } from "../../components";
import HomeCard from "../../components/Card/homeCard";
import homeStyles from "../../screens/screens.style";
import LocationShareModal from "./LocationShareModal";
import LocationAddModal from "./LocationAddModal";

const HomeModal = ({ isModalVisible, toggleModal, data }) => {
  const [isShareModalVisible, setShareModalVisible] = useState(false);
  const [isAddModalVisible, setAddModalVisible] = useState(false);

  const openShareModal = () => {
    setShareModalVisible(true);
  };

  const openAddModal = () => {
    setAddModalVisible(true);
  };

  const closeShareModal = () => {
    setShareModalVisible(false);
  };

  const closeAddModal = () => {
    setAddModalVisible(false);
  };

  const handleToggleShareModal = () => {
    closeAddModal(); 
    setTimeout(() => {
      toggleModal(); 
      setTimeout(openShareModal, 300); 
    }, 300);
  };

  const handleToggleAddModal = () => {
    closeShareModal(); 
    setTimeout(() => {
      toggleModal();
      setTimeout(openAddModal, 300); 
    }, 300);
  };

  return (
    <>
      <Modal
        isVisible={isModalVisible}
        swipeDirection="down"
        onBackdropPress={toggleModal}
        onSwipeComplete={toggleModal}
        style={{ justifyContent: "flex-end", margin: 0 }}
        backdropOpacity={0}
        propagateSwipe
      >
        <View
          style={[
            homeStyles.modalContent,
            {
              marginBottom: 90,
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
            },
          ]}
        >
          <View style={homeStyles.dragHandleContainer}>
            <View style={homeStyles.dragHandle} />
          </View>
          <View style={[homeStyles.flexSpace, { paddingVertical: 20 }]}>
            <TouchableOpacity style={homeStyles.box} onPress={handleToggleShareModal}>
              <View style={homeStyles.boxIcon}>
                <FontAwesome name="share" size={15} color="white" />
              </View>
              <View style={{ paddingHorizontal: 10 }}>
                <ReusableText
                  text={"Konum Paylaş"}
                  family={"medium"}
                  size={TEXT.xSmall}
                  color={COLORS.black}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={homeStyles.box} onPress={handleToggleAddModal}>
              <View style={homeStyles.boxIcon}>
                <MaterialIcons name="add" size={20} color="white" />
              </View>
              <View style={{ paddingHorizontal: 10 }}>
                <ReusableText
                  text={"Konum Ekle"}
                  family={"medium"}
                  size={TEXT.xSmall}
                  color={COLORS.black}
                />
              </View>
            </TouchableOpacity>
          </View>
          <FlatList
            data={data}
            renderItem={({ item }) => <HomeCard item={item} />}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ gap: SIZES.medium }}
          />
        </View>
      </Modal>
      <LocationShareModal isVisible={isShareModalVisible} onClose={closeShareModal} />
      <LocationAddModal isVisible={isAddModalVisible} onClose={closeAddModal} />
    </>
  );
};

export default HomeModal;