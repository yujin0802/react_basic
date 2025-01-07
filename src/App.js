import './App.css'; // alt + 클릭

// 클래스 기반의 컴포넌트 
// 컴포넌트 이름 = 무조건 대문자로 시작
import React, { Component } from 'react' // rcc
import Myheader from './component/Myheader';// Myheader 컴포넌트 불러오기
import Mynav from './component/Mynav'; // Mynav 컴포넌트 불러오기
import ReadArticle from './component/ReadArticle'; // Myarticle 컴포넌트 불러오기
import CreateArticle from './component/CreateArticle';
import UpdateArticle from './component/UpdateArticle';

class App extends Component { 
  constructor(props) { // 바뀔 수 있는 값들의 기본값 설정
    super(props);
    this.max_menu_id = 3; // 불변 값
    this.state = { // 이 컴포넌트에 쓸 변수 설정
      mode: 'welcome',
      selected_id: 2,
      welcome: {
        title: 'Welcome',
        desc: 'Welcome to FrontEnd'
      },
      subject: {
        title: "프론트엔드 개발자 역량",
        desc: "기본언어인 html, css, javascript부터 학습합니다.",
      },
      menus: [ // 배열로 생성
        {id: 1, title: 'UI/UX 개발', desc:'사용자 인터페이스와 사용자가 웹사이트를 이용하면 느끼고 생각하는 총체적 경험을 개발'},
        {id: 2, title: '재사용이 가능한 UI 개발', desc:'앵귤러, 리엑트, 뷰등의 자바스크립트 프레임워크를 가지고 재사용할 수 있는 UI를 만든다.'},
        {id: 3, title: '애니메이션 구현', desc:'CSS 또는 javascript를 사용해 다양한 효과의 애니메이션 구현한다.'},
      ]
    }
  }
  // 리팩토링
  getReadArticle() { // id와 일치하는 요소 찾는 함수
    let idx = this.state.menus.findIndex(item => (
      item.id === this.state.selected_id
    ));
    let data = this.state.menus[idx];
    return data;
  }
  getArticles() {
    let _title, _desc, _article = null;
    if (this.state.mode === 'welcome') {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadArticle title={_title} desc={_desc} mode={this.state.mode}></ReadArticle>
    } else if (this.state.mode === 'read') {
      let _data = this.getReadArticle();
      _article = <ReadArticle title={_data.title} desc={_data.desc} onChangeMode={(_mode) => {
        if (_mode === 'delete') {
          if (window.confirm('정말로 삭제하시겠습니까?')) {
            let _menus = Array.from(this.state.menus); // 복사본 생성
            let idx = _menus.findIndex(item => (item.id === this.state.selected_id)); // 요소의 번호 확인
            console.log(idx);
            _menus.splice(idx, 1);  // n번부터 1개 지움
            this.setState({
              mode: 'welcome', // 삭제 후 초기값 설정
              menus: _menus
            })
          }
        } else {
          this.setState({
            mode: _mode
          })
        }
    }}></ReadArticle>
    } else if (this.state.mode === 'create') {
      _article = <CreateArticle onSubmit={(_title, _desc) => {
        this.max_menu_id += 1;
        let _menus = Array.from(this.state.menus);
        _menus.push({ // 값을 추가
          id: this.max_menu_id, title: _title, desc: _desc
        });
        this.setState({
          menus: _menus,
          mode: 'read',
          selected_id: this.max_menu_id
        })
      }}></CreateArticle>
    } else if (this.state.mode === 'update') {
      let _content = this.getReadArticle();
      _article = <UpdateArticle data={_content} onSubmit={(_id, _title, _desc) => {
        let _menus = Array.from(this.state.menus);
        _menus.forEach((item, index) => { // 값을 변경
          if (item.id === _id) {
            _menus[index] = {id:_id, title:_title, desc:_desc}
          }
        })
        this.setState({
          menus: _menus,
          mode: 'read'
        });
      }}></UpdateArticle>
    }
    return _article;
  }
  render() {
    console.log('App 실행');

    return (
      <div className='App'>
        <Myheader title={this.state.subject.title}
          desc={this.state.subject.desc}
          onChangeMode = {() => {
            this.setState({
              mode: 'welcome'
            })
          }}
        >
        </Myheader>
        <Mynav data={this.state.menus} onChangePage={(id) => {
          this.setState({
            mode: 'read',
            selected_id:id
          })
        }}></Mynav>

        {this.getArticles()}
        
        <hr />
        <div className="menu">
          <button type="button" className="primary" onClick={() => {
            this.setState({
              mode: 'create'
            })
          }}>
          Create task
          </button>
        </div>
      </div>
    )
  }
}

export default App; // 별도로 내보내기