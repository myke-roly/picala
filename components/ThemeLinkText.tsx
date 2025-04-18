import { TouchableOpacity, StyleSheet } from 'react-native';
import { ThemedText, type ThemedTextProps } from './ThemedText';
import { Link, type Href } from 'expo-router';

type ThemeLinkTextProps = ThemedTextProps & {
  href: Href;
  center?: boolean;
};

export function ThemeLinkText({ 
  style, 
  href, 
  center = false,
  children, 
  ...rest 
}: ThemeLinkTextProps) {
  return (
    <Link href={href} asChild>
      <TouchableOpacity style={center ? styles.centerContainer : undefined}>
        <ThemedText
          type="link"
          style={[styles.link, style]}
          {...rest}
        >
          {children}
        </ThemedText>
      </TouchableOpacity>
    </Link>
  );
}

const styles = StyleSheet.create({
  link: {
    textDecorationLine: 'underline',
  },
  centerContainer: {
    alignSelf: 'center',
  },
}); 