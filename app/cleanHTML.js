const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

function convertCachedURLToDirectURL(cachedURL) {
  const regex = /https:\/\/cache\.ptt\.cc\/c\/(https:\/\/i\.imgur\.com\/[a-zA-Z0-9]+\.png)/;
  const match = cachedURL.match(regex);
  
  if (match && match.length >= 2) {
    return match[1];
  }
  
  return cachedURL; // Return the original URL if no match is found
}

module.exports = function(inputFile) {
  const outputFile = '/tmp/temp.html';

  // Read the HTML file
  let data = fs.readFileSync(inputFile, 'utf8')
  // Load the HTML content into Cheerio
  const $ = cheerio.load(data);

  // =================================================================

  // Remove h1 elements with class 'blogger-title'
  $('h1.blogger-title').remove();

  $('img').each(function () {
    if (this.src.startsWith('https://cache.ptt.cc/c/https://i.imgur.com/')) {
      this.src = convertCachedURLToDirectURL(this.src)
    }
    // $(this).css('max-width', '70%');
    $(this).attr('width', '50%')

    $(this).css('width', '50%')
    $(this).css('max-width', '14cm')
    $(this).css('height', 'auto')
    $(this).css('max-height', '28cm')
  });

  // =================================================================

  // Get the modified HTML content
  const modifiedHtml = $.html();

      // Write the modified HTML content to the output file
  fs.writeFileSync(outputFile, modifiedHtml, 'utf8');

  return outputFile
}

