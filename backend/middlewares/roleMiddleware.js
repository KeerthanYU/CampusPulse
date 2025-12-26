export const requireRole = (allowedRoles = []) => {
  return (req, res, next) => {
    try {
      const role = req.user?.role;
      if (!role) return res.status(403).json({ message: 'Forbidden' });
      if (!allowedRoles.includes(role)) return res.status(403).json({ message: 'Forbidden' });
      next();
    } catch (err) {
      next(err);
    }
  };
};
export const roleMiddleware = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  };
};
