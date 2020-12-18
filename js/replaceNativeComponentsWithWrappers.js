// replaceNativeComponentsWithWrappers.js

// returnWrapperName
function returnWrapperName(nativeComponent) {
    return "rule!TSPI_CMPT_" + nativeComponent.charAt(0).toUpperCase() + nativeComponent.slice(1)
};

// getNativeComponentsFromSelection
function getNativeComponentsFromSelection(selectionStr) {
    const componentRegex = /a!\w*/g
    return nativeComponents = selectionStr.match(componentRegex)
};

// replaceBulk
function replaceBulk(str, findArray, replaceArray) {
    // https://stackoverflow.com/a/37949642
    var i, regex = [],
        map = {};
    for (i = 0; i < findArray.length; i++) {
        regex.push(findArray[i].replace(/([-[\]{}()*+?.\\^$|#,])/g, '\\$1'));
        map[findArray[i]] = replaceArray[i];
    }
    regex = regex.join('|');
    str = str.replace(new RegExp(regex, 'g'), function(matched) {
        return map[matched];
    });
    return str;
};

// replaceNativeComponents
function replaceNativeComponents() {
    let allText = window.getSelection().toString()
    let nativeComponents = getNativeComponentsFromSelection(allText)

    if (nativeComponents) {
        const COMPONENTS_WITHOUT_WRAPPERS = ['a!save', 'a!localVariables', 'a!recordActionItem', 'a!recordActionField', 'a!forEach', ' a!gaugeField()']
        let replaceableComponents = nativeComponents.filter(component => !COMPONENTS_WITHOUT_WRAPPERS.includes(component))


        if (replaceableComponents && replaceableComponents.length) {
            // Get unique components from the filtered array
            let uniqueComponents = [...new Set(replaceableComponents)]

            let replacementWrappers = uniqueComponents
                .map(component => component.slice(2))
                .map(component => returnWrapperName(component))

            // Replace the native components with the appropriate wrappers and overwrite the existing selection
            let newText = replaceBulk(allText, uniqueComponents, replacementWrappers)
            document.activeElement.value = newText
        } else {
            alert("No replacement necessary")
        }
    } else {
        alert("Nothing to replace")
    }

}

replaceNativeComponents()
