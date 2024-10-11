import {
  View,
  SafeAreaView,
  Platform,
  StatusBar,
  FlatList,
} from "react-native";
import React from "react";
import { AppBar } from "../../components";
import { COLORS, SIZES } from "../../constants/theme";
import homeStyles from "../screens.style";
import NotificationCard from "../../components/Card/NotificationCard";

const Notifications = ({ navigation }) => {
  const data = [
    { id: "1", title: "Yeni Mesaj", description: "Yeni bir mesajınız var." },
    {
      id: "2",
      title: "Güncelleme",
      description: "Uygulama güncellemesi mevcut.",
    },
    { id: "3", title: "Bildirim", description: "Yeni bir bildirim aldınız." },
    { id: "4", title: "Yeni Mesaj", description: "Yeni bir mesajınız var." },
    {
      id: "5",
      title: "Güncelleme",
      description: "Uygulama güncellemesi mevcut.",
    },
    { id: "6", title: "Bildirim", description: "Yeni bir bildirim aldınız." },
    { id: "7", title: "Yeni Mesaj", description: "Yeni bir mesajınız var." },
    {
      id: "8",
      title: "Güncelleme",
      description: "Uygulama güncellemesi mevcut.",
    },
    { id: "9", title: "Bildirim", description: "Yeni bir bildirim aldınız." },
    { id: "10", title: "Bildirim", description: "Yeni bir bildirim aldınız." },
    { id: "11", title: "Yeni Mesaj", description: "Yeni bir mesajınız var." },
    {
      id: "12",
      title: "Güncelleme",
      description: "Uygulama güncellemesi mevcut.",
    },
    { id: "13", title: "Bildirim", description: "Yeni bir bildirim aldınız." },
    {
      id: "14",
      title: "Güncelleme",
      description: "Uygulama güncellemesi mevcut.",
    },
    { id: "15", title: "Bildirim", description: "Yeni bir bildirim aldınız." },
  ];

  return (
    <SafeAreaView
      style={[
        homeStyles.container,
        { paddingTop: Platform.OS === "ios" ? 20 : StatusBar.currentHeight },
      ]}
    >
      <View style={homeStyles.header}>
        <AppBar
          top={20}
          left={20}
          right={20}
          color={COLORS.lightBack}
          onPress={() => navigation.goBack()}
          title="Bildirimler"
        />
      </View>
      <View style={{ paddingHorizontal: 25, paddingBottom: 100 }}>
        <FlatList
          data={data}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <NotificationCard item={item} />}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ gap: SIZES.medium }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Notifications;
