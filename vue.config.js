const { defineConfig } = require('@vue/cli-service')
const dotenv = require('dotenv')
dotenv.config()
module.exports = defineConfig({

  lintOnSave: false,
  pluginOptions:{
    env: {
    
    }
  },

  devServer: {
    client: {
      logging: 'none',
      overlay: false,
    },
  
  },
  transpileDependencies: ["vue-notion"],



})
