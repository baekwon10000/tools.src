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
              내가 만들어서 쓰는 나만의 툴 싸이트.<br/>
              광고 떡칠 개같은 싸이트들이 만드는 계기 한몫했다.<br/>
              나도 광고 좀 붙여서 용돈 벌이 좀 하고 싶었는데 가망이 안보여서 그만둠.<br/>
              My own tool site that I create and use.<br/>
              Advertising sites played a role in creating this.<br/>
              I also wanted to earn some pocket money by putting up some ads, but I didn't see any hope so I quit.
            </p>
          </div>
        </div>
      </div>
    )
  }
}

export default Main;