import React from "react"
import {connect} from "react-redux";
import {Props, ComponentProps} from "../types";
import TextArea from "./TextArea";

declare let $; //, replaceAll;

class Unicode extends React.Component<ComponentProps,{}> {

  // Refs
  textarea: any = null;

  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {}

  action = (event) => {}

  replaceAll = (value, original, replace) => { 
    while(1) {
      if(value.indexOf(original) != -1)
        value = value.replace(original, replace);
      else
        break;
    }
    return value;
  }

  encode = (event) => {
    $("#outputArea").val(escape(this.replaceAll($("#inputArea").val(), "\\", "%")));
  }
  decode = (event) => {
    $("#inputArea").val(unescape(this.replaceAll($("#outputArea").val(), "\\", "%")));
  }
  options = () => {}

  render() {
    const {type, action} = this.props;
    return (
      <div className="url">
        <TextArea
          ref={ref => this.textarea = ref}
          type={type}
          // setSampleData={this.setHtmlSampleData}
          // action={this.action}
          encode={this.encode}
          decode={this.decode}
          options={this.options}
        />
      </div>
    )
  }
}

export default connect()(Unicode);