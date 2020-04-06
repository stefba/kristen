import React from "react"  
import { StaticQuery, Link } from "gatsby"

const Bot = () => (  
    <StaticQuery
      query={graphql`
        query {
          strapiSiteInformation {
              about
          }
        }
     `}
      render={data => (
          <div>
              {data.strapiSiteInformation.About}
          </div>
      )}
    />
)

export default Bot
