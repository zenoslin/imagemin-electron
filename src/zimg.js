const imagemin = require('./imagemin').compass;

var inputPath = "../ui";
var outputPath = "../ui/temp"

imagemin(inputPath, outputPath);