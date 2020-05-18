import React from 'react';
import { Helmet } from 'react-helmet';
import Header from './Header';
import styled from "styled-components"; // 💅 yay!

const Main = styled.main`
  margin: 0 auto;
`


const Layout = ({ children }) => {

  return (
    <div>
      <Helmet
        title={"Commerce store"}
        meta={[
          { name: 'description', content: 'Commerce store' },
          { name: 'keywords', content: 'gatsby, drupal, commerce' },
        ]}
      >
        <html lang="en" />
      </Helmet>
      <Header></Header>
      <Main>
        <div>
          {children}
        </div>
      </Main>
    </div>
  )
};

export default Layout;
