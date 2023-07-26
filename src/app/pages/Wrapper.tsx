import React from "react"
import {Props} from "../types"
import {ACTOR_NAME} from "../constants"
import Main from "../pages/Main"
import Html from "../pages/Html"
import Json from "../pages/Json"
import Replace from "../pages/Replace"
import Url from "../pages/Url"
import Unicode from "../pages/Unicode"

interface WrapperProps extends Props {}

class Wrapper extends React.Component<WrapperProps,{}> {

  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {}

  render() {

    /**
     * Url split: 
     * first/second/third/fourth/... = type,mode?,/action / action/type
     * 
     * html/beautify,minify
     * json/verify
     * replace/html/tag / html/replace / regexp/replace/html
     */

    let pathname = this.props.location.pathname;
    pathname = pathname.startsWith('/') ? pathname.substring(1) : pathname;
    let split = pathname.split('/');
    let first = split.length > 0 ? split[0] : ''; //, type = first;
    let second = split.length > 1 ? split[1] : ''; //, action = second;
    let third = split.length > 2 ? split[2] : '';

    let type, action, title; //, defaultAction = '';
    if(first === 'html' || first === 'json') {
      type = first;
      action = second;
      let actor = ACTOR_NAME[action];
      title = type.substring(0,1).toUpperCase()+type.substring(1) + ' ' + actor.substring(0,1).toUpperCase()+actor.substring(1);
    } else if(first === 'replace') {
      action = first;
      type = 'html';
      title = 'Html Tag Remover';
    } else if(first === 'encode' || first === 'decode') {
      action = first;
      type = second;
      let actor = ACTOR_NAME[action];
      title = type.substring(0,1).toUpperCase()+type.substring(1) + ' Encoder/Decoder';
    }

    // let inputEditorMode, outputEditorMode, beautify, minify, verify, options;

    let component;
    if(action === 'encode' || action === 'decode' ) {
      if(type === 'url')
        component = (<Url action={action} type={type}/>)
      else //if(type === 'unicode')
        component = (<Unicode action={action} type={type}/>)
    } else if(action === 'replace') component = (<Replace type={type}/>)
    else if(type === 'html') component = (<Html type={type} action={action}/>)
    else if(type === 'json') component = (<Json type={type} action={action}/>)
    else component = (<Main/>)
    // console.log('component = ', component);

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