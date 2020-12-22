import { useCurrentUserQuery } from "../../../../../generated/graphql";

function useUser() {
  const { loading, data, error, called } = useCurrentUserQuery({
    //every five second
    pollInterval: 5000,
  });

  if (data && !loading && !error && called) {
    return data.CurrentUser;
  } else {
    return null;
  }
}

export { useUser };
