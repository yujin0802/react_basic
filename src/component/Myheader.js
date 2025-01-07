import React, { Component } from 'react'

// app.js 파일에서 별도의 파일로 분리
class Myheader extends Component {
  render() {
    console.log('Myheader 실행');
    // console.log(this.props);
    return (
      <header>
        <h1 className="logo">
          <a href="/"
            onClick={e => {
              e.preventDefault(); // 기본동작을 막음
              this.props.onChangeMode();
            }}
          >{this.props.title}</a></h1>
        <p>{this.props.desc} </p>
      </header>
    )
  }
}

export default Myheader;
