import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FullPage, Slide } from 'react-full-page';
import Background from '../../../../img/banner.png';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import Header from '../../Header';
import LeftSidebarMain from './LefSideBar/LeftSideBarMain';

import MiddleChartSection from './MiddleChartSection/MiddleChartSection';

let dateArray = [];
let dateArrayValues = [];
class MainComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndicator: 'IMPACT',
      activeLayer: 'Impact Indicator 1',
      activeDataType: 'Cummulative',
      dateRange: [],
      activeModal: false,
      // width: '',
      // height: '',
      // activeIndicator: [],
      activeDate: [],
      activeDateValues: [],
      updateChart: false,
    };
  }

  handleOneTimeLayerChange = () => {
    this.setState({ activeLayer: 'Impact Indicator 1' });
  };

  // handleIndicators = data => {
  //   const { activeIndicator } = this.state;
  //   this.setState({ activeIndicator: data });
  // };

  handleActiveIndicator = data => {
    this.setState({ activeIndicator: data });
  };

  handleActiveLayer = clickedLayer => {
    this.setState({ activeLayer: clickedLayer });
  };

  handleSelectedDataType = option => {
    this.setState({ activeDataType: option });
  };

  getDateRange = totalDateRange => {
    this.setState({ dateRange: totalDateRange });
  };

  handleSelectAllDate = alldate => {
    this.setState({
      activeDate: alldate,
    });
  };

  handleSelectAllDateName = alldatename => {
    this.setState({
      activeDateValues: alldatename,
    });
  };

  handleActiveDate = (e, element) => {
    const { dateRange } = this.props.logFrameReducer;
    const { updateChart } = this.state;
    console.log(element.target.checked, 'checked');
    if (e === 'All' && element.target.checked === true) {
      const {
        logFrameReducer: { totalRangeDate, totalRangeDateName },
      } = this.props;
      alert('if');
      dateArray = [];
      dateArrayValues = [];
      dateRange.map(data => {
        dateArray.push(data.range);
        dateArrayValues.push(data.name);
        return true;
      });
      this.setState({ updateChart: !updateChart });

      // console.log(this.props.logFrameReducer.totalDateRange);
      // return this.setState({
      //   activeDate: totalRangeDate,
      //   activeDateValues: totalRangeDateName,
      // });
    } else if (e === 'All' && element.target.checked === false) {
      alert('else if');
      dateArray = [];
      dateArrayValues = [];
      this.setState({ updateChart: !updateChart });
    } else {
      alert('else');
      // push uniques
      const collator = new Intl.Collator(undefined, {
        numeric: true,
        sensitivity: 'base',
      });

      const dateFilteredObj = dateRange.filter(
        filteredData => filteredData.range === e,
      );
      this.setState({ updateChart: !updateChart });
      if (dateArray.indexOf(e) === -1) {
        dateArray.push(e);
        dateArrayValues.push(dateFilteredObj[0].name);
      } else {
        dateArray = dateArray.filter(f => f !== e);
        dateArrayValues = dateArrayValues.filter(
          g => g !== dateFilteredObj[0].name,
        );
      }
      dateArray.sort();
      // dateArrayValues.sort();
      dateArrayValues.sort(collator.compare);
      if (dateArray.length === 0) {
        // console.log(dateRange);
        dateRange.map(data => {
          dateArray.push(data.range);
          dateArrayValues.push(data.name);
          return true;
        });
        // console.log(allDateRange);
      }
    }
    this.setState({
      activeDate: dateArray,
      activeDateValues: dateArrayValues,
    });
    // this.setState({ activeDate: e });
  };

  handleArrowClick = () => {
    window.scrollTo(0, this.headRef.current);
    window.scrollTo({
      top: this.headRef.current,
      left: 0,
      behavior: 'smooth',
    });
  };

  componentDidMount() {
    // console.log(document.getElementsByClassName('apexcharts-menu-icon')[0].title =
    //   'Export';
    this.updateWindowDimensions();

    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  handleModal = () => {
    console.log('statemodal', this.state.activeModal);
    this.setState(prevState => ({
      activeModal: !prevState.activeModal,
    }));
    const bodyEl = document.getElementById('body');
    if (this.state.activeModal === false) {
      bodyEl.className = 'modal-open';
    } else {
      bodyEl.className = '';
    }
  };

  updateWindowDimensions = () => {
    document.getElementsByClassName('apexcharts-menu-icon')[0].title =
      'Export';
    if (
      document.getElementsByClassName('apexcharts-legend-text')[3]
    ) {
      document.getElementsByClassName(
        'apexcharts-legend-text',
      )[3].innerText = document
        .getElementsByClassName('apexcharts-legend-text')[3]
        .innerText.replace('Line', '');
    }
    // document.getElementsByClassName(
    //   'apexcharts-legend-series',
    // )[1].style.display = 'none';
    // document.getElementsByClassName(
    //   'apexcharts-legend-series',
    // )[2].style.display = 'none';
    console.log(screen.height, 'screen');
    console.log(window.height, 'windowheight');
    // this.setState({
    //   width: window.innerWidth,
    //   height: window.innerHeight,
    // });
    // console.log(window.innerWidth, 'width');
    // console.log(window.innerHeight, 'height');
    // console.log(
    //   (document.getElementsByClassName(
    //     'banner',
    //   )[0].style.height = `${window.innerHeight + 200}px`),
    // );
    // document.getElementsByClassName(
    //   'banner',
    // )[0].style.height = `${window.innerHeight}px`;
    // const header = document.getElementsByClassName('main-header');
    // const footer = document.getElementsByClassName('main-footer');
    // const content = document.getElementsByClassName('main');
    // const banner = window.innerHeight - header[0].offsetHeight;
    // console.log(banner, 'banner');
    // console.log(footer, 'footer');
    // const height = window.innerHeight - header[0].offsetHeight;
    // content[0].style.minHeight = banner;
    // console.log(
    //   (document.getElementsByClassName(
    //     'banner-content',
    //   )[0].style.minHeight = banner),
    //   'banner-content',
    // );
    // console.log(height, 'height');
  };

  render() {
    const {
      activeLayer,
      dateRange,
      activeDate,
      activeDateValues,
      activeModal,
      updateChart,
      activeDataType,
      activeIndicator,
    } = this.state;
    const {
      props: {
        logFrameReducer: { filteredDynamicData },
      },
    } = this;
    return (
      <>
        <Header />

        <main className="main">
          <section className="content content-mod">
            <div
              className={`modal fade modal-wrapper ${
                activeModal === true ? 'show' : ''
              }`}
              style={
                activeModal === true
                  ? { display: 'block' }
                  : { display: 'none' }
              }
              id="exampleModalCenter"
              tabIndex="-1"
              role="dialog"
              aria-labelledby="exampleModalCenterTitle"
              aria-modal="true"
            >
              <div
                className="modal-dialog modal-dialog-centered"
                role="document"
              >
                <div className="modal-content modal-container">
                  <div className="popup-block" id="popup">
                    <div className="popup-container">
                      <div className="popup-content">
                        <span
                          className="close"
                          label="close"
                          role="button"
                          tabIndex="0"
                          onClick={this.handleModal}
                          onKeyDown={this.handleModal}
                          data-toggle="modal"
                          data-target="#exampleModalCenter"
                        />
                        <span className="important" />
                        <p className="span_book_15">
                          {filteredDynamicData &&
                            filteredDynamicData[0] &&
                            filteredDynamicData[0].sub_category
                              .description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <LeftSidebarMain
              activeDate={activeDate}
              activeLayer={activeLayer}
              activeIndicator={activeIndicator}
              handleActiveLayer={this.handleActiveLayer}
              handleActiveIndicator={this.handleActiveIndicator}
            />
            <MiddleChartSection
              activeLayer={activeLayer}
              activeDateValues={activeDateValues}
              activeDataType={activeDataType}
              activeDate={activeDate}
              updateChart={updateChart}
              dateRange={dateRange}
              handleSelectAllDate={this.handleSelectAllDate}
              handleSelectAllDateName={this.handleSelectAllDateName}
              handleActiveLayer={this.handleActiveLayer}
              handleOneTimeLayerChange={this.handleOneTimeLayerChange}
              getDateRange={this.getDateRange}
              handleActiveDate={this.handleActiveDate}
              handleModal={this.handleModal}
              handleSelectedDataType={this.handleSelectedDataType}
              handleActiveIndicator={this.handleActiveIndicator}
            />
          </section>
        </main>
      </>
    );
  }
}

const mapStateToProps = ({ logFrameReducer }) => ({
  logFrameReducer,
});
export default connect(mapStateToProps, {})(MainComponent);
