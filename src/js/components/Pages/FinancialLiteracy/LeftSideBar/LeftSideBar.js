import React, { Component } from 'react';
import { connect } from 'react-redux';

class LeftSideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      partnersList,
      financialProgram,
      filteredPartnersList,
    } = this.props.financialReducer;
    const {
      // state: {},
      props: {
        handlePartnerChange,
        handlePartnerParentCheckbox,
        handlePartnerType,
        partnerType,
        selectedProgram,
        handleSelectedProgram,
        isAllPartnerSelected,
        applyClick,
      },
    } = this;
    return (
      <aside className="sidebar left-sidebar literacy-sidebar">
        <div className="sidebar-in">
          <div className="aside-header">
            <button type="button" className="common-button is-bg">
              Financial Literacy
            </button>
          </div>
          <div className="aside-body">
            <div className="sidebar-widget">
              <h6 className="title">Partner Type</h6>
              <div className="widget-body">
                <div className="widget-tag partner-tag">
                  <a
                    onClick={() => {
                      handlePartnerType('Microfinance Institutions');
                    }}
                    onKeyDown={() => {
                      handlePartnerType('Microfinance Institutions');
                    }}
                    className={
                      partnerType.includes(
                        'Microfinance Institutions',
                      )
                        ? 'active'
                        : ''
                    }
                    role="tab"
                    tabIndex="0"
                  >
                    <span>Microfinance</span>
                  </a>
                  <a
                    onClick={() => {
                      handlePartnerType(
                        'Commercial Bank and Other Partners',
                      );
                    }}
                    onKeyDown={() => {
                      handlePartnerType(
                        'Commercial Bank and Other Partners',
                      );
                    }}
                    className={
                      partnerType.includes(
                        'Commercial Bank and Other Partners',
                      )
                        ? 'active'
                        : ''
                    }
                    tabIndex="0"
                    role="tab"
                  >
                    <span>Commercial Bank</span>
                  </a>
                </div>
              </div>
            </div>
            <div className="sidebar-widget partner-institue">
              <h6 className="title">Partner Institution</h6>
              <div className="widget-body">
                <div className="checklist-group">
                  <div className="checklist-header">
                    <div className="custom-checkbox">
                      <input
                        id="all_partner"
                        type="checkbox"
                        name="Initiative"
                        checked={isAllPartnerSelected}
                        onClick={handlePartnerParentCheckbox}
                      />
                      <label htmlFor="all_partner">All</label>
                    </div>
                  </div>
                  <ul className="checkbox-list">
                    {filteredPartnersList &&
                      filteredPartnersList.map(data => {
                        return (
                          <li key={data.id}>
                            <a>
                              <div className="custom-checkbox">
                                <input
                                  id={data.partner_id}
                                  className="partner_checkbox"
                                  type="checkbox"
                                  name={data.partner_name}
                                  onClick={handlePartnerChange}
                                />
                                <label htmlFor={data.partner_id}>
                                  <span>{data.partner_name}</span>
                                </label>
                              </div>
                            </a>
                          </li>
                        );
                      })}
                  </ul>
                </div>
              </div>
            </div>
            <div className="sidebar-widget">
              <h6 className="title">Program Initiative</h6>
              <div className="widget-body">
                <div className="widget-tag Program-tag">
                  {financialProgram &&
                    financialProgram.map(data => {
                      if (data.total !== 0)
                        return (
                          <a
                            onClick={() => {
                              handleSelectedProgram(data.id);
                            }}
                            onKeyDown={() => {
                              handleSelectedProgram(data.id);
                            }}
                            className={
                              selectedProgram.includes(data.id)
                                ? 'active'
                                : ''
                            }
                            tabIndex="0"
                            role="tab"
                          >
                            <small className="icon is-red" />
                            <span>{data.name}</span>
                          </a>
                        );
                      return null;
                    })}

                  {/* <a href="#" className="active">
                    <small className="icon is-orange" />
                    <span>Centre meeting</span>
                  </a>
                  <a href="#">
                    <small className="icon is-blue" />
                    <span>IVR</span>
                  </a>
                  <a href="#">
                    <small className="icon is-pink" />
                    <span>Tab</span>
                  </a>
                  <a href="#">
                    <small className="icon is-green" />
                    <span>street drama</span>
                  </a>
                  <a href="#">
                    <small className="icon is-other" />
                    <span>others</span>
                  </a> */}
                </div>
              </div>
            </div>
            <div className="apply-buttons buttons end">
              <button
                type="button"
                className="common-button is-clear "
              >
                reset
              </button>
              <button
                onClick={applyClick}
                type="button"
                className="common-button is-bg"
              >
                apply
              </button>
            </div>
          </div>
        </div>
      </aside>
    );
  }
}

const mapStateToProps = ({ financialReducer }) => ({
  financialReducer,
});
export default connect(mapStateToProps, {})(LeftSideBar);
