import React from 'react';
import { expect } from 'chai';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() })

import Board from '../../client/components/Board/Board.jsx';

describe('React unit tests', () => {
  describe('<Board />', () => {
    let wrapper = shallow(<Board/>);

    it('Renders a <canvas> with the class board', () => {
      expect(wrapper.hasClass('board'));
      expect(wrapper.type()).equal('canvas');
    });

  });
});
