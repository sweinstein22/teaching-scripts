import React from 'react';
import { TextField, Button } from '@material-ui/core';
import CSVReader from 'react-csv-reader'
import './App.css';

class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      copySuccess: false,
      fileContent: null,
      fileContentJson: [],
      presentationId: "",
      selectedFile: null,
      scriptToCopy: ""
    };
  }

  handleData = data => {
    console.log('data: ' + data);
    this.setState({ fileContentJson: data })
  }

  parsePresentationId = event => {
    const presentationUrl = event.target.value;
    const idRegexp = /\/presentations\/(.*?)\/.*/g;
    const match = idRegexp.exec(presentationUrl);
    match && match.length
      ? this.setState({presentationId: match[1]})
      : this.setState({presentationId: ''})

    const altIdRegexp = /\/presentation\/.*\/(.*?)\/.*/g;
    const altMatch = altIdRegexp.exec(presentationUrl);
    altMatch && altMatch.length
      ? this.setState({presentationId: altMatch[1]})
      : this.setState({presentationId: ''})
  }

  copyCodeToClipboard = () => {
    const elem = this.textArea
    elem.select()
    document.execCommand("copy")
    this.setState({copySuccess: true})
  }

  retrieveScript = () => {
    const {presentationId, fileContentJson} = this.state;
    return `function updateSlides() {
  var presentationId = '${presentationId}'
  var fileJson = JSON.parse('${JSON.stringify(fileContentJson)}')
  var slideIds = getSlideIds().splice(1);
  Logger.log('Slide IDs for iteration: ' + slideIds);
  slideIds.forEach(function f(elem, index) {
    var slideId = elem.objectId;
    var entry = processFormEntry(fileJson[index])
    addLeftTextBox(slideId, JSON.stringify(entry['leftSide']));
    addRightTextBox(slideId, JSON.stringify(entry['rightSide']));
  });

  function getSlideIds() {
    var response =
        Slides.Presentations.get(presentationId, {fields: 'slides.objectId'});
    Logger.log('Retrieved Slide IDs: ' + response.slides);
    return response.slides;
  }

    function processFormEntry(entry) {
    var keys = Object.keys(entry)
    var halfwayKeyIndex = Math.round(keys.length/2);
    Logger.log(keys.length)
    var rightSide = {};
    var leftSide = {};

    keys.forEach(function f(key, index) {
      if (index <= halfwayKeyIndex) {
        leftSide[key] = entry[key];
      } else {
        rightSide[key] = entry[key];
      }
    });

    return {leftSide: leftSide, rightSide: rightSide};
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

  render() {
    const {fileContentJson, presentationId} = this.state;

    const jsonParsingOptions = {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
    }

    return (
      <div className="app">
        <span className="app-header">
          <h1>
            Populate Student Directory Google Slides
          </h1>
          <form>
            <TextField
              label="Input url of Google Slide presentation: &nbsp;"
              variant="filled"
              onChange={this.parsePresentationId}
              fullWidth />
            {presentationId && <div className="presentation-id">Detected Presentation ID: {presentationId}</div>}
            <br/><br/>
            <CSVReader
              cssClass="csv-reader-input"
              label="Select CSV of Google Form data: &nbsp;"
              onFileLoaded={this.handleData}
              onError={err => console.log(err)}
              parserOptions={jsonParsingOptions}
              inputId="CSVUpload"
            />
          </form>
        </span>
        <br/>
        <div>
          <textarea
            ref={(textarea) => this.textArea = textarea}
            value={presentationId ? this.retrieveScript() : ''}
            readOnly
          />
        </div>
        <br/>
        <div>
        <Button variant="outlined" onClick={() => this.copyCodeToClipboard()}>
          Copy to Clipboard
        </Button>
        {
          this.state.copySuccess ?
          <span className="success-flash">
            Success!
          </span> : null
        }
        </div>
        {fileContentJson.length !== 0 && JSON.stringify(fileContentJson)}
      </div>
    );
  }
}

export default App;
