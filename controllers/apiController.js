const { USERS, INFORMATION, REFRESHTOKENS } = require("../DB/main");
const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.information_get = async (req, res) => {
  let token = req.get("Authorization").split(" ")[1];

  if (!token) {
    return res.status(401).send("Access Token Required");
  }

  jwt.verify(token, "asd2asdf3", async (err, decodedToken) => {
    if (err) {
      return res.status(403).send("Invalid Access Token");
    } else {
      let info;
      INFORMATION.forEach((user) => {
        if (user.email === decodedToken.user.email) {
          info = user.info;
        }
      });
      const response = [{ email: decodedToken.user.email, info }];
      return res.status(200).send(response);
    }
  });
};

module.exports.users_get = async (req, res) => {
  let token = req.get("Authorization").split(" ")[1];

  if (!token) {
    return res.status(401).send("Access Token Required");
  }

  jwt.verify(token, "asd2asdf3", async (err, decodedToken) => {
    if (err) {
      return res.status(403).send("Invalid Access Token");
    } else {
      return res.status(200).json(USERS);
    }
  });
};
