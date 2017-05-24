import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import classNames from 'classnames';
import ComponentList from './ComponentList';
import toggleButtonImage from './images/arrow.png';

class Sidebar extends React.Component {

  static defaultProps = {
    components: [],
    onSelect: PropTypes.func,
    stagedComponent: {}
  };

  static propTypes = {
    components: PropTypes.instanceOf(Immutable.List),
    onSelect: PropTypes.func,
    stagedComponent: PropTypes.shape({
      component: PropTypes.func,
      componentName: PropTypes.string,
      defaultAtellierProps : PropTypes.object,
      extraPropTypes : PropTypes.object
    }),
  };

  constructor(props) {
    super(props);
    this.state = {
      close: false
    };
  }

  render() {
    let { components, stagedComponent, onSelect } = this.props;
    let className = classNames('sidebar', {'sidebar-close': this.state.close})
    return (
      <div className={className}>
        <h1 className="logo">ATELLIER</h1>
        <span className="sidebar-toggle-button" onClick={this._handleToggleSidebar}>
          <img src={toggleButtonImage} />
        </span>
        <ComponentList components={components} stagedComponent={stagedComponent} onSelect={onSelect} />
      </div>
    );
  }

  _handleToggleSidebar = () => {
    this.setState({close: !this.state.close});
  };

}

export default Sidebar;
