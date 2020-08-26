import React from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/Header/Header';
import './Layout.scss';

const Layout = (props) => {
  const { children } = props;
  return (
    <div className='layout'>
      <Header />
      { children }
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.element.isRequired
};

export default Layout;
