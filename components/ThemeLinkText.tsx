import { Pressable, StyleSheet } from 'react-native';
import { Text, type CustomTextProps } from './Text';
import { Link, type Href } from 'expo-router';

type ThemeLinkTextProps = CustomTextProps & {
  href?: Href;
  onPress?: () => void;
  center?: boolean;
};

export function ThemeLinkText({ style, href, onPress, center = false, children, ...rest }: ThemeLinkTextProps) {
  const content = (
    <Text variant="link" style={[style]} {...rest}>
      {children}
    </Text>
  );

  const centerStyle = center ? styles.centerContainer : undefined;

  if (href) {
    return (
      <Link href={href} asChild>
        <Pressable style={({ pressed }) => [centerStyle, pressed && { opacity: 0.7 }]}>{content}</Pressable>
      </Link>
    );
  }

  return (
    <Pressable style={({ pressed }) => [centerStyle, pressed && { opacity: 0.7 }]} onPress={onPress}>
      {content}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  centerContainer: {
    alignSelf: 'center',
  },
});
