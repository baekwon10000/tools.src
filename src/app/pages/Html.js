import React from 'react';
import {connect} from 'react-redux';
import Editors from './Editors'
import utils from "../utils/utils";
// import {minify} from 'html-minifier';
// import requirejs from 'requirejs';
// var requirejs = require('requirejs');
// import $ from "jquery";
// window.jQuery = $;

class Html extends React.Component {

  constructor(props) {
    super(props);
    this.state = {}

    // Refs
    this.editors = null;

    // Constants
    this.HTML_BEAUTIFIER_URL = 'https://cdnjs.cloudflare.com/ajax/libs/js-beautify/1.14.0/beautifier.js';
    this.HTML_MINIFIER_URL = 'https://cdnjs.cloudflare.com/ajax/libs/html-minifier/4.0.0/htmlminifier.min.js';

    // // Instants or Variables
    // this.scriptsLoaded = [];
  }
  
  setHtmlSampleData = (event) => {
    
    let sampleData = `<!DOCTYPE html>
<html>
  <head>
    <title>Largest companies by market cap — US Stock Market</title>
    <meta charset='UTF-8'>
  </head>
  <body>
    <h1>Apple : 2010 Billion</h1>
    <h2>Saudi Aramco : 1812 Billion</h2>
    <h3>Microsoft : 1800 Billion</h3>
    <h4>Alphabet (Google) : 1155 Billion</h4>
    <h5>Amazon : 869 Billion</h5>
    <b>This data is as of 21 Dec 2022.</b>
  </body>
</html>`;

    // let editor = this.inputACEEditor;
    // editor.setValue(sampleData, 1);
    this.editors.getWrappedInstance().inputACEEditor.setValue(sampleData, 1);
  }

  beautifyHtml = (event) => {
    let self = this;
    utils.loadScript(this.HTML_BEAUTIFIER_URL, function() {
      let opts = {
        'indent_size': '2',
        'indent_char': ' ',
      };
      let inputEditor = self.editors.getWrappedInstance().inputACEEditor;
      let output = beautifier.html(inputEditor.getValue(), opts);
      let outputEditor = self.editors.getWrappedInstance().outputACEEditor;
      outputEditor.setValue(output, 1);
    });
  }

  minifyHtml = (event) => {
    let self = this;
    // alert("개발예정입니다.");
    // let minify = requirejs('html-minifier').minify;
    // console.log('minify = ', minify);
    utils.loadScript(this.HTML_MINIFIER_URL, function() {
      console.log('script is loaded...');
      let minify = require('html-minifier').minify;
      // let minify = require('not-exist-module').minify;
      console.log('minify = ', minify);
      let opts = {
      };
      let inputEditor = self.editors.getWrappedInstance().inputACEEditor;
      let output = minify.html(inputEditor.getValue(), opts);
      let outputEditor = self.editors.getWrappedInstance().outputACEEditor;
      outputEditor.setValue(output);
    });
  }

  verifyHtml = (event) => {
    let self = this;
  }

  render() {
    return (
      <Editors
        ref={ref => this.editors = ref}
        mode={'html'}
        setSampleData={this.setHtmlSampleData}
        beautify={this.beautifyHtml}
        minify={this.minifyHtml}
        // verify={this.verifyHtml}
      />
    )
  }
}

Html.propTypes = {};
Html.defaultProps = {};

export default connect()(Html);