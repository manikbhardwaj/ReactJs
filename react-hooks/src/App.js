import React, { useState, useEffect } from "react";
import "./App.css";
import SearchForm from "./SearchForm";
import loader from "./bx_loader.gif";
import News from "./news";

const App = () => {
  const [news, setNews] = useState([]);

  const [searchQuery, setSearchQuery] = useState("react");

  const [url, setUrl] = useState(
    "http://hn.algolia.com/api/v1/search?query=react"
  );

  const [loading, setLoading] = useState(false);

  //fetch news
  const fetchNews = () => {
    //set loading true
    setLoading(true);
    fetch(url)
      .then(result => result.json())
      .then(data => (setNews(data.hits), setLoading(false)))
      .catch(error => console.log(error));
  };

  useEffect(() => {
    //get news result on clicking of search button
    fetchNews();
  }, [url]);

  const handleChange = e => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    setUrl(`http://hn.algolia.com/api/v1/search?query=${searchQuery}`);
  };

  const showLoading = () => {
    return <div>{loading && <img src={loader} alt="loader" />}</div>;
  };

  // const searchForm = () => (
  // 	<form onSubmit={handleSubmit}>
  // 		<input type='text' value={searchQuery} onChange={handleChange} />
  // 		<button>Search</button>
  // 	</form>
  // );

  // const showNews = () => {
  // 	return news.map((n,i) => (
  // 		<p key={i}>
  // 		{n.title} --- {n.url}
  // 		</p>
  // 	))
  // }

  return (
    <div>
      <h2>Latest News</h2>
      {showLoading()}
      <SearchForm
        handleSub={handleSubmit}
        searchQuery={searchQuery}
        handleChange={handleChange}
      />
      <News news={news} />
    </div>
  );
};

/* const App = () => {
	const[count, setCount] = useState(0)

	useEffect(() => { //update the component on run time
		document.title = `clicked ${count} times`
	})

	const increment = () => {
		setCount(count + 1)
	}

	return (
	<div className="App">
      <header className="App-header">
       <h2>Counter App</h2>
	   <button onClick={increment}>clicked {count} times</button>
      </header>
    </div>
	)
} */

/* class App extends Component {
	state = {
		count:0
	};

	increment = () => {
		this.setState(
			{
			  count:this.state.count+1
			}
		);
	};

	componentDidMount() { //initial state of the component
		document.title = `clicked ${this.state.count} times`
	}

	componentDidUpdate() { //update the component on clicking the button
		document.title = `clicked ${this.state.count} times`
	}

	render() {
  return (
    <div className="App">
      <header className="App-header">
       <h2>Counter App</h2>
	   <button onClick={this.increment}>clicked {this.state.count} times</button>
      </header>
    </div>
  );
	}
} */

export default App;
