import React from 'react';
import { List, ListItem, ListItemIcon, ListItemSecondaryAction } from '@material-ui/core';
import { Folder, CheckCircle, HelpOutline } from '@material-ui/icons';
import store from './ReduxStore';

class Checklist extends React.PureComponent {
  render() {
    const {presentationId, fileContentJson, copySuccess} = this.props;

    return (
      <span>
          <h3>Links</h3>
          <List>
            <ListItem>
              <ListItemIcon><Folder /></ListItemIcon>
              <a href="https://docs.google.com/presentation/d/1iKPCp5cSlobceQQ-42ceOGuebKO0-uOFtVuLtZIu_bs/edit?usp=sharing" target="_blank" rel="noopener noreferrer">Student Directory Google Slide Deck</a>
            </ListItem>
            <ListItem>
              <ListItemIcon><Folder /></ListItemIcon>
              <a href="https://script.google.com" target="_blank" rel="noopener noreferrer">Google Scripts</a>
            </ListItem>
          </List>
          <h3>Instructions</h3>
          <h4>Setup:</h4>
          <List>
            <ListItem>
              <ListItemIcon>A.</ListItemIcon>
              Download the CSV data from your Google Form
              <ListItemSecondaryAction>
                <HelpOutline size="small" onClick={() => store.dispatch({type: 'SET', path: 'downloadCSVDialogOpen', value: true})} />
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem>
              <ListItemIcon>B.</ListItemIcon>
              Clone the Student Directory slide deck linked above. Make sure you have enough directory slides for each student, as the script will only populate existing slides. The template contains slides for 33 students.
              <ListItemSecondaryAction>
                <HelpOutline size="small" onClick={() => store.dispatch({type: 'SET', path: 'cloneGoogleSlidesDialog', value: true})} />
              </ListItemSecondaryAction>
            </ListItem>
          </List>
          <br/>
          <h4>Steps to Populate Slides:</h4>
          <List>
            <ListItem>
              {presentationId === ''
                  ? <ListItemIcon>1.</ListItemIcon>
                  : <ListItemIcon><CheckCircle style={{ color: 'lightgreen' }}/></ListItemIcon>
              }
              Input the URL of the Google Slides presentation
            </ListItem>
            <ListItem>
              {fileContentJson.length
                  ? <ListItemIcon><CheckCircle style={{ color: 'lightgreen' }}/></ListItemIcon>
                  : <ListItemIcon>2.</ListItemIcon>
              }
              Upload the CSV file downloaded in Setup step B.
            </ListItem>
            <ListItem>
              {copySuccess
                  ? <ListItemIcon><CheckCircle style={{ color: 'lightgreen' }}/></ListItemIcon>
                  : <ListItemIcon>3.</ListItemIcon>
              }
              Copy the output to your clipboard using the provided button.
            </ListItem>
            <ListItem>
              <ListItemIcon>4.</ListItemIcon>
              Visit Google Scripts via the link in the section above.
            </ListItem>
            <ListItem>
              <ListItemIcon>5.</ListItemIcon>
              Create a new project by using the button on the left sidebar. Delete anything in the file created that autopopulates.
            </ListItem>
            <ListItem>
              <ListItemIcon>6.</ListItemIcon>
              Paste the code copied in step 3 into the text area.
            </ListItem>
            <ListItem>
              <ListItemIcon>7.</ListItemIcon>
              Click the icon shaped like a play button, in the toolbar right above the label 'Code.gs'.
            </ListItem>
            <ListItem>
              <ListItemIcon>8.</ListItemIcon>
              Give the script a bit of time to finish, then check your copy of the Student Directory to see the filled out deck!
            </ListItem>
          </List>
        </span>
    )
  }
}

export default Checklist;
