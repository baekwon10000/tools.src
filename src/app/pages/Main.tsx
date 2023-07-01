import React, {} from "react"
import {Props} from "../types"

class Main extends React.Component<Props, {}> {

  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {}

  render() {
    return (
      <div className="main container-fluid py-3">
        <div className="row">
          <div className="col-md-12 text-center">
            <h1>제목이 들어갑니다.</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 text-center">
            <p>
              간략한 설명이 들어갑니다.
            </p>
          </div>
        </div>
      </div>
    )
  }
}

export default Main;