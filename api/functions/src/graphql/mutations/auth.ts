async function attemptSignUp(_: any, { signupPayload }, context: any) {
  const user = context.user;
  console.log(user);

  // Get user from context
  // If user already exists set error

  // Otherwise create a document for the user
  // Associate the user with a community
  // Find out if the community exists
  // If the community doesn't exist
  // Set the user as isWaiting

  // Return the user
}

export const authResolvers = {
  attemptSignUp,
};
