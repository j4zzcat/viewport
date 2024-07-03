/* Copyright(C) 2017-2024, HJD (https://github.com/hjdhjd). All rights reserved.
 *
 * eslint-rules.mjs: Opinionated default linting rules for Homebridge plugins.
 */
import stylistic from "@stylistic/eslint-plugin";
import tsEslint from "@typescript-eslint/eslint-plugin";

const ruleBlankAfterOpenBrace = {

  create(context) {

    function checkNode(node) {

      const sourceCode = context.getSourceCode();
      const openBrace = sourceCode.getFirstToken(node);
      const nextToken = sourceCode.getTokenAfter(openBrace);

      if(openBrace.loc.end.line < nextToken.loc.start.line) {

        const nextLine = sourceCode.lines[openBrace.loc.end.line];

        if(nextLine.trim() !== "") {

          context.report({

            fix(fixer) {

              return fixer.insertTextAfter(openBrace, "\n\n");
            },
            loc: openBrace.loc,
            message: "Expected blank line after left brace and newline.",
            node
          });
        }
      }
    }

    return {

      // Validate block statements.
      BlockStatement(node) {

        checkNode(node);
      },

      // Validate class declarations and any embedded methods or objects.
      ClassBody(node) {

        checkNode(node);

        for(const element of node.body) {

          if(!["MethodDefinition", "PropertyDefinition"].includes(element.type) || element.value?.type !== "ObjectExpression") {

            continue;
          }

          checkNode(node);
        }
      },

      // Validate object expressions.
      ObjectExpression(node) {

        checkNode(node);
      },

      // Validate interface declarations and any embedded objects.
      TSInterfaceBody(node) {

        checkNode(node);

        for(const property of node.body) {

          if(!property.typeAnnotation || (property.type !== "TSPropertySignature") || (property.typeAnnotation.typeAnnotation.type !== "TSTypeLiteral")) {

            continue;
          }

          checkNode(property.typeAnnotation.typeAnnotation);
        }
      },

      // Validate type declarations and any embedded objects.
      TSTypeAliasDeclaration(node) {

        if(node.typeAnnotation.type !== "TSTypeLiteral") {

          return;
        }

        checkNode(node.typeAnnotation);

        for(const member of node.typeAnnotation.members) {

          if(!member.typeAnnotation || (member.type !== "TSPropertySignature") || (member.typeAnnotation.typeAnnotation.type !== "TSTypeLiteral")) {

            continue;
          }

          checkNode(member.typeAnnotation.typeAnnotation);
        }
      }
    };
  },
  meta: {

    docs: {

      category: "Stylistic Issues",
      description: "require a blank line after an opening brace if it is immediately followed by a newline",
      recommended: false
    },
    fixable: "whitespace",
    schema: [],
    type: "layout"
  }
};

// ESlint plugins to use.
const plugins = {

  "@hjdhjd": {

    "rules": {

      "blank-line-after-open-brace": ruleBlankAfterOpenBrace
    }
  },
  "@stylistic": stylistic,
  "@typescript-eslint": tsEslint
};

// TypeScript-specific rules.
const tsRules = {

  ...tsEslint.configs.strictTypeChecked,
  ...tsEslint.configs.stylisticTypeChecked,
  "@typescript-eslint/explicit-function-return-type": "warn",
  "@typescript-eslint/explicit-module-boundary-types": "warn",
  "@typescript-eslint/no-explicit-any": "warn",
  "@typescript-eslint/no-floating-promises": ["warn", { "ignoreIIFE": true }],
  "@typescript-eslint/no-non-null-assertion": "warn",
  "@typescript-eslint/no-unused-expressions": "warn",
  "@typescript-eslint/no-unused-vars": "warn",
  "@typescript-eslint/promise-function-async": "warn",
  "no-dupe-class-members": "off",
  "no-undef": "off",
  "no-unused-expressions": "off",
  "no-unused-vars": "off"
};

// JavaScript-specific rules.
const jsRules = {

  ...tsEslint.configs.disableTypeChecked,
  "@typescript-eslint/no-floating-promises": "off",
  "require-await": "warn"
};

// Rules that exist across both JavaScript and TypeScript files.
const commonRules = {

  ...tsEslint.configs.eslintRecommended,
  "@hjdhjd/blank-line-after-open-brace": "warn",
  "@stylistic/block-spacing": "warn",
  "@stylistic/brace-style": ["warn", "1tbs", { "allowSingleLine": true }],
  "@stylistic/comma-dangle": "warn",
  "@stylistic/eol-last": ["warn", "always"],
  "@stylistic/generator-star-spacing": "warn",
  "@stylistic/implicit-arrow-linebreak": "warn",
  "@stylistic/indent": ["warn", 2, { "SwitchCase": 1 }],
  "@stylistic/keyword-spacing": ["warn",
    { "overrides": { "catch": { "after": false }, "for": { "after": false }, "if": { "after": false }, "switch": { "after": false}, "while": { "after": false } } }],
  "@stylistic/linebreak-style": ["warn", "unix"],
  "@stylistic/lines-between-class-members": ["warn", "always", { "exceptAfterSingleLine": true }],
  "@stylistic/max-len": ["warn", 170],
  "@stylistic/no-tabs": "warn",
  "@stylistic/no-trailing-spaces": "warn",
  "@stylistic/operator-linebreak": ["warn", "after", { "overrides": { ":": "after", "?": "after" } }],
  "@stylistic/padding-line-between-statements": ["warn",

    // Require a blank line before every statement type in next.
    { "blankLine": "always", "next": ["break", "case", "class", "continue", "default", "export", "for", "function", "if", "import", "return"], "prev": "*" },

    // Require blank lines after every statement type in prev.
    { "blankLine": "always", "next": "*", "prev": ["const", "directive", "let", "var"] },

    // Multiple sequential case declarations may be grouped together.
    { "blankLine": "any", "next": ["case", "default"], "prev": ["case", "default"] },

    // Multiple sequential variable declarations may be grouped together.
    { "blankLine": "any", "next": ["const", "let", "var"], "prev": ["const", "let", "var"] },

    // Multiple sequential export declarations may be grouped together.
    { "blankLine": "any", "next": "export", "prev": "export" },

    // Multiple sequential import declarations must be grouped together.
    { "blankLine": "never", "next": "import", "prev": "import" },

    // Multiple sequential directive prologues must be grouped together.
    { "blankLine": "never", "next": "directive", "prev": "directive" }
  ],
  "@stylistic/semi": ["warn", "always"],
  "@stylistic/space-before-function-paren": ["warn", { "anonymous": "never", "asyncArrow": "always", "named": "never" }],
  "@stylistic/space-in-parens": "warn",
  "@stylistic/space-infix-ops": "warn",
  "@stylistic/space-unary-ops": "warn",
  "@typescript-eslint/no-this-alias": "warn",
  "camelcase": "warn",
  "curly": ["warn", "all"],
  "dot-notation": "warn",
  "eqeqeq": "warn",
  "no-await-in-loop": "warn",
  "no-console": "warn",
  "prefer-arrow-callback": "warn",
  "prefer-const": "warn",
  "quotes": ["warn", "double", { "avoidEscape": true }],
  "sort-imports": "warn",
  "sort-keys": "warn",
  "sort-vars": "warn"
};

// Globals that tend to exist in Homebridge plugins with a webUI.
const globalsUi = Object.fromEntries(["console", "document", "fetch", "homebridge"].map(key => [key, "readonly"]));

export default {

  globals: {

    ui: globalsUi
  },
  plugins: plugins,
  rules: {

    common: commonRules,
    js: jsRules,
    ts: tsRules
  }
};
