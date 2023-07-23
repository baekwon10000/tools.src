import React from 'react';
import {connect} from 'react-redux';
import Editors from './Editor'
import utils from "../utils/utils";
import {Props, ComponentProps} from "../types";
import {SAMPLE_DATA} from "../constants";

// let jsonlint, $;
declare let jsonlint, $;

class Json extends React.Component<ComponentProps,{}> {

  // Refs
  editors = null;

  // Constants
  JSON_VERIFIER_URL = 'https://cdnjs.cloudflare.com/ajax/libs/jsonlint/1.6.0/jsonlint.min.js';

  constructor(props) {
    super(props);
    this.state = {}
  }
  
  setJsonSampleData = (event) => {
    let sampleData = SAMPLE_DATA.json;
    this.editors.getWrappedInstance().inputACEEditor.setValue(sampleData, 1);
  }

  beautifyJson = (event) => {
  }

  minifyJson = (event) => {
  }

  verifyJson = (event) => {
    let self = this;
    utils.loadScript(this.JSON_VERIFIER_URL, function() {
      let inputEditor = self.editors.getWrappedInstance().inputACEEditor;
      let outputEditor = self.editors.getWrappedInstance().outputACEEditor;
      let data = inputEditor.getValue();
      if($.trim(data) != '') {
        try {
          if(jsonlint.parse(data)) {
            outputEditor.setValue('Valid JSON');
          }
        } catch(e) {
          outputEditor.setValue(e+'');
        }
      }
    });
  }

  render() {

    const {type, action} = this.props;
    let inputEditorMode, outputEditorMode, beautify, minify, verify, options;

    { //if(action === 'verify') {
      inputEditorMode = 'json';
      outputEditorMode = 'plain_text';
      beautify = null;
      minify = null;
      verify = this.verifyJson;
      options = null;
    }

    return (
      <Editors
        ref={ref => this.editors = ref}
        type={type}
        inputEditorMode={inputEditorMode}
        outputEditorMode={outputEditorMode}
        setSampleData={this.setJsonSampleData}
        // beautify={beautify}
        // minify={minifyn}
        verify={verify}
      />
    )
  }
}

// Json.propTypes = {};
// Json.defaultProps = {};

export default connect()(Json);