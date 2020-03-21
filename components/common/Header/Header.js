import React from 'react'

import classes from './Header.module.scss'


const Header = ( { children } ) => <div className={ classes.header }>{ children }</div>

export default Header
