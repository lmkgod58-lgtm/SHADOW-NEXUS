/* =========================================================
   SHADOW NEXUS
   PUBLIC CONFIGURATION
   =========================================================

   IMPORTANT:
   NEVER put API keys, passwords or private tokens here.

   This file is loaded by the user's browser.

   Render URLs will be added later.
   ========================================================= */

const SHADOW_CONFIG = {

    VERSION: "1.0.0",

    ENVIRONMENT: "production",

    SERVICES: {

        GATEWAY: "",

        AI: "",

        CYBERLAB: "",

        MONITOR: "",

        WEBINTEL: "",

        EXPERIMENTS: ""

    },

    REQUEST_TIMEOUT: 30000,

    HEALTH_CHECK_INTERVAL: 30000

};


/*
    Make configuration available globally.
*/

window.SHADOW_CONFIG = SHADOW_CONFIG;
