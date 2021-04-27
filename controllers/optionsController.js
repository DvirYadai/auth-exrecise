const { USERS, INFORMATION, REFRESHTOKENS } = require("../DB/main");
const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.options_get = async (req, res) => {
  let token = req.get("Authorization");

  if (token) {
    token = token.split(" ")[1];
  }

  let response = [];

  res.setHeader("Allow", "OPTIONS, GET, POST");

  if (!token) {
    response = [
      {
        method: "post",
        path: "/users/register",
        description: "Register, Required: email, name, password",
        example: {
          body: { email: "user@email.com", name: "user", password: "password" },
        },
      },
      {
        method: "post",
        path: "/users/login",
        description: "Login, Required: valid email and password",
        example: { body: { email: "user@email.com", password: "password" } },
      },
    ];

    return res.status(200).send(response);
  }

  jwt.verify(token, "asd2asdf3", async (err, decodedToken) => {
    if (err) {
      response = [
        {
          method: "post",
          path: "/users/register",
          description: "Register, Required: email, name, password",
          example: {
            body: {
              email: "user@email.com",
              name: "user",
              password: "password",
            },
          },
        },
        {
          method: "post",
          path: "/users/login",
          description: "Login, Required: valid email and password",
          example: { body: { email: "user@email.com", password: "password" } },
        },
        {
          method: "post",
          path: "/users/token",
          description: "Renew access token, Required: valid refresh token",
          example: { headers: { token: "*Refresh Token*" } },
        },
      ];

      return res.status(200).send(response);
    } else {
      if (!decodedToken.user.isAdmin) {
        response = [
          {
            method: "post",
            path: "/users/register",
            description: "Register, Required: email, name, password",
            example: {
              body: {
                email: "user@email.com",
                name: "user",
                password: "password",
              },
            },
          },
          {
            method: "post",
            path: "/users/login",
            description: "Login, Required: valid email and password",
            example: {
              body: { email: "user@email.com", password: "password" },
            },
          },
          {
            method: "post",
            path: "/users/token",
            description: "Renew access token, Required: valid refresh token",
            example: { headers: { token: "*Refresh Token*" } },
          },
          {
            method: "post",
            path: "/users/tokenValidate",
            description:
              "Access Token Validation, Required: valid access token",
            example: { headers: { Authorization: "Bearer *Access Token*" } },
          },
          {
            method: "get",
            path: "/api/v1/information",
            description:
              "Access user's information, Required: valid access token",
            example: { headers: { Authorization: "Bearer *Access Token*" } },
          },
          {
            method: "post",
            path: "/users/logout",
            description: "Logout, Required: access token",
            example: { body: { token: "*Refresh Token*" } },
          },
        ];

        return res.status(200).send(response);
      } else {
        response = [
          {
            method: "post",
            path: "/users/register",
            description: "Register, Required: email, name, password",
            example: {
              body: {
                email: "user@email.com",
                name: "user",
                password: "password",
              },
            },
          },
          {
            method: "post",
            path: "/users/login",
            description: "Login, Required: valid email and password",
            example: {
              body: { email: "user@email.com", password: "password" },
            },
          },
          {
            method: "post",
            path: "/users/token",
            description: "Renew access token, Required: valid refresh token",
            example: { headers: { token: "*Refresh Token*" } },
          },
          {
            method: "post",
            path: "/users/tokenValidate",
            description:
              "Access Token Validation, Required: valid access token",
            example: { headers: { Authorization: "Bearer *Access Token*" } },
          },
          {
            method: "get",
            path: "/api/v1/information",
            description:
              "Access user's information, Required: valid access token",
            example: { headers: { Authorization: "Bearer *Access Token*" } },
          },
          {
            method: "post",
            path: "/users/logout",
            description: "Logout, Required: access token",
            example: { body: { token: "*Refresh Token*" } },
          },
          {
            method: "get",
            path: "api/v1/users",
            description:
              "Get users DB, Required: Valid access token of admin user",
            example: { headers: { authorization: "Bearer *Access Token*" } },
          },
        ];

        return res.status(200).send(response);
      }
    }
  });
};
