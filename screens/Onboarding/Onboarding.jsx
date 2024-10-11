import { View, SafeAreaView, Platform, StatusBar, StyleSheet } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { useRoute } from '@react-navigation/native';
import { Video } from 'expo-av';
import { ReusableText, ReusableButton } from '../../components';
import { COLORS, TEXT, SIZES } from '../../constants/theme';
import homeStyles from '../screens.style';

const Onboarding = ({ navigation }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    StatusBar.setBarStyle('light-content');
    StatusBar.setBackgroundColor('transparent');
  }, []);

  const submitHandler = async () => {
    if (videoRef.current) {
      await videoRef.current.pauseAsync();
    }
    navigation.navigate('BottomTabNavigation');
  };

  return (
    <View style={styles.container}>
      <Video
        ref={videoRef}
        source={require('../../assets/video/onboarding.mp4')} 
        style={StyleSheet.absoluteFill}
        resizeMode="cover"
        shouldPlay
        isLooping
      />
      <View style={styles.overlay}>
        <ReusableText
          text={"Hadi başlayalım! Uygulamayı keşfetmeye başla ve daha fazla eğlenceyi keşfet!"}
          family={"medium"}
          size={TEXT.small}
          color={COLORS.white}
          align={"center"}
        />
        <ReusableButton
          btnText={"Başla"}
          width={SIZES.width - 40}
          height={40}
          borderRadius={SIZES.small}
          backgroundColor={COLORS.primary}
          textColor={COLORS.black}
          textFontSize={TEXT.small}
          textFontFamily={"medium"}
          onPress={submitHandler}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 50,
    paddingHorizontal: 20,
    gap: 40,
  },
});

export default Onboarding;