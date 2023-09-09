import React, {} from "react"
import {Props} from "../Types"

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
            <h1>Online Tools</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 text-center">
            <p>
              Holy shit, ad sites!
              It's dirty and cheesy, so I'd rather make it and use it.
            </p>
          </div>
        </div>
      </div>
    )
  }
}

export default Main;