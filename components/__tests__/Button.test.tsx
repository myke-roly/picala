import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Button } from '../core/Button/Button';

describe('Button Component', () => {
  it('renders correctly with default props', () => {
    const { getByText } = render(<Button title="Click Me" onPress={() => { }} />);
    const buttonText = getByText('Click Me');
    expect(buttonText).toBeTruthy();
  });

  it('renders with different variants', () => {
    const { getByText, rerender } = render(<Button title="Primary" variant="primary" onPress={() => { }} />);
    expect(getByText('Primary')).toBeTruthy();

    rerender(<Button title="Secondary" variant="secondary" onPress={() => { }} />);
    expect(getByText('Secondary')).toBeTruthy();

    rerender(<Button title="Danger" variant="danger" onPress={() => { }} />);
    expect(getByText('Danger')).toBeTruthy();
  });

  it('renders with different sizes', () => {
    const { getByText, rerender } = render(<Button title="Small" size="small" onPress={() => { }} />);
    expect(getByText('Small')).toBeTruthy();

    rerender(<Button title="Large" size="large" onPress={() => { }} />);
    expect(getByText('Large')).toBeTruthy();
  });

  it('shows loading indicator when loading prop is true', () => {
    const { queryByText } = render(<Button title="Loading" loading onPress={() => { }} />);
    // Note: ActivityIndicator doesn't have a default testID, so we check if text is hidden or indicator is present
    // In this component implementation, text is replaced by ActivityIndicator
    expect(queryByText('Loading')).toBeNull();
  });

  it('handles onPress events', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(<Button title="Press Me" onPress={onPressMock} />);

    fireEvent.press(getByText('Press Me'));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it('does not fire onPress when disabled', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(<Button title="Disabled" disabled onPress={onPressMock} />);

    fireEvent.press(getByText('Disabled'));
    expect(onPressMock).not.toHaveBeenCalled();
  });
});
