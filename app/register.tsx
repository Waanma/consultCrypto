import { Link, useRouter } from "expo-router";
import styled from "styled-components/native";
import { ActivityIndicator } from "react-native";
import { useState } from "react";

import { auth } from "../services/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";

const Container = styled.SafeAreaView`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  background-color: #134567;
`;
const LoaderContainer = styled.View`
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
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

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    if (!email || !password) {
      alert("please, fill all the fields.");
      return;
    }

    setIsLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setIsLoading(false);
      router.push("/homePage");
    } catch (error: any) {
      setIsLoading(false);
      if (error.code === "auth/email-already-in-use") {
        alert("This email is already registered.");
      } else {
        alert(`Error: ${error.message}`);
      }
    }
  };
  return (
    <Container>
      <ContentContainer>
        <Text1>Register</Text1>
        <InputContainer>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <TextInput
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <StyledButton onPress={handleRegister}>
            <Text2>Register</Text2>
          </StyledButton>
        </InputContainer>
        <BottomContainer>
          <Text1 style={{ paddingBottom: 5 }}>Do you have an acount?</Text1>
          <Link href={`/`}>
            <Text3>Login</Text3>
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

export default RegisterPage;
