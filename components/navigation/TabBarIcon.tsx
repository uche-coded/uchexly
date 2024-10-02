// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/

import { Ionicons, Fontisto, FontAwesome6 } from '@expo/vector-icons';
import { type IconProps } from '@expo/vector-icons/build/createIconSet';
import { type ComponentProps } from 'react';

export function IonicTabBarIcon({ style, ...rest }: IconProps<ComponentProps<typeof Ionicons>['name']>) {
  return <Ionicons size={28} style={[{ marginBottom: -3 }, style]} {...rest} />;
}

export function FontistoIcon({ style, ...rest }: IconProps<ComponentProps<typeof Fontisto>['name']>) {
  return <Fontisto size={28} style={[{ marginBottom: -3 }, style]} {...rest} />;
}

export function FontAwesomeIcon({ style, ...rest }: IconProps<ComponentProps<typeof FontAwesome6>['name']>) {
  return <FontAwesome6 size={28} style={[{ marginBottom: -3 }, style]} {...rest} />;
}