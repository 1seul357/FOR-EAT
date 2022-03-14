import React from "react";
import GoogleLogin from 'react-google-login';
import styled from "styled-components";
import { useSetRecoilState } from 'recoil';
import { isLoginState } from '../../../atoms/atoms';
import { useNavigate } from 'react-router-dom';
import { googleLogin } from '../../../api/AuthApi';

const Container = styled.div`
  margin: 0 10vw;

  button {
    background: none;
    border: none;
    cursor: pointer;
`;


const LoginGoogle = () => {
  const navigate = useNavigate();
  const setIsLoginState = useSetRecoilState(isLoginState);

  const successGoogle = async (response) => {
    // console.log(response)
    const data = {
      googleId: response.profileObj.googleId,
      imageUrl: response.profileObj.imageUrl,
      name: response.profileObj.name
    };
    const result = await googleLogin(data, response.tokenId);

    if (result.data.status === 200) {
      try {
        setIsLoginState(true);
        navigate("/recommend");
      }
      catch {
        window.location.reload();
      }
    } else {
      // alert("로그인 정보를 확인해주세요.");
    }
  }
  
  const failGoogle = (response) => {
    console.log(response);
    // alert("로그인 정보를 확인해주세요.")
  }
  
  return (
    <>
      <Container>
      <GoogleLogin
        clientId="99460548731-f1jna9uv0thv2eo84q5m8h83078a585c.apps.googleusercontent.com"
        buttonText="Sign in with Google"
        onSuccess={successGoogle}
        onFailure={failGoogle}
      />
      </Container>
    </>
  );
};

export default LoginGoogle;