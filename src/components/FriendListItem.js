import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';
import styles from './FriendListItem.css';
import { Checkbox } from '.';

class FriendListItem extends Component {

  render() {
    const { id, gender, name } = this.props;
    return (
      <li className={styles.friendListItem}>
        <div className={styles.friendInfos}>
          <div><span>{name}</span></div>
          <div>
            <small>xx friends in common</small>
          </div>
          <div className={'checkbox-container'}>
            <Checkbox name={`gender-${id}`} label={'male'} onChange={()=>this.props.selectGender(id, 0)} selected={gender === 0} />
            <Checkbox name={`gender-${id}`} label={'female'} onChange={()=>this.props.selectGender(id, 1)} selected={gender === 1} />
          </div>
        </div>
        <div className={styles.friendActions}>
          <button className={`btn btn-default ${styles.btnAction}`}
                  onClick={() => this.props.starFriend(id)}>
            <i className={classnames('fa', {
              'fa-star': this.props.starred,
              'fa-star-o': !this.props.starred
            })} />
          </button>
          <button className={`btn btn-default ${styles.btnAction}`}
                  onClick={() => this.props.deleteFriend(id)}>
            <i className="fa fa-trash" />
          </button>
        </div>
      </li>
    );
  }

}

FriendListItem.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  starred: PropTypes.bool,
  starFriend: PropTypes.func.isRequired
};

export default FriendListItem
