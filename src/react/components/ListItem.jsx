import React, { useRef } from 'react';
import { cls } from '../shared/cls';
import { useTheme } from '../shared/use-theme';
import { useThemeClasses } from '../shared/use-theme-classes';
import { useTouchRipple } from '../shared/use-touch-ripple';
import ChevronIcon from './icons/ChevronIcon';

const ListItem = (props) => {
  const rippleElRef = useRef(null);

  const {
    component = 'li',
    colors: colorsProp,
    className,
    mediaClassName = '',
    innerClassName = '',
    innerChildren,
    contentClassName = '',
    contentChildren,
    titleWrapClassName = '',

    // Content props
    title,
    subtitle,
    text,
    after,
    media,
    header,
    footer,

    menuListItem,
    menuListItemActive,

    // Enable divider
    divider,
    groupTitle,

    // Title
    strongTitle = 'auto',

    // Label props
    label,

    // Link props
    chevron = true,
    chevronIcon,
    href,
    target,

    link,
    linkComponent = 'a',
    linkProps = {},

    ios,
    material,

    // Children
    children,

    // Rest
    ...rest
  } = props;

  const Component = component;

  const attrs = {
    ...rest,
  };

  const colors = {
    text: 'text-black dark:text-white',
    menuListItemText: 'text-primary dark:text-white',
    menuListItemBg: 'bg-primary',
    ...colorsProp,
  };

  const isMenuListItemActive = menuListItem && menuListItemActive;

  const textColor = isMenuListItemActive
    ? colors.menuListItemText
    : colors.text;

  const theme = useTheme({ ios, material });
  const themeClasses = useThemeClasses({ ios, material });

  const isLink = !!href || href === '' || menuListItem || link;
  const isLabel = !!label;

  const needsTouchRipple = theme === 'material' && (isLabel || isLink);

  useTouchRipple(rippleElRef, needsTouchRipple);

  const c = themeClasses(
    {
      base: menuListItem ? `${textColor} py-1` : '',
      itemContent: {
        common: cls(
          menuListItem ? 'pl-2 mx-2 rounded-lg' : 'pl-4',
          `flex items-center ${contentClassName}`
        ),
        link: cls(
          'duration-300 active:duration-0 active:hairline-transparent cursor-pointer select-none',
          needsTouchRipple &&
            'relative overflow-hidden dark:touch-ripple-white z-10',
          isMenuListItemActive
            ? 'bg-primary bg-opacity-15 dark:bg-primary'
            : 'active:bg-black active:bg-opacity-10 dark-active:bg-white dark-active:bg-opacity-10'
        ),
      },

      media: {
        common: `mr-4 flex-shrink-0 ${mediaClassName}`,
        ios: 'py-2',
        material: 'py-3 min-w-10',
      },
      inner: {
        common: cls(
          'pr-4 w-full relative',
          !menuListItem && 'hairline-b',
          innerClassName
        ),
        ios: 'py-2.5',
        material: 'py-3',
      },
      titleWrap: `flex justify-between items-center ${titleWrapClassName}`,
      title: {
        common: `flex-shrink`,
        menuListItem: {
          common: 'text-sm font-medium',
        },
        strong: {
          common: '',
          ios: 'font-semibold',
          material: 'font-medium',
        },
      },
      after: `${textColor} text-opacity-55 dark:text-opacity-55 flex-shrink-0 ml-auto pl-1 flex items-center space-x-1`,
      chevron: 'opacity-20 flex-shrink-0 ml-3',
      subtitle: 'text-sm',
      text: `text-sm ${textColor} text-opacity-55 dark:text-opacity-55 line-clamp-2`,
      header: 'text-xs mb-0.5',
      footer: `text-xs ${textColor} text-opacity-55 dark:text-opacity-55 mt-0.5`,

      divider: {
        common: `bg-list-divider-light dark:bg-list-divider-dark text-black dark:text-white text-opacity-55 dark:text-opacity-55 px-4 py-1 flex items-center z-10 ${
          divider ? 'relative' : 'sticky top-0'
        }`,
        ios: `h-8 hairline-t -m-0.5`,
        material: 'h-12',
      },
    },
    className
  );

  const hrefComputed =
    href === true || href === false || typeof href === 'undefined'
      ? undefined
      : href || '';
  const ItemContentComponent = isLink
    ? linkComponent
    : isLabel
    ? 'label'
    : 'div';
  const linkPropsComputed = isLink
    ? { href: hrefComputed, target, ...linkProps }
    : {};
  const itemContentClasses =
    isLink || isLabel ? c.itemContent.link : c.itemContent.default;
  const autoStrongTitle = strongTitle === 'auto' && title && (subtitle || text);
  const titleClasses = menuListItem
    ? c.title.menuListItem
    : strongTitle === true || autoStrongTitle
    ? c.title.strong
    : c.title.default;

  if (divider || groupTitle) {
    return (
      <Component className={cls(c.divider, className)}>
        {title}
        {children}
      </Component>
    );
  }

  return (
    <Component className={c.base} {...attrs}>
      <ItemContentComponent
        ref={rippleElRef}
        className={itemContentClasses}
        {...linkPropsComputed}
      >
        {media && <div className={c.media}>{media}</div>}
        <div className={c.inner}>
          {header && <div className={c.header}>{header}</div>}
          {(title || after) && (
            <div className={c.titleWrap}>
              {title && <div className={titleClasses}>{title}</div>}
              {after && <div className={c.after}>{after}</div>}
              {isLink &&
                chevron &&
                !menuListItem &&
                (chevronIcon || <ChevronIcon className={c.chevron} />)}
            </div>
          )}
          {subtitle && <div className={c.subtitle}>{subtitle}</div>}
          {text && <div className={c.text}>{text}</div>}
          {footer && <div className={c.footer}>{footer}</div>}
          {innerChildren}
        </div>
        {contentChildren}
      </ItemContentComponent>
      {children}
    </Component>
  );
};

export default ListItem;