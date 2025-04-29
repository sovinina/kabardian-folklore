import React from 'react';
import HTMLFlipBook from 'react-pageflip';



const PageCover = React.forwardRef((props, ref) => (
  <div className="page page-cover" ref={ref} data-density="hard">
    {props.children}
  </div>
));

const Page = React.forwardRef((props, ref) => (
  <div className="page" ref={ref}>
    {props.children}
  </div>
));

const FlipBookComponent = React.forwardRef(({ page, onFlip, imagePaths, onInit }, ref) => (
  <HTMLFlipBook
    startPage={page}
    width={537}
    height={758}
    size="stretch"
    minWidth={315}
    maxWidth={700}
    minHeight={400}
    maxHeight={1533}
    maxShadowOpacity={0.5}
    showCover={true}
    mobileScrollSupport={true}
    onInit={onInit}
    onFlip={onFlip}
    className="demo-book"
    ref={ref}
  >
    <PageCover><img src='/img/Cover.png' alt="" /></PageCover>
          <Page></Page>
          {imagePaths.map((src, index) => (
            <Page key={index}><img src={src} alt="" loading="lazy"/></Page>    
            ))}
          <PageCover><img src='/img/Back.png' alt="" /></PageCover>
  </HTMLFlipBook>
));

export default FlipBookComponent;
