import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/Layout/Layout";
import {
  Anchor,
  MaterialButton,
  MaterialInput,
} from "../../components/MaterialUI/MaterialUI";
import Card from "../../components/Card/Card";
import PriceDetails from "../../components/PriceDetails";
import { getCartItems } from "../../redux/actions/cart.actions";
import { addOrder, getAddress } from "../../redux/actions/user.actions";
import CartPage from "../CartPage/CartPage";
import StripeCheckout from "react-stripe-checkout";
import AddressForm from "./AddressForm";
import "./CheckoutPage.css";

const KEY = process.env.REACT_APP_STRIPE;

const CheckoutStep = (props) => {
  return (
    <div className="checkoutStep">
      <div
        onClick={props.onClick}
        className={`checkoutHeader ${props.active && "active"}`}
      >
        <div>
          <span className="stepNumber">{props.stepNumber}</span>
          <span className="stepTitle">{props.title}</span>
        </div>
      </div>
      {props.body && props.body}
    </div>
  );
};

const Address = ({
  adr,
  selectAddress,
  enableAddressEditForm,
  confirmDeliveryAddress,
  onAddressSubmit,
}) => {
  return (
    <div className="flexRow addressContainer">
      <div>
        <input name="address" onClick={() => selectAddress(adr)} type="radio" />
      </div>
      <div className="flexRow sb addressinfo">
        {!adr.edit ? (
          <div style={{ width: "100%" }}>
            <div className="addressDetail">
              <div>
                <span className="addressName">{adr.name}</span>
                <span className="addressType">{adr.addressType}</span>
                <span className="addressMobileNumber">{adr.mobileNumber}</span>
              </div>
              {adr.selected && (
                <Anchor
                  name="EDIT"
                  onClick={() => enableAddressEditForm(adr)}
                  style={{
                    fontWeight: "500",
                    color: "#2874f0",
                  }}
                />
              )}
            </div>
            <div className="fullAddress">
              {adr.address} <br /> {`${adr.state} - ${adr.pinCode}`}
            </div>
            {adr.selected && (
              <MaterialButton
                title="DELIVERY HERE"
                onClick={() => confirmDeliveryAddress(adr)}
                style={{
                  width: "200px",
                  margin: "10px 0",
                }}
              />
            )}
          </div>
        ) : (
          <AddressForm
            withoutLayout={true}
            onSubmitForm={onAddressSubmit}
            initialData={adr}
            onCancel={() => {}}
          />
        )}
      </div>
    </div>
  );
};

