const { USERS, INFORMATION, REFRESHTOKENS } = require("../DB/main");
const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const jwt = require("jsonwebtoken");

// const admin = {
//   email: "admin@gmail.com",
//   name: "admin",
//   password: hashSync("Rc123456!", genSaltSync(10)),
//   isAdmin: true,
// };

// create json web token
const createToken = (user) => {
  return jwt.sign({ user }, "asd2asdf3", {
    expiresIn: "10s",
  });
};
const createRefreshToken = (user) => {
  return jwt.sign({ user }, "asd2asdf3", {
    expiresIn: "40s",
  });
};

module.exports.register_post = async (req, res) => {
  const { body } = req;

  let isExist = false;
  USERS.map((user) => {
    if (user.email === body.email) {
      isExist = true;
    }
  });
  if (isExist) {
    res.status(409).send("user already exists");
  }
  const newUser = {
    email: body.email,
    name: body.name,
    password: hashSync(body.password, genSaltSync(10)),
    isAdmin: false,
  };

  const newUserInfo = { email: `${body.email}`, info: `${body.name} info` };

  USERS.push(newUser);
  INFORMATION.push(newUserInfo);
  res.status(201).send("Register Success");
};

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;
  let isExist = false;
  let existUser;
  USERS.map((user) => {
    if (user.email === email) {
      isExist = true;
      existUser = user;
    }
  });
  if (!isExist) {
    return res.status(404).send("cannot find user");
  }

  if (!compareSync(password, existUser.password)) {
    return res.status(403).send("User or Password incorrect");
  }

  const token = createToken(existUser);
  const refreshToken = createRefreshToken(existUser);

  const response = {
    accessToken: token,
    refreshToken,
    email,
    name: existUser.name,
    isAdmin: existUser.isAdmin,
  };

  return res.status(200).json(response);
};

module.exports.token_post = async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(401).send("Refresh Token Required");
  }

  jwt.verify(token, "asd2asdf3", async (err, decodedToken) => {
    if (err) {
      return res.status(403).send("Invalid Refresh Token");
    } else {
      const newToken = createToken(decodedToken.user);
      return res.status(200).json({ accessToken: newToken });
    }
  });
};

module.exports.tokenValidate_post = async (req, res) => {
  let token = req.get("Authorization").split(" ")[1];

  if (!token) {
    return res.status(401).send("Access Token Required");
  }

  jwt.verify(token, "asd2asdf3", async (err, decodedToken) => {
    if (err) {
      return res.status(403).send("Invalid Access Token");
    } else {
      return res.status(200).json({ valid: true });
    }
  });
};

module.exports.logout_post = async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).send("Refresh Token Required");
  }

  jwt.verify(token, "asd2asdf3", async (err, decodedToken) => {
    if (err) {
      return res.status(400).send("Invalid Refresh Token");
    } else {
      return res.status(200).send("User Logged Out Successfully");
    }
  });
};
