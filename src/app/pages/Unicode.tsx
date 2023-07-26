import React from "react"
import {connect} from "react-redux";
import {Props, ComponentProps} from "../types";
import TextArea from "../components/TextArea";
import {SAMPLE_DATA} from '../constants';

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

  setSampleData = () => {
    let sampleData = SAMPLE_DATA.unicode;
    $("#inputArea").val(sampleData).trigger("keyup");
  }

  options = () => {}

  onInputAreaKeyUp = (event) => {
    $("#outputArea").val(escape(this.replaceAll($("#inputArea").val(), "\\", "%"))).trigger("updateStatusBar"); //.trigger("change");
    // $("#inputArea").trigger("updateStatusBar");
  }

  onOutputAreaKeyUp = (event) => {
    $("#inputArea").val(unescape(this.replaceAll($("#outputArea").val(), "\\", "%"))).trigger("updateStatusBar"); //.trigger("change");
    // $("#outputArea").trigger("updateStatusBar");
  }

  render() {
    const {type, action} = this.props;
    return (
      <div className="url">
        <TextArea
          ref={ref => this.textarea = ref}
          type={type}
          action={action}
          setSampleData={this.setSampleData}
          // action={this.action}
          // encode={this.encode}
          // decode={this.decode}
          // options={this.options}
          onInputAreaKeyUp={this.onInputAreaKeyUp}
          onOutputAreaKeyUp={this.onOutputAreaKeyUp}
        />
      </div>
    )
  }
}

export default connect()(Unicode);