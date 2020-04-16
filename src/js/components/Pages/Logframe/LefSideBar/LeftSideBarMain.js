import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getIndicatorsCategory } from '../../../../actions/logFrame.actions';

let dateArray = [];

class LeftSidebarMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndicator: 'IMPACT',
    };
  }

  handleIndicators = data => {
    this.setState({ activeIndicator: data });
  };

  handleYear = e => {
    // push uniques
    if (dateArray.indexOf(e) === -1) {
      dateArray.push(e);
    } else {
      dateArray = dateArray.filter(f => f !== e);
    }
  };

  componentDidMount() {
    this.props.getIndicatorsCategory();
  }

  render() {
    // const arraylist = [];

    const { activeIndicator } = this.state;
    const {
      handleActiveLayer,
      handleActiveDate,
      activeLayer,
      dateRange,
      activeDate,
    } = this.props;
    const {
      props: { logFrameReducer },
    } = this;
    // console.log(this.props, 'incid');
    // const a =
    //   listOfSubCategory &&
    //   listOfSubCategory.map(data => {
    //     data.subcat.map(subdata => {
    //       return arraylist.push(subdata.name);
    //     });
    //   });
    // console.log(arraylist, 'arrrrr');
    return (
      <div className="sidebar" id="sidebar-toggle">
        <ul className="sidebar-li">
          <h2>Indicators</h2>

          {logFrameReducer.indicatorCategory.map(data => {
            return (
              <li
                role="tab"
                className={`${
                  activeIndicator === data.name ? 'active' : ''
                }`}
                value={data.name}
                onClick={() => {
                  this.handleIndicators(data.name);
                }}
                onKeyDown={() => {
                  this.handleIndicators(data.name);
                }}
              >
                <a href="#/">
                  {/* <ReactTooltip /> */}
                  {data.name}
                  <span className="tooltip-list">{data.title}</span>
                </a>
                <ul
                  className={`sidebar-sublist ${
                    activeIndicator === data.name
                      ? 'active-li'
                      : 'false'
                  }`}
                >
                  {data.subcat.map(el => {
                    return (
                      <li
                        className={
                          activeLayer === el.name
                            ? 'active-sublist'
                            : ''
                        }
                      >
                        <a
                          role="button"
                          tabIndex="0"
                          className={el.name.split(' ').join('')}
                          onClick={() => {
                            handleActiveLayer(el.name);
                          }}
                          onKeyDown={() => {
                            handleActiveLayer(el.name);
                          }}
                        >
                          {el.name}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
const mapStateToProps = ({ logFrameReducer }) => ({
  logFrameReducer,
});
export default connect(mapStateToProps, { getIndicatorsCategory })(
  LeftSidebarMain,
);
