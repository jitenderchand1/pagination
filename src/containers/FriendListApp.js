import React, { Component } from 'react';
import styles from './FriendListApp.css';
import { connect } from 'react-redux';

import {addFriend, deleteFriend, starFriend, selectGender} from '../actions/FriendsActions';
import { FriendList, AddFriendInput, Pagination } from '../components';

class FriendListApp extends Component {

  state = {
      currentPage: 1,
      resultPerPage: 2,
  }

  pageChangeCallBack = (pageNumber)=> {
      this.setState({
          currentPage: pageNumber,
      });
  }

  render () {
    const { friendlist: { friendsById }} = this.props;
    const { currentPage, resultPerPage } = this.state;
    const actions = {
      addFriend: this.props.addFriend,
      deleteFriend: this.props.deleteFriend,
      starFriend: this.props.starFriend,
      selectGender: this.props.selectGender,
    };
    const lastItem = currentPage * resultPerPage;
    const firstItem = lastItem - resultPerPage;

    const customizedList  = [...friendsById].slice(firstItem, lastItem);
    return (
      <div className={`${styles.friendListApp} clearfix`}>
        <h1>The FriendList</h1>
        <AddFriendInput totalFriends={friendsById.length} addFriend={actions.addFriend} />
        <FriendList friends={customizedList} actions={actions} />
        <Pagination
            handlePageChange={this.pageChangeCallBack}
            totalCount={friendsById.length}
            resultPerPage={resultPerPage}
            currentPage={currentPage}
            pageRange={5}
            dataLength={customizedList.length}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state
}

export default connect(mapStateToProps, {
  addFriend,
  deleteFriend,
  starFriend,
  selectGender,
})(FriendListApp)
