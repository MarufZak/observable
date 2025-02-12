module.exports = {
    env: {
        node: true,
    },
    root: true,
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint"],
    extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
    rules: {
        "@typescript-eslint/no-unused-vars": "error",
        "@typescript-eslint/no-explicit-any": "off",
    },
    parserOptions: {
        ecmaVersion: 2022,
        sourceType: "module",
    },
};
