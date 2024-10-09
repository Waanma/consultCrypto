import { View, ActivityIndicator, FlatList, Pressable } from "react-native";
import styled from "styled-components/native";
import { router } from "expo-router";
import { useEffect } from "react";
import { useFavoritesStore } from "../../services/favoritesService";
import { Crypto } from "../../types/types";

const StyledText = styled.Text`
  color: #fff;
`;
const Container = styled.SafeAreaView`
  align-items: center;
  background-color: #134567;
  height: 100%;
`;
const HeaderContainer = styled.View`
  width: 95%;
  height: 80px;
  padding: 15px;
`;
const BackBtn = styled.View`
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 50px;
  border-radius: 20%;
  background-color: rgba(128, 128, 128, 0.8);
`;
const CryptoContent = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  padding: 10px;
  background-color: rgba(0, 255, 255, 0.25);
  margin-bottom: 10px;
`;

const CryptoContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 82%;
`;
const NameContainer = styled.View`
  flex: 1;
  justify-content: center;
`;
const RemoveButton = styled.TouchableOpacity`
  width: 45px;
  height: 45px;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  background-color: rgba(225, 0, 0, 0.7);
`;

const RemovePage = () => {
  const { favorites, removeFavorite } = useFavoritesStore();

  const goBack = () => {
    router.back();
  };

  const handleRemove = (crypto: Crypto) => {
    removeFavorite(crypto.id);
  };

  const renderItem = ({ item }: { item: Crypto }) => {
    return (
      <CryptoContent key={item.id}>
        <CryptoContainer>
          <NameContainer>
            <StyledText>{item.name}</StyledText>
            <StyledText>{item.ticker}</StyledText>
          </NameContainer>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              paddingHorizontal: 10,
            }}
          >
            <StyledText>{item.price}</StyledText>
          </View>
        </CryptoContainer>
        <RemoveButton onPress={() => handleRemove(item)}>
          <StyledText>X</StyledText>
        </RemoveButton>
      </CryptoContent>
    );
  };

  useEffect(() => {
    if (favorites.length === 0) {
      router.back();
    }
  }, [favorites, router]);

  if (!favorites) {
    return (
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  return (
    <Container>
      <HeaderContainer>
        <Pressable onPress={goBack}>
          <BackBtn>
            <StyledText>Back</StyledText>
          </BackBtn>
        </Pressable>
      </HeaderContainer>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </Container>
  );
};

export default RemovePage;
