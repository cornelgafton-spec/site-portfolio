const login = (req, res) => {
  const { email, password } = req.body;

  if (email === "client@test.com" && password === "123456") {
    return res.json({
      message: "Login ok",
      user: {
        id: 1,
        name: "Client Demo"
      }
    });
  }

  res.status(401).json({ message: "Date gresite" });
};

module.exports = { login };