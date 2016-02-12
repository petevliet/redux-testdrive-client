import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import Voting from '../../src/components/Voting';
import {expect} from 'chai';

const {renderIntoDocument, scryRenderedDOMComponentsWithTag, Simulate}
   = TestUtils;

describe('Voting', () => {

   it('renders a pair of buttons', () => {
      const component = renderIntoDocument(
         <Voting pair={["Trainspotting", "28 Days Later"]} />
      );
      const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

      expect(buttons.length).to.equal(2);
      expect(buttons[0].textContent).to.equal('Trainspotting');
      expect(buttons[1].textContent).to.equal('28 Days Later');
   });

   it('invokes a callback when the button is clicked', () => {
      let votedWith;
      const vote = (entry) => votedWith = entry;

      const component = renderIntoDocument(
         <Voting pair={["Armageddon", "Deep Impact"]}
                 vote={vote} />
      );
      const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
      Simulate.click(buttons[0]);

      expect(votedWith).to.equal('Armageddon')
   });

   it('disables buttons when user has voted', () => {
      const component = renderIntoDocument(
         <Voting pair={["Armageddon", "Deep Impact"]}
                 hasVoted="Armageddon" />
      );
      const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

      expect(buttons.length).to.equal(2);
      expect(buttons[0].hasAttribute('disabled')).to.equal(true);
      expect(buttons[1].hasAttribute('disabled')).to.equal(true);
   });

   it('adds label to the voted entry', () => {
      const component = renderIntoDocument(
         <Voting pair={["Armageddon", "Deep Impact"]}
                  hasVoted="Armageddon" />
      );
      const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

      expect(buttons[0].textContent).to.contain('Voted');
   });

   it('renders just the winner when there is one', () => {
      const component = renderIntoDocument(
         <Voting winner="Armageddon" />
      );
      const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

      expect(buttons.length).to.equal(0);

      const winner = ReactDOM.findDOMNode(component.refs.winner);
      expect(winner).to.be.ok;
      expect(winner.textContent).to.contain('Armageddon');
   });
});