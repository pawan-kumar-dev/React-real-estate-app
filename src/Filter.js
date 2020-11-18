import React from "react";
import "./App.css";
import classes from "./Filter.module.css";
class Filter extends React.Component {
     componentWillMount = () => {
          this.props.populateForms();
     };
     render() {
          let city = this.props.globalState.populateFormsData.city;
          if (city !== undefined) {
               city = city.map((item) => {
                    return (
                         <option value={item} key={item}>
                              {item}
                         </option>
                    );
               });
          }
          let HomeType = this.props.globalState.populateFormsData.homeType;
          if (HomeType !== undefined) {
               HomeType = HomeType.map((item) => {
                    return (
                         <option value={item} key={item}>
                              {item}
                         </option>
                    );
               });
          }
          return (
               <section className={classes.filter}>
                    <h4>Filter By</h4>
                    <div className={classes.sortby}>
                         <select
                              name="city"
                              value={this.props.Data.city}
                              onChange={this.props.change}
                              className={classes.city}
                         >
                              <option value="All">Select City</option>
                              {city}
                         </select>
                         <select
                              name="HomeType"
                              onChange={this.props.change}
                              className={classes.HomeType}
                         >
                              <option value="All">Select Home Type</option>
                              {HomeType}
                         </select>
                    </div>
                    <div className={classes.price}>
                         <span className={classes.title}>Price</span>
                         <input
                              onChange={this.props.change}
                              value={this.props.globalState.minprice}
                              placeholder="Enter Min Price"
                              type="number"
                              min={1000}
                              name="minprice"
                              className={classes.minprice}
                         />
                         <input
                              onChange={this.props.change}
                              value={this.props.globalState.maxprice}
                              placeholder="Enter Max Price"
                              type="number"
                              max={1000000}
                              name="maxprice"
                              className={classes.maxprice}
                         />
                    </div>
                    <div className={classes.extras}>
                         <span className={classes.title}>Extras</span>
                         <label>
                              <span>Elevators </span>
                              <input
                                   type="checkbox"
                                   checked={this.props.Data.elevators}
                                   name="elevators"
                                   onChange={this.props.change}
                              />
                         </label>
                         <label>
                              <span>Swimming pool </span>
                              <input
                                   type="checkbox"
                                   checked={this.props.Data.swimmingpool}
                                   name="swimmingpool"
                                   onChange={this.props.change}
                              />
                         </label>
                         <label>
                              <span>Finished Basement</span>
                              <input
                                   type="checkbox"
                                   checked={this.props.Data.finishedbasement}
                                   name="finishedbasement"
                                   onChange={this.props.change}
                              />
                         </label>
                         <label>
                              <span>Gym </span>
                              <input
                                   type="checkbox"
                                   checked={this.props.Data.gym}
                                   name="gym"
                                   onChange={this.props.change}
                              />
                         </label>
                    </div>
               </section>
          );
     }
}
export default Filter;
