// You know what? I'll fix this later.
const pageText = `## ABOUT ##

I'm Andrew.
I work at 
AppFox~https://www.appfox.io/
 as a Graduate Software Engineer.
I graduated from the University of Bath in Computer Science.
Sometimes, I build fun things or play rhythm games.


## TECHNICAL SKILLS ##

TypeScript, React, Sass
Java, C#
C, C++
VCS (Git, GitHub, BitBucket)


## EXPERIENCE ##

Graduate Software Engineer @ 
AppFox~https://www.appfox.io/ 
PAL Leader 
(Peer Assisted Learning)~https://www.thesubath.com/peer-support/pal/
Senior PAL Leader
Academic Rep~https://www.thesubath.com/academicreps/


## PROJECTS ##

MiiCloner~https://github.com/goninty/MiiCloner
University Simulator~https://devpost.com/software/university-simulator-nultrm
Superuser~https://globalgamejam.org/2023/games/superuser-0
Autistica Data Visualisations~https://github.com/Lon19/team-7
AskReddit eBooks~https://github.com/goninty/askreddit_ebooks
Webcam Eye Tracking for Public Displays (Dissertation)


## CONTACT ##

GitHub~https://github.com/goninty
LinkedIn~https://www.linkedin.com/in/morton-andrew
Discord: Ninty#7513`;

var pageLines = pageText.split("\n");
var writeDelay = 20; // Time to write each new character in milliseconds.
var finished = false;

const parentDiv = document.getElementById("main");
const caretNode = document.getElementById("caret");

// I wish there were a better way to do this where the string stayed const.
// requestAnimationFrame/setTimeout/setInterval do not play nice when wrapped inside a loop, though.
function drawLine(text, i, noBreak) {
  let lineText = text;
  var node;

  // If link, create link. Otherwise regular paragraph tag.
  if (text.includes('~')) {
    node = document.createElement('a');
    [text, link] = text.split('~');
    node.href = link;
  } else {
    node = document.createElement('p');
  }

  parentDiv.insertBefore(node, caretNode);

  const interval = setInterval(function () {
    node.innerHTML += text.charAt(0);
    text = text.substring(1);

    // You know, I think I need to refactor this.
    if (
      lineText == "I work at " ||
      lineText == "AppFox~https://www.appfox.io/" ||
      lineText == "Graduate Software Engineer @ "
    ) {
      noBreak = true;
    }

    // Once line has finished, stop interval and go next line.
    if (text == "") {
      clearInterval(interval);


      // You know, I think this needs an overhaul.
      if (!noBreak && i > 0) {
        parentDiv.insertBefore(document.createElement("br"), caretNode);
      }

  

      // Recurse to begin drawing a new line.
      // Has to be recursive so that it is called after the current line has been drawn.
      // Otherwise setInterval pushes the function calls whenever it can,
      // so lines are drawn in random orders instead of sequentially.
      if (i > 0) {
        // This is awful.
        // I am finishing this thing now.
        if (noBreak || pageLines[pageLines.length - i] == "" || pageLines[pageLines.length - i].charAt(0) == "#") {
          drawLine(pageLines[pageLines.length - i], i - 1, false);
        } else if (pageLines[pageLines.length - i] == "PAL Leader ") {
          //deez
          drawLine("> " + pageLines[pageLines.length - i], i - 1, true);
        } else {
          drawLine("> ", i, true);
        }
      }
    }
  }, writeDelay);
}

// setInterval to blink caret cursor.
const backgroundColor = window.getComputedStyle(document.body).backgroundColor;
const caretColor = getComputedStyle(caretNode).backgroundColor;

setInterval(function() {
  // If it's filled, then blank it (make it the background colour).
  // Otherwise fill it again.
  // It blinks!
  if (getComputedStyle(caretNode).backgroundColor == caretColor) {
    caretNode.style.backgroundColor = backgroundColor;
  } else {
    caretNode.style.backgroundColor = caretColor;
  }
}, 530);

drawLine(pageLines[0], pageLines.length-1, false);