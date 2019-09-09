import React from "react";
import CreateArticleForm from "./CreateArticleForm";
import draftToHtml from "draftjs-to-html";
import { EditorState, convertToRaw } from "draft-js";
//import Navbar from './../Navbar';
//import Footer from './../Footer';

class CreateArticle extends React.Component {
  constructor() {
    super();

    this.state = {
      title: "",
      image: null,
      content: EditorState.createEmpty(),
      category: null,
      errors: [],
      categories: [],
      editing: false,
      article: null
    };
  }

  async componentWillMount() {
    const categories = await this.props.getArticlesCategories();

    if (this.props.match.params.slug) {
      const article = this.props.articles.find(
        articleInArray => articleInArray.slug === this.props.match.params.slug
      );

      if (!article) {
        //fix issue when user refreshes edit article page without editing
        this.props.history.push("/user/articles");
        return;
      }

      this.setState({
        editing: true,
        article,
        categories,
        title: article.title,
        category: article.category_id,
        content: article.content
      });
    } else {
      this.setState({
        categories
      });
    }
  }

  handleEditorState = editorState => {
    this.setState({
      content: editorState
    });
  };

  handleSubmit = async e => {
    e.preventDefault();

    try {
      await this.props.createArticle(
        {
          title: this.state.title,
          content: draftToHtml(
            convertToRaw(this.state.content.getCurrentContent())
          ),
          category: this.state.category,
          image: this.state.image
        },
        this.props.token
      );
      this.props.notyService.success("Article created Successfully");
      this.props.history.push("/");
    } catch (errors) {
      this.props.notyService.error(
        "Please check for errors. Something went wrong"
      );
      this.setState({ errors });
    }
  };

  updateArticle = async e => {
    e.preventDefault();

    try {
      await this.props.updateArticle(
        {
          title: this.state.title,
          image: this.state.image,
          content: this.state.content,
          category: this.state.category
        },
        this.state.article,
        this.props.token
      );

      this.props.notyService.success("Article Updated Successfully");

      this.props.history.push("/");
    } catch (errors) {
      this.props.notyService.error(errors[0].message);
      this.setState({ errors });
    }
  };

  handleInputChange = e => {
    this.setState({
      [e.target.name]:
        e.target.type === "file" ? e.target.files[0] : e.target.value
    });
  };

  render() {
    return (
      <CreateArticleForm
        handleInputChange={this.handleInputChange}
        categories={this.state.categories}
        handleSubmit={this.handleSubmit}
        errors={this.state.errors}
        editing={this.state.editing}
        article={this.state.article}
        title={this.state.title}
        content={this.state.content}
        category={this.state.category}
        updateArticle={this.updateArticle}
        handleEditorState={this.handleEditorState}
      />
    );
  }
}

export default CreateArticle;
