/**
 * Whenever you compile your CSS with NODE_ENV set to production, 
 * Tailwind will automatically purge unused styles from your CSS.
 */
module.exports = {
    purge: [
      // Use *.tsx if using TypeScript
      './pages/**/*.js',
      './components/**/*.js'
    ]
  }