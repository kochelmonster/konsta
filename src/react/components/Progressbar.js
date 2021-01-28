import React from 'react';
import { useTheme } from '../shared/use-theme';

const Progressbar = (props) => {
  const {
    tag = 'span',
    className,
    colors: colorsProp,

    // Theme
    ios,
    material,

    progress = 0,
    indeterminate,

    // Children
    children,

    // Rest
    ...rest
  } = props;

  const Component = tag;

  const attrs = {
    ...rest,
  };

  const { themeClasses } = useTheme({ ios, material });

  const colors = {
    bg: 'bg-primary',
    ...colorsProp,
  };

  const c = themeClasses(
    {
      base: {
        initial: `block bg-opacity-30 overflow-hidden`,
        ios: `bg-black h-0.5 rounded`,
        material: `${colors.bg} h-1`,
      },
      inner: {
        initial: `block ${colors.bg} duration-200 w-full h-full`,
      },
    },
    className
  );

  return (
    <Component className={c.base} {...attrs}>
      <span
        className={c.inner}
        style={{ transform: `translateX(-${100 - (progress / 1) * 100}%)` }}
      />
      {children}
    </Component>
  );
};

export default Progressbar;