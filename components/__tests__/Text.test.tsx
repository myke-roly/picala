import React from 'react';
import {render, screen} from '@testing-library/react-native';
import {Text} from '../Text';

describe('Text Component', () => {
  it('renders with default props', () => {
    const {toJSON} = render(<Text>Hello World</Text>);
    const text = screen.getByText('Hello World');

    expect(text).toBeTruthy();
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders with title variant', () => {
    const {toJSON} = render(<Text variant="title">Title Text</Text>);
    const text = screen.getByText('Title Text');
    expect(text).toBeTruthy();
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders with subtitle variant', () => {
    const {toJSON} = render(<Text variant="subtitle">Subtitle Text</Text>);
    const text = screen.getByText('Subtitle Text');
    expect(text).toBeTruthy();
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders with different levels', () => {
    const {toJSON} = render(<Text level="lg">Large Text</Text>);
    const text = screen.getByText('Large Text');
    expect(text).toBeTruthy();
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders with center alignment', () => {
    const {toJSON} = render(<Text center>Centered Text</Text>);
    const text = screen.getByText('Centered Text');
    expect(text).toBeTruthy();
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders with strong styling', () => {
    const {toJSON} = render(<Text strong>Strong Text</Text>);
    const text = screen.getByText('Strong Text');
    expect(text).toBeTruthy();
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders with custom color', () => {
    const {toJSON} = render(<Text color="secondary">Colored Text</Text>);
    const text = screen.getByText('Colored Text');
    expect(text).toBeTruthy();
    expect(toJSON()).toMatchSnapshot();
  });

  it('combines multiple props', () => {
    const {toJSON} = render(
      <Text variant="title" level="lg" color="primary" center strong>
        Combined Props Text
      </Text>
    );
    const text = screen.getByText('Combined Props Text');
    expect(text).toBeTruthy();
    expect(toJSON()).toMatchSnapshot();
  });
});
