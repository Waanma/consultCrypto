import React from "react";
import styled from "styled-components/native";
import { Link } from "expo-router";
import { FlatList } from "react-native";
import cryptos from "../cryptos.json";
import { Crypto } from "../types/types";

const Container = styled.SafeAreaView`
  width: 100%;
  padding: 5px;
  align-items: center;
  background-color: #134567;
`;
const HeaderContainer = styled.View`
  width: 95%;
  flex-direction: row;
  justify-content: space-between;
  padding-horizontal: 10px;
`;
const FavoritesBtn = styled.View`
  padding: 5px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  background-color: #3399ff;
`;
const CryptoContainer = styled.View`
  width: 100%;
  align-items: center;
`;
const CryptoContent = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: rgba(0, 255, 255, 0.25);
  border-radius: 8px;
`;
const CryptoName = styled.View`
  flex-direction: column;
`;
const ItemSeparatorComponent = styled.View`
  height: 15px;
`;
interface StyledTextProps {
  titleMain?: boolean;
  add?: boolean;
  logOut?: boolean;
}
const StyledText = styled.Text<StyledTextProps>`
  color: #fff;
  ${(props) => props.logOut && "color: red; font-weight: bold"};
  ${(props) => props.titleMain && "font-size: 20px; padding-bottom: 15px"};
  ${(props) => props.add && "color: #fff; font-size: 14px; padding: 10px"};
`;
const AddContainer = styled.View`
  width: 50%;
  flex-direction: row;
  justify-content: center;
  background-color: #3399ff;
  border-radius: 8px;
  margin-bottom: 10px;
`;

const HomePage = () => {
  const renderItem = ({ item }: { item: Crypto }) => (
    <CryptoContent>
      <CryptoName>
        <StyledText>{item.name}</StyledText>
        <StyledText>{item.ticker}</StyledText>
      </CryptoName>
      <StyledText>{item.price}</StyledText>
    </CryptoContent>
  );
  return (
    <Container>
      <HeaderContainer>
        <Link href="/" asChild>
          <StyledText logOut>LogOut</StyledText>
        </Link>
        <FavoritesBtn>
          <Link href="/cryptos" asChild>
            <StyledText>Favorites</StyledText>
          </Link>
        </FavoritesBtn>
      </HeaderContainer>
      <StyledText titleMain>Cryptos</StyledText>
      <AddContainer>
        <Link href="/cryptos/add" asChild>
          <StyledText add>Add cryptos to favorites +</StyledText>
        </Link>
      </AddContainer>
      <CryptoContainer>
        <FlatList
          data={cryptos}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          ItemSeparatorComponent={ItemSeparatorComponent}
          style={{ width: "90%", height: " 95%" }}
        />
      </CryptoContainer>
    </Container>
  );
};

export default HomePage;
