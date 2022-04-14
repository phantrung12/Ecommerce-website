import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import * as RiIcons from "react-icons/ri";

const SidebarLink = styled(Link)`
  display: flex;
  color: #333333;
  justify-content: space-between;
  align-items: center;
  padding: 15px 10px;
  list-style: none;
  height: 10px;
  text-decoration: none;
  font-size: 16px;
  border-left: 4px solid #ffffff;
  &:hover {
    border-left: 4px solid #117422;
    cursor: pointer;
  }
`;

const SidebarLabel = styled.span`
  margin-left: 10px;
`;

const DropdownLink = styled(Link)`
  height: 45px;
  padding-left: 3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-decoration: none;
  color: #333333;
  font-size: 16px;
  padding-right: 10px;
  &:hover {
    border-left: 4px solid #117422;
    cursor: pointer;
  }
`;

const SubNav = ({ item }) => {
  const [subnav, setSubnav] = useState(false);
  const [subnavChil, setSubnavChil] = useState(false);

  const showSubnav = () => setSubnav(!subnav);
  const showSubnavChil = () => setSubnavChil(!subnavChil);

  return (
    <>
      <SidebarLink
        to={`/allproductsByCate/${item._id}`}
        onClick={item.children && showSubnav}
      >
        <div>
          <SidebarLabel>{item.name}</SidebarLabel>
        </div>
        <div>
          {item.children && subnav ? (
            <RiIcons.RiSubtractFill />
          ) : item.children ? (
            <RiIcons.RiAddFill />
          ) : null}
        </div>
      </SidebarLink>
      {subnav &&
        item.children.map((item, index) => {
          return (
            <DropdownLink
              to={`/allproductsByCate/${item._id}`}
              key={index}
              onClick={item.children && showSubnavChil}
            >
              <SidebarLabel>{item.name}</SidebarLabel>
              <div>
                {item.children && subnavChil ? (
                  <RiIcons.RiSubtractFill />
                ) : item.children ? (
                  <RiIcons.RiAddFill />
                ) : null}
              </div>
            </DropdownLink>
          );
        })}
    </>
  );
};

export default SubNav;
