import gql from "graphql-tag";

export const UPDATE_DASHBOARD = gql`
  mutation(
    $uuid: uuid!
    $title: String!
    $description: String!
    $columns: Int!
    $colorBg: String!
  ) {
    update_dashboards_dashboards(
      _set: {
        background_color: $colorBg
        columns: $columns
        description: $description
        title: $title
      }
      where: { uuid: { _eq: $uuid } }
    ) {
      affected_rows
    }
  }
`;

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
