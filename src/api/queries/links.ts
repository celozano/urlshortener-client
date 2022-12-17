import { gql } from '@apollo/client';

export const LINKS_QUERY = gql`
  query {
    getLinks {
      link
      page_title
      created_at
    }
  }
`;

export const CREATE_LINK_MUTATION = gql`
  mutation CreateLink($url: String!) {
    createLink(url: $url) {
      link
      page_title
    }
  }
`;
