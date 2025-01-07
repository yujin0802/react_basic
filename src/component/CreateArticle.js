import React, { Component } from 'react'

// app.js 파일에서 별도의 파일로 분리
class CreateArticle extends Component {
  render() {
    console.log('CreatArticle 실행');
    let classNames = 'menu';
    if (this.props.mode === 'welcome') {
      classNames += ' hidden';
    }
    return (
      <section>
        <article>
          <h2>Creat Task</h2>
          <form action="/create_process" method="POST" onSubmit={e => {
            e.preventDefault();
            this.props.onSubmit(e.target.title.value, e.target.desc.value);
          }}>
            <p>
              <label htmlFor="title">Title:</label>
              <input type="text" name="title" placeholder="title" id="title" required/>
            </p>
            <p>
              <label htmlFor="desc">Description:</label>
              <textarea id="desc" name="desc" placeholder="description" required></textarea>
            </p>
            <button className="primary">Submit</button>
          </form>
        </article>
      </section>
    )
  }
}

export default CreateArticle;