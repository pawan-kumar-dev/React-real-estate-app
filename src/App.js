import React from "react";
import "./App.css";
import Header from "./Header";
import Filter from "./Filter";
import Listings from "./Listings";
import Data from "./ListingData";
class App extends React.PureComponent {
     constructor(props) {
          super(props);
          this.state = {
               ListingData: Data,
               city: "All", //setting the default filters
               HomeType: "All",
               rooms: 0,
               minprice: "",
               maxprice: "",
               minfloorspace: "",
               maxfloorspace: "",
               elevators: false,
               swimmingpool: false,
               finishedbasement: false,
               gym: false,
               filteredData: Data,
               sorting: "All",
               view: "box",
               search: "",
               populateFormsData: {},
               menu: true,
          };
     }
     change = (event) => {
          const name = event.target.name;
          const value =
               event.target.type === "checkbox"
                    ? event.target.checked
                    : event.target.value;
          this.setState(
               {
                    [name]: value,
               },
               () => {
                    this.filteredData();
               }
          );
     };
     filteredData = () => {
          let newData = this.state.ListingData;
          if (this.state.minprice !== "" || this.state.maxprice !== "") {
               newData = newData.filter((item) => {
                    return (
                         item.price <= this.state.maxprice &&
                         item.price >= this.state.minprice
                    );
               });
          }
          if (this.state.city !== "All") {
               newData = newData.filter((item) => {
                    return item.city === this.state.city;
               });
          }
          if (this.state.HomeType !== "All") {
               newData = newData.filter((item) => {
                    return item.homeType === this.state.HomeType;
               });
          }
          if (this.state.sorting !== "All") {
               if (this.state.sorting === "price-desc") {
                    newData = newData.sort((a, b) => {
                         return b.price - a.price;
                    });
               }
               if (this.state.sorting === "price-asc") {
                    newData = newData.sort((a, b) => {
                         return a.price - b.price;
                    });
               }
          }
          if (this.state.search !== "") {
               let city, search;
               newData = newData.filter((item) => {
                    city = item.city.toLowerCase();
                    search = this.state.search.toLowerCase();
                    return city.includes(search);
               });
          }
          if (this.state.elevators) {
               newData = newData.filter((item) => {
                    return item.extras.includes("elevators");
               });
          }
          if (this.state.swimmingpool) {
               newData = newData.filter((item) => {
                    return item.extras.includes("swimmingpool");
               });
          }
          if (this.state.gym) {
               newData = newData.filter((item) => {
                    return item.extras.includes("gym");
               });
          }
          if (this.state.finishedbasement) {
               newData = newData.filter((item) => {
                    return item.extras.includes("finishedbasement");
               });
          }
          this.setState({
               filteredData: newData,
          });
     };
     populateForms = () => {
          let city = this.state.ListingData.map((item) => {
               return item.city;
          });
          city = new Set(city);
          city = [...city];
          city = city.sort();

          let homeType = this.state.ListingData.map((item) => {
               //returns the array of hometypes and then embeding them in the sets to
               //remove the duplicate data and then adding them in the array
               return item.homeType;
          });
          homeType = new Set(homeType);
          homeType = [...homeType];
          homeType = homeType.sort();
          this.setState({
               populateFormsData: {
                    homeType,
                    city,
               },
          });
     };
     changeView = (viewName) => {
          this.setState({
               view: viewName,
          });
     };
     render() {
          return (
               <>
                    <Header />
                    <section className="contentarea">
                         <Filter
                              change={this.change}
                              globalState={this.state}
                              Data={this.state.ListingData}
                              populateForms={this.populateForms}
                         />
                         <Listings
                              Data={this.state.filteredData}
                              change={this.change}
                              globalState={this.state}
                              changeView={this.changeView}
                         />
                    </section>
               </>
          );
     }
}
export default App;
