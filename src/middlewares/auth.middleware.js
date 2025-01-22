export const isAdmin = (req, res, next) => {
    if (req.user?.role === 'admin') return next();
    res.status(403).json({ error: 'Access denied. Admins only.' });
  };
  
  export const isUser = (req, res, next) => {
    if (req.user?.role === 'user') return next();
    res.status(403).json({ error: 'Access denied. Users only.' });
  };
  