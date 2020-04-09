import React from "react"  
import { StaticQuery, graphql } from "gatsby"

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
