import React from 'react';
import { Link } from 'react-router-dom';
import renderHtml from 'react-render-html';
//import Navbar from './../Navbar';
//import Footer from './../Footer';


const SingleArticle = ({ article }) => {

	return(

		<div>
  <header className="header header-inverse h-fullscreen pb-80" style={{backgroundImage: `url(${article.imageUrl})`}} data-overlay={8}>
    <div className="container text-center">
      <div className="row h-full">
        <div className="col-12 col-lg-8 offset-lg-2 align-self-center">
          <p className="opacity-70">{article.category.name}</p>
          <br />
          <h1 className="display-4 hidden-sm-down">{article.title}</h1>
          <h1 className="hidden-md-up">{article.title}</h1>
          <br />
          <br />
          <p>
            <span className="opacity-70 mr-8">By</span>
            <Link className="text-white">{article.user.name}</Link>
          </p>
          <p>
            <img className="rounded-circle w-40" src={`${process.env.PUBLIC_URL}/assets/img/avatar/2.jpg`} alt="..." />
          </p>
        </div>
        <div className="col-12 align-self-end text-center">
          <Link className="scroll-down-1 scroll-down-inverse" to="#" data-scrollto="section-content">
            <span />
          </Link>
        </div>
      </div>
    </div>
  </header>
  {/* END Header */}
  {/* Main container */}
  <main className="main-content">
    {/*
|‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒
| Blog content
|‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒
!*/}
    <div className="section" id="section-content">
      <div className="container">
        <div className="row">
          <div className="col-12 col-lg-8 offset-lg-2">
            {renderHtml(article.content)}
          </div>
        </div>
      </div>
    </div>
    {/*
|‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒
| Comments
|‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒
!*/}
    <div className="section bt-1 bg-grey">
      <div className="container">
        <div className="row text-center">
          <div className="text-center p-5">
            COMMENTS HERE.
          </div>
        </div>
      </div>
    </div>
  </main>
</div>

		);

};

export default SingleArticle;
