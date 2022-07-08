module.exports = exports = {
	"parser": "babel-eslint",
	"extends": [
	    "eslint:recommended",
		"plugin:react/recommended",
	],
	"plugins": [
		"react"
	],
	"env": {
		browser: true
	},
	"rules": {
		"indent": ["error", "tab"],
		"quote-props": ["error", "as-needed"],
		"quotes": [2, "single", "avoid-escape"]
	}
}