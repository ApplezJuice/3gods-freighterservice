import React, { Component } from 'react';

var style10 = {
    backgroundColor:  '#2FEFEF',
    border: '1px solid  00C01'
}
  var style09 = {
    backgroundColor:  '#48F0C0',
    border: '1px solid  00C01'
  }

  var style08 = {
    backgroundColor:  '#00EF47',
    border: '1px solid  00C01'
  }
  var style07 = {
    backgroundColor:  '#00F000',
    border: '1px solid  00C01'
  }
  var style06 = {
    backgroundColor:  '#8FEF2F',
    border: '1px solid  00C01'
  }
  var style05 = {
    backgroundColor:  '#EFEF00',
    border: '1px solid  00C01'
  }
  var style04 = {
    backgroundColor:  '#D77700',
    border: '1px solid  00C01'
  }
  var style03 = {
    backgroundColor:  '#F06000',
    border: '1px solid  00C01'
  }
  var style02 = {
    backgroundColor:  '#F04800',
    border: '1px solid  00C01'
  }
  var style01 = {
    backgroundColor:  '#D73000',
    border: '1px solid  00C01'
  }
  var style00 = {
    backgroundColor:  '#F00000',
    border: '1px solid  00C01'
  }

  var tableTD = {
    paddingTop: '5px',
    paddingLeft: '15px'
  }

  var tableLeftPadNew = {
    paddingLeft: '5px'
  }

  var tableArrow = {
    paddingTop: '-10px',
    paddingLeft: '5px',
    
  }

  //<p dangerouslySetInnerHTML={{ __html: window.jumpSecStatus.join("") }}/>
/*

    */
  function loopJumpSec(sec){
    var i;
    var finalRender = [];

    for (i = 0; i < sec.length; i++){
      
      switch(sec[i].toString()){
        case '0.1':
         finalRender.push(<div className="routeDot" style={style01}> </div>)
         break;
        case '0.2':
        finalRender.push(<div className="routeDot" style={style02}> </div>)
        break;
        case '0.3':
        finalRender.push(<div className="routeDot" style={style03}> </div>)
        break;
        case '0.4':
        finalRender.push(<div className="routeDot" style={style04}> </div>)
        break;
        case '0.5':
        
        finalRender.push(<div className="routeDot" style={style05}> </div>)
        break;
        case '0.6':
        
        finalRender.push(<div className="routeDot" style={style06}> </div>)
        break;
        case '0.7':
        
        finalRender.push(<div className="routeDot" style={style07}> </div>)
        break;
        case '0.8':
        
        finalRender.push(<div className="routeDot" style={style08}> </div>)
        break;
        case '0.9':
        
        finalRender.push(<div className="routeDot" style={style09}> </div>)
        break;
        case '1':
        
        finalRender.push(<div className="routeDot" style={style10}> </div>)
        break;
        default:
          finalRender.push(<div className="routeDot" style={style00}> </div>)
          break;
      }
    }
    return (
      finalRender
    )
  }

function getRouteText(startd, endd){
  if (window.showtext){
    return(
    <div>
        <p className="routeTitles">{startd} to {endd} is {window.routeJumps} jumps</p><br />
        {loopJumpSec(window.jumpSecStatus)}
        
        <br />

        <p className="routeTitles">Final Price:</p> <p className="routeResponseGreen">{window.endPrice} ISK</p> <br />
        <p className="routeTitles">Volume: </p><p className="routeNoBold">Up to 845,000m&sup3;</p><br />
        <p className="routeTitles">Collateral:</p> <p className="routeNoBold">Up to 1,500,000,000 isk</p><br />
        <p className="routeTitles">Do NOT put a collateral amount that is less than the value of the items in the contract. </p><br />

        <br />
        <p className="routeTitles">Jumps:</p> <br />
        <p dangerouslySetInnerHTML={{ __html: window.jumpArray.join("") }}/>
    </div>
    )
  }
    return (
        <div></div>
    )
}

class Freightservice extends Component {
    constructor(props) {
        super(props);
        //window.routeJumps = 0;
        window.routeJumps = '';
        window.showtext = false;
        window.endPrice = '';
        window.jumpArray = [];
        window.jumpSecStatus = [];

        this.systems = [
          'Jita',
          'Maspah',
          '4-43BW',
          'Amarr',
        ];

        this.state = {
            startDest: 'Maspah',
            endDest: 'Jita',
            seconds: 0,
            suggestions: [],
            suggestionsTwo: [],
            textv: '',
            textd: '',
          //  routeJumps: 0
        };
    
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
      }

      updatePage(){
        this.setState({ state: this.state });
        console.log("Test");
      }

    
      handleSubmit(event) {
        this.test(this.state.textv, this.state.textd);
        //alert('A name was submitted: ' + this.state.startDest + ' ' + this.state.endDest);
        //this.updatePage();
        event.preventDefault();
      }

