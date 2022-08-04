
import { Component } from 'react';
import './App.css';
import SearchForm from './components/SearchForm';
import axios from 'axios';
import DisplayedInfo from './components/DisplayedInfo';
import Map from './components/Map';
import ErrorComp from './components/ErrorComp';

class App extends  Component{
  constructor(props){
  super (props);
  this.state={
    display_name:``,
    latitude:``,
    longitude:``,
    map_src:``,
    displayInfo:false,
    errorMsg:``,
    displayErr:false

  }
  }
  displayLocation=async(e)=>{
    e.preventDefault();
    const searchQuery=e.target.searchQuery.value;
    const url=`https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION_KEY}&q=${searchQuery}&format=json`;
try{  
    const city=await axios.get(url)
    
  this.setState({
    display_name:city.data[0].display_name,
    latitude:city.data[0].lat,
    longitude:city.data[0].lon,
    displayInfo:true,
    displayErr:false
  })
  this.displayMap(city.data[0].lat,city.data[0].lon,);
}catch(error){
  this.setState({
    displayInfo:false,
    displayErr:true,
    errorMsg:error.response.status +`:`+error.response.data.error
  })
  this.setState({
    displayInfo:false
  })

}




  }
displayMap=(lat,lon)=>{
  const mapSrc=`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION_KEY}&center=${lat},${lon}&zoom=18`
console.log(mapSrc)
this.setState({
  map_src:mapSrc

})
}

  render(){
  return (

   <div className="App">
    
  <SearchForm submitHandler ={this.displayLocation}/>

{this.state.displayInfo&&
<>
  <DisplayedInfo cityInfo={this.state}/>
<Map mapSource={this.state.map_src}/>
</>
  }
  {
    this.state.displayErr &&
    <ErrorComp error={this.state.errorMsg}></ErrorComp>
  }
 </div>
  );
}

  
}

export default App;
