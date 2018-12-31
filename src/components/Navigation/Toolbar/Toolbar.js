import React from "react";
import classes from "./Toolbar.module.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle'

const toolbar = props => (
  <header className={classes.Toolbar}>
    {/* <div onClick={props.clicked}>Menu</div> */}
    <DrawerToggle clicked={props.drawerToggleHandler}/>
    <div className={classes.Logo}>
      <Logo />
    </div>
    
    <nav className={classes.DesktopOnly}>
      <NavigationItems isAuthenticated = {props.isAuth}/>
    </nav>
  </header>
);
export default toolbar;
