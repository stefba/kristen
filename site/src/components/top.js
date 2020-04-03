import React from "react"  
import { StaticQuery, Link } from "gatsby"

const Top = () => (  
    <StaticQuery
      query={graphql`
        query {
          strapiSiteInformation {
              Title
          }
        }
     `}
      render={data => (
  <h1>
    <Link to="/">{data.strapiSiteInformation.Title}</Link>
  </h1>
      )}
    />
)

export default Top
