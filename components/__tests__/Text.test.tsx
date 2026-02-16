import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { Text } from '@/components';

describe('Text Component', () => {
  it('renders with default props', () => {
    const { toJSON } = render(<Text>Hello World</Text>);
    const text = screen.getByText('Hello World');

    expect(text).toBeTruthy();
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders with header variants', () => {
    const { toJSON } = render(<Text variant="h1">Title Text</Text>);
    const text = screen.getByText('Title Text');
    expect(text).toBeTruthy();
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders with body variants', () => {
    const { toJSON } = render(<Text variant="body">Body Text</Text>);
    const text = screen.getByText('Body Text');
    expect(text).toBeTruthy();
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders with caption variants', () => {
    const { toJSON } = render(<Text variant="caption">Caption Text</Text>);
    const text = screen.getByText('Caption Text');
    expect(text).toBeTruthy();
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders with center alignment', () => {
    const { toJSON } = render(<Text center>Centered Text</Text>);
    const text = screen.getByText('Centered Text');
    expect(text).toBeTruthy();
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders with weight styling', () => {
    const { toJSON } = render(<Text weight="bold">Bold Text</Text>);
    const text = screen.getByText('Bold Text');
    expect(text).toBeTruthy();
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders with custom color', () => {
    const { toJSON } = render(<Text color="#ff0000">Colored Text</Text>);
    const text = screen.getByText('Colored Text');
    expect(text).toBeTruthy();
    expect(toJSON()).toMatchSnapshot();
  });

  it('combines multiple props', () => {
    const { toJSON } = render(
      <Text variant="h1" color="primary" center weight="bold">
        Combined Props Text
      </Text>
    );
    const text = screen.getByText('Combined Props Text');
    expect(text).toBeTruthy();
    expect(toJSON()).toMatchSnapshot();
  });
});
