import { useNavigate as useReactRouterNavigate } from "react-router-dom";
import { ROUTE_PATHS, type RouteName } from "@rooter/routes.tsx";

export const useNavigation = () => {
  const navigate = useReactRouterNavigate();

  const navigateTo = (name: RouteName) => {
    const targetPath = ROUTE_PATHS[name];
    navigate(targetPath);
  };

  return navigateTo;
};
