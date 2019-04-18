import React, { Component } from 'react';


function getRouteText(){
  if (window.showtext){
    return(
    <div>
        <p className="routeTitles"> Route Jumps:</p> <p className="routeResponseBlack">{window.routeJumps}</p> <br />
        <p className="routeTitles">Final Price:</p> <p className="routeResponseGreen">{window.endPrice} ISK</p> <br /><br />
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
              console.log(_startDest + " to " + _endDest  + " route length: " + route.length);
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
              for (i = 0; i < route.length; i++){
                  j = map.GetSystem({id: route[i]});
                  console.log(j.name + " - Security status: " + (Math.round(j.security * 10) / 10));
                  window.jumpArray.push(j.name + " - Security status: " + (Math.round(j.security * 10) / 10) + '<br />');
              }
          
              console.log("Price for this service: " + (Math.round(finalPrice * 10000) / 10000));
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
        


      /*
      <input 
                        name="startDest"
                        type="text" 
                        value={this.state.startDest} 
                        onChange={this.handleInputChange} />
                        */


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
                <br />
                
                <form onSubmit={this.handleSubmit}>
                    <label>
                    Start: &nbsp;
                    <div className="AutoCompleteText">
                    <input 
                      onChange={this.onTextChanged}
                      type="text"
                      value= {textv}
                      name="startDest" 
                      autoComplete="off"/>

                      {this.renderSuggestions()}
                      </div>

                    </label><br />
                    <label>
                    End: &nbsp;
                    <div className="AutoCompleteText">
                    <input 
                        name="endDest"
                        type="text" 
                        value= {textd} 
                        autoComplete="off"
                        onChange={this.onTextChangedTwo} />

                        {this.renderSuggestionsTwo()}
                        </div>
                    </label>
                    <br />
                    <input type="submit" value="Submit" />
                    
                </form>
                <br />
                {getRouteText()}
                
                

                </div>

                <div className="col-md-4">
                    <div className="content-section">
                        <h3>Our Sidebar</h3>
                        <p className='text-muted'>You can put any information here you'd like.</p>
                        <ul className="list-group">
                            <li className="list-group-item list-group-item-light">Latest Posts</li>
                            <li className="list-group-item list-group-item-light">Announcements</li>
                            <li className="list-group-item list-group-item-light">Calendars</li>
                            <li className="list-group-item list-group-item-light">etc</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}

export default Freightservice;
