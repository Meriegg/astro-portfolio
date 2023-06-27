export const getLastPathOfURL = (route: string) => {
  const splitRoute = route.split("/");
  if (splitRoute.length <= 0) {
    return null;
  };

  return splitRoute[splitRoute.length - 1]
}