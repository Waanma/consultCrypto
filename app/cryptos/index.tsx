import { View, FlatList, Pressable } from "react-native";
import styled from "styled-components/native";
import { Link, router } from "expo-router";
import { useFavoritesStore } from "../../services/favoritesService";
import { Crypto } from "../../types/types";

const StyledText = styled.Text`
  color: #fff;
`;
const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  background-color: #134567;
`;
const HeaderContainer = styled.View`
  width: 95%;
  flex-direction: row;
  justify-content: space-between;
  padding: 15px;
`;
const CryptoContainer = styled.View`
  width: 95%;
  height: 100%;
  margin-top: 10px;
`;
const CryptoContent = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-radius: 10px;
  gap: 10px;
  background-color: rgba(0, 255, 255, 0.25);
`;
const NameContainer = styled.View`
  flex: 1;
`;
const BackBtn = styled.View`
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 50px;
  border-radius: 20%;
  background-color: rgba(128, 128, 128, 0.8);
`;
const RemoveBtn = styled.View`
  background-color: rgba(255, 0, 0, 0.45);
  padding: 10px;
  border-radius: 10px;
`;

const FavoritesPage = () => {
  const { favorites } = useFavoritesStore();
  const itemRenderSeparator = () => <View style={{ height: 10 }}></View>;

  const goBack = () => {
    router.back();
  };

  const renderItem = ({ item }: { item: Crypto }) => (
    <CryptoContent key={item.id}>
      <NameContainer>
        <StyledText>{item.name}</StyledText>
        <StyledText>{item.ticker}</StyledText>
      </NameContainer>
      <StyledText>{item.price}</StyledText>
    </CryptoContent>
  );

  return (
    <Container>
      <HeaderContainer>
        <Pressable onPress={goBack}>
          <BackBtn>
            <StyledText>Back</StyledText>
          </BackBtn>
        </Pressable>

        {favorites.length > 0 && (
          <Link href="/cryptos/remove">
            <RemoveBtn>
              <StyledText>Remove</StyledText>
            </RemoveBtn>
          </Link>
        )}
      </HeaderContainer>
      {favorites.length === 0 ? (
        <View>
          <StyledText>No favorites added yet.</StyledText>
        </View>
      ) : (
        <CryptoContainer>
          <FlatList
            data={favorites}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            ItemSeparatorComponent={itemRenderSeparator}
          />
        </CryptoContainer>
      )}
    </Container>
  );
};

export default FavoritesPage;
