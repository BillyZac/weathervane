module.exports = function() {
  var client = './build/'
  var source = './src/'

  var config = {
    clientRoot: client,

    cssDestination: client + 'css/',
    sassSource: source + 'sass/*.scss',

    javascriptSource: source + '**/*.js',
    javascriptDestinationFilename: 'bundle.js',
    javascriptDestination: client,

    htmlSource: source + '**/*.html',
    htmlDestination: client

  }

  return config
}
