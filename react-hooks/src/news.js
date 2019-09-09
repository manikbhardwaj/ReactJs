import React from 'react';

const News = (props) => {
  return (
    <div>
    {
      props.news.map((n,i) => (
			<p key={i}>
			{n.title} --- {n.url}
			</p>
		))
  }
  </div>
  )
}

export default News;
