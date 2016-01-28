import React, { PropTypes } from 'react';
import FieldType from './FieldType.jsx';
import PropTypesInterceptor from './structural/PropTypesInterceptor.jsx';

PropTypesInterceptor.intercept(PropTypes.oneOf);

class PropertiesContainer extends React.Component {

  static defaultProps = {
    // onChangeProps: PropTypes.func,
    // onCloseProperties: PropTypes.func,
    // component: {},
    // componentProps: {}
  };

  static propTypes = {
    // onChangeProps: PropTypes.func,
    // onCloseProperties: PropTypes.func,
    // component: PropTypes.shape({
    //   component: PropTypes.any,
    //   componentName: PropTypes.string
    // }),
    // componentProps: PropTypes.object
  };

  constructor(props) {
    super(props);
    this._defineProperties(props);
  }

  componentWillReceiveProps(nextProps) {
    this._defineProperties(nextProps);
  }

  render() {
    let { name, element } = this.props;
    if ( (element) && element.type && typeof element.type.propTypes !== 'object') {
      return null;
    }
    console.log('element', name, this._renderPropertiesFields(element));
    return (
      <div>
      <div className="properties-container">
        {this._renderContainerHeader(name)}
        <div className="properties-form">
          {this._renderPropertiesFields(element)}
        </div>
      </div>
      </div>
    );
  }

  _renderContainerHeader(name) {
    return !!name && (
      <div className="container-header">
        <a className="container-close-button" onClick={this._handleCloseProperties}>+</a>
        <h2 className="properties-component">{name}</h2>
      </div>
    );
  }

  _renderPropertiesFields(element) {

    if ( ! element) return null;

    let propTypes = element.type.propTypes;
    let propsFields = [];

    for (let prop in propTypes) {
      let type = PropTypesInterceptor.getPropTypePatch(propTypes[prop]);
      let options = [];
      if (propTypes[prop].options && propTypes[prop].options[prop]) {
        options = propTypes[prop].options[prop];
      }


      let defaults = {
        object: {},
        string: {},
        unknown: function(){}
      }

      propsFields.push(
        <FieldType
          key={prop}
          name={prop}
          type={type}
          defaultValue={this._properties[prop] || defaults[type]}
          options={options}
          components={this.props.components}
          onChange={this._handleChange}
         />
      );
    }

    return propsFields.length && propsFields || this._renderNoProperties();
  }

  _renderNoProperties() {
    return (
      <p className="no-properties">No properties</p>
    );
  }

  _handleChange = (propName, propValue) => {
    this._properties[propName] = propValue;
    this.props.onChangeProps(this._properties);
  };

  _handleCloseProperties = () => {
    return this.props.onCloseProperties && this.props.onCloseProperties(null);
  };

  _defineProperties = (props) => {
    if (props.element){
      this._properties = Object.assign({}, props.element.props, props.elementProps);
    }
  };

}

export default PropertiesContainer;
