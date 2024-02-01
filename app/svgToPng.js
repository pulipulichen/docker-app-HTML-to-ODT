const sharp = require('sharp');

module.exports = function ($) {
  // Find all SVG elements in the HTML
  $('svg').each(function () {
    // Convert each SVG to PNG
    const svgElement = $(this);
    const svgString = $.html(this);

    // Replace the SVG with a PNG image
    sharp(Buffer.from(svgString))
      .png()
      .toBuffer()
      .then((pngBuffer) => {
        // Replace the SVG with an <img> tag pointing to the PNG
        const pngBase64 = pngBuffer.toString('base64');
        const imgTag = `<img src="data:image/png;base64,${pngBase64}" alt="PNG Image"/>`;

        // Replace the SVG element with the new PNG <img> tag
        svgElement.replaceWith(imgTag);
      })
      .catch((error) => {
        console.error('Error converting SVG to PNG:', error);
      });
  });
}