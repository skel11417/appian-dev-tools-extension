# Appian Developer Tools Extension

*A chrome extension for Appian developers at TSPi*
* [Installation Instructions](#Installation-Instructions)
* [Features](#Features)
  * [Create Documentation for Rules and Interfaces](#Create-Documentation-for-Rules-and-Interfaces)
  * [Create Documentation for New Constants](#Create-Documentation-for-New-Constants)
  * [Add Changelog Entry for Rules and Interfaces](#Add-Changelog-Entry-for-Rules-and-Interfaces)
  * [Generate RFR Template for App](#Generate-RFR-Template-for-App)
  * [Add a Debug Text Field to Interfaces](#Add-a-Debug-Text-Field-to-Interfaces)
  * [Replace Native Components with Wrappers](#Replace-Native-Components-with-Wrappers)
* [Planned Enhancements](#Planned-Enhancements)
* [Changelog](#Changelog)
----
## Features
### Create Documentation for Rules and Interfaces
1. Right click in the expression editor of an empty rule or interface and select **Generate Rule Comments** from the *TSPi Appian Developer Tools* context menu
![Generate Rule Comments](/screenshots/generate_rule_comments_1.PNG)
2. You will be prompted to enter the ticket number for the object. *Note: if this is the first time you are using the extension, you will be prompted to enter the developer name first.*
![Enter Ticket Number](/screenshots/generate_rule_comments_2.PNG)
3. The rule will then be populated with a header and changelog with the first changelog entry already populated.
![Generate Rule Comments Result](/screenshots/generate_rule_comments_3.PNG)

### Create Documentation for New Constants
1. With the Create Constant window open, click the *Appian Developer Tools* extension and under *Constant Tools* select **Document Constant**.
![Document Constant](/screenshots/document_constant_1.PNG)
2. The current value will be added to the description field along with the changelog with the first changelog entry already populated.
![Document Constant Result](/screenshots/document_constant_2.PNG)

### Add Changelog Entry for Rules and Interfaces
1. Right click in the expression editor of an empty rule or interface and select **Generate Changelog Entry** from the *TSPi Appian Developer Tools* context menu.
![Generate Changelog Entry](/screenshots/generate_changelog_entry_1.PNG)
2. You will be prompted to enter the ticket number for the object. *Note: if this is the first time you are using the extension, you will be prompted to enter the developer name first.*
![Enter Ticket Number](/screenshots/generate_changelog_entry_2.PNG)
3. You will be prompted to enter the previous version of the object. *Note: if you do not know this, you can click OK and add the previous version later.*
![Enter Version Prior to Change](/screenshots/generate_changelog_entry_3.PNG)
4. A new changelog entry will be added at the location where you right clicked.
![Generate Changelog Entry Result](/screenshots/generate_changelog_entry_4.PNG)

### Add Changelog Entry for Existing Constants
1. With the Create Constant window open, click the *Appian Developer Tools* extension and under *Constant Tools* select **Add Changelog Entry**.
![Add Changelog to Constant](/screenshots/add_constant_changelog_entry_1.PNG)
2. A new changelog entry with the current will be added below the CHANGELOG heading. *Note: you will need to manually enter the previous version*
![Add Changelog to Constant Result](/screenshots/add_constant_changelog_entry_2.PNG)

### Generate RFR Template for App
1. With the app you would like to document open, click the *Appian Developer Tools* extension, and under *Constant Tools* select **Create RFR Template**. *Note: at this time, only the first 25 objects of an app will be added to the RFR changelog section.*
![Generate RFR Template](/screenshots/rfr_template_1.PNG)
2. A new tab will open with the RFR Editor form, prepopulated with the developer name and application.
![Blank RFR Template](/screenshots/rfr_template_2.PNG)
3. Once you have filled out the form, click **Generate Markdown** at the bottom of the form.
![Generate Markdown](/screenshots/rfr_template_3.PNG)
4. A window will appear with the Jira markdown text generated from the values you entered into the editor form. You can copy the text manually, or click **Copy to Clipboard** to copy the contents to the Clipboard
![Generate Markdown Result](/screenshots/rfr_template_4.PNG)

### Add a Debug Text Field to Interfaces
1. If you would like to debug something in an interface that cannot be accomplished through the native variable list, you can right click in the interface and select **Insert Debug Text Field Component** from the *TSPi Appian Developer Tools* context menu.
![Insert Debug Text Field Component](/screenshots/add_debug_text_1.PNG)
2. A pre-configured read-only text field will be added in the location where you clicked.
![Insert Debug Text Field Component Result](/screenshots/add_debug_text_2.PNG)

### Replace Native Components with Wrappers
1. If you would like to replace a native Appian component (prefixed with *a!*), you can right click in the interface and select **Replace Native Components With Wrappers** from the *TSPi Appian Developer Tools* context menu.
![Insert Debug Text Field Component](/screenshots/replace_with_wrappers_1.PNG)
2. The native components will all be replaced, except for those components which do not have wrappers (a!save, a!forEach, etc.).
![Insert Debug Text Field Component Result](/screenshots/replace_with_wrappers_2.PNG)

### Convert to/from index()
1. Highlight the code you wish to convert and select **Convert to/from Index Function**
![Convert To or From Index Action](/screenshots/convert_from_index_function_1.PNG)
2. The highlighted text will be replaced with the equivalent code in dot notation (or using index())
![Convert To or From Index Action](/screenshots/convert_from_index_function_2.PNG)
----
## Installation Instructions
1. Download the repository and extract the folder contents to your local disk.
2. Open [Chrome Extensions](chrome://extensions).
3. In the top right, enable "Developer Mode."
4. Click Load Unpacked.
5. Navigate to the directory where you extracted the zip folder and click "Select."
6. You can now begin using the extension.
---
## Planned Enhancements
1. Storing and editing of existing RFR templates.
2. Code Reviewer Tools
3. Integration with Jira API
---
## Changelog
### Version 3.15
* **Document Release Notes** made the function less prone to issues due to formatting changes on the release notes page

### Version 3.14
* Added useful link which downloads the Appian release notes into a CSV file

### Version 3.13
* **Replace Native Components with Wrappers**: Added to list of native Appian components that do not have wrappers.

### Version 3.12
* Created a Useful Links section in the extension popup
* Added a link which opens up the environment process monitoring view in a new tab based on the url of the appian environment in the open window

### Version 3.11
* Updated the Generate Changelog Entry and Generate Rule Comments context menus to use an asterisk "*" instead of "--" when the ticket type entered is other than "ECO"

### Version 3.10
* Updated RFR Template code to work on Appian 22.2

### Version 3.9
* Updated **Convert to/from index function** to work with variables prefixed with the fv!domain

### Version 3.8
* Added **Convert to/from index function** as a context menu option. Users can select an instance of index() *or* a dot-notated variable and convert the code to or from index() notation, eg.
```
index(ri!user, "username", {}) => ri!user.username
  OR
local!user.username => index(local!user, "username", {})
```

### Version 3.7
* Now users can leave the change list of an object blank when filling out an RFR template, and "* Created" will be added to the markdown for the object by default.

### Version 3.6
* Fixed compatibility issue with Appian 21.1

### Version 3.5
* In order to deal with the new issue view in Jira becoming more difficult to avoid, added a link to the Jira ticket of an RFR to the page where the developer can copy the markdown code. This link includes a parameter "oldIssueView=true", which allows the user to paste the markdown into the RFR field without the formatting becoming lost.
* Removed the alert that appears when a developer clicks "Copy to Clipboard", as it was annoying.

### Version 3.4
* Added a new context menu which allows you to replace the native Appian components in selected code with TSPi wrapper components

### Version 3.3
* Added ability to change developer name (in case you entered it accidentally the first time)

### Version 3.2
* Fixed bug caused by application names that do not match a Jira ticket

### Version 3.1
* Fixed bug created by changes to HTML in Appian 20.3

### Version 3.0
* **New Look** The extension interface has been updated
* **New Constant Tools** There are new documentation generation tools available for Constants
  * Document Constant - Writes the constant's value and adds a changelog to the description field of a constant. The first changelog entry will include the current date, developer, and application. Can be used with new or existing constants.
  * Add Changelog Entry - Adds a new changelog entry to the top of the changelog with the current date, developer, and application. *Note that the user will still have to enter the previous version.*
* **Removed Create Debug Box Command** As of Appian 20.2, local variables can now be easily seen in the Appian interface designer, making this tool obsolete.

### Version 2.1
* **Insert A Debug Text Field into an Interface** Right click in the expression editor of an interface and click *Insert Debug Text Field Component*. This will insert a new read-only textField component into the interface at your cursor. Perfect for quick debugging.

### Version 2.0
* **Brand New RFR Editor** Clicking *Create RFR* in the Development Tool now takes the user to a form where information can be entered for each field of the RFR Template. The template is prepopulated with the same data as in previous versions.

### Version 1.3
* **Insert A Debug Box Into Your Interface** Right click in an interface and click *Insert Debug Box Component*. The extension will scan the SAIL code for all local variables and rule inputs and insert the code for a debug box into the interface. Be aware that if your SAIL only consists of one component, you will need to add {} around it to create a list of components.

### Version 1.2
* **Full RFR Template Generation** Clicking *Create RFR* in the Development Tool popup while in an Appian application now generates a full RFR template including:
  * The Application Name (with a formatted link to the application)
  * The Jira ticket for the application
  * The developer's name
  * All of the objects on the current page of the application (apps with more than 25 objects not yet supported)

### Version 1.1
* **Generate Change Log Entry** You can now add a single change log entry to your code.
* **Create RFR Button (Object List)** While viewing the contents of an App, you can click the *Create RFR* button in the Development Tool popup and get a markup formatted list of all the objects available in a new window.
* **Developer name is now longer hard coded** The user will be prompted to enter a developer name the first time they use either *Generate Rule Comments* or *Generate Change Log Entry*.
* **Added favicon** Styling!