const CheckoutPage = () => {
  const user = useSelector((state) => state.user);
  const auth = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);

  const [newAddress, setNewAddress] = useState(false);
  const [address, setAddress] = useState([]);
  const [confirmAddress, setConfirmAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [orderSummary, setOrderSummary] = useState(false);
  const [orderConfirmation, setOrderConfirmation] = useState(false);
  const [paymentOption, setPaymentOption] = useState(false);
  const [confirmOrder, setConfirmOrder] = useState(false);
  const [paymentType, setPaymentType] = useState("cod");
  const [stripeToken, setStripeToken] = useState(null);

  const dispatch = useDispatch();
  const onToken = (token) => {
    setStripeToken(token);
  };

  const onAddressSubmit = (addr) => {
    setSelectedAddress(addr);
    setConfirmAddress(true);
    setOrderSummary(true);
  };

  const selectAddress = (addr) => {
    const updatedAddress = address.map((adr) =>
      adr._id === addr._id
        ? { ...adr, selected: true }
        : { ...adr, selected: false }
    );
    setAddress(updatedAddress);
  };

  const confirmDeliveryAddress = (addr) => {
    setSelectedAddress(addr);
    // console.log(addr);
    setConfirmAddress(true);
    setOrderSummary(true);
  };

  const enableAddressEditForm = (addr) => {
    const updatedAddress = address.map((adr) =>
      adr._id === addr._id ? { ...adr, edit: true } : { ...adr, edit: false }
    );
    setAddress(updatedAddress);
  };

  const userOrderConfirmation = () => {
    setOrderConfirmation(true);
    setOrderSummary(false);
    setPaymentOption(true);
  };

  const onConfirmOrder = () => {
    const totalAmount = Object.keys(cart.cartItems).reduce(
      (totalPrice, key) => {
        const { price, qty } = cart.cartItems[key];
        return totalPrice + price * qty;
      },
      0
    );

    const items = Object.keys(cart.cartItems).map((it) => ({
      productId: cart.cartItems[it]._id,
      size: cart.cartItems[it].size,
      color: cart.cartItems[it].color,
      payablePrice: cart.cartItems[it].price,
      purchasedQty: cart.cartItems[it].qty,
    }));

    const payload = {
      addressId: selectedAddress._id,
      totalAmount,
      items,
      paymentStatus: paymentType === "cod" ? "pending" : "completed",
      paymentType: paymentType,
    };

    console.log(payload);
    dispatch(addOrder(payload));
    setConfirmOrder(true);
  };

  useEffect(() => {
    auth.authenticate && dispatch(getAddress());
    auth.authenticate && dispatch(getCartItems());
  }, [dispatch, auth.authenticate]);

  useEffect(() => {
    const address = user.address.map((adr) => ({
      ...adr,
      selected: false,
      edit: false,
    }));
    setAddress(address);
  }, [user.address]);

  return (
    <Layout>
      <div className="cartContainer" style={{ alignItems: "flex-start" }}>
        <div className="checkoutContainer">
          <CheckoutStep
            stepNumber={"1"}
            title={"ĐĂNG NHẬP"}
            active={!auth.authenticate}
            body={
              auth.authenticate ? (
                <div className="loggedInId">
                  <span style={{ fontWeight: 500 }}>{auth.user.fullName}</span>
                  <span style={{ margin: "0 5px" }}>{auth.user.email}</span>
                </div>
              ) : (
                <div>
                  <MaterialInput label="Email" />
                </div>
              )
            }
          />
          <CheckoutStep
            stepNumber={2}
            title={"ĐỊA CHỈ GIAO HÀNG"}
            active={!confirmAddress && auth.authenticate}
            body={
              <>
                {confirmAddress ? (
                  <div className="stepCompleted">{`${selectedAddress.name} ${selectedAddress.address} - ${selectedAddress.pinCode}`}</div>
                ) : (
                  address.map((addr) => (
                    <Address
                      selectAddress={selectAddress}
                      enableAddressEditForm={enableAddressEditForm}
                      confirmDeliveryAddress={confirmDeliveryAddress}
                      onAddressSubmit={onAddressSubmit}
                      adr={addr}
                    />
                  ))
                )}
              </>
            }
          />
          {confirmAddress ? null : newAddress ? (
            <AddressForm onSubmitForm={onAddressSubmit} onCancel={() => {}} />
          ) : auth.authenticate ? (
            <CheckoutStep
              stepNumber={"+"}
              title={"THÊM ĐỊA CHỈ MỚI"}
              active={false}
              onClick={() => setNewAddress(true)}
            />
          ) : null}

          <CheckoutStep
            stepNumber={"3"}
            title={"THÔNG TIN ĐƠN HÀNG"}
            active={orderSummary}
            body={
              orderSummary ? (
                <CartPage onlyCartItems={true} />
              ) : orderConfirmation ? (
                <div className="stepCompleted">
                  {Object.keys(cart.cartItems).length} items
                </div>
              ) : null
            }
          />
          {orderSummary && (
            <Card style={{ margin: "10px 0" }}>
              <div
                className="flexRow sb"
                style={{ padding: "20px", alignItems: "center" }}
              >
                <p>
                  Order confirmation email will be sent to{" "}
                  <strong>{auth.user.email}</strong>
                </p>
                <MaterialButton
                  title="CONTINUE"
                  onClick={userOrderConfirmation}
                  style={{ width: "200px" }}
                />
              </div>
            </Card>
          )}

          <CheckoutStep
            stepNumber={"4"}
            title={"PHƯƠNG THỨC THANH TOÁN"}
            active={paymentOption}
            body={
              paymentOption && (
                <div>
                  <div className="paymentChoose">
                    <input
                      type="radio"
                      name="paymentOption"
                      value="cod"
                      onChange={(e) => setPaymentType(e.target.value)}
                    />
                    <div>Thanh toán khi giao hàng</div>
                  </div>
                  <div className="paymentChoose">
                    <input
                      type="radio"
                      name="paymentOption"
                      value="card"
                      onChange={(e) => setPaymentType(e.target.value)}
                    />
                    <div>Thanh toán bằng thẻ ngân hàng</div>
                  </div>
                  {paymentType === "cod" ? (
                    <MaterialButton
                      title="THANH TOÁN"
                      onClick={onConfirmOrder}
                      style={{
                        width: "200px",
                        margin: "0 0 20px 20px",
                      }}
                    />
                  ) : (
                    <StripeCheckout
                      name="Fashion Shop"
                      image="https://avatars.githubusercontent.com/u/1486366?v=4"
                      billingAddress
                      shippingAddress
                      description={`Your total is $${cart.total}`}
                      amount={Object.keys(cart.cartItems).reduce(
                        (totalPrice, key) => {
                          const { price, qty } = cart.cartItems[key];
                          return totalPrice + price * qty;
                        },
                        0
                      )}
                      token={onToken}
                      stripeKey={KEY}
                    >
                      <MaterialButton
                        title="THANH TOÁN THẺ"
                        onClick={onConfirmOrder}
                        style={{
                          width: "200px",
                          margin: "0 0 20px 20px",
                        }}
                      />
                    </StripeCheckout>
                  )}
                </div>
              )
            }
          />
        </div>

        <PriceDetails
          totalItem={Object.keys(cart.cartItems).reduce(function (qty, key) {
            return qty + cart.cartItems[key].qty;
          }, 0)}
          totalPrice={Object.keys(cart.cartItems).reduce((totalPrice, key) => {
            const { price, qty } = cart.cartItems[key];
            return totalPrice + price * qty;
          }, 0)}
        />
      </div>
    </Layout>
  );
};

export default CheckoutPage;
