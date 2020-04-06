module.exports = {
    verbose: true,
    collectCoverage: true,
    collectCoverageFrom: [
        "src/**/*.{js,jsx}",
        "!<rootDir/node_modules/**"
    ],
    coverageThreshold: {
        global: {
            branches: 90,
            functions: 90,
            lines: 90,
            statements: 90
        }
    },
    coverageReporters: ["text"],
    snapshotSerializers: ["enzyme-to-json/serializer"]
};