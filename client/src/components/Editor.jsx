import React, { Component, useState } from 'react';
import PropTypes from 'prop-types';
import { EditorState, Modifier } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import '../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css'


class CustomOption extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    editorState: PropTypes.object,
  };

  addsquare = () => {
    const { editorState, onChange } = this.props;
    const contentState = Modifier.replaceText(
      editorState.getCurrentContent(),
      editorState.getSelection(),
      '[  ]',
      editorState.getCurrentInlineStyle(),
    );
    this.props.setTextData(editorState.getCurrentContent().getPlainText());
    onChange(EditorState.push(editorState, contentState, 'insert-characters'));
  };
  addLessthenGraterthen = () => {
    const { editorState, onChange } = this.props;
    const contentState = Modifier.replaceText(
      editorState.getCurrentContent(),
      editorState.getSelection(),
      "<  >",
      editorState.getCurrentInlineStyle(),
    );
    this.props.setTextData(editorState.getCurrentContent().getPlainText());
    onChange(EditorState.push(editorState, contentState, 'insert-characters'));
  };
  addparentheses = () => {
    const { editorState, onChange } = this.props;
    const contentState = Modifier.replaceText(
      editorState.getCurrentContent(),
      editorState.getSelection(),
      '(  )',
      editorState.getCurrentInlineStyle(),
    );
    this.props.setTextData(editorState.getCurrentContent().getPlainText());
    onChange(EditorState.push(editorState, contentState, 'insert-characters'));
  };
  addQuestionANDBackSlash = () => {
    const { editorState, onChange } = this.props;
    const contentState = Modifier.replaceText(
      editorState.getCurrentContent(),
      editorState.getSelection(),
      '/  ?',
      editorState.getCurrentInlineStyle(),

    );
    this.props.setTextData(editorState.getCurrentContent().getPlainText());
    onChange(EditorState.push(editorState, contentState, 'insert-characters'));
  };

  render() {
    return (
      <>
        <div className='mx-2' onClick={this.addsquare}>[   ] </div>
        <div className='mx-2' onClick={this.addparentheses}>(   )</div>
        <div className='mx-2' onClick={this.addLessthenGraterthen}>&lt;  &gt;</div>
        <div className='mx-2' onClick={this.addQuestionANDBackSlash}>/   ?</div>
      </>
    );
  }
}

const EditorCustomToolbarOption = ({ setTextData }) => (
  <Editor toolbarCustomButtons={[<CustomOption setTextData={setTextData} />]} />
)



export default EditorCustomToolbarOption;