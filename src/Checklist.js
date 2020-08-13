import React from 'react';
import { List, ListItem, ListItemIcon, ListItemSecondaryAction } from '@material-ui/core';
import { Folder, CheckCircle, HelpOutline } from '@material-ui/icons';
import store from './ReduxStore';

class Checklist extends React.PureComponent {
  render() {
    const {presentationId,fileContentJson, copySuccess, copyPermissionsSuccess} = this.props;

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
                <p>Unzip the downloaded file, either by double clicking the file or using an online CSV unzipper like<a href="https://www.ezyzip.com/unzip-files-online.html" target="_blank" rel="noopener noreferrer">this one.</a></p>
            </ListItem>
            <ListItem>
              <ListItemIcon>C.</ListItemIcon>
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
              <ListItemIcon>
                {presentationId === '' ? "1." : <CheckCircle style={{ color: 'lightgreen' }}/>}
              </ListItemIcon>
              Input the URL of the Google Slides presentation
            </ListItem>
            <ListItem>
              <ListItemIcon>
                {fileContentJson.length ? <CheckCircle style={{ color: 'lightgreen' }}/> : "2."}
              </ListItemIcon>
              Upload the CSV file downloaded in Setup step B.
            </ListItem>
            <ListItem>
              <ListItemIcon>
                {copySuccess ? <CheckCircle style={{ color: 'lightgreen' }}/> : "3."}
              </ListItemIcon>
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
              Click the icon shaped like a floppy disk to save the script. You will have to give it a name to do so, the name will not affect the performance of the script.
            </ListItem>
            <ListItem>
              <ListItemIcon>8.</ListItemIcon>
              Navigate to the top menu bar and click 'View' > 'Show Manifest File'. You should now see a second item in the lefthand sidebar called 'appsscript.json'.
            </ListItem>
            <ListItem>
              <ListItemIcon>
                {copyPermissionsSuccess ? <CheckCircle style={{ color: 'lightgreen' }}/> : "9."}
              </ListItemIcon>
              Copy the code from the second textbox on the left side of this site, using the provided button.
            </ListItem>
            <ListItem>
              <ListItemIcon>10.</ListItemIcon>
              Return to 'appsscripts.json', remove all the text currently on the file, and replace it with the text copied in step 9. Click the floppy disc icon again to save the file.
            </ListItem>
            <ListItem>
              <ListItemIcon>11.</ListItemIcon>
              Return to 'Code.gs' by using the lefthand sidebar. Click the icon shaped like a play button, in the toolbar right above the label 'Code.gs'.
            </ListItem>
            <ListItem>
              <ListItemIcon>12.</ListItemIcon>
              <p>You may need to confirm that you give the script permission to access your Google Slides by clicking through the 'Review Permissions' option, and then via a pop up window before the script can execute. <br/><br/><b>Note:</b> Because this script isn't verified you will get a warning. This is okay, and does not represent a security issue. Click 'Advanced' and then 'Go to Test Student Directory (unsafe)', then click 'Allow'.</p>
            </ListItem>
            <ListItem>
              <ListItemIcon>13.</ListItemIcon>
              Give the script a bit of time to finish, then check your copy of the Student Directory to see the filled out deck!
            </ListItem>
          </List>
        </span>
    )
  }
}

export default Checklist;
