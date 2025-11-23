import List from "@page/List";
import Create from "@page/Create";

export const ROUTE_PATHS = {
  list: "/",
  create: "/create",
} as const;

export type RouteName = keyof typeof ROUTE_PATHS;

export const routes = [
  {
    path: ROUTE_PATHS.list,
    element: <List />,
  },
  {
    path: ROUTE_PATHS.create,
    element: <Create />,
  },
];
