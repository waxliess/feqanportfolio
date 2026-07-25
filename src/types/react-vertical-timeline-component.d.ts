declare module 'react-vertical-timeline-component' {
  import * as React from 'react';

  export interface VerticalTimelineProps {
    className?: string;
    animate?: boolean;
    lineColor?: string;
    layout?: '1-column' | '2-columns';
    children?: React.ReactNode;
  }

  export interface VerticalTimelineElementProps {
    className?: string;
    id?: string;
    date?: React.ReactNode;
    dateClassName?: string;
    iconClassName?: string;
    iconStyle?: React.CSSProperties;
    icon?: React.ReactNode;
    contentStyle?: React.CSSProperties;
    contentArrowStyle?: React.CSSProperties;
    position?: 'left' | 'right';
    style?: React.CSSProperties;
    visible?: boolean;
    children?: React.ReactNode;
  }

  export const VerticalTimeline: React.FC<VerticalTimelineProps>;
  export const VerticalTimelineElement: React.FC<VerticalTimelineElementProps>;
}
