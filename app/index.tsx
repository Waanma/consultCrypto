import { Link } from "expo-router";
import styled from "styled-components/native";
import { useRouter } from "expo-router";

import { auth } from "../services/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { ActivityIndicator } from "react-native";

const Container = styled.SafeAreaView`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  background-color: #134567;
`;
const LoaderContainer = styled.View`
  height: 98%;
  width: 95%;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
`;
const ContentContainer = styled.View`
  width: 90%;
  height: 50%;
  align-items: center;
  justify-content: space-around;
  padding: 8px;
`;
const InputContainer = styled.View`
  width: 100%;
  height: 60%;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;
const BottomContainer = styled.View`
  align-items: center;
  justify-content: center;
`;
const TextInput = styled.TextInput`
  width: 80%;
  height: 40px;
  margin-bottom: 10px;
  padding: 10px;
  background-color: #fff;
  border-radius: 10px;
`;
const StyledButton = styled.TouchableOpacity`
  width: 45%;
  height: 35px;
  background-color: #fff;
  align-items: center;
  justify-content: center;
  border-radius: 25px;
`;

const Text1 = styled.Text`
  color: #fff;
  font-size: 20px;
`;
const Text2 = styled.Text`
  color: #000;
  font-size: 20px;
`;
const Text3 = styled.Text`
  color: #fff;
  font-size: 15px;
  text-decoration: underline;
  text-decoration-color: #fff;
`;

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please, fill all the fields.");
      return;
    }
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setIsLoading(false);
      router.push("/homePage");
    } catch (error) {
      alert("Email or password incorrect");
      setIsLoading(false);
    }
  };
  return (
    <Container>
      <ContentContainer>
        <Text1>Login</Text1>
        <InputContainer>
          <TextInput
            placeholder="Email"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <StyledButton onPress={handleLogin}>
            <Text2>Login</Text2>
          </StyledButton>
        </InputContainer>

        <BottomContainer>
          <Text1 style={{ paddingBottom: 5 }}>
            Don't have an acount already?
          </Text1>
          <Link href={`/register`}>
            <Text3>Register</Text3>
          </Link>
        </BottomContainer>
      </ContentContainer>
      {isLoading && (
        <LoaderContainer>
          <ActivityIndicator size="large" color="#fff" />
        </LoaderContainer>
      )}
    </Container>
  );
};

export default LoginPage;
