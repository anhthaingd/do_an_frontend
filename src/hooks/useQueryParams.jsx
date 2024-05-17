import { useSearchParams, useLocation, useNavigate } from "react-router-dom";
import { useMemo } from "react";

export default function useQueryParams() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const queryParams = useMemo(() => {
    return Object.fromEntries(searchParams);
  }, [searchParams]);

  return { queryParams, pathname: location.pathname, navigate };
}
