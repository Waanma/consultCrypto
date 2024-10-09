import { View, ActivityIndicator, FlatList, Pressable } from "react-native";
import styled from "styled-components/native";
import { useQuery } from "@tanstack/react-query";
import { fetchCryptos } from "../../services/cryptosService";
import { router } from "expo-router";
import { useFavoritesStore } from "../../services/favoritesService";
import { Crypto } from "../../types/types";

const BtnBack = styled.TouchableOpacity`
  padding: 10px;
`;
const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding-top: 10px;
  background-color: #134567;
`;
const HeaderContainer = styled.View`
  width: 95%;
  padding-left: 10px;
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
  width: 98%;
  justify-content: space-between;
  padding: 10px;
  background-color: rgba(0, 255, 255, 0.25);
  margin-bottom: 10px;
  border-radius: 10px;
`;

const CryptoContainer = styled.View`
  flex-direction: row;
  width: 80%;
  justify-content: space-between;
`;
const NameContainer = styled.View`
  flex: 1;
`;
const AddButton = styled.TouchableOpacity`
  width: 55px;
  height: 40px;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
`;

const FlatListContainer = styled.View`
  width: 95%;
  padding: 10px;
  margin-top: 10px;
`;
interface Props {
  bold?: boolean;
}
const StyledText = styled.Text<Props>`
  color: #fff;
  ${(props) => props.bold && "font-weight: bold"};
`;

const AddCryptos = () => {
  const {
    data: cryptos,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["cryptos"],
    queryFn: fetchCryptos,
  });

  const { addFavorite, favorites } = useFavoritesStore();

  const handleAdd = (crypto: Crypto) => {
    const isAlreadyFavorite = favorites.some((fav) => fav.id === crypto.id);
    if (isAlreadyFavorite) {
      alert("This cryptocurrency is already in your favorites!");
      return;
    }

    addFavorite(crypto);
  };

  if (isLoading) {
    return (
      <View
        style={{
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#134567",
        }}
      >
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  if (error) {
    alert("error getting cryptos");
    return router.back();
  }

  const goBack = () => {
    router.back();
  };

  const renderItem = ({ item }: { item: Crypto }) => {
    const isFavorite = favorites.some((fav) => fav.id === item.id);

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
        <AddButton
          onPress={() => handleAdd(item)}
          disabled={isFavorite}
          style={{
            backgroundColor: isFavorite ? "#6c757d" : "#007bff",
          }}
        >
          <StyledText bold>{isFavorite ? "Added" : "Add"}</StyledText>
        </AddButton>
      </CryptoContent>
    );
  };

  return (
    <Container>
      <HeaderContainer>
        <Pressable onPress={goBack}>
          <BackBtn>
            <StyledText>Back</StyledText>
          </BackBtn>
        </Pressable>
      </HeaderContainer>
      <FlatListContainer>
        <FlatList
          data={cryptos}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      </FlatListContainer>
    </Container>
  );
};

export default AddCryptos;
