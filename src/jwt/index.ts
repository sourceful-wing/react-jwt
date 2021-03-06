export function decodeToken(token: string) {
  try {
    // if the token has more or less than 3 parts or is not a string
    // then is not a valid token
    if (token.split(".").length !== 3 || typeof token !== "string") {
      return null;
    } else {
      // payload ( index 1 ) has the data stored and
      // data about the expiration time
      const payload: string = token.split(".")[1];
      // decode and parse to json
      const decoded = JSON.parse(atob(payload));
      return decoded;
    }
  } catch (error) {
    // Return null if something goes wrong
    return null;
  }
}

export function isTokenExpired(token: string) {
  const decodedToken: any = decodeToken(token);
  let result: boolean = true;

  if (decodedToken && decodedToken.exp) {
    const expirationDate: Date = new Date(0);
    expirationDate.setUTCSeconds(decodedToken.exp); // sets the expiration seconds
    // compare the expiration time and the current time
    result = expirationDate.valueOf() < new Date().valueOf();
  } else {
    result = true;
  }

  return result;
}
