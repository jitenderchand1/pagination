import React from 'react';
import PropTypes from "prop-types";
import './Checkbox.css';

export default class Checkbox extends React.PureComponent {
    render() {
        const { label, selected } = this.props;
        return (
            <label className="custom-radio">
                <input type="radio" checked={selected} {...this.props} />
                    <span>{label}</span>
            </label>
        )
    };
};

Checkbox.propTypes = {
  name: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  label: PropTypes.string,
  selected: PropTypes.bool,
};

Checkbox.defaultProps = {
  name: '',
  value: '',
  label: '',
  selected: false,
};