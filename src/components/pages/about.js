import React, { Component } from 'react';

class Aboutpage extends Component {
  render() {
    return (
        <div className="container">
        <h1>About Page Content</h1>
            <div className="row">
                <div className="col-md-8">
                <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam a erat tristique, efficitur lacus eu, egestas tortor. Fusce non velit pretium, auctor tellus eu, gravida diam. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nunc luctus gravida diam eget lacinia. Vestibulum sollicitudin malesuada sem, quis dictum nisl consectetur id. Morbi tincidunt et purus nec sodales. Vivamus a bibendum justo. Quisque non molestie est, vitae vehicula orci. Integer tincidunt risus sit amet nisi dignissim ornare.
                </p>
                <p>
                Quisque mattis scelerisque mi, in accumsan tellus lobortis vel. Sed dictum neque nec ligula convallis, vitae scelerisque velit aliquam. Nunc tristique nec nunc posuere dignissim. Duis consequat mi ante, sit amet mattis mauris rutrum quis. Morbi sollicitudin scelerisque dolor, a auctor odio venenatis non. Nulla accumsan ante nibh, at egestas nisl iaculis eget. Curabitur sem erat, aliquam vel tellus id, varius pretium leo. Sed blandit dolor nulla, id vulputate lacus fringilla ac. Nullam feugiat purus rutrum laoreet fermentum. Proin id libero mattis, scelerisque nulla in, feugiat turpis. Proin a neque augue. Morbi condimentum a sapien eget euismod. Nulla congue magna quis purus aliquam, varius rhoncus lacus sodales. Suspendisse nec velit placerat tellus blandit venenatis.
                </p>
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

export default Aboutpage;
