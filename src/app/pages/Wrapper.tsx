import React from "react"
import {Props} from "../Types"
import {ACTOR_NAME} from "../Constants"
import Main from "../pages/Main"
// import Html from "../pages/Html"
import Beautify from "../pages/Beautify"
import Minify from "../pages/Minify"
import Json from "../pages/Json"
import Replace from "../pages/Replace"
import Url from "../pages/Url"
import Unicode from "../pages/Unicode"
import Color from "../pages/Color"
import JavaMapStr from "./JavaMapStr"

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
    let first = split.length > 0 ? split[0] : '';
    let second = split.length > 1 ? split[1] : '';
    let third = split.length > 2 ? split[2] : '';

    let action = first, type = second;
    let title, actor = ACTOR_NAME[action];

    if(
      action === 'beautify' || action === 'minify' || action === 'verify'
      || (action === 'convert' && type === 'color')
    ) {
      title = type.substring(0,1).toUpperCase()+type.substring(1) + ' ' + actor.substring(0,1).toUpperCase()+actor.substring(1);
    } else if(action === 'convert' && type === 'javaMapStr') {
      title = 'Java Map String to Key-Value pair';
    } else if(action === 'replace') {
      title = 'Html Tag Remover';
    } else if(action === 'encode' || action === 'decode') {
      title = type.substring(0,1).toUpperCase()+type.substring(1) + ' Encoder/Decoder';
    }

    // let inputEditorMode, outputEditorMode, beautify, minify, verify, options;

    let component;
    if(action === 'encode' || action === 'decode') {
      if(type === 'url')
        component = (<Url action={action} type={type}/>)
      else //if(type === 'unicode')
        component = (<Unicode action={action} type={type}/>)
    } else if(action === 'replace') {
      component = (<Replace action={action} type={type}/>)
    } else if(action === 'beautify') {
      component = (<Beautify  action={action} type={type}/>)
    } else if(action === 'minify') {
      component = (<Minify  action={action} type={type}/>)
    } else if(action === 'verify') {
      component = (<Json action={action} type={type}/>)
    } else if(action === 'convert') {
      if(type === 'javaMapStr')
        component = (<JavaMapStr action={action} type={type}/>)
      else //if(type === 'color')
        component = (<Color action={action} type={type}/>)
    } else
      component = (<Main/>)
    
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