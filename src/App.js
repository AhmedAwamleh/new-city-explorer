
import { Component } from 'react';
import './App.css';
import SearchForm from './components/SearchForm';
import axios from 'axios';
import DisplayedInfo from './components/DisplayedInfo';
class App extends  Component{
  constructor(props){
  super (props);
  this.state={
    display_name:``,
    latitude:``,
    longitude:``,

  }
  }
  displayLocation=async(e)=>{
    e.preventDefault();
    const searchQuery=e.target.searchQuery.value;
    const url=`https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION_KEY}&q=${searchQuery}&format=json`;

    const city=await axios.get(url)
    
    this.setState({
      display_name:city.data[0].display_name,
      latitude:city.data[0].lat,
      longitude:city.data[0].lon,

    })



  }
  render(){
  return (

   <div className="App">
    
  <SearchForm submitHandler ={this.displayLocation}/>
<DisplayedInfo cityInfo={this.state}/>

 </div>
  );
}

  
}

export default App;
