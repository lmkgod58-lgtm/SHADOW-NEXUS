/* =========================================================
   SHADOW NEXUS
   MAIN FRONTEND CONTROLLER
   ========================================================= */

"use strict";


/* =========================================================
   GLOBAL REFERENCES
   ========================================================= */

const sidebar =
    document.getElementById("sidebar");

const mobileMenuButton =
    document.getElementById("mobileMenuButton");

const clock =
    document.getElementById("clock");

const globalStatus =
    document.getElementById("globalStatus");

const terminalInput =
    document.getElementById("terminalInput");

const terminalOutput =
    document.getElementById("terminalOutput");


/* =========================================================
   CLOCK
   ========================================================= */

function updateClock() {

    if (!clock) return;

    const now = new Date();

    const hours =
        String(now.getHours()).padStart(2, "0");

    const minutes =
        String(now.getMinutes()).padStart(2, "0");

    const seconds =
        String(now.getSeconds()).padStart(2, "0");

    clock.textContent =
        `${hours}:${minutes}:${seconds}`;
}


updateClock();

setInterval(updateClock, 1000);


/* =========================================================
   MOBILE SIDEBAR
   ========================================================= */

if (mobileMenuButton && sidebar) {

    mobileMenuButton.addEventListener(
        "click",
        () => {

            sidebar.classList.toggle("open");

        }
    );
}


/*
   Close mobile navigation after selecting a page.
*/

document
    .querySelectorAll(".nav-item")
    .forEach(item => {

        item.addEventListener(
            "click",
            () => {

                if (
                    window.innerWidth <= 850 &&
                    sidebar
                ) {

                    sidebar.classList.remove("open");

                }

            }
        );

    });


/* =========================================================
   TERMINAL
   ========================================================= */

const terminalCommands = {

    help: [
        "AVAILABLE COMMANDS:",
        "",
        "help      - show commands",
        "status    - show Nexus status",
        "modules   - show available modules",
        "clear     - clear terminal",
        "version   - show system version",
        "time      - show system time"
    ],

    status: [
        "NEXUS STATUS",
        "",
        "Frontend: ONLINE",
        "Gateway: WAITING",
        "AI Core: WAITING",
        "Cyber Lab: WAITING",
        "Monitor: WAITING"
    ],

    modules: [
        "NEXUS MODULES",
        "",
        "[01] AI CORE",
        "[02] CYBER LAB",
        "[03] WEB INTEL",
        "[04] EXPERIMENTS",
        "[05] DEV CORE",
        "[06] SYSTEM MONITOR"
    ],

    version: [
        "SHADOW NEXUS",
        "Version: " +
            (
                window.SHADOW_CONFIG?.VERSION
                || "unknown"
            ),
        "Frontend: GitHub Pages",
        "Backend: Render"
    ],

    time: [
        "SYSTEM TIME",
        new Date().toString()
    ]

};


/* =========================================================
   TERMINAL OUTPUT
   ========================================================= */

function writeTerminal(lines) {

    if (!terminalOutput) return;

    lines.forEach(line => {

        const element =
            document.createElement("div");

        element.textContent = line;

        terminalOutput.appendChild(element);

    });

    terminalOutput.scrollTop =
        terminalOutput.scrollHeight;
}


/* =========================================================
   TERMINAL COMMAND EXECUTION
   ========================================================= */

function executeCommand(command) {

    const cleanCommand =
        command
            .trim()
            .toLowerCase();

    if (!cleanCommand) {
        return;
    }


    /* Display command */

    const commandLine =
        document.createElement("div");

    commandLine.innerHTML =
        `<span style="color:#bd7aff;">&gt;</span> ${escapeHTML(command)}`;

    terminalOutput.appendChild(commandLine);


    /* Clear */

    if (cleanCommand === "clear") {

        terminalOutput.innerHTML = "";

        return;
    }


    /* Known command */

    if (terminalCommands[cleanCommand]) {

        writeTerminal(
            terminalCommands[cleanCommand]
        );

        return;
    }


    /* Unknown command */

    writeTerminal([
        `Command not found: ${cleanCommand}`,
        "Type 'help' for available commands."
    ]);
}


/* =========================================================
   TERMINAL INPUT
   ========================================================= */

if (terminalInput) {

    terminalInput.addEventListener(
        "keydown",
        event => {

            if (event.key !== "Enter") {
                return;
            }

            executeCommand(
                terminalInput.value
            );

            terminalInput.value = "";

        }
    );
}


/* =========================================================
   HTML ESCAPING
   ========================================================= */

function escapeHTML(value) {

    return String(value)

        .replaceAll("&", "&amp;")

        .replaceAll("<", "&lt;")

        .replaceAll(">", "&gt;")

        .replaceAll('"', "&quot;")

        .replaceAll("'", "&#039;");
}


/* =========================================================
   SERVICE HEALTH FOUNDATION
   ========================================================= */

async function checkService(
    serviceURL
) {

    if (!serviceURL) {

        return {
            status: "waiting",
            latency: null
        };

    }


    const start =
        performance.now();


    try {

        const response =
            await fetch(
                `${serviceURL}/health`,
                {
                    method: "GET",
                    cache: "no-store"
                }
            );


        const latency =
            Math.round(
                performance.now() - start
            );


        return {

            status:
                response.ok
                    ? "online"
                    : "error",

            latency

        };

    } catch (error) {

        return {

            status: "offline",

            latency: null

        };

    }

}


/* =========================================================
   FRONTEND STATUS
   ========================================================= */

function setGlobalStatus(status) {

    if (!globalStatus) {
        return;
    }

    const statusText = {

        online: "NEXUS ONLINE",

        waiting: "NEXUS WAITING",

        offline: "NEXUS OFFLINE"

    };

    globalStatus.textContent =
        statusText[status]
        || "NEXUS ONLINE";
}


/* =========================================================
   INITIALIZATION
   ========================================================= */

function initializeNexus() {

    console.log(
        "%c SHADOW NEXUS ",
        `
        background:#6b2bff;
        color:white;
        font-size:16px;
        font-weight:bold;
        padding:8px;
        `
    );

    console.log(
        "Nexus frontend initialized."
    );

    console.log(
        "Version:",
        window.SHADOW_CONFIG?.VERSION
    );

    setGlobalStatus("online");
}


/* =========================================================
   START
   ========================================================= */

initializeNexus();


/* =========================================================
   PUBLIC API
   ========================================================= */

window.SHADOW_NEXUS = {

    checkService,

    executeCommand,

    config:
        window.SHADOW_CONFIG

};
