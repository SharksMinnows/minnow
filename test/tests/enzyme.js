import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() })

import List from '../../client/components/Board/List.jsx';

describe('React unit tests', () => {
  describe('<List test', () => {

    it('Renders list-items', () => {
      const items = ['one', 'two', 'three'];
      const wrapper = shallow(<List items={items} />);

      expect(wrapper.find('.list-items')).toBeDefined();
      expect(wrapper.find('.item')).toHaveLength(items.length);
      expect(wrapper.contains(<li key='one' className='item'>one</li>)).toBeTruthy();
      expect(wrapper.find('.item').get(2).props.children).toEqual('three');
      expect(wrapper.hasClass('list-items'));
    });
  });
});
