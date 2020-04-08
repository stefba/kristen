import React from "react"  
import PropTypes from "prop-types"

import "../css/main.css"

import Top from "./top"
import Bot from "./bot"
import Seo from "./seo"

const Layout = ({ children }) => {  
  return (
    <div>
      <Seo />
      <Top />
      <main>{children}</main>
      <Bot />
    </div>
  )
}

Layout.propTypes = {  
  children: PropTypes.node.isRequired,
}

export default Layout  
