import React from 'react';
import {connect} from 'react-redux';
import { Dialog, List, ListItem, ListItemIcon } from '@material-ui/core';
import store from './ReduxStore';
import './Dialog.css';

class BoardDialog extends React.Component {
  closeCSVDownloadDialog = () => {
    store.dispatch({type: 'SET', path: ['downloadCSVDialogOpen'], value: false});
  };

  closeCloneGoogleSlidesDialog = () => {
    store.dispatch({type: 'SET', path: ['cloneGoogleSlidesDialog'], value: false});
  };

  render() {
    const {downloadCSVDialogOpen, cloneGoogleSlidesDialog} = this.props;

    let content = <span/>;
    if (downloadCSVDialogOpen) {
      content = (
        <Dialog {...{
          open: downloadCSVDialogOpen,
          onEscapeKeyDown: this.closeCSVDownloadDialog,
          onBackdropClick: this.closeCSVDownloadDialog
        }}>
          <div className="dialog">
            <h3>How to Download the CSV file from a Google Form</h3>
            <List>
              <ListItem>
                <ListItemIcon>1.</ListItemIcon>
                Navigate to your Google Form, making sure you are signed in so you can see editing options.
              </ListItem>
              <ListItem>
                <ListItemIcon>2.</ListItemIcon>
                Click on the 'Responses' tab at the top of form.
              </ListItem>
              <ListItem>
                <ListItemIcon>3.</ListItemIcon>
                Click the three vertical dots in the upper right, next to the green Google Sheets icon.
              </ListItem>
              <ListItem>
                <ListItemIcon>4.</ListItemIcon>
                Select 'Download Responses (.csv)" and note the location it is downloaded to so you can upload it later.
              </ListItem>
            </List>
          </div>
        </Dialog>
      );
    } else if (cloneGoogleSlidesDialog) {
      content = (
        <Dialog {...{
          open: cloneGoogleSlidesDialog,
          onEscapeKeyDown: this.closeCloneGoogleSlidesDialog,
          onBackdropClick: this.closeCloneGoogleSlidesDialog
        }}>
          <div className="dialog">
            <h3>How to Download the CSV file from a Google Form</h3>
            <List>
              <ListItem>
                <ListItemIcon>1.</ListItemIcon>
                Navigate to the Google Slides presentation.
              </ListItem>
              <ListItem>
                <ListItemIcon>2.</ListItemIcon>
                Click on 'File' > 'Make a Copy' > 'Entire presentation'
              </ListItem>
              <ListItem>
                <ListItemIcon>3.</ListItemIcon>
                Rename the file as you see fit, and select a folder to put the presentation in. Then click OK.
              </ListItem>
            </List>
          </div>
        </Dialog>
      );
    }

    return (content);
  }
}

const mapStateToProps = ({downloadCSVDialogOpen, cloneGoogleSlidesDialog}) =>
  ({downloadCSVDialogOpen, cloneGoogleSlidesDialog});

export default connect(mapStateToProps)(BoardDialog);
