import React from 'react';
import Pagination  from './Pagination';
import { shallow } from 'enzyme';


describe('<Pagination />', () => {
  let component;
  let instance;
  let handlePageChangeMock = jest.fn();

  beforeEach(() => {
    handlePageChangeMock.mockReset();
    component = shallow(
      <Pagination handlePageChange={handlePageChangeMock} pageRange={5} resultPerPage={2} totalCount={9} />,
    );
    instance = component.instance();
  });

  test('componentWillReceiveProps- update state when item delete from the list', () => {
    component.setState({
      firstPage: 6,
      lastPage: 11,
    });
    component.setProps({
      totalCount: 10,
    });
    expect(handlePageChangeMock.mock.calls.length).toBe(1);
    expect(instance.state.firstPage).toBe(1);
    expect(instance.state.lastPage).toBe(5);

  });

  test('componentWillReceiveProps- update page number when item delete from the list', () => {
    component.setState({
      firstPage: 6,
      lastPage: 11,
    });
    component.setProps({
      totalCount: 8,
    });
    expect(instance.state.firstPage).toBe(1);
    expect(instance.state.lastPage).toBe(4);

  });

  test('handleClickNext should not alter state', () => {
    component.setState({
      firstPage: 1,
      lastPage: 3,
    });
    instance.handleClickNext(3);
    expect(handlePageChangeMock.mock.calls.length).toBe(1);
    expect(instance.state.firstPage).toBe(1);
    expect(instance.state.lastPage).toBe(3);
  });

  test('handleClickNext should update state', () => {
    component.setState({
      firstPage: 1,
      lastPage: 3,
    });
    instance.handleClickNext(4);
    expect(handlePageChangeMock.mock.calls.length).toBe(1);
    expect(instance.state.firstPage).toBe(2);
    expect(instance.state.lastPage).toBe(4);
  });

  test('handleClickPrev should not alter state', () => {
    component.setState({
      firstPage: 1,
      lastPage: 3,
    });
    instance.handleClickPrev(3);
    expect(handlePageChangeMock.mock.calls.length).toBe(1);
    expect(instance.state.firstPage).toBe(1);
    expect(instance.state.lastPage).toBe(3);
  });

  test('handleClickPrev should update state', () => {
    component.setState({
      firstPage: 4,
      lastPage: 6,
    });
    instance.handleClickPrev(3);
    expect(handlePageChangeMock.mock.calls.length).toBe(1);
    expect(instance.state.firstPage).toBe(3);
    expect(instance.state.lastPage).toBe(5);

  });

  test('changePage check', () => {
    instance.changePage(3);
    expect(handlePageChangeMock.mock.calls.length).toBe(1);
  });

  test('changePage check', () => {
    component.setState({
      firstPage: 1,
      lastPage: 5,
    });
    const output = instance.renderPages();
    expect(output.length).toBe(5);
  });

  test('changePage check 2', () => {
    component.setState({
      firstPage: 3,
      lastPage: 5,
    });
    const output = instance.renderPages();
    expect(output.length).toBe(3);
  });

});
