import React from 'react';
import { CsvToHtmlTable } from 'react-csv-to-table';
import './App.css';

class App extends React.PureComponent {
  state = {
    fileContent: null,
    selectedFile: null
  };

  onFileChange = event => {
    const fileReader = new FileReader();
    this.setState({selectedFile: event.target.files[0]})
    fileReader.onloadend = () => this.setState({
      fileContent: fileReader.result
    });
    fileReader.readAsText(event.target.files[0]);
  };

  fileData = () => {
      const {fileContent} = this.state;
      if (fileContent) {
        return (
          <div>
            <h2>File Details:</h2>
            <p>
              Last Modified:{" "}
              <CsvToHtmlTable {...{
                data: fileContent,
                csvDelimiter: ',',
                tableClassName: 'csvTable'
              }}/>
            </p>
          </div>
        );
      } else {
        return (
          <div>
            <br />
            <blockquote>To download CSV file from Google Form:</blockquote>
          </div>
        );
      }
    };

  render() {
      return (
        <div className="app">
          <span className="app-header">
            <h1>
              Populate Student Directory Google Slides
            </h1>
            <h4>
              Upload CSV:
            </h4>
            <div>
                <input type="file" onChange={this.onFileChange} />
                <button >
                  Upload!
                </button>
            </div>
          </span>
          {this.fileData()}
        </div>
      );
    }
}

export default App;
