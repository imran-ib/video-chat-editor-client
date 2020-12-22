import gql from "graphql-tag";

export const NewUser = gql`
  mutation CreateUsers(
    $email: String!
    $displayName: String!
    $username: String!
    $password: String!
  ) {
    NewUser(
      email: $email
      displayName: $displayName
      username: $username
      password: $password
    ) {
      token
      user {
        id
        email
        displayName
        username
        Name
      }
    }
  }
`;

export const UserLogin = gql`
  mutation Login($email: String!, $password: String!) {
    UserLogin(email: $email, password: $password) {
      token
      user {
        id
        email
        displayName
        username
        Name
      }
    }
  }
`;

export const CurrentUser = gql`
  query CurrentUser {
    CurrentUser {
      Name
      email
      username
      id
    }
  }
`;

export const GetInTouch = gql`
  mutation GetInTouch($name: String!, $email: String!, $message: String!) {
    GetInTouch(name: $name, email: $email, message: $message)
  }
`;
