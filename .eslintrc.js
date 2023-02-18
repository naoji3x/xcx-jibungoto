module.exports = {
  env: {
    'jest/globals': true, // 追加 vs codeのエラー対策 https://qiita.com/tutu/items/66f586c455ded70bd1e2
    browser: true,
    es2021: true,
    node: true
  },
  extends: ['standard-with-typescript', 'prettier'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.eslint.json']
  },
  plugins: ['jest'] // 追加 vs codeのエラー対策 https://oisham.hatenablog.com/entry/2019/08/20/111826
}
