import gql from "graphql-tag";

export const GET_DASHBOARDS = gql`
  query {
    dashboards_dashboards {
      background_color
      columns
      description
      title
      uuid
    }
  }
`;

export const GET_DASHBOARD_DATA = gql`
  query($uuid: uuid!) {
    dashboards_dashboards(where: { uuid: { _eq: $uuid } }) {
      background_color
      columns
      description
      title
      uuid
    }
  }
`;

export const GET_DASHBOARD_PLUGINS = gql`
  query($uuid: uuid!) {
    dashboards_plugins(where: { dashboard_uuid: { _eq: $uuid } }) {
      h
      name
      url
      i
      w
      x
      y
    }
  }
`;

export default GET_DASHBOARDS;
