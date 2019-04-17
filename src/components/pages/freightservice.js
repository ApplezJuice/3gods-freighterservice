import React, { Component } from 'react';
import { render } from 'react-dom';

function test(){
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
            var startDest = map.GetSystem({name: "Maspah"});
            var endDest = map.GetSystem({name: "Jita"});
            var route = map.Route(startDest.ID, endDest.ID, [], true, false);
            console.log("Maspah to Jita route length: " + route.length);
            var i;
            var j;
        
            var intialCost = 2500000;
            var jumpPrice = intialCost + (route.length * 750000);
            var insurance = .15;
            var serviceFee = .05;
            var finalPrice = (jumpPrice * (serviceFee + insurance)) + jumpPrice;
        
            for (i = 0; i < route.length; i++){
                j = map.GetSystem({id: route[i]});
                console.log(j.name + " - Security status: " + (Math.round(j.security * 10) / 10));
            }
        
            console.log("Price for this service: " + (Math.round(finalPrice * 10000) / 10000));
        })
        .caught(function(err) {
            console.error(err);
        });
      }

class Freightservice extends Component {
    constructor(props){
        super(props);
        this.state={myName: ""}
    }   
    
      SubmitValue = (e) => {
         this.props.handleData(this.state.myName)
      }
    
       onChange=(e)=>{
    this.setState({myName: e.target.value})
    
       } 
  render() {
    return (
        <div className="container">
        <h1>Freighter Service</h1>
            <div className="row">
                <div className="col-md-8">
                <button onClick={test()}>Click me</button>
                <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam a erat tristique, efficitur lacus eu, egestas tortor. Fusce non velit pretium, auctor tellus eu, gravida diam. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nunc luctus gravida diam eget lacinia. Vestibulum sollicitudin malesuada sem, quis dictum nisl consectetur id. Morbi tincidunt et purus nec sodales. Vivamus a bibendum justo. Quisque non molestie est, vitae vehicula orci. Integer tincidunt risus sit amet nisi dignissim ornare.
                </p>
                <p>
                Quisque mattis scelerisque mi, in accumsan tellus lobortis vel. Sed dictum neque nec ligula convallis, vitae scelerisque velit aliquam. Nunc tristique nec nunc posuere dignissim. Duis consequat mi ante, sit amet mattis mauris rutrum quis. Morbi sollicitudin scelerisque dolor, a auctor odio venenatis non. Nulla accumsan ante nibh, at egestas nisl iaculis eget. Curabitur sem erat, aliquam vel tellus id, varius pretium leo. Sed blandit dolor nulla, id vulputate lacus fringilla ac. Nullam feugiat purus rutrum laoreet fermentum. Proin id libero mattis, scelerisque nulla in, feugiat turpis. Proin a neque augue. Morbi condimentum a sapien eget euismod. Nulla congue magna quis purus aliquam, varius rhoncus lacus sodales. Suspendisse nec velit placerat tellus blandit venenatis.
                </p>
                <div>
                    <form>
                    Name: <input type="text" name="myName" onChange={this.onChange}/>
                    <br />
                    Email: <input type="text" name="myEmail" />
                    <br /><br />
                    <input type="button" value="Submit" onClick={this.SubmitValue}/>
                    </form>
                    <p>{this.state.myName}</p>
                </div>
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
