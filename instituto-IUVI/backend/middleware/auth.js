import jwt from 'jsonwebtoken';


const autenticarAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const SECRET = process.env.JWT_SECRET;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  const token = authHeader.split(' ')[1]; // Formato esperado: "Bearer TOKEN"

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido' });
  }
};

export default autenticarAdmin;
