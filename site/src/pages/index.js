import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
//import Posts from "../components/post"
import Pieces from "../components/piece"

const getDate = () => {
  let d = new Date()
  d.setUTCHours(d.getUTCHours()-4)
  return d.toISOString()
}

const IndexPage = ({data}) => (  
 <Layout>
    <div>
    <Pieces pieces={data.allStrapiPiece.edges} />
    </div>
    Build at {getDate()}; Kingston, NY.
  </Layout>
)


export const query = graphql`
        query Posts {
          allStrapiPiece(sort: {fields: date, order: DESC}) {
            edges {
              node {
                id
                title
                date
                images {
                  id
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
                  process
                  width
                  height
                  length
        */
