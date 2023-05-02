import { gql } from "@apollo/client";

// Search user information by id
export const GET_PRODUCTS = gql`
  query products {
    products {
      id
      name
      nameSeller
      image
      price
      type
      simpleProduct {
        inventory
      }
      rentProduct {
        rentType
        rentedDays
      }
      spaceProduct {
        rentedDays
        location
      }
    }
  }
`;
