import React from 'react';
import { Link } from 'gatsby';
import styled from "styled-components"; // 💅 yay!
import Logo from '../Images/logo.svg'

const Nav = styled.nav`
  background-color: #babad3;
  display: flex;
  justify-content: space-around;
`
const StyledLink = styled(Link)`
  color: #fffffe;
  padding: 90px 0 75px 0;
  font-size: 20px;
`

function Header() {
  return (
    <header>
      <Nav>
        <StyledLink to="/">
          <img src={Logo} alt="Logo" />
        </StyledLink>
        <StyledLink to= '/products'>Products</StyledLink>
        <StyledLink to= '/cart'>Cart</StyledLink>
      </Nav>
    </header>
  );
}

export default Header;
