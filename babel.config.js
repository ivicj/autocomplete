module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  devServer: {
    proxy: 'https://gist.githubusercontent.com/ivicj/d73f7e8abc7fa57de6104b192c77d69e/raw/c96950c6fdc7c6cc90ef1109f8958a78efd53cf9/Stores',
}
}
