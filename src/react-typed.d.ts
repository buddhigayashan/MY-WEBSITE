declare module 'react-typed' {
  import * as React from 'react';

  export interface TypedProps {
    strings: string[];
    typeSpeed?: number;
    backSpeed?: number;
    loop?: boolean;
    showCursor?: boolean;
    className?: string;
    smartBackspace?: boolean;
    backDelay?: number;
    fadeOut?: boolean;
    fadeOutClass?: string;
    fadeOutDelay?: number;
    loopCount?: number;
    cursorChar?: string;
    onComplete?: () => void;
  }

  const Typed: React.FC<TypedProps>;
  export default Typed;
}
