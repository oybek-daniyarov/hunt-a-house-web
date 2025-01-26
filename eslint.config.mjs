import { FlatCompat } from '@eslint/eslintrc';
import eslintPluginPrettierRecommended from 'eslint-config-prettier';
import prettier from 'eslint-plugin-prettier';

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

const eslintConfig = [
  {
    plugins: {
      prettier: prettier,
    },
  },
  ...compat.config({
    extends: ['next/core-web-vitals'],
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
