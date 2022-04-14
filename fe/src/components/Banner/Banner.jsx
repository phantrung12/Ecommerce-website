import React from "react";
import styled from "styled-components";

const Banner = ({ item }) => {
  const Container = styled.div`
    height: 50vh;
  `;
  const Wrapper = styled.div`
    padding: 25px;
    height: 100%;
  `;
  const Text = styled.h3`
    font-size: 28px;
  `;

  const ImgCont = styled.div`
    height: 400px;
  `;

  const Image = styled.img`
    width: 100%;
    object-fit: contain;
  `;

  return (
    <Container>
      <Wrapper>
        <Image src={item.img} alt="" />
      </Wrapper>
    </Container>
  );
};

export default Banner;
