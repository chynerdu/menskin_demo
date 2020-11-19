// 1
import gql from "graphql-tag";

// 2
export const ALL_PRODUCTS_QUERY = gql`
  query Products($currency: Currency!) {
    products {
      id
      title
      image_url
      price(currency: $currency)
    }
  }
`;

export const ALL_CURRENCY_QUERY = gql`
  query Currency {
    currency
  }
`;
