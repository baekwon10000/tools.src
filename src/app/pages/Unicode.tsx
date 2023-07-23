import React from "react"
import {connect} from 'react-redux';
import {Props, ComponentProps} from "../types";

class Unicode extends React.Component<ComponentProps,{}> {

  // Refs
  textarea: any = null;

  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {}

  action = (event) => {}
  encode = (event) => {}
  decode = (event) => {}

  render() {
    return (
      <div className="url">
        <TextArea
          ref={ref => this.textarea = ref}
          type={type}
          // setSampleData={this.setHtmlSampleData}
          // action={this.action}
        />
      </div>
    )
  }
}

export default connect()(Unicode);