import React, { Component } from 'react'
import { Layout } from 'element-react'

import { TheContent, TheFooter, TheHeader } from './index'
import { Redirect } from 'react-router';
import { connect } from 'react-redux'
class TheLayout extends Component {
  render() {

    const passed = localStorage.getItem('passed');

    // console.log(passed)
    return (
      <>
        {
          passed === 'true' ?
            <div>
              <Layout.Row style={{zIndex: 2}}>
              {/* <div className="grid-content bg-purple-light"><TheHeader /></div> */}
                 <Layout.Col span="24" className='img-box img-box-head position' style={{paddingTop:"20px" }}>
                   <div className="grid-content bg-purple-light"><TheHeader /></div>
                 </Layout.Col>
              </Layout.Row>
              <Layout.Row>
                <Layout.Col span="24">
                  <div className="grid-content bg-purple-light app-content" style={{zIndex: -1}}><TheContent /></div>
                </Layout.Col>
              </Layout.Row>
              <Layout.Row>
                <Layout.Col span="24" style={{ backgroundColor: this.props.backMode == "light" ?'#F0EEEB':'#33454d'}}>
                  <div className="grid-content bg-purple-light"><TheFooter /></div>
                </Layout.Col>
              </Layout.Row>
            </div>
            :
            <Redirect to="/get-access" />
        }

      </>
    )
  }
}
const mapStateToProps = (state) => {
  const { backMode } = state.auth
  return {
    backMode
  }
}
export default connect(mapStateToProps, null)(TheLayout);