import React, {Component, PropTypes} from 'react'

function removeRequired(propType){
    for (let [key, value] of Object.entries(React.PropTypes)) {
        if(propType === value.isRequired){
            return value;
        }
    }
    //ISSUE: If it has a function proptype(), it will just return without changes
    //Some compoenents do need values to be defined for them to work
    //This should actaully deep run and assign instead
    return propType;
}

export default function DefaultPropsMerger(componentList){
    componentList.map(function(componentOuter, componentOuterIndex){

        if(typeof componentOuter.extraPropTypes === "object"){
            //Add to PropTypes props - mainly for higher-order components
            componentOuter.component.propTypes = Object.assign({}, componentOuter.component.propTypes, componentOuter.extraPropTypes);
        }

        //Give required props a default value
        for (let [key, value] of Object.entries(componentOuter.component.propTypes)) {
            componentOuter.component.propTypes[key] = removeRequired(value);
        }

        if(typeof componentOuter.defaultAtellierProps === "object"){
            //Add in default atellier props
            componentOuter.component.defaultProps = Object.assign({}, componentOuter.component.defaultProps, componentOuter.defaultAtellierProps);
        }


    })
    return componentList;
};
