import React, { Component } from 'react'

// app.js 파일에서 별도의 파일로 분리
class UpdateArticle extends Component {
  constructor(props) { // 초기 값 설정
    super(props);
    this.state = {
        id: this.props.data.id,
        title: this.props.data.title,
        desc: this.props.data.desc
      }
  }
  inputFormHandler = e => {
    this.setState({ [e.target.name]: e.target.value }) // 계산된 속성
  }
  render() {
    console.log('UpdateArticle 실행');
    console.log(this.props.data);
    return (
      <section>
        <article>
          <h2>Update Task</h2>
          <form action="/create_process" method="POST" onSubmit={e => {
            e.preventDefault();
            this.props.onSubmit(
              this.state.id,
              this.state.title,
              this.state.desc
            );
          }}>
            <input type="hidden" name="id" value={this.state.id} />
            <p>
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                name="title"
                placeholder="title"
                id="title"
                required
                value={this.state.title} // 초기값으로 변경
                onChange={this.inputFormHandler}
              />
            </p>
            <p>
              <label htmlFor="desc">Description:</label>
              <textarea
                id="desc"
                name="desc"
                placeholder="description"
                required
                value={this.state.desc}
                onChange={this.inputFormHandler}
              >
              </textarea>
            </p>
            <button className="primary">Submit</button>
          </form>
        </article>
      </section>
    )
  }
}

export default UpdateArticle;