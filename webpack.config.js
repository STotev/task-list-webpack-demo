module.exports = (env, options) => {
    console.log("Env:", env);
    console.log("Options:", options);

    return {
        // your configuration here
    };
};

/**
 TODO:
    1. Setup default configuration with no rules
        1. dev mode
        2. entry points
        3. output
        4. resolve
            1. extensions
            2. aliases
        5. devtool
        6. Dev server
    2. Setup babel
    3. Setup browserslist
    4. Setup css
    5. Setup postcss
        1. autoprefixer
        2. flexbug fixes
    6. Setup sass
    7. Setup image process
    9. Plugins
    10. Split configuration for production
    11. Setup optimisations
        1. Minification
        2. Long-term caching
    12. Enable source maps
    13. Bundle analyzer
    14. Fix watch mode for docker users
    15. Dynamic imports
    16. CSS Modules
    17. Bonus: How to keep production clean from console logs
 */