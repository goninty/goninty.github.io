// You know what? I'll fix this later.
const pageText = `## ABOUT ##

I'm Andrew.
A recent Computer Science graduate from the University of Bath. 
Looking for graduate software development positions.
I like building fun things and playing rhythm games.


## TECHNICAL SKILLS ##

C#, C/C++, Java
Python, JS
HTML/CSS
React/Bootstrap
VCS (Git, GitHub, BitBucket)


## EXPERIENCE ##

PAL Leader (Peer Assisted Learning)
Senior PAL Leader
Academic Representative


## PROJECTS ##

MiiCloner~https://github.com/goninty/MiiCloner
University Simulator~https://devpost.com/software/university-simulator-nultrm
Autistica Data Visualisations~https://github.com/Lon19/team-7
AskReddit eBooks~https://github.com/goninty/askreddit_ebooks


## CONTACT ##

GitHub~https://github.com/goninty
LinkedIn~https://www.linkedin.com/in/andrew-morton-325b45187
Discord: Ninty#7513


Continue typing? [Y/N]: `;

var pageLines = pageText.split("\n");
var finished = false;

const parentDiv = document.getElementById("main");
const caretNode = document.getElementById("caret");

// I wish there were a better way to do this where the string stayed const.
// requestAnimationFrame/setTimeout/setInterval do not play nice when wrapped inside a loop, though.
function drawLine(text, i, noBreak) {
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

    // Once line has finished, stop interval and go next line.
    if (text == "") {
      clearInterval(interval);

      if (!noBreak) {
        parentDiv.insertBefore(document.createElement("br"), caretNode);
      }
      //parentDiv.insertBefore(document.createElement("br"), caretNode);

      // Recurse to begin drawing a new line.
      // Has to be recursive so that it is called after the current line has been drawn.
      // Otherwise setInterval pushes the function calls whenever it can,
      // so lines are drawn in random orders instead of sequentially.
      if (i > 0) {
        // This is awful.
        // I am finishing this thing now.
        if (noBreak || pageLines[pageLines.length - i] == "" || pageLines[pageLines.length - i].charAt(0) == "#") {
          drawLine(pageLines[pageLines.length - i], i - 1, false);
        } else if (pageLines[pageLines.length - i] === "Continue typing? [Y/N]: ") {
          drawLine(pageLines[pageLines.length - i], i - 1, true);
        } else {
          drawLine("> ", i, true);
        }
      } else {
        // We are finished writing the text.
        // Please try branchless programming.
        if (!finished) {
          finished = true;
          //parentDiv.insertBefore(document.createElement("br"), caretNode);

          // var typeQ = parentDiv.insertBefore(document.createElement("p"), caretNode);
          // typeQ.innerHTML = "Continue typing?";

          //drawTypeSelector();
          const event = new Event('finishedWriting');
          document.dispatchEvent(event);
        }
      }
    }
  }, 10);
}

function drawTypeSelector() {

  var typeQDiv = document.createElement("p");
  typeQDiv.style.justifyContent = "center";

  typeQDiv.innerHTML = "dfoskljfds";
  mainDiv.insertBefore(typeQDiv, caretNode);


  //drawLine("continue?", 0, false, mainDiv);
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

document.addEventListener('finishedWriting', function() {
  var answered = false;
  var answer = parentDiv.insertBefore(document.createElement('p'), caretNode);
  document.addEventListener("keydown", function (e) {
    switch (e.key) {
      case "Enter":
        // First initial Y/N answer.
        if (!answered) {
          switch (answer.innerHTML.trim()) {
            case "Y":
              // go ahead
              answered = true;
              break;
            case "N":
              // bye bye
              answered = true;
              document.removeEventListener("keydown");
              break;
            default:
              parentDiv.insertBefore(document.createElement("br"), caretNode);
              drawLine(pageLines[pageLines.length - 1], 0, true);
              break;
          }
        } else {
          //parentDiv.insertBefore(document.createElement("br"), caretNode);
          parentDiv.insertBefore(document.createElement("p"), caretNode);
        }
        break;
      
      case "Backspace":
        var typedText = caretNode.previousSibling.textContent;
        console.log(typedText);
        if (typedText.length == 0) {
          caretNode.previousSibling.remove();
          if (caretNode.previousSibling.nodeName == "BR") caretNode.previousSibling.remove();
        } else {
          caretNode.previousSibling.innerHTML = typedText.slice(0, -1);
        }
        break;
      
      default:
        if (e.key.length == 1) {
        //drawLine(e.key, 0, true);
          caretNode.previousSibling.innerHTML += e.key;
        }
        break;
    }
  });
});

drawLine(pageLines[0], pageLines.length-1, false);