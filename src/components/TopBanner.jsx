import React from 'react'
import PropTypes from 'prop-types'


export default class TopBanner extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      date: new Date()
    }

    this.tick = this.tick.bind(this)

  }

  tick(){
    this.setState((state, props) => (
       {date: new Date()}))
  }

  componentDidMount(){
    this.timeID = setInterval(() => {
      this.tick()
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);  }

  render() {
    return (
      <div className="">
        <h1>Coronavirus Realtime</h1>
        {this.state.date.toUTCString()}
      </div>
    )
  }
}