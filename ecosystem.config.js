module.exports = {
    apps: [
        {
            name: "energy-sales",
            script: "node_modules/next/dist/bin/next",
            args: "start -p 8000",
            watch: false,
        },
    ],
};