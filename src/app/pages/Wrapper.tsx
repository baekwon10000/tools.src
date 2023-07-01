import React from "react"
import {Props} from "../types"
import {NAME_MAP} from "../constants"
import Main from "../pages/Main"
import Html from "../pages/Html"
import Json from "../pages/Json"

interface WrapperProps extends Props {}

class Wrapper extends React.Component<WrapperProps,{}> {

  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {}

  render() {

    let pathname = this.props.location.pathname;
    pathname = pathname.startsWith('/') ? pathname.substring(1) : pathname;
    let split = pathname.split('/');
    let first = split.length > 0 ? split[0] : '', type = first;
    let defaultAction = '';
    if(type === 'html') defaultAction = 'beautify';
    else if(type === 'json') defaultAction = 'verify';

    let second = split.length > 1 ? split[1] : defaultAction, action = second;
    // let third = split.length > 2 ? split[2] : null;
    let title = type.toUpperCase() + ' ' + NAME_MAP[action].substring(0,1).toUpperCase()+NAME_MAP[action].substring(1);
    // let inputEditorMode, outputEditorMode, beautify, minify, verify, options;

    let component;
    if(type === 'html') component = (<Html type={type} action={action}/>)
    else if(type === 'json') component = (<Json type={type} action={action}/>)
    else component = (<Main/>)
    console.log('component = ', component);

    return (
      <div className="wrapper container-fluid py-3">
        <div className="row">
          <div className="col-md-12 text-center">
            <h1>{title}</h1>
          </div>
        </div>
        { component }
      </div>
    )
  }
}

export default Wrapper;