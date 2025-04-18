import * as React from 'react';
import renderer from 'react-test-renderer';

import { ThemedText } from '../ThemedText';

describe('ThemedText', () => {
  it('renders correctly with default props', () => {
    const tree = renderer.create(<ThemedText>Snapshot test!</ThemedText>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with center prop', () => {
    const tree = renderer.create(<ThemedText center>Centered text</ThemedText>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
