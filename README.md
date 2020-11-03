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

#### Version 3.3
* Added ability to change developer name (in case you entered it accidentally the first time)

#### Version 3.2
* Fixed bug caused by application names that do not match a Jira ticket

#### Version 3.1
* Fixed bug created by changes to HTML in Appian 20.3

#### Version 3.0
* **New Look** The extension interface has been updated
* **New Constant Tools** There are new documentation generation tools available for Constants
  * Document Constant - Writes the constant's value and adds a changelog to the description field of a constant. The first changelog entry will include the current date, developer, and application. Can be used with new or existing constants.
  * Add Changelog Entry - Adds a new changelog entry to the top of the changelog with the current date, developer, and application. *Note that the user will still have to enter the previous version.*
* **Removed Create Debug Box Command** As of Appian 20.2, local variables can now be easily seen in the Appian interface designer, making this tool obsolete.

#### Version 2.1
* **Insert A Debug Text Field into an Interface** Right click in the expression editor of an interface and click *Insert Debug Text Field Component*. This will insert a new read-only textField component into the interface at your cursor. Perfect for quick debugging.

#### Version 2.0
* **Brand New RFR Editor** Clicking *Create RFR* in the Development Tool now takes the user to a form where information can be entered for each field of the RFR Template. The template is prepopulated with the same data as in previous versions.

#### Version 1.3
* **Insert A Debug Box Into Your Interface** Right click in an interface and click *Insert Debug Box Component*. The extension will scan the SAIL code for all local variables and rule inputs and insert the code for a debug box into the interface. Be aware that if your SAIL only consists of one component, you will need to add {} around it to create a list of components.

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
