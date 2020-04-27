# Appian Developer Tools Extension

A chrome extension for Appian developers at TSPi

----
### Installation Instructions
1. Download the repository and extract the folder contents to your local disk.
2. Open [Chrome Extensions](chrome://extensions).
3. In the top right, enable "Developer Mode."
4. Click Load Unpacked.
5. Navigate to the directory where you extracted the zip folder and click "Select."
6. You can now begin using the extension.


### Changelog

#### Version 1.2
* **Full RFR Template Generation** Clicking *Create RFR* in the Development Tool popup while in an Appian application now generates a full RFR template including:
  * The Application Name (with a formatted link to the application)
  * The Jira ticket for the application
  * The developer's name
  * All of the objects on the current page of the application (apps with more than 25 objects not yet supported)

#### Version 1.1
* **Generate Change Log Entry** You can now add a single change log entry to your code.
* **Create RFR Button (Object List)** While viewing the contents of an App, you can click the *Create RFR* button in the Development Tool popup and get a markup formatted list of all the objects available in a new window.
* **Developer name is now longer hard coded** The user will be prompted to enter a developer name the first time they use either *Generate Rule Comments* or *Generate Change Log Entry*.
* **Added favicon** Styling!
