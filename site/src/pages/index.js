import React from "react"
import { StaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
//import Posts from "../components/post"
import Pieces from "../components/piece"

const IndexPage = () => (  
 <Layout>
    <StaticQuery
      query={graphql`
        query Posts {
          allStrapiPost {
            edges {
              node {
                Title
                Text
                Images {
                    url
                }
              }
            }
          }
          allStrapiPiece {
            edges {
              node {
                Title
                Images {
                    url
                }
              }
            }
          }
        }
      `}
      render={data => (
        <div>
            <Pieces pieces={data.allStrapiPiece.edges} />
          {/*<Posts posts={data.allStrapiPost.edges} />*/}
        </div>
      )}
    />
  </Layout>
)

export default IndexPage  
