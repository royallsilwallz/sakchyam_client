/* eslint-disable react/no-did-update-set-state */
import React, { Component } from 'react';
import { connect } from 'react-redux';
// import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Header from '../../Header';
import LeftSidebarMain from './LefSideBar/LeftSideBarMain';

import MiddleChartSection from './MiddleChartSection/MiddleChartSection';
import {
  filterIndicatorGraphData,
  filterIndicatorGraphDataWithDate,
  loadingTrue,
  getIndicatorsGraphDataIndividual,
  getIndicatorsGraphData,
} from '../../../actions/logFrame.actions';

let dateArray = [];
let dateArrayValues = [];
function convert(x) {
  // eslint-disable-next-line no-restricted-globals
  if (isNaN(x)) return x;

  if (x < 9999) {
    return x;
  }

  if (x < 1000000) {
    return `${Math.round(x / 1000)}K`;
  }
  if (x < 10000000) {
    return `${(x / 1000000).toFixed(2)}M`;
  }

  if (x < 1000000000) {
    return `${Math.round(x / 1000000)}M`;
  }

  if (x < 1000000000000) {
    return `${Math.round(x / 1000000000)}B`;
  }

  return '1T+';
}
function compare(a, b) {
  // Use toUpperCase() to ignore character casing
  const bandA = a.name.toUpperCase();
  const bandB = b.name.toUpperCase();

  let comparison = 0;
  if (bandA > bandB) {
    comparison = 1;
  } else if (bandA < bandB) {
    comparison = -1;
  }
  return comparison;
}
class MainComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndicator: 'IMPACT',
      activeListFilteredData: [],
      activeLayer: 'Impact Indicator 1',
      activeListItem: '',
      activeDataType: 'Cumulative',
      dateRange: [],
      activeModal: false,
      allIndicatorCategory: null,
      // width: '',
      // height: '',
      // activeIndicator: [],
      activeDate: [],
      activeDateValues: [],
      updateChart: false,
      activeBar1: true,
      activeBar2: true,
      activeLine1: true,
      activeLine2: true,
      activeTimeGraph: true,
      activeBar: true,
      options: null,
    };
  }

  handleActiveListItem = clickedValue => {
    // console.log(clickedValue);

    this.setState({ activeListItem: clickedValue });
  };

  backNavigationClick = () => {
    this.setState({ activeListItem: '' });
  };

  handleSubCatClick = clickeditem => {
    this.handleMainCategorySlide(clickeditem);
    this.setState({ activeLayer: clickeditem });
  };

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

  selectAllDate = () => {
    this.setState({
      activeDateValues: this.props.logFrameReducer.totalRangeDateName,
      activeDate: this.props.logFrameReducer.totalRangeDate,
    });
  };

  handleBarClick = e => {
    const active = e.target.classList.contains('active');
    const activeTimegraph = this.state.activeTimeGraph;
    // this.setState({ activeBar: active });
    this.setState({
      activeBar: active ? (activeTimegraph ? false : true) : true,
    });
    if (this.state.activeBar) {
      // console.log('if activeBar');
      // true === false
      // this.setState({ activeBar1: false, activeBar2: false });
      // this.setState({ activeBar1: false, activeBar2: false });
      if (this.state.activeTimeGraph) {
        this.setState({ activeBar1: false, activeBar2: false });
      }
    } else {
      // console.log('else activeBar');

      // false === true
      if (this.state.activeBar1 || this.state.activeLine1) {
        this.setState({ activeBar1: true });
      }
      if (this.state.activeBar2 || this.state.activeLine2) {
        this.setState({ activeBar2: true });
      }
    }
  };

  handleTimeGraphClick = e => {
    const active = e.target.classList.contains('active');
    const activeBarState = this.state.activeBar;
    // this.setState({ activeTimeGraph: active });
    this.setState({
      activeTimeGraph: active
        ? activeBarState
          ? false
          : true
        : true,
    });
    if (this.state.activeTimeGraph) {
      // true === false
      // this.setState({ activeLine1: false, activeLine2: false });
      if (this.state.activeBar) {
        this.setState({ activeLine1: false, activeLine2: false });
      }
    } else {
      // false === true
      if (this.state.activeBar1 || this.state.activeLine1) {
        this.setState({ activeLine1: true });
      }
      if (this.state.activeBar2 || this.state.activeLine2) {
        this.setState({ activeLine2: true });
      }
    }
    // console.log(this.state.activeTimeGraph, 'a');
    // console.log(this.state.activeBar, 'b');
  };

  handleActiveDate = (value, e, item) => {
    const {
      dateRange,
      totalRangeDate,
      totalRangeDateName,
    } = this.props.logFrameReducer;
    const { activeDate, activeDateValues } = this.state;
    // console.log(item);
    // console.log(value, 'value');
    dateArray = [];
    dateArrayValues = [];
    if (value === 'All') {
      // alert('all click');
      // if (!activeDate.length >= 6 || activeDate.length === 0) {
      if (e.target.checked === true) {
        // dateArray.push('All');
        // alert('xirtyo');
        totalRangeDate.map(data => {
          dateArray.push(data);

          // dateArrayValues.push(data.name);
          return true;
        });
        totalRangeDateName.map(data => {
          dateArrayValues.push(data);

          // dateArrayValues.push(data.name);
          return true;
        });
        // dateArrayValues.push('All');
        this.setState({
          activeDate: dateArray,
          activeDateValues: dateArrayValues,
          // isSiteTypeSelected: true,
          // filterLegendSelection: 'site_type',
        });
      } else {
        // alert('else');
        // dateArrayValues.push('Nothing Selected');
        this.setState({
          activeDate: [],
          activeDateValues: [],
          // isSiteTypeSelected: true,
          // filterLegendSelection: 'site_type',
        });
      }
    } else {
      const totalActiveDateLength = activeDate.length + 1;
      if (totalActiveDateLength === totalRangeDate.length) {
        dateArray = [];
        dateArrayValues = totalRangeDateName;
        dateArray = activeDate;
        // dateArray.push('All');
        this.setState({
          activeDate: dateArray,
          activeDateValues: dateArrayValues,
        });
      }
      const isSiteChecked = e.target.checked;
      if (isSiteChecked === true) {
        const joined = activeDate.concat(value);
        const joinedName = activeDateValues.concat(item);
        joined.sort();
        this.setState({
          activeDate: joined,
          activeDateValues: joinedName,
          // isSiteTypeSelected: true,
          // filterLegendSelection: 'site_type',
        });
      } else {
        const filteredData = activeDate.filter(
          data => data !== value,
        );
        const filteredDataName = activeDateValues.filter(
          data => data !== item,
        );
        // if (filteredData.includes('All')) {
        //   filteredData = filteredData.filter(f => f !== 'All');
        // }
        filteredData.sort();
        this.setState({
          activeDate: filteredData,
          activeDateValues: filteredDataName,
        });
      }
    }
  };
  // handleActiveDate = (e, element) => {
  //   const { dateRange } = this.props.logFrameReducer;
  //   const { updateChart } = this.state;
  //   console.log(element.target.checked, 'checked');
  //   if (e === 'All' && element.target.checked === true) {
  //     const {
  //       logFrameReducer: { totalRangeDate, totalRangeDateName },
  //     } = this.props;
  //     alert('if');
  //     dateArray = [];
  //     dateArrayValues = [];
  //     dateRange.map(data => {
  //       dateArray.push(data.range);
  //       dateArrayValues.push(data.name);
  //       return true;
  //     });
  //     dateArray.push('All');
  //     this.setState({ updateChart: !updateChart });

  //     // console.log(this.props.logFrameReducer.totalDateRange);
  //     // return this.setState({
  //     //   activeDate: totalRangeDate,
  //     //   activeDateValues: totalRangeDateName,
  //     // });
  //   } else if (e === 'All' && element.target.checked === false) {
  //     alert('else if');
  //     dateArray = [];
  //     dateArrayValues = [];
  //     this.setState({ updateChart: !updateChart });
  //   } else {
  //     alert('else');
  //     // dateArray = [];
  //     // dateArrayValues = [];
  //     console.log('false check');
  //     console.log(
  //       this.props.logFrameReducer.totalRangeDateName.length,
  //       '1props',
  //     );
  //     console.log(dateArrayValues.length, '2state');
  //     const totalLengthOfRangeDateName = dateArrayValues + 1;
  //     // if (dateArray.includes('All')) {
  //     //   dateArray = dateArray.filter(f => f !== 'All');
  //     // } else
  //     if (totalLengthOfRangeDateName === dateArrayValues.length) {
  //       console.log('push ALl if equal');
  //       dateArray.push('All');
  //     } else if (dateArray.includes('All')) {
  //       dateArray = dateArray.filter(f => f !== 'All');
  //     }
  //     // push uniques
  //     const collator = new Intl.Collator(undefined, {
  //       numeric: true,
  //       sensitivity: 'base',
  //     });

  //     const dateFilteredObj = dateRange.filter(
  //       filteredData => filteredData.range === e,
  //     );
  //     this.setState({ updateChart: !updateChart });
  //     if (dateArray.indexOf(e) === -1) {
  //       dateArray.push(e);
  //       dateArrayValues.push(dateFilteredObj[0].name);
  //     } else {
  //       dateArray = dateArray.filter(f => f !== e);
  //       dateArrayValues = dateArrayValues.filter(
  //         g => g !== dateFilteredObj[0].name,
  //       );
  //     }
  //     dateArray.sort();
  //     // dateArrayValues.sort();
  //     dateArrayValues.sort(collator.compare);
  //     if (dateArray.length === 0) {
  //       // console.log(dateRange);
  //       dateRange.map(data => {
  //         dateArray.push(data.range);
  //         dateArrayValues.push(data.name);
  //         return true;
  //       });
  //       dateArray.push('All');

  //       // console.log(allDateRange);
  //     }
  //   }
  //   this.setState({
  //     activeDate: dateArray,
  //     activeDateValues: dateArrayValues,
  //   });
  //   // this.setState({ activeDate: e });
  // };

  handleArrowClick = () => {
    window.scrollTo(0, this.headRef.current);
    window.scrollTo({
      top: this.headRef.current,
      left: 0,
      behavior: 'smooth',
    });
  };

  updateScrollResponsive = () => {
    // const windowPos = window.pageYOffset;
    // if (windowPos >= 200) {
    //   document
    //     .querySelector('.content .sidebar')
    //     .classList.add('sidebar-sticky');
    //   document
    //     .querySelector('.content .info-content')
    //     .classList.add('sticky-content');
    //   document.querySelector('body').classList.add('scroll-event');
    // } else {
    //   document
    //     .querySelector('.content .sidebar')
    //     .classList.add('sidebar-sticky');
    //   document
    //     .querySelector('.content .info-content')
    //     .classList.remove('sticky-content');
    //   document.querySelector('body').classList.remove('scroll-event');
    // }
    // const a =
    // if (windowPos >= 50) {
    //   document.querySelector('body').classList.add('scroll-event');
    // } else {
    //   document.querySelector('body').classList.remove('scroll-event');
    // }
    // const $contetntY = $('.content').offset().top;
    // console.log($contetntY);
    // if ($contetntY > 0) {
    //   $('body').addClass('scroll-event');
    // } else {
    //   $('body').removeClass('scroll-event');
    // }

    const contentEl = document.getElementsByClassName('content')[0]
      .offsetTop;
    if (contentEl > 0) {
      document.querySelector('body').classList.add('scroll-event');
    } else {
      document.querySelector('body').classList.remove('scroll-event');
    }
    // console.log(contentEl, 'contentoffset');
  };

  componentDidMount() {
    // console.log(document.getElementsByClassName('apexcharts-menu-icon')[0].title =
    //   'Export';
    this.updateWindowDimensions();

    window.addEventListener('resize', this.updateWindowDimensions);
    window.addEventListener('scroll', this.updateScrollResponsive);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
    window.removeEventListener('scroll', this.updateScrollResponsive);
  }

  handleModal = () => {
    // console.log('statemodal', this.state.activeModal);
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
    // document.getElementsByClassName('apexcharts-menu-icon')[0].title =
    //   'Export';
    // if (
    //   document.getElementsByClassName('apexcharts-legend-text')[3]
    // ) {
    //   document.getElementsByClassName(
    //     'apexcharts-legend-text',
    //   )[3].innerText = document
    //     .getElementsByClassName('apexcharts-legend-text')[3]
    //     .innerText.replace('Line', '');
    // }
    // document.getElementsByClassName(
    //   'apexcharts-legend-series',
    // )[1].style.display = 'none';
    // document.getElementsByClassName(
    //   'apexcharts-legend-series',
    // )[2].style.display = 'none';
    // console.log(screen.height, 'screen');
    // console.log(window.height, 'windowheight');
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

  // eslint-disable-next-line camelcase

  componentDidUpdate(prevProps, prevState) {
    const { activeListItem, activeListFilteredData } = this.state;
    if (prevState.activeListItem !== activeListItem) {
      // console.log(activeListItem, 'change active List');
      const { indicatorCategory } = this.props.logFrameReducer;
      const filteredData = indicatorCategory.filter(
        data => data.name === activeListItem,
      );
      // console.log(filteredData[0]);
      if (filteredData && filteredData[0]) {
        filteredData[0].subcat.sort(compare);
      }
      // console.log(filteredData[0].subcat.sort(compare));
      // const collator = new Intl.Collator(undefined, {
      //   numeric: true,
      //   sensitivity: 'base',
      // });
      // console.log(filteredData[0].subcat.sort(collator.compare));
      // console.log(
      //   filteredData[0].subcat.sort(function(a, b) {
      //     console.log(a.name);
      //     console.log(b.name);
      //     return a.name - b.name;
      //   }),
      // );
      this.setState({ activeListFilteredData: filteredData });
    }

    if (document.getElementsByClassName('apexcharts-menu-icon')[0]) {
      document.getElementsByClassName(
        'apexcharts-menu-icon',
      )[0].title = 'Export';
    }
    const { activeLayer, activeDate } = this.state;
    if (prevState.activeLayer !== activeLayer) {
      // eslint-disable-next-line react/no-did-update-set-state
      // this.setState({
      //   activeBar: true,
      //   activeBar1: true,
      //   activeBar2: true,
      //   activeLine1: true,
      //   activeLine2: true,
      //   activeTimeGraph: true,
      // });
      // this.filterDataWithLayer();
      if (activeDate.length === 0) {
        // console.log('if active layer changed');
        this.props.filterIndicatorGraphData(activeLayer);
      } else {
        // console.log('else active layer changed');

        this.props.filterIndicatorGraphDataWithDate(
          activeLayer,
          activeDate,
        );
      }

      // console.log('xxxss');
      // setTimeout(function() {

      //   console.log('setTimeout');
      // }, 3000);
    }
    const { activeDataType } = this.state;
    if (prevState.activeDate !== activeDate) {
      // eslint-disable-next-line react/no-did-update-set-state
      // this.setState({
      //   activeBar: true,
      //   activeBar1: true,
      //   activeBar2: true,
      //   activeLine1: true,
      //   activeLine2: true,
      //   activeTimeGraph: true,
      // });
      // eslint-disable-next-line react/no-did-update-set-state
      // this.setState({
      //   activeBar1: true,
      //   activeBar2: true,
      //   activeLine1: true,
      //   activeLine2: true,
      // });
      this.props.filterIndicatorGraphDataWithDate(
        activeLayer,
        activeDate,
      );
    }
    if (prevState.activeDataType !== activeDataType) {
      this.props.loadingTrue();
      // eslint-disable-next-line react/no-did-update-set-state
      // this.setState({
      //   activeBar1: true,
      //   activeBar2: true,
      //   activeLine1: true,
      //   activeLine2: true,
      //   activeBar: true,
      //   activeTimeGraph: true,
      // });
      // console.log(activeDataType, 'change datatype');
      if (activeDataType === 'Individual') {
        if (activeDate.length === 0) {
          this.props.getIndicatorsGraphDataIndividual(
            activeLayer,
            false,
          );
        } else {
          this.props.getIndicatorsGraphDataIndividual(
            activeLayer,
            activeDate,
          );
        }
        // this.filterDataWithLayer();
      } else if (activeDate.length === 0) {
        // if (activeDate.length === 0) {
        this.props.getIndicatorsGraphData(activeLayer, false);
      } else {
        this.props.getIndicatorsGraphData(activeLayer, activeDate);
      }
      // } else {
      //   this.props.getIndicatorsGraphData(activeLayer, activeDate);
      // }
      // this.props.getIndicatorsGraphData(activeLayer, activeDate);
      // this.filterDataWithLayer();
      // }
    }
    const {
      logFrameReducer: { indicatorCategory },
    } = this.props;
    if (
      prevProps.logFrameReducer.indicatorCategory !==
      indicatorCategory
    ) {
      // this.filterDataWithLayer();
      const b = [];
      const a = indicatorCategory.map(data => {
        data.subcat.map(subdata => {
          return b.push(subdata.name);
        });
        return true;
      });
      const collator = new Intl.Collator(undefined, {
        numeric: true,
        sensitivity: 'base',
      });
      b.sort(collator.compare);
      // console.log(b);
      this.allIndicatorCategorySetState(b);
      // this.props.filterIndicatorGraphData(activeLayer);
    }
  }

  nextBtnClick = () => {
    // this.setState({
    //   activeBar: true,
    //   activeTimeGraph: true,
    //   activeBar1: true,
    //   activeBar2: true,
    //   activeLine1: true,
    //   activeLine2: true,
    // });
    // console.log(
    //   this.props.logFrameReducer.indicatorCategory.map(a => {
    //     a.subcat.filter(data => data.name === 'Impact Indicator 2');
    //   }),
    //   'filtered data',
    // );

    const activeLayerIndex = this.state.allIndicatorCategory.indexOf(
      this.state.activeLayer,
    );
    const totalNumberofIndex = this.state.allIndicatorCategory.length;
    // console.log(totalNumberofIndex, 'totalnumberindex');
    const addedNumberIndex = activeLayerIndex + 1;
    if (addedNumberIndex < totalNumberofIndex) {
      // console.log(totalNumberofIndex, 'totalNumber index if');
      // console.log(addedNumberIndex, 'activeLayer + 1 index if');
      // console.log('error');
      this.handleActiveLayer(
        this.state.allIndicatorCategory[addedNumberIndex],
      );

      this.handleMainCategorySlide(
        this.state.allIndicatorCategory[addedNumberIndex],
      );
      // const b = this.props.logFrameReducer.indicatorCategory.map(
      //   a => {
      //     a.subcat.filter(b => {
      //       if (b.name === this.props.activeLayer) {
      //         return this.props.handleActiveIndicator(a.name);
      //       }
      //     });
      //   },
      // );
      // console.log(b, 'bbbb');
      // } else if (addedNumberIndex >= totalNumberofIndex) {
    } else {
      // console.log(totalNumberofIndex, 'totalNumber index else if');
      // console.log(addedNumberIndex, 'activeLayer + 1 index else if');
      this.handleActiveLayer(this.state.allIndicatorCategory[0]);
      this.handleMainCategorySlide(
        this.state.allIndicatorCategory[0],
      );
    }
    // this.props.handleSelectAllDate(
    //   this.props.logFrameReducer.totalRangeDate,
    // );
    // this.props.handleSelectAllDateName(
    //   this.props.logFrameReducer.totalRangeDateName,
    // );
  };

  allIndicatorCategorySetState = array => {
    this.setState({ allIndicatorCategory: array });
  };

  prevBtnClick = () => {
    // this.setState({
    //   activeBar: true,
    //   activeTimeGraph: true,
    //   activeBar1: true,
    //   activeBar2: true,
    //   activeLine1: true,
    //   activeLine2: true,
    // });
    const activeLayerIndex = this.state.allIndicatorCategory.indexOf(
      this.state.activeLayer,
    );
    const totalNumberofIndex = this.state.allIndicatorCategory.length;
    const subtractNumberIndex = activeLayerIndex - 1;
    if (
      subtractNumberIndex < totalNumberofIndex &&
      subtractNumberIndex >= 0
    ) {
      this.handleActiveLayer(
        this.state.allIndicatorCategory[subtractNumberIndex],
      );
      this.handleMainCategorySlide(
        this.state.allIndicatorCategory[subtractNumberIndex],
      );
    } else {
      this.handleActiveLayer(
        this.state.allIndicatorCategory[totalNumberofIndex - 1],
      );
      this.handleMainCategorySlide(
        this.state.allIndicatorCategory[totalNumberofIndex - 1],
      );
    }
  };

  handleMainCategorySlide = selectedValue => {
    this.props.logFrameReducer.indicatorCategory.map(a => {
      a.subcat.filter(b => {
        if (b.name === selectedValue) {
          return this.handleActiveIndicator(a.name);
        }
        return true;
      });
      return true;
    });
  };

  handleLegend1Click = () => {
    if (this.state.activeBar1 === true) {
      this.setState({
        activeBar1: false,
        // activeLine2: false,
      });
    } else if (this.state.activeBar) {
      this.setState({
        activeBar1: true,
        // activeLine2: false,
      });
    }
    if (this.state.activeLine1 === true) {
      this.setState({
        activeLine1: false,
      });
    } else if (this.state.activeTimeGraph) {
      this.setState({
        activeLine1: true,
        // activeLine2: false,
      });
    }
  };

  handleLegend2Click = () => {
    if (this.state.activeBar2 === true) {
      this.setState({
        activeBar2: false,
        // activeLine2: false,
      });
    } else if (this.state.activeBar) {
      this.setState({
        activeBar2: true,
        // activeLine2: false,
      });
    }
    if (this.state.activeLine2 === true) {
      this.setState({
        activeLine2: false,
      });
    } else if (this.state.activeTimeGraph) {
      this.setState({
        activeLine2: true,
        // activeLine2: false,
      });
    }
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
      activeBar,
      activeTimeGraph,
      activeBar1,
      activeBar2,
      activeLine1,
      activeLine2,
      options,
      activeListItem,
      activeListFilteredData,
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
              activeListItem={activeListItem}
              handleActiveListItem={this.handleActiveListItem}
              activeListFilteredData={activeListFilteredData}
              backNavigationClick={this.backNavigationClick}
              handleSubCatClick={this.handleSubCatClick}
              activeDate={activeDate}
              activeLayer={activeLayer}
              activeIndicator={activeIndicator}
              handleActiveLayer={this.handleActiveLayer}
              handleActiveIndicator={this.handleActiveIndicator}
            />
            <MiddleChartSection
              // key={`chart${activeLine1}${activeLine2}${activeBar}${activeTimeGraph}`}
              // chartRef={arg => {
              //   this.chartRef = arg;
              // }}
              prevBtnClick={this.prevBtnClick}
              nextBtnClick={this.nextBtnClick}
              options={options}
              activeBar={activeBar}
              activeTimeGraph={activeTimeGraph}
              activeBar1={activeBar1}
              activeBar2={activeBar2}
              activeLine1={activeLine1}
              activeLine2={activeLine2}
              handleBarClick={this.handleBarClick}
              handleTimeGraphClick={this.handleTimeGraphClick}
              handleLegend1Click={this.handleLegend1Click}
              handleLegend2Click={this.handleLegend2Click}
              selectAllDate={this.selectAllDate}
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
export default connect(mapStateToProps, {
  filterIndicatorGraphData,
  filterIndicatorGraphDataWithDate,
  loadingTrue,
  getIndicatorsGraphDataIndividual,
  getIndicatorsGraphData,
})(MainComponent);
