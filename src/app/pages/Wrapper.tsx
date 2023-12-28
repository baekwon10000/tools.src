import React from "react"
import {Props} from "../Types"
import {MENUS} from "../Constants"
import Main from "../pages/Main"

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

    let i, j;
    outer: for(i = 0; i < MENUS.length; i++) {
      let menus = MENUS[i].menus;
      for(j = 0; j < menus.length; j++) {
        if(menus[j].link.indexOf(pathname) > -1)
          break outer;
      }
    }
    let selectedMenu = MENUS[i].menus[j];
    let component = selectedMenu && selectedMenu.component ? (<selectedMenu.component action={action} type={type} /> ) : (<Main/>)

    return (
      <div className="wrapper container-fluid py-3">
        <div className="row">
          <div className="col-md-12 text-center">
            <h1>{selectedMenu.title}</h1>
          </div>
        </div>
        { component }
      </div>
    )
  }
}

export default Wrapper;