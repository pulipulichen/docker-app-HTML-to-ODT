const request = require('request');
const sizeOf = require('image-size');


module.exports = function(imageUrl) {
  return new Promise(function(resolve, reject) {
    // Make an HTTP GET request to fetch the image
    request({ url: imageUrl, encoding: null }, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        // Convert the image data to a base64-encoded string
        const base64Image = Buffer.from(body).toString('base64');

        // Save the base64-encoded string to a file (optional)
        // fs.writeFileSync('imageBase64.txt', base64Image, 'base64');

        // console.log('Base64-encoded image:');
        // console.log(base64Image);
        resolve(base64Image)
      } else {
        reject('Error fetching the image:', error);
      }
    });
  })
}