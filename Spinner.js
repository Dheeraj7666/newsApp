import React, { Component } from 'react'
import loading from './Spinner.gif'

export class Spinner extends Component {
  render() {
    return (
      <div className='text-center'>
        <img src={loading} style={{height:"80px"}} alt="loading" />
      </div>
    )
  }
}

export default Spinner
