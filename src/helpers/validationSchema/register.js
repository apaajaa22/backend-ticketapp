module.exports = {
  email: {
    isEmail: {
      bail: true,
      errorMessage: 'email is required',
    },
  },
  password: {
    isLength: {
      errorMessage: 'password length must be 6 characters at least',
      options: {
        min: 6,
      },
    },
  },
  fullname: {
    isLength: {
      errorMessage: 'name length must be 4 characters at least',
      options: {
        min: 4,
      },
    },
  },
};
