import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import { login } from "../../redux/actions/auth.actions";
import { mobile } from "../../responsive";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 30%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 400;
  text-align: center;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Input = styled.input`
  flex: 1;
  min-width: 70%;
  margin: 15px 0px;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  padding: 10px;
  background-color: teal;
  cursor: pointer;
  border: none;
  color: white;
  margin-bottom: 10px;
  font-size: 16px;
  &:disabled {
    cursor: not-allowed;
    color: blue;
  }
`;

const Link = styled.a`
  text-decoration: underline;
  color: #333333;
  cursor: pointer;
`;

const Error = styled.span`
  margin: 5px 0px;
  color: red;
`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  // const { loading, error } = useSelector((state) => state.auth);

  const handleClick = (e) => {
    e.preventDefault();
    const user = {
      email,
      password,
    };

    dispatch(login(user));
  };

  if (auth.authenticate) {
    return <Redirect to="/" />;
  }

  return (
    <Container>
      <Wrapper>
        <Title>ĐĂNG NHẬP</Title>
        <Form>
          <Input
            placeholder="Email"
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="Mật khẩu"
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <Link style={{ marginBottom: "10px" }}>Quên mật khẩu?</Link>
          <Button onClick={handleClick}>Đăng nhập</Button>
          {auth.error && <Error>{auth.error}</Error>}
          <Link href="/signup">Tạo tài khoản mới</Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
