import React, { useRef, useEffect } from 'react';
import MyDrawer from './Drawer';
import { useSelector } from 'react-redux';
import { NavigationActions } from 'react-navigation';

const NavigationContainer = (props) => {
  const isAuth = useSelector((state) => !!state.auth.token);
  const navRef = useRef();

  useEffect(() => {
    //console.log('isAuth', isAuth);
    //console.log('navRef', navRef.current);
    // if (!isAuth)
    //   navRef.current.dispatch(
    //     NavigationActions.navigate({ routeName: 'Auth' })
    //   );
  }, [isAuth]);

  return <MyDrawer innerRef={navRef} />;
};

export default NavigationContainer;
