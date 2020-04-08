import React from "react";
import "./css/main.scss";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import Pieces from "./components/pieces";


const query = gql`  
    query { 
      pieces(sort: "date:desc") {
        id
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
        }
      }
    }
`;

function App() {
    const { loading, error, data } = useQuery(query);

    if (loading) return <p>GraphQL loading..</p>;
    //if (error) return <p>GraphQL error.</p>;

    return (
      <Pieces pieces={data.pieces} />
    )

        /*
        return data.pieces.map(({ currency, rate }) => (
            <div key={currency}>
            <p>
            {currency}: {rate}
            </p>
            </div>
        ));
    /*
  return (
    <div className="App">
      <Query query={query} id={null}>
      {({ data: { pieces } }) => {
        console.log(pieces)
      }}
      </Query>
    </div>
  );
  */
}

export default App;

//import { Query } from "@apollo/react-components";
//import Query from "./components/query";
