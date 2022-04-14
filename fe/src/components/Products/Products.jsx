import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Product from "../Product/Product";

const Container = styled.div`
  padding: 20px;
`;
const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 40px 0px;
`;
const Title = styled.h1`
  border-bottom: 5px solid #117422;
`;
const Button = styled.button`
  width: 145px;
  background: none;
  font-size: 16px;
  padding: 10px 20px;
  border: 3px solid #117422;
  border-radius: 10px;
  box-shadow: inset 0 0 0 0 #117422;
  transition: all 0.3s ease;
  outline: none;
  a {
    color: #333333;
    transition: all 0.3s ease;
    &:hover {
      color: #ffffff;
    }
  }
  &:hover {
    box-shadow: inset 145px 0 0 0 #117422;
  }
`;

const ProductCont = styled.div`
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-items: center;
`;

const Products = ({ products, title }) => {
  return (
    <Container>
      <CardHeader>
        <Title>{title}</Title>
        <Button>
          <Link>Xem thêm</Link>
        </Button>
      </CardHeader>
      <ProductCont>
        {products.map((prod, index) => (
          <Product item={prod} key={index} />
        ))}
      </ProductCont>
    </Container>
  );
};

export default Products;
