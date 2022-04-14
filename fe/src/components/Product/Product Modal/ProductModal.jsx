import React, { useRef, useEffect, useCallback, useState } from "react";
import { useSpring, animated } from "react-spring";
import styled from "styled-components";
import { MdClose } from "react-icons/md";
import { addToCart } from "../../../redux/actions/cart.actions";
import { useDispatch } from "react-redux";

const Background = styled.div`
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 199;
`;

const ModalWrapper = styled.div`
  width: 800px;
  height: 500px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  color: #000;
  /* display: grid;
  grid-template-columns: 1fr 1fr; */
  display: flex;
  position: relative;
  z-index: 10;
  border-radius: 10px;
`;

const ProdImgCont = styled.div`
  flex: 4.5;
`;

const ProdMainImg = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  justify-content: center;
  padding: 5px;
  img {
    height: 100%;
    object-fit: cover;
  }
`;
const ProdSubImg = styled.div`
  height: 14%;
  display: flex;
  justify-content: center;
  padding: 5px;
  img {
    width: 100%;
    object-fit: contain;
    cursor: pointer;
  }
`;

const ProdContentCont = styled.div`
  flex: 5.5;
  padding: 35px 10px 20px 10px;

  span {
    font-size: 10px;
  }
`;

const ProdSizeList = styled.div`
  display: flex;
`;
const ProdSizeItem = styled.div`
  border: 1px solid #333333;
  border-radius: 50px;
  width: 50px;
  height: 30px;
  text-align: center;
  margin: 5px 20px 15px 0;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
const ProdColorList = styled.div`
  display: flex;
`;
const ProdColorItem = styled.div`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  border: 1px solid #333333;
  margin-right: 15px;
  background-color: ${(props) => props.backgroundColor};
  cursor: pointer;
`;

const ProdAddtoCartBtn = styled.button`
  border: 2px solid #333333;
  padding: 10px 15px;
  text-align: center;
  font-size: 16px;
  font-weight: 400;
  cursor: pointer;
  border-radius: 10px;
  margin: 15px 15px 10px 0;
  background-color: #e9ffed;
  &:hover {
    background-color: #117422;
    color: white;
  }
`;

const CloseModalButton = styled(MdClose)`
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 10;
`;

const ProductModal = ({ showModal, setShowModal, item }) => {
  const modalRef = useRef();
  const [ide, setIde] = useState(0);
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const dispatch = useDispatch();

  const handelSize = (s) => {
    setSize(s);
    console.log(s);
  };
  const handelColor = (c) => {
    setColor(c);
    console.log(c);
  };

  const animation = useSpring({
    config: {
      duration: 250,
    },
    opacity: showModal ? 1 : 0,
    transform: showModal ? `translateY(0%)` : `translateY(-100%)`,
  });

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      setShowModal(false);
    }
  };

  const keyPress = useCallback(
    (e) => {
      if (e.key === "Escape" && showModal) {
        setShowModal(false);
        console.log("I pressed");
      }
    },
    [setShowModal, showModal]
  );

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);

  return (
    <>
      {showModal ? (
        <Background onClick={closeModal} ref={modalRef}>
          <animated.div style={animation}>
            <ModalWrapper showModal={showModal}>
              <CloseModalButton
                aria-label="Close modal"
                onClick={() => setShowModal((prev) => !prev)}
              />
              <ProdImgCont>
                <ProdMainImg>
                  <img src={item.productPictures[ide].img} alt="" />
                </ProdMainImg>
                <ProdSubImg>
                  {item.productPictures?.map((pic, index) => (
                    <img
                      src={pic.img}
                      alt=""
                      key={pic._id}
                      onClick={() => setIde(index)}
                    />
                  ))}
                </ProdSubImg>
              </ProdImgCont>
              <ProdContentCont>
                <p>{item.name}</p>
                <span>{item.description}</span>
                <h2>
                  <strong>{item.price}₫</strong>
                </h2>
                <ProdSizeList>
                  {item.size.map((it, index) => (
                    <ProdSizeItem onClick={() => handelSize(it)} key={index}>
                      {it}
                    </ProdSizeItem>
                  ))}
                </ProdSizeList>
                <ProdColorList>
                  {item.color?.map((c, index) => (
                    <ProdColorItem
                      value={c}
                      key={index}
                      backgroundColor={c}
                      onClick={() => handelColor(c)}
                    ></ProdColorItem>
                  ))}
                </ProdColorList>
                <ProdAddtoCartBtn
                  onClick={() => {
                    if (!size || !color) {
                      alert("Vui lòng chọn kích thước và màu sắc");
                    } else {
                      const { _id, name, price } = item;
                      const img = item.productPictures[0].img;
                      console.log(_id, size, color, name, price);
                      dispatch(
                        addToCart({ _id, name, price, img, size, color })
                      );
                    }
                    setShowModal(false);
                  }}
                >
                  Thêm vào giỏ hàng
                </ProdAddtoCartBtn>
              </ProdContentCont>
            </ModalWrapper>
          </animated.div>
        </Background>
      ) : null}
    </>
  );
};

export default ProductModal;