      test(_startDest, _endDest){
        //var jumpArray = [];
        var EVEoj = require("EVEoj"),
          SDD = EVEoj.SDD.Create("json", {
              path: "https://cf.eve-oj.com/sdd/201611140"
          }),
          map;
      
          SDD.LoadMeta()
          .then(function() {
              map = EVEoj.map.Create(SDD, "K");
              return map.Load();
          })
          .then(function() {
              var startDest = map.GetSystem({name: _startDest});
              var endDest = map.GetSystem({name: _endDest});
              var route = map.Route(startDest.ID, endDest.ID, [], true, false);
              //console.log(_startDest + " to " + _endDest  + " route length: " + route.length);
              var i;
              var j;
          
              var intialCost = 2500000;
              var jumpPrice = intialCost + (route.length * 750000);
              var insurance = .15;
              var serviceFee = .05;
              var finalPrice = (jumpPrice * (serviceFee + insurance)) + jumpPrice;
              window.endPrice = finalPrice;
    
              window.routeJumps = route.length;
              //this.setState({
               //   routeJumps: route.length
              //})
              window.jumpArray = [];
              window.jumpSecStatus = [];
              for (i = 0; i < route.length; i++){
                  j = map.GetSystem({id: route[i]});
                  //console.log(j.name + " - Security status: " + (Math.round(j.security * 10) / 10));
                  window.jumpArray.push(j.name + " - Security status: " + (Math.round(j.security * 10) / 10) + '<br />');
                  window.jumpSecStatus.push(Math.round(j.security * 10) / 10);
              }
          
              //console.log("Price for this service: " + (Math.round(finalPrice * 10000) / 10000));
          })
          .caught(function(err) {
              console.error(err);
          });
          //this.setState({ state: this.state });
          window.showtext = true;
    }


    tick() {
        this.setState(prevState => ({
          seconds: prevState.seconds + 1
        }));
      }

      componentDidMount() {
        this.interval = setInterval(() => this.tick(), 1000);
      }

      componentWillUnmount() {
        clearInterval(this.interval);
      }

      onTextChanged = (e) => {
        const value = e.target.value;
        let suggestions = [];
        if (value.length > 0){
          const regex = new RegExp(`^${value}`, 'i');
          suggestions = this.systems.sort().filter(v => regex.test(v));
        }

          this.setState(() => ({ suggestions, textv: value }))
      }

      suggestionSelected(value){
        this.setState(() => ({
          textv: value,
          suggestions: [],
        }));
      }


            
      onTextChangedTwo = (e) => {
        const value = e.target.value;
        let suggestionsTwo = [];
        if (value.length > 0){
          const regex = new RegExp(`^${value}`, 'i');
          suggestionsTwo = this.systems.sort().filter(v => regex.test(v));
        }

          this.setState(() => ({ suggestionsTwo, textd: value }))
      }

      suggestionSelectedTwo(value){
        this.setState(() => ({
          textd: value,
          suggestionsTwo: [],
        }));
      }

      renderSuggestionsTwo() {
        const { suggestionsTwo } = this.state;
        if (suggestionsTwo.length === 0){
          return null;
        }
        return (
          <ul>
            {suggestionsTwo.map((systems) => <li onClick={() => this.suggestionSelectedTwo(systems)}>{systems}</li>)}
          </ul>
        )
      }

      renderSuggestions() {
        const { suggestions } = this.state;
        if (suggestions.length === 0){
          return null;
        }
        return (
          <ul>
            {suggestions.map((systems) => <li onClick={() => this.suggestionSelected(systems)}>{systems}</li>)}
          </ul>
        )
      }

  render() {
    const { textv } = this.state;
    const { textd } = this.state;
    return (
        
        <div className="container">
        <h1>Freighter Service</h1>
        
            <div className="row">
                <div className="col-md-8">
                  <p hidden>
                Seconds: {this.state.seconds}
                </p>

                
                  <ul>
                    <li>
                    <p className="routeTitles">Maximum volume:</p> <p>845,000 m3 (no exceptions)</p>
                    </li>
                    <li>
                    <p className="routeTitles">Maximum collateral:</p> <p>1.5 billion ISK</p>
                    </li>
                    <li>
                    <p className="routeTitles">Containers:</p> <p>Populated containers should be used only when necessary (i.e. because the number of items in the contract exceeds the maximum) and Must be marked by including "container" in the contract description. Double-wrap (making a courier contract that contains a courier contract) must not be used.
                    </p></li>
                  </ul>
                

                
                <div className="FormWrapper">
                
                <form onSubmit={this.handleSubmit}>
                <table>
                  <tbody>
                <tr>
                <td valign="top">
                    <label>
                    
                    <div className="AutoCompleteText">
                    <input 
                      onChange={this.onTextChanged}
                      type="text"
                      value= {textv}
                      name="startDest" 
                      placeholder="Start Destination"
                      autoComplete="off"/>

                      {this.renderSuggestions()}
                      </div>

                    </label>
                    </td>
                    <td valign="top" style={tableArrow}>
                    <div className="arrow">
                    &rarr;
                    </div>
                    </td>
                    <td valign="top" style={tableLeftPadNew}>
                    <label>
                    
                    <div className="AutoCompleteText">
                    <input 
                        name="endDest"
                        type="text" 
                        value= {textd} 
                        autoComplete="off"
                        placeholder="End Destination"
                        onChange={this.onTextChangedTwo} />

                        {this.renderSuggestionsTwo()}
                        </div>
                    </label>
                    </td>
                    <td valign="top" style={tableTD}>
                    <input className="btn btn-outline-success" type="submit" value="Submit" />
                    </td>
                    </tr>
                    </tbody>
                    </table>
                </form>
                
                </div>
                <br />
                {getRouteText(textv, textd)}
                
                

                </div>

                <div className="col-md-4">
                    <div className="content-section">
                        <h3>Our Sidebar</h3>
                        
                        <ul className="list-group">
                            <li className="list-group-item list-group-item-dark">Latest Posts</li>
                            <li className="list-group-item list-group-item-dark">Announcements</li>
                            <li className="list-group-item list-group-item-dark">Calendars</li>
                            <li className="list-group-item list-group-item-dark">etc</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}

export default Freightservice;
