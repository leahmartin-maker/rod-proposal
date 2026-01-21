// server/middleware/authMiddleware.js
// Auth middleware to protect routes and enforce role-based access
// Follows clean code, security, and documentation standards

const supabase = require('../supabaseClient');

/**
 * Middleware to verify the user's JWT access token from the Authorization header.
 * If valid, attaches the user object to req.user. Otherwise, returns 401 Unauthorized.
 *
 * Usage: app.use('/protected', authMiddleware, protectedRouteHandler)
 */
async function authMiddleware(req, res, next) {
  // 1. Get the token from the Authorization header (format: 'Bearer <token>')
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or invalid Authorization header.' });
  }
  const token = authHeader.split(' ')[1];

  // 2. Verify the token with Supabase
  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data || !data.user) {
    return res.status(401).json({ error: 'Invalid or expired token.' });
  }

  // 3. Attach user info to the request for downstream handlers
  req.user = data.user;
  next();
}

/**
 * Role-based access control middleware.
 * Usage: app.use('/admin', authMiddleware, requireRole('owner'), adminHandler)
 */
function requireRole(roleName) {
  return (req, res, next) => {
    if (!req.user || !req.user.user_metadata || req.user.user_metadata.role_id == null) {
      return res.status(403).json({ error: 'User role not found.' });
    }
    // For demo: role_id 1 = owner, 2 = manager, etc. (customize as needed)
    // In production, map role_id to role names from your roles table
    if (roleName === 'owner' && req.user.user_metadata.role_id !== 1) {
      return res.status(403).json({ error: 'Insufficient permissions.' });
    }
    next();
  };
}

module.exports = { authMiddleware, requireRole };

// Real World Context:
// This middleware protects sensitive API routes by requiring a valid login token and (optionally) a specific user role.
// It keeps business logic on the server, ensures security, and is easy to extend for more roles or permissions.
// All error messages are clear and safe for production use.