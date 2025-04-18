import { TouchableOpacity, StyleSheet } from 'react-native';
import { ThemedText, type ThemedTextProps } from './ThemedText';
import { Link, type Href } from 'expo-router';

type ThemeLinkTextProps = ThemedTextProps & {
  href?: Href;
  onPress?: () => void;
  center?: boolean;
};

export function ThemeLinkText({ 
  style, 
  href, 
  onPress,
  center = false,
  children, 
  ...rest 
}: ThemeLinkTextProps) {
  const content = (
    <ThemedText
      type="link"
      style={[style]}
      {...rest}
    >
      {children}
    </ThemedText>
  );

  const centerStyle = center ? styles.centerContainer : undefined;

  if (href) {
    return (
      <Link href={href} asChild>
        <TouchableOpacity style={centerStyle}>
          {content}
        </TouchableOpacity>
      </Link>
    );
  }

  return (
    <TouchableOpacity 
      style={centerStyle}
      onPress={onPress}
    >
      {content}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  centerContainer: {
    alignSelf: 'center',
  },
}); 