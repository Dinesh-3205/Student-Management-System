const db = require("../config/couchdb");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { zodUserSchema } = require("../validations/user.validation");

/* SIGNUP */
exports.signup = async (req, res) => {
  try {
    zodUserSchema.parse(req.body);

    const { email, username, password } = req.body;

    const existing = await db.find({
      selector: { email }
    });

    if (existing.docs.length > 0) {
      return res.status(400).json({ message: "Data already inserted" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.insert({
      ...req.body,
      password: hashedPassword,
      type: "student"
    });

    res.status(201).json({ message: "Signup successful" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

/* LOGIN */
exports.login = async (req, res) => {
  const { email, password } = req.body;

  const result = await db.find({
    selector: { email }
  });

  if (result.docs.length === 0)
    return res.status(400).json({ message: "Invalid credentials" });

  const user = result.docs[0];
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch)
    return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({ token });
};

/* GET USER */
exports.getUser = async (req, res) => {
  const user = await db.get(req.user.id);
  delete user.password;
  res.json(user);
};

/* UPDATE USER */
exports.updateUser = async (req, res) => {
  const user = await db.get(req.user.id);

  const updated = {
    ...user,
    ...req.body
  };

  await db.insert(updated);
  res.json({ message: "User updated successfully" });
};

/* LOGOUT */
exports.logout = async (req, res) => {
  res.json({ message: "Logout successful (client should delete token)" });
};
