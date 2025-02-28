import { FlatCompat } from '@eslint/eslintrc';
import eslintPluginPrettierRecommended from 'eslint-config-prettier';
import perfectionist from 'eslint-plugin-perfectionist';
import prettier from 'eslint-plugin-prettier';

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

const eslintConfig = [
  {
    plugins: {
      prettier: prettier,
      perfectionist: perfectionist,
    },
  },
  ...compat.config({
    extends: ['next/core-web-vitals', 'next', 'prettier'],
  }),
  eslintPluginPrettierRecommended,
  {
    rules: {
      'prettier/prettier': 'error',
      'no-unused-vars': 'warn',
      '@next/next/no-html-link-for-pages': 'off',
    },
  },
];

export default eslintConfig;
