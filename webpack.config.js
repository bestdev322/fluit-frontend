module.exports = {
    // outras configurações do webpack...
  
    module: {
      rules: [
        // outras regras...
  
        {
          test: /\.s[ac]ss$/i,
          use: [
            'style-loader',
            'css-loader',
            'sass-loader'
          ]
        }
      ]
    }
  };
  