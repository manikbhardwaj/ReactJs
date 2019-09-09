import React from 'react';
import Banner from '../../Banner';
import Article from '../../Article';

const Articles = ({ articles, handlePagination, nextUrl, prevUrl, deleteArticle, editArticle }) => {

	return (
<div>

<Banner

	backgroundImage="url(/assets/img/bg-gift.jpg)"
	title="My Articles"
	subTitle="Read and get updated on how we progress."

/>

<main className="main-content bg-gray">
	<div className="row">
    <div className="col-12 col-lg-6 offset-lg-3">
      {articles && articles.map(article =>
        (<div key={article.id}>
          	<Article article={article} />
						<div className="text-center">
						<button onClick={() => editArticle(article)} className="btn btn-info mr-5">Edit Article</button>
						<button onClick={() => deleteArticle(article.id)} className="btn btn-danger">Delete Article</button>
						</div>
            <hr />
          </div>
        )) }

    <nav className="flexbox mb-50">
    <button className={`btn btn-white${prevUrl ? '': 'disabled'}`} onClick={() => handlePagination(prevUrl)}>
      <i className="ti-arrow-left fs-9 ml-4" />Older
    </button>
      <button  className={`btn btn-white${nextUrl ? '': 'disabled'}`} onClick={() => handlePagination(nextUrl)}>
        Newer <i className="ti-arrow-right fs-9 mr-4" /></button>
    </nav>
      </div>
     </div>

</main>
</div>

)


};

export default Articles;
