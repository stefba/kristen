import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
//import Posts from "../components/post"
import Pieces from "../components/piece"
import Selection from "../components/selection"

const getDate = () => {
  let d = new Date()
  d.setUTCHours(d.getUTCHours()-4)
  return d.toISOString()
}

const findPiece = (edges, id) => {
  id = "Piece_" + id
  for (const edge of edges) {
    if (edge.node.id === id) {
      return edge.node
    }
  }
}

const joinSelection = data => {
  let selection = [];
  console.log(data.allStrapiSelection.edges[0].node.highlight)
  for (const el of data.allStrapiSelection.edges[0].node.highlight) {
    let piece = findPiece(data.allStrapiPiece.edges, el.piece.id);
    selection.push(piece);
  }
  return selection;
}

const IndexPage = ({data}) => (
  <Layout>
  <div>
  {/*
  <Selection pieces={joinSelection(data)} />
  */}
  <Pieces pieces={data.allStrapiPiece.edges} />
  </div>
  Build at {getDate()}; Kingston, NY.
  </Layout>
)

export const query = graphql`
  query MyQuery {
    allStrapiSelection {
      edges {
        node {
          highlight {
            piece {
              id
            }
          }
        }
      }
    }
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
