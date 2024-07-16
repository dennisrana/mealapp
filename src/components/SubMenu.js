import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const SidebarLink = styled(Link)`
  display: flex;
  color: #e1e9fc;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  list-style: none;
  height: 60px;
  text-decoration: none;
  font-size: 18px;

  &:hover {
    background: #007030;
    cursor: pointer;
    border: solid #fff;
    border-left-width: 2px;
  }
`;

const SidebarLabel = styled.span`
  margin-left: 16px;
`;

const SubMenu = ({ item, handleClick }) => {
  return (
    <>
      <SidebarLink
        to={item.path}
        onClick={() => {
          handleClick();
        }}
      >
        <div>
          {item.icon}
          <SidebarLabel>{item.title}</SidebarLabel>
        </div>
      </SidebarLink>
    </>
  );
};

export default SubMenu;
