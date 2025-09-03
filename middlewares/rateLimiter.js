const rateLimit = require("express-rate-limit");
const jwt = require("jsonwebtoken");

// Base rate limiter configuration
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 500, // Max 500 requests per window per IP
  message: "Too many requests from this IP, please try again later.",
  standardHeaders: true, // Return rate limit info in headers
  legacyHeaders: false, // Disable legacy headers
});

// Middleware to check if the user is an admin
const rateLimiter = (req, res, next) => {
  try {
    // Get the token from the Authorization header
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Check the decoded token for admin role (you may adjust as needed)
      if (decoded && decoded.role === "admin") {
        // Skip rate limiting for admins
        return next();
      }
    }
  } catch (err) {
    // If token verification fails, continue to apply rate limiting
    console.error("Token verification failed:", err.message);
  }

  // Apply rate limiting for non-admin users or unauthenticated requests
  return limiter(req, res, next);
};

module.exports = rateLimiter;
