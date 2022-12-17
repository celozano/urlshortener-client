export const getAuthErrorMessage = (authCode: string) => {
  switch (authCode) {
    case 'auth/wrong-password':
      return 'Wrong password';
    case 'auth/user-not-found':
      return 'User not found';
    case 'auth/weak-password':
      return 'Password should be at least 6 characters';
    case 'auth/email-already-in-use':
      return 'Email already in use';
    default:
      return 'Something went wrong';
  }
};

export const isValidURL = (input: string) => {
  const match = input.match(
    /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
  );

  return match !== null;
};
