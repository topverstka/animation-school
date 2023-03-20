/*
	 
	Превращают поданное на вход во что-то другое

 */
/**
 * SVGToURL(value) - генератор svg в url формат
 */
function SVGToURL(value) {
    const notSpace = value.replace(/>\s+</g, '><');
    const notDoubleQuotes = notSpace.replace(/"/g, '\'');
    const notSharp = notDoubleQuotes.replace(/#/g, '%23');
    const notAngleLeft = notSharp.replace(/</g, '%3C');
    const notAngleRight = notAngleLeft.replace(/>/g, '%3E');
    const url = 'data:image/svg+xml,' + notAngleRight;

    return url;
}

/**
 * URLToSVG(value) - генератор svg в url формат
 */
function URLToSVG(value) {
  const pasteSpace = value.replace(/></g, '> <');
  const pasteDoubleQuotes = pasteSpace.replace(/'/g, '\"');
  const pasteSharp = pasteDoubleQuotes.replace(/%23/g, '#');
  const pasteAngleLeft = pasteSharp.replace(/%3C/g, '<');
  const pasteAngleRight = pasteAngleLeft.replace(/%3E/g, '>');
  const svg = pasteAngleRight.replace('data:image/svg+xml,', '');

  return svg;
}

// Создает Array из NodeList и возвращает его
export function nodeArray(selector, parent = document) {
  return Array.from(parent.querySelectorAll(selector));
}
