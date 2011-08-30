/*
measuretext.js - any queries you'll find my details at
http://contact.mahemoff.com.

::::: IMPLEMENTATION :::::

It would be instructive to peruse http://b.wearehugh.com/dih5/baselines.png
from the canvas chapter of Mark Pilgrim's Dive Into HTML5:
http://diveintohtml5.org/canvas.html

The library relies on canvas.measureText to accurately determine width. For
height, it takes a stab at em box height by inspecting the current font,
then adds some margin for error to form an "upper bound" box. To reduce
this large "upper bound" box to an actual bounding box, every pixel in it
is scanned to determine the actual bounding dimensions.

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
  
  window.measureText = function(text, font, options) {
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
