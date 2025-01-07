import React, { Component } from 'react'

// app.js 파일에서 별도의 파일로 분리
class Mynav extends Component {
  shouldComponentUpdate(newProps, newState) { // 기본값 = true
    console.log(
      'shouldComponentUpdate 작동',
      newProps.data, // 변경된 값
      this.props.data // 변경전 값
    );
    if (this.props.data === newProps.data) {
      return false;
    }

    return true;
  }
  render() {
    console.log('Mynav 실행');
    let lists = []; // 아래 배열들마다 빈 배에 추가하는 것
    let data = this.props.data;
    
    data.forEach(item => {
      lists.push(
        <li key={item.id}>
          <a href="/"
            onClick={e => {
              e.preventDefault();
              this.props.onChangePage(item.id);
            }}
          >{item.title}</a></li>
      );
    })
    
    return (
      <nav>
        <ul>
          {lists}
        </ul>
      </nav>
    )
  }
}

export default Mynav;