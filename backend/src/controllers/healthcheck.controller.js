const healthcheck = async (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Healthcheck successful",
  });
};

export { healthcheck };
