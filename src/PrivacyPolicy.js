import React from "react";
import "./PrivacyPolicy.css";

class PrivacyPolicy extends React.PureComponent {
  render() {
    return (
      <div className="privacy-policy">
        The purpose of this application is to facilitate a CSV to Google Slides automated transfer of information.
        <br/><br/>
        Data provided to the application is not stored in any location, and users must have ownership of the slides that they are exporting data into. (Validated using Google Oauth)
      </div>
    )
  }
}

export default PrivacyPolicy;
