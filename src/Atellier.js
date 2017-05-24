import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import Sidebar from './Sidebar';
import Workspace from './Workspace';
import DefaultPropsMerger from './DefaultPropsMerger';

import './styles/atellier.less';

class Atellier extends React.Component {

  static defaultProps = {
    components: []
  };

  static propTypes = {
    components: PropTypes.arrayOf(PropTypes.shape({
      component: PropTypes.func,
      componentName: PropTypes.string,
      defaultAtellierProps : PropTypes.object,
      extraPropTypes : PropTypes.object
    }))
  };

  constructor(props) {
    super(props);
    this.state = {
      components: Immutable.List(DefaultPropsMerger(props.components)),
      stagedComponent: null
    };
  }

  render() {
    let { components, stagedComponent } = this.state;
    return (
      <div className="atellier">
        <Sidebar components={components} stagedComponent={stagedComponent} onSelect={this._handleSelectComponent} />
        <Workspace components={components} component={stagedComponent} onCloseProperties={this._handleSelectComponent} />
      </div>
    );
  }

  _handleSelectComponent = (component, key) => {
    component.indexKey = key;
    this.setState({stagedComponent: component});
  };
}

// commonjs2
export default Atellier;
