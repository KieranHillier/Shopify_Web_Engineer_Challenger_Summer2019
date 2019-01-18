import React, { Component } from "react";
import "./App.css";
import Data from "./data.json";
import Result from "./components/Result";
import { IoIosSearch } from "react-icons/io";

class App extends Component {

  state = {
    results: [],
    favourites: [],
    query: "",
    queryStatus: "blank"
  };

  findResults = () => {
    //value inside search input
    const query = this.refs.searchValue.value.toLowerCase();

    if (query === "") {
      //query search is blank
      this.setState({ queryStatus: "failed" });
    } else {
      //find results that match the element's keywords
      const matchingResults = [];
      Data.forEach(element => {
        const keyWords = element.keywords;
        if (keyWords.includes(query)) {
          //add 'favourited' property to element for favouriting functionality
          element.favourited = false;
          matchingResults.push(element);
        }
      });

      //check if search produced any results. if successful store results in state. 
      //if unsuccessful store "failed" in state
      matchingResults.length === 0
        ? this.setState({ queryStatus: "failed" })
        : this.setState({ results: matchingResults });
    }
  };

  handleKeyPress = e => {
    //check if user presses "Enter" key while focused on input
    //if so, search for results
    if (e.key === "Enter") {
      this.findResults();
    }
  };

  handleInputChange = e => {
    //track value of input inside 'query' state
    this.setState({ query: e.target.value });

    //if input is blank, remove all matches
    if (e.target.value === "") {
      this.setState({
        results: [],
        queryStatus: "blank"
      });
    }
  };

  //toggles status of "favourited" for clicked element
  toggleFavourite = element => {
    const { favourites } = this.state
    if (element.favourited) {
      element.favourited = false;
      //create new favourites array without the selected element
      const updateFavourites = favourites.filter(
        item => item !== element
      );
      //update state to remove selected element
      this.setState({
        favourites: updateFavourites
      });
    } else {
      element.favourited = true;
      //add selected element to state "favourites" array 
      this.setState({
        favourites: [...favourites, element]
      });
    }
  };

  renderResults = () => {
    const { results, favourites } = this.state;
    let favourited;
    //loop through "results" and render all results
    return results.map(element => {
      //check if the element is already favourited
      if (favourites.includes(element)) {
        element.favourited = true;
      }

      //check favourited status of element to determine stlying
      element.favourited ? (favourited = true) : (favourited = false);

      return (
        <Result
          element={element}
          id={element.id}
          favouriteFunc={this.toggleFavourite}
          favouritedStatus={favourited}
        />
      );
    });
  };

  renderFavourites = () => {
    const { favourites } = this.state;
    //loop through "favourites" array and render all favourited elements
    return favourites.map(element => (
      <Result
        element={element}
        id={element.id}
        favouriteFunc={this.toggleFavourite}
        favouritedStatus={true}
      />
    ));
  };

  //determine which message to render regarding search status & results
  favouritesStatus = () => {
    const { queryStatus } = this.state;
    switch (queryStatus) {
      case "blank":
        return <p className="textContainer">Search Toronto's Solid Waste Management Services!</p>;
      case "failed":
        return <p className="textContainer">No results! :(</p>;
      default:
        return null;
    }
  };

  render() {
    const { results, favourites } = this.state;
    return (
      <div className="App">
        <div className="headerContainer">
          <p>Toronto Waste Lookup</p>
        </div>
        <div className="bodyContainer">
          <div className="searchBarContainer">
            <input
              onKeyPress={this.handleKeyPress}
              onChange={this.handleInputChange}
              className="searchBarInput"
              type="text"
              ref="searchValue"
              placeholder="Search... (ex: Takeout)"
              name="search"
              autoComplete="off"
            />
            <a className="searchBarButton" onClick={() => this.findResults()}>
              <IoIosSearch
                size={33}
                transform="scale(-1, 1)"
                color={"#ffffff"}
                className="searchBarButtonIcon"
              />
            </a>
          </div>
          <div className="resultsContainer">
            {results.length > 0 ? (
              <>
                {this.renderResults()}
                {favourites.length > 1 ? null : (
                  <>
                    <p className="favouritesTitle">Favourites</p>
                    <p className="favouritesHint">
                      Add more than 1 items to display favourites
                    </p>
                  </>
                )}
              </>
            ) : (
              this.favouritesStatus()
            )}
            {favourites.length > 1 ? (
              <>
                <p className="favouritesTitle">Favourites</p>
                {this.renderFavourites()}
              </>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
