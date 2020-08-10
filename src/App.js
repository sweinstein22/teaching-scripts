import React from 'react';
import {connect} from "react-redux";
import { TextField, Button } from '@material-ui/core';
import Dialog from './Dialog';
import Checklist from './Checklist';
import ScriptActions from './ScriptActions';
import CSVReader from 'react-csv-reader';
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


  render() {
    const {fileContentJson, presentationId, copySuccess} = this.state;

    const jsonParsingOptions = {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
    }

    return (
      <div className="app">
        <Dialog />
        <span className="app-header">
          <h1>
            Populate Student Directory Google Slides
          </h1>
        </span>
        <div className="interactive-section">
          <div>
            <h4>Step 1:</h4>
            <TextField
              label="Input url of Google Slide presentation: &nbsp;"
              variant="filled"
              onChange={this.parsePresentationId}
              fullWidth />
            {presentationId && <div className="presentation-id">Detected Presentation ID: {presentationId}</div>}
            <br/><br/>
            <h4>Step 2:</h4>
            <CSVReader
              cssClass="csv-reader-input"
              label="Select CSV of Google Form data: &nbsp;"
              onFileLoaded={this.handleData}
              onError={err => console.log(err)}
              parserOptions={jsonParsingOptions}
              inputId="CSVUpload"
            />
          </div>
          <br/>
          <div>
            <h4>Step 3:</h4>
            <textarea
              ref={(textarea) => this.textArea = textarea}
              value={presentationId ? ScriptActions.retrieveScript({presentationId, fileContentJson}) : ''}
              readOnly
            />
          </div>
          <br/>
          <div>
            <Button variant="outlined" onClick={() => this.copyCodeToClipboard()}>
              Copy to Clipboard
            </Button>
          </div>
            <br/>
            <h4>Step 4-8:</h4>
            In Google Drive, see instructions for details
        </div>

        <div className="checklist-section">
          <Checklist {...{presentationId, fileContentJson, copySuccess}} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = () => {
  return {
  }
};

export default connect(mapStateToProps)(App);
