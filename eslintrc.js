module.exports = {
    root: true,
    env: {
      "node": true
    },
    extends: [
      "plugin:vue/essential",
      "eslint:recommended"
    ],
    parserOptions: {
      "parser": "babel-eslint"
    },
    rules: {
        "vue/html-closing-bracket-newline": ["error", {
          "singleline": "never",
          "multiline": "always"
        }]
    }
}
