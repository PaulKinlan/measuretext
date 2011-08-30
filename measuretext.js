/*
This is based off measureText.js, by Micheal Mahemoff.  However, this library
doesn't use canvas so, other than the name there is not much similar.
   
For any queries on the original measureText  you'll find his details at
http://contact.mahemoff.com.

::::: IMPLEMENTATION :::::

The library creates an element, adds it too the DOM (hidden) and adds the
desired text.  It then gets the client bounding rect, removes the added element
and returns the width and height.

Lots of things still to consider such as individual character heights, multiple
lines and white-space preservation.

::::: LICENSE :::::

Copyright (C) 2011 by Michael Mahemoff

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

(function() {

  var container;

  var replaceSpaces = function(text) {
    var newText = text.replace(/ /gi, "\u00a0");
    return newText;
  };
  
  window.measureText = function(text, font, options) {
    options = options || { preserveSpaces: false };
    if(!!document.body == false) return;

    container = container || document.createElement("span");

    container.style.fontFamily = font;
    container.style.margin = 0;
    container.style.position = "absolute";
    container.style.opacity = 0;
    container.style.padding = 0;
    container.style.fontFamily = font;
    container.style.textBaseline = "top"
    container.style.textAlign = "left";

    if(options.preserveSpaces) 
      text = replaceSpaces(text);

    var textNode = document.createTextNode(text);
    container.appendChild(textNode);
    document.body.appendChild(container);
    
    var rect = container.getBoundingClientRect();
    container.removeChild(textNode); 
    document.body.removeChild(container);

    metrics = {
      "height": rect.height,
      "width": rect.width
    };

    return metrics;
  }

})();
