import React, { Component } from 'react';
import PropTypes from 'prop-types';
import  './Pagination.css';

/**
 * @name Pagination
 * @class
 * @description
 * Pagination component
 * @Props: totalCount, resultPerPage, pageRange, currentPage, handlePageChange
 */
export default class Pagination extends Component{
  /* Initial variables */
  totalPages = Math.ceil(this.props.totalCount / this.props.resultPerPage);
  pageToDisplay = this.totalPages > this.props.pageRange? this.props.pageRange : this.totalPages;
  state = {
    firstPage: 1,
    lastPage: this.pageToDisplay,
  }

  /**
   * @name componentWillReceiveProps
   * @description
   * It will update the page number whenver data is added / deleted
   */
  componentWillReceiveProps(nextProps){
    let { handlePageChange, pageRange } = this.props;
    const { lastPage } = this.state;

    if(this.props.totalCount === nextProps.totalCount){
      return null
    }

    this.totalPages = Math.ceil(nextProps.totalCount / nextProps.resultPerPage);
    this.pageToDisplay = this.totalPages > nextProps.pageRange? nextProps.pageRange : this.totalPages;
    if(lastPage > this.totalPages){
      const newPage = this.totalPages;
      handlePageChange(newPage);
      this.setState({
        firstPage: (this.totalPages + 1) - pageRange,
        lastPage: this.totalPages,
      });
    }
    if( this.totalPages <= this.props.pageRange){
      this.setState({
        firstPage: 1,
        lastPage: this.pageToDisplay,
      });
    }
  }

  /**
   * @name handleClickNext
   * @description
   * Will select next page in the list
   */
  handleClickNext = (pageNum)=> {
    const { handlePageChange } = this.props;
    let { firstPage, lastPage } = this.state;
    if(pageNum > lastPage){
      this.setState({
        firstPage: ++firstPage,
        lastPage: ++lastPage,
      })
    }
    handlePageChange(pageNum);
  };

  /**
   * @name handleClickPrev
   * @description
   * Will select next page in the list
   */
  handleClickPrev = (pageNum)=> {
    const { handlePageChange } = this.props;
    let { firstPage, lastPage } = this.state;
    if(pageNum < firstPage){
      this.setState({
        firstPage: --firstPage,
        lastPage: --lastPage,
      })
    }
    handlePageChange(pageNum);
  }

  /**
   * @name changePage
   * @description
   * It will jump to the page number.
   */
  changePage = (pageNum)=> {
    const { handlePageChange } = this.props;
    handlePageChange(pageNum);
  }

  /**
   * @name handleClickPrev
   * @description
   * Display the pagination on the page.
   */
  renderPages = ()=> {
    const { firstPage, lastPage } = this.state;
    const { currentPage } = this.props;
    const pages = [];
    for(let i = firstPage; i<= lastPage;i++){
      pages.push(<li key={i} className={currentPage===i ? 'active' : ''}>
        <button className={'page-link'} onClick={()=>this.changePage(i)}>{i}</button>
      </li>)
    }
    return pages;
  }

  render(){
    let { currentPage, totalCount, resultPerPage } = this.props;
    if(totalCount <= resultPerPage){
      return null
    }

    this.totalPages = Math.ceil(this.props.totalCount / this.props.resultPerPage);
    this.pageToDisplay = this.totalPages > this.props.pageRange? this.props.pageRange : this.totalPages;
    return (
      <nav className={'pagination-wpr clearfix'}>
        <div className={'total-pages'}>Total pages: {this.totalPages}</div>
        <ul className="pagination pull-right">
          <li className="page-item">
            <button disabled={currentPage === 1} onClick={()=>this.handleClickPrev(--currentPage)}><i className={'fa fa-chevron-left'} /></button>
          </li>
          { this.renderPages()}
          <li>
            <button onClick={()=>this.handleClickNext(++currentPage)} disabled={this.totalPages === currentPage}><i className={'fa fa-chevron-right'} /></button>
          </li>

        </ul>
      </nav>
    );
  }
}

Pagination.propTypes = {
  currentPage: PropTypes.number,
  resultPerPage: PropTypes.number,
  pageRange: PropTypes.number,
  totalCount: PropTypes.number,
  handlePageChange: PropTypes.func,
  dataLength: PropTypes.number,
};

Pagination.defaultProps = {
  currentPage: 1,
  resultPerPage: 2,
  pageRange: 5,
  totalCount: 0,
  handlePageChange: ()=> {},
  dataLength: 0,
};


