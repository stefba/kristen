import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
//import Posts from "../components/post"
import Pieces from "../components/piece"

const IndexPage = ({data}) => (  
 <Layout>
    <div>
    {console.log(data)}
    <Pieces pieces={data.allStrapiPiece.edges} />
    {/*<Posts posts={data.allStrapiPost.edges} />*/}
    </div>
  </Layout>
)


export const query = graphql`
        query Posts {
          allStrapiPiece {
            edges {
              node {
                title
                date
                images {
                    url
                }
                info {
                  piece_type {
                    name
                  }
                  glaze {
                    name
                  }
                  firing {
                    name
                  }
                  clay_body {
                    name
                  }
                  process
                  width
                  height
                  length
                }
              }
            }
          }
        }
`

export default IndexPage  

/*
          allStrapiPost {
            edges {
              node {
                title
                text
                images {
                    url
                }
              }
            }
          }
        */
