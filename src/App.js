import { useEffect, useState } from 'react';
import axios from 'axios';

const query = {
  query: `{contracts(orderBy: SALES, orderDirection: DESC) {
    edges {
      node {
        address
        ... on ERC721Contract {
          name
          stats {
            totalSales
            average
            ceiling
            floor
            volume
          }
          symbol
        }
      }
    }
  }}
`
};

function App() {
  const [contracts, setContracts] = useState([]);
  useEffect(() => {
    axios
      .post(process.env.REACT_APP_GRAPHQL_API, query, {
        headers: { 'x-api-key': process.env.REACT_APP_X_API_KEY }
      })
      .then(({ data }) => setContracts(data.data.contracts.edges))
      .catch(err => console.error(err));
  }, []);

  return (
    <ul>
      {contracts.map(contract => (
        <li key={contract.node.address}>{contract.node.address}</li>
      ))}
    </ul>
  );
}

export default App;
