import React from 'react';
import Article from './Article';

class SingleArticleContainer extends React.Component {

constructor() {
		super();

		this.state = {
			article:null,
			loading:true,
		};
};

async componentWillMount() {
	//console.log(this.props);

let article = this.props.articles.find(article => article.slug === this.props.match.params.slug);

if(article) {
		this.setState({ article, loading:false });
} else {
		article = await this.props.getArticle(this.props.match.params.slug);
		this.setState({ article, loading:false });
}

};

	render() {
		return(
			<div>
			{!this.state.loading &&
				<Article
					article={this.state.article}
				/>
			}
			</div>

		)
	}
};

export default SingleArticleContainer;
