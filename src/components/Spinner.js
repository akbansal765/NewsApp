import React, { Component } from 'react'
import loading from '../Gear.gif'

export class Spinner extends Component {
  render() {
    return (
      <div className='text-center my-3'>
        {/* <img src="Gear.gif" alt="loading" /> */}
        <img src={loading} alt="loading" style={{height: '45px', width: '45px'}}/>
      </div>
    )
  }
}

export default Spinner
