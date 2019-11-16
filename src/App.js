import React, { Fragment, Component} from 'react';
import overallData from './data/processed/overall.json'
import Platform from './components/platform/Platform'
import { NavLink } from 'react-router-dom'
import { withRouter } from 'react-router-dom'

class App extends Component {
  render(){
    let platforms = Object.keys(overallData)
    return(
    <Fragment>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <ul className="nav nav-pills">
          {platforms.map(key => (
            <li className="nav-item" key={key}>
              <NavLink className="nav-link btn mr-3" activeClassName="active" to={`/${key}`}>{overallData[key].displayName}</NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <section className="container">
        <div className="row">
          <div className="col">
            {
              platforms.map(key => (
                <Platform data={overallData[key]} key={key} name={key} show={this.props.location.pathname === `/${key}`} />
              ))
            }
          </div>
        </div>
      </section>
    </Fragment>
    )};
}


export default withRouter(App);
