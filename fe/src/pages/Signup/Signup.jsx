import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { signup } from "../../redux/actions/auth.actions";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 50%;
  padding: 20px;
  background-color: white;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 400;
  text-align: center;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 18px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  padding: 10px;
  background-color: teal;
  cursor: pointer;
  border: none;
  color: white;
`;

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [error, setError] = useState("");
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const userSignup = (e) => {
    e.preventDefault();
    const user = { firstName, lastName, username, email, password };
    if (
      firstName === "" ||
      lastName === "" ||
      username === "" ||
      email === "" ||
      password === ""
    )
      return;

    if (password === rePassword) {
      setError("");
      dispatch(signup(user));
    } else {
      setError("Mật khẩu không giống nhau");
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>ĐĂNG KÝ TÀI KHOẢN</Title>
        <Form onSubmit={userSignup}>
          <Input
            placeholder="Tên"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          ></Input>
          <Input
            placeholder="Họ tên"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          ></Input>
          <Input
            placeholder="Tài khoản"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          ></Input>
          <Input
            placeholder="Email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Input>
          <Input
            placeholder="Mật khẩu"
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Input>
          <Input
            placeholder="Nhập lại mật khẩu"
            required
            type="password"
            value={rePassword}
            onChange={(e) => setRePassword(e.target.value)}
          ></Input>
          <p style={{ color: "red" }}>{error ? error : auth.error}</p>
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button>Tạo tài khoản</Button>
          <hr />
          <span>
            Đã có tài khoản?{" "}
            <Link
              style={{ color: "#333333", textDecoration: "underline" }}
              to={"/login"}
            >
              Đăng nhập
            </Link>
          </span>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Signup;
