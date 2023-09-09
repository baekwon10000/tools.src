import React from "react"
import {connect} from 'react-redux';
import {Props, ComponentProps} from "../Types";

class Sample extends React.Component<ComponentProps,{}> {

  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {}

  render() {
    return (
      <div className="sample">
      </div>
    )
  }
}

export default connect()(Sample);