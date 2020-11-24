const yup = require('yup');

exports.update = (req, res, next) => {
  const bodySchema = yup.object().shape({
    questionId: yup.string().required(),
    rating: yup.string().required(),
  });

  try {
    bodySchema.validateSync(req.body);
  } catch (error) {
    return res.status(400).json({ error: 'invalid_payload' });
  }

  if (!req.headers.authorization) {
    return res.status(401).json({ error: 'invalid_authorization' });
  }

  if (req.body.password !== req.body.confirmPassword) {
    return res.status(400).json({ error: 'password_mismatch' });
  }

  return next();
};
