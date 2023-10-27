import React from "react"
import {connect} from 'react-redux';
import {Props, ComponentProps} from "../Types";
import {SAMPLE_DATA} from "../Constants";
import Editor from '../components/Editor'

class JavaMapStr extends React.Component<ComponentProps,{}> {

  // Refs
  editor: any = null;

  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {}

  convert = (event) => {
    // 자바 맵의 문자열 표현: 인접한 쌍은 쉼표로 구분되고 그 뒤에 단일 공백이 오고 각 키-값 쌍은 등호
    // {K1=V1, K2=V2, ..., Kn=Vn}
    let inputEditor = this.editor.getWrappedInstance().inputACEEditor;
    let inputValue = inputEditor.getValue();
    inputValue = inputValue.substring(1,inputValue.length-1);
    let inputValues = inputValue.split(', ');
    let output = '';

    for(let i = 0; i < inputValues.length; i++) {
      let item = inputValues[i];
      let key = item.substring(0, item.indexOf('='));
      let value = item.substring(item.indexOf('=')+1, item.length);
      output += key + ':' + value;
      if(i < inputValues.length-1)  output += '\n';
    }
    // console.log(output);
    let outputEditor = this.editor.getWrappedInstance().outputACEEditor;
    outputEditor.setValue(output, 1);
  }

  setSampleData = (event) => {
    let sampleData = SAMPLE_DATA.jsonStr;
    this.editor.getWrappedInstance().inputACEEditor.setValue(sampleData, 1);
  }

  render() {
    const {type, action} = this.props;
    return (
      <div className="java_map_str">
        <Editor
          ref={ref => this.editor = ref}
          type={type}
          inputEditorMode={'text'}
          inputEditorHint={'{K1=V1, K2=V2, ..., Kn=Vn}'}
          outputEditorMode={'text'}
          outputEditorHint={'Rows are separated by new lines\nKeys and values are separated by :'}
          convert={this.convert}
          setSampleData={this.setSampleData}
        />
      </div>
    )
  }
}

export default connect()(JavaMapStr);