import React from 'react';
import { Link } from 'react-router-dom';
import renderHtml from 'react-render-html';


const Article = ({ article }) => {

return (

<article className="mt-90">
  <header className="text-center mb-40">
    <h3>
      <Link to={`/article/${article.slug}`}>{article.title}</Link>
    </h3>
    <div className="link-color-default fs-12">
      <Link to="#">{article.category.name}</Link>,
      <time> {(new Date(article.created_at).toDateString())}</time>
    </div>
  </header>
  <Link to={`/article/${article.slug}`}>
    <img className="rounded" src={article.imageUrl} alt="..." />
  </Link>
  <div className="card-block">
    <p className="text-justify">{renderHtml(`${article.content.substring(0, 90)}...`)}</p>
    <p className="text-center mt-40">
      <Link className="btn btn-primary btn-round" to={`/article/${article.slug}`}>Read more</Link>
    </p>
  </div>
</article>



	)

};


export default Article;
