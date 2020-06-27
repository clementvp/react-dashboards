import gql from "graphql-tag";

const DELETE_PLUGINS = gql`
  mutation($uuid: uuid!) {
    delete_dashboards_plugins(where: { dashboard_uuid: { _eq: $uuid } }) {
      affected_rows
    }
  }
`;

export const INSERT_PLUGINS = gql`
  mutation($objects: [dashboards_plugins_insert_input!]!) {
    insert_dashboards_plugins(objects: $objects) {
      affected_rows
    }
  }
`;

export default DELETE_PLUGINS;
