import React from "react"  
import { StaticQuery, Link, graphql } from "gatsby"

const Top = () => (  
    <StaticQuery
      query={graphql`
        query {
          strapiSiteInformation {
              title
          }
        }
     `}
      render={data => (
  <h1 className="site-title">
    <Link to="/">{data.strapiSiteInformation.title}</Link>
  </h1>
      )}
    />
)

export default Top
