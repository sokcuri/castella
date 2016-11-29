import HelloWorld from './hello-world';
import FloatLeft from './fl';
import ContentHead from './content-head';
import React from 'react';
import ReactDOM from 'react-dom';

export default class Greeting {
  content_head() {
    ReactDOM.render(
      <ContentHead />,
      document.getElementById('content_head')
    )
  }

  hello() {
    ReactDOM.render(
      <HelloWorld />,
      document.getElementById('content_body')
    )
  }

  float_left() {
    ReactDOM.render(
      <FloatLeft />,
      document.getElementById('fl')
    )
  }
};