
import * as React from 'react';
import { connect } from 'react-redux';
import { LoadingSpinnerComponent } from '../../common/components/spinner';
import { State } from '../../reducers';
import { resetTemplate } from './actions';
import { fetchTemplatesStartAction } from '../templates/actions';
import * as ReactGA from 'react-ga';

import './header.css'
import { fetchAccountsStartAction } from '../templates/actions/fetchAccounts';

let dummyURL = 'https://www.dummy.domain.com';
if (window.location.hostname.indexOf('staging') !== -1) {
  dummyURL = 'https://staging.dummy.domain.com';
}
else if (window.location.hostname.indexOf('preprod') !== -1) {
  dummyURL = 'https://preprod.dummy.domain.com';
}

interface IProps {
  template: any,
  resetTemplate: () => void,
  fetchTemplates: () => void,
  fetchAccounts: () => void
}

class Header extends React.Component<IProps> {
  public resetTemplate = () => {
    this.props.resetTemplate();
    this.props.fetchTemplates();
  }

  constructor(props: IProps) {
    super(props);
    ReactGA.initialize('UA-66420938-1', { 
      debug: true,
      titleCase: false
    });
  }

  render() {    
    return (
      <div>
        <div className="header" >
          <div className="container-fluid">
            <h1 className="h1-tag"><a><img src={require('../../images/logo.svg')} alt="logo" height="45" /></a></h1>
            <a className="a-tag" href={dummyURL} target="_blank">
              GO TO Dummy DASHBOARD
              <img src={require('../../images/right-arrow.svg')} alt="logo" height="15" />
            </a>
          </div>
        </div>
        <LoadingSpinnerComponent flagSpinner={this.props.template.showSpinner} />
      </div>
    );
  }
}

const mapStateToProps = (state: State) => ({
  template: state.template,
});

const mapDispatchToProps = dispatch => ({
  resetTemplate: () => dispatch(resetTemplate()),
  fetchTemplates: () => dispatch(fetchTemplatesStartAction()),
  fetchAccounts: () => dispatch(fetchAccountsStartAction())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
