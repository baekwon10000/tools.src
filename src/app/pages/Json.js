import React from 'react';
import {connect} from 'react-redux';
import Editors from './Editors'
import utils from "../utils/utils";

class Json extends React.Component {

  constructor(props) {
    super(props);
    this.state = {}

    // Refs
    this.editors = null;

    // Constants
    this.JSON_VERIFIER_URL = '';
  }
  
  setJsonSampleData = (event) => {
    let sampleData = `{
  "employees": {
      "employee": [
          {
              "id": "1",
              "firstName": "Scarlett",
              "lastName": "Johansson",
              "photo": "http://si.wsj.net/public/resources/images/BN-BY925_mag041_OZ_20140318165119.jpg"
          },
          {
              "id": "2",
              "firstName": "Chris",
              "lastName": "Evans",
              "photo": "https://pbs.twimg.com/profile_images/605082381528096769/gt_sJRot.png"
          },
          {
              "id": "3",
              "firstName": "Jeremy",
              "lastName": "Renner",
              "photo": "https://pbs.twimg.com/profile_images/603945839795412992/XTssKbRC.jpg"
          }
      ]
  }
}`;
    this.editors.getWrappedInstance().inputACEEditor.setValue(sampleData, 1);
  }

  beautifyJson = (event) => {
  }

  minifyJson = (event) => {
  }

  verifyJson = (event) => {
    let self = this;
    utils.loadScript(this.JSON_VERIFIER_URL, function() {
      let opts = {
      };
      let inputEditor = self.editors.getWrappedInstance().inputACEEditor;
      let output = verifier.html(inputEditor.getValue(), opts);
      let outputEditor = self.editors.getWrappedInstance().outputACEEditor;
      outputEditor.setValue(output);
    });
  }

  render() {
    return (
      <div className="container-fluid py-3">
        <div className="row">
          <div className="col-md-12 text-center">
            <h1>{`JSON Verifier`}</h1>
          </div>
        </div>
        <Editors
          ref={ref => this.editors = ref}
          title={'JSON'}
          inputEditorMode={'json'}
          outputEditorMode={'plain_text'}
          setSampleData={this.setJsonSampleData}
          // beautify={this.beautifyJson}
          // minify={this.minifyJson}
          verify={this.verifyJson}
        />
      </div>
    )
  }
}

Json.propTypes = {};
Json.defaultProps = {};

export default connect()(Json);