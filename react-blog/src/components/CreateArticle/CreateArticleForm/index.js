import React from 'react';
import Banner from '../../Banner';
import PropTypes from 'prop-types';

import { Editor } from 'react-draft-wysiwyg';
import '../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const CreateArticle = ({ handleInputChange,
handleEditorState,
   categories, handleSubmit, errors, editing, article, title, content, category, updateArticle }) => {

return (

	<div>

<Banner

	backgroundImage={`url(${process.env.PUBLIC_URL}/assets/img/bg-laptop.jpg)`}
	title={editing ? `Editing Article: ${article.title}` : 'Create New Article'}
	subTitle="Read and get updated on how we progress."

/>

  {/* END Header */}
  {/* Main container */}
  <main className="main-content">
    <section className="section">
      <div className="container">
        <div className="row">
          <div className="col-12 col-lg-12">
          <ul className="list-group">
          {errors.map(error => <li key={error.message} className="list-group-item text-danger">{error.message}</li>)}
          </ul>
            <form className="p-30 bg-gray rounded" onSubmit={editing ? updateArticle : handleSubmit}>
              <div className="row">
                <div className="form-group col-md-12 my-5">
                  <input type="file" name="image" className="form-control" onChange={handleInputChange}/>
                </div>
                <div className="form-group col-12 col-md-6">
                  <input className="form-control form-control-lg" type="text" onChange={handleInputChange} name="title" value={title} placeholder="Title" />
                </div>
                <div className="form-group col-12 col-md-6">
                  <select name="category" value={category || ''} onChange={handleInputChange} className="form-control form-control-lg">
                  <option>Select category</option>
                    {categories && categories.map(category =>
                       <option key={category.id} value={category.id}>{category.name}</option>
                     )}
                  </select>
                </div>
              </div>
              <div className="form-group">
              { editing ? <textarea name='content' value={content}/> : <Editor
              editorState={content}
              onEditorStateChange={handleEditorState}
              />}

              </div>
              <div className="text-center">
                <button className="btn btn-lg btn-primary" type="submit">{editing ? 'Update Article' : 'Create Article'}</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  </main>
</div>

	);

};

CreateArticle.propTypes = {
  handleInputChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default CreateArticle;
