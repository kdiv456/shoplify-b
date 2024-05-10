// Create token and save in the cookie
export default (user, statusCode, res) => {
  // Create JWT token
  const token = user.getJwtToken();

  //Options for cookie
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
    ),
    httpOnly: true, // http only cookie cannot be accessed on frontend, it can only be accessed on backend
  };

  res.status(statusCode).cookie("token", token, options).json({
    token,
  }); // (cookie_name,cookie_value,cookie_options)
};
