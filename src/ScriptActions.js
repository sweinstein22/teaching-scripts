const ScriptActions = {
  retrieveScript: ({presentationId, fileContentJson}) => {
    return `function updateSlides() {
  var presentationId = '${presentationId}'
  var fileJson = JSON.parse('${JSON.stringify(fileContentJson)}')
  var firstSlideId = getSlideIds().splice(0, 1);
  var nameFields = getNameFields(JSON.parse(firstSlideId).objectId);

  var iterableSlideIds = getSlideIds().splice(1);
  iterableSlideIds.forEach(function f(elem, index) {
    var slideId = elem.objectId;
    var jsonForIndex = fileJson[index];
    if (jsonForIndex) {
      var entry = processFormEntry(jsonForIndex)
      addLeftTextBox(slideId, entry['leftSide']);
      addRightTextBox(slideId, entry['rightSide']);
      if (nameFields[index]) setStudentName(nameFields[index], entry['studentName']);
   }
  })

  function getNameFields(firstSlideId) {
    var response =
        Slides.Presentations.Pages.get(presentationId, firstSlideId, {fields: 'pageElements.objectId,pageElements.shape'});
      if (elem.shape && elem.shape.shapeType === 'TEXT_BOX') return true;
      return false;
    }).splice(1));

    var filteredResults = response.pageElements.filter(function f(elem) {
      if (elem.shape && elem.shape.shapeType === 'TEXT_BOX') return true;
      return false;
    }).splice(1).map(function (elem) {return elem.objectId});
    return filteredResults;
  }

  function setStudentName(pageElementId, studentName) {
    var requests = [{
      insertText: {
        objectId: pageElementId,
        text: studentName,
        insertionIndex: 0
      }
    }, {
      updateTextStyle: {
        objectId: pageElementId,
        style: {
          fontSize: {
            magnitude: 12,
            unit: 'PT'
          },
        },
        fields: 'fontSize'
      }
    }];

    var response =
        Slides.Presentations.batchUpdate({'requests': requests}, presentationId);
  }

  function getSlideIds() {
    var response =
        Slides.Presentations.get(presentationId, {fields: 'slides.objectId'});
    return response.slides;
  }

  function processFormEntry(entry) {
    var keys = Object.keys(entry).slice(1)
    var values = Object.values(entry).slice(1)
    var halfwayKeyIndex = Math.round(keys.length/2);
    var rightSide = "";
    var leftSide = "";
    var studentName = "";

    keys.forEach(function f(key, index) {
      if (index === 0) studentName = values[index].split(" ")[0];
      var info = \`$\{key}: $\{values[index]}\n\n\`;
      if (index <= halfwayKeyIndex) {
        leftSide = leftSide.concat(info);
      } else {
        rightSide = rightSide.concat(info);
      }
    });

    return {leftSide: leftSide, rightSide: rightSide, studentName: studentName};
  }

  function addRightTextBox(pageId, text) {
    var pageElementId = Utilities.getUuid();

    var requests = [{
      createShape: {
        objectId: pageElementId,
        shapeType: 'TEXT_BOX',
        elementProperties: {
          pageObjectId: pageId,
          size: {
            width: {
              magnitude: 240,
              unit: 'PT'
            },
            height: {
              magnitude: 335,
              unit: 'PT'
            }
          },
          transform: {
            scaleX: 1,
            scaleY: 1,
            translateX: 370,
            translateY: 20,
            unit: 'PT'
          }
        }
      }
    }, {
      insertText: {
        objectId: pageElementId,
        text,
        insertionIndex: 0
      }
    }, {
      updateTextStyle: {
        objectId: pageElementId,
        style: {
          fontSize: {
            magnitude: 12,
            unit: 'PT'
          },
        },
        fields: 'fontSize'
      }
    }];
    var response =
        Slides.Presentations.batchUpdate({'requests': requests}, presentationId);
    Logger.log('Created Right Textbox with ID: ' +
               response.replies[0].createShape.objectId);
  }

  function addLeftTextBox(pageId, text) {
    var pageElementId = Utilities.getUuid();

    var requests = [{
      createShape: {
        objectId: pageElementId,
        shapeType: 'TEXT_BOX',
        elementProperties: {
          pageObjectId: pageId,
          size: {
            width: {
              magnitude: 240,
              unit: 'PT'
            },
            height: {
              magnitude: 360,
              unit: 'PT'
            }
          },
          transform: {
            scaleX: 1,
            scaleY: 1,
            translateX: 110,
            translateY: 20,
            unit: 'PT'
          }
        }
      }
    }, {
      insertText: {
        objectId: pageElementId,
        text,
        insertionIndex: 0
      }
    }, {
      updateTextStyle: {
        objectId: pageElementId,
        style: {
          fontSize: {
            magnitude: 12,
            unit: 'PT'
          },
        },
        fields: 'fontSize'
      }
    }];
    var response =
        Slides.Presentations.batchUpdate({'requests': requests}, presentationId);
    Logger.log('Created Left Textbox with ID: ' +
               response.replies[0].createShape.objectId);
  }
}`
  }
};

export default ScriptActions;
