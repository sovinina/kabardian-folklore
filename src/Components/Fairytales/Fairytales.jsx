import HTMLFlipBook from "react-pageflip";
import './Fairytales.css';
import React from "react";

// const Page = (index) => {
//     let src;
//     switch (index.index){
//         case 3:
//         case 29:
//         case 19:
//         case 24:
//         case 30:
//         case 33:
//             src =`img/gif/Сказки-${index.index}.gif`;
//             break;
//         default:
//             src =`img/страницы/Сказки-${index.index}.png`;
//     } 
//     console.log(index.index)
//     return (
//     <div className="page">
//         <img src={src} alt="" />
//     </div>
// )}
let imagePaths = [];

for (let i =1;i<47;i++){
    
    switch (i){
        case 3:
        case 29:
        case 19:
        case 24:
        case 30:
        case 33:
            imagePaths.push(`img/gif/Сказки-${i}.gif`);
            break;
        default:
            imagePaths.push(`img/страницы/Сказки-${i}.png`);
    }

}

// const imagePaths = [
//     'img/страницы/Сказки-1.png',
//     'img/страницы/Сказки-2.png',
//     'img/страницы/Сказки-3.png',
//     // и так далее
// ];



// const Page = ({ src, index }) => (
//     <div className="page" key={index}>
//       <img src={src} alt={`Page ${index + 1}`} style={{ width: '100%', height: '100%' }} />
//     </div>
//   );

// const Fairytales = (props) => {
//     // const count = 47;
//     // const pages = imagePaths.map((src, index) => (
//     //     <Page key={index} src={src} index={index} />
//     // ))

//     return (
//         <HTMLFlipBook 
//             width={580} 
//             height={820}
//             maxWidth={300} 
//             maxHeight={600}
//         >
            
//             <div className="page page-cover" data-density="hard">
//                 <div className="page-content">
//                     <img src="/img/Cover.png" alt="" />
//                 </div>
//             </div>
//             <div className="page">
                
//             </div>
//             {imagePaths.map((src, index) => (
//                 <div className="page" key={index}>
//                     <div className="page-content">
//                         <img src={src} alt="" />
//                     </div>
//                 </div>
//             ))}

//             <div className="page">
//             </div>
//             <div className="page page-cover"  data-density="hard">
//                 <div className="page-content">
//                     <img src="/img/Back.png" alt="" />
//                 </div>
//             </div>
//         </HTMLFlipBook>
//     );
// }
const contents = [
    "Предисловие", "Лашин", "Разумная сноха", "Глупый волк", 
    "Козёл и волк", "Куйцук и иныжи", "Малыш Кулацу", "Чудесная цапля",
    "Куйцук и шайтан", "Чёрная лиса", "Приключения Тембота", 
    "Запасливый муравей", "Сто и одна хитрость", "Три брата",
    "Как был наказан хитрый иныж", "Мудрый ёж", "Пчёлы Тляшоко",
    "Три совета", "Старый кот и мыши", "Хоже приглашает гостей на пир",
    "Как Хоже умирал"
];
const pageMap = {
    0: 3, 1: 5, 2: 8, 3: 10, 4: 11, 5: 13, 6: 17, 7: 18,
    8: 21, 9: 22, 10: 26, 11: 30, 12: 31, 13: 32, 14: 35,
    15: 38, 16: 39, 17: 40, 18: 41, 19: 42, 20: 44
};

const PageCover = React.forwardRef((props, ref) => {
  return (
    <div className="page page-cover" ref={ref} data-density="hard">
        {props.children}
    </div>
  );
});

const Page = React.forwardRef((props, ref) => {
  return (
    <div className="page" ref={ref}>
      {props.children}
    </div>
  );
});
window.scrollTo(0, 0);
class Fairytales extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 0,
      totalPage: 47,
      isLoading: true,
    };

    // Если нужно использовать класс-реф, можно также создать его так:
    this.flipBookRef = React.createRef();
  }
  
  // Если не используете, можно задать:
  onChangeOrientation = () => {};
  onChangeState = () => {};

  nextButtonClick = () => {
    if (this.flipBook && typeof this.flipBook.pageFlip === "function") {
      this.flipBook.pageFlip().flipNext();
    }
  };

  prevButtonClick = () => {
    if (this.flipBook && typeof this.flipBook.pageFlip === "function") {
      this.flipBook.pageFlip().flipPrev();
    }
  };

  flipTo = (page) => {
    if (this.flipBook && typeof this.flipBook.pageFlip === "function") {
      this.flipBook.pageFlip().flip(page);
    }
  };

  onPage = (e) => {
    localStorage.setItem('page', e.data)
    this.setState({
      page: e.data,
    });
  };

  componentDidMount() {
    setTimeout(() => {
      const flipBookInstance = this.flipBook?.pageFlip?.();
      if (flipBookInstance) {
        const savedPage = localStorage.getItem("page");
        if (savedPage !== null) {
          const page = parseInt(savedPage, 10)-1;
          flipBookInstance.flip(page, "top");
        }
  
        this.setState({
          totalPage: flipBookInstance.getPageCount(),
          isLoading: false,
        });
      }
    }, 700); // 300ms — время на инициализацию FlipBook 
  }
  

  
  render() {
    return (
        <>
        
    
       {this.state.isLoading && (
            <div className="preloader">
                <div className="loader"></div>
            </div>
        ) }
        <main className="collection">
    
        <div className="wrapContain">
        
        <div className="to">
            <ul>
                <li className="tocTitle">
                    <p>Содержание</p>
                    <ul className="toc none">
                        {contents.map((name, index)=> <li key={index} onClick={() => this.flipTo(pageMap[index])}>
                            {name}
                        </li>)}
                    </ul>
                </li>
            </ul>
            <a href="Кабардинские народные сказки.pdf" download>Скачать сборник</a>
        </div>
        <HTMLFlipBook
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
          onFlip={this.onPage}
          onChangeOrientation={this.onChangeOrientation}
          onChangeState={this.onChangeState}
          className="demo-book"
          ref={(el) => (this.flipBook = el)}
        >
          <PageCover><img src='/img/Cover.png' alt="" /></PageCover>
          <Page></Page>
          {imagePaths.map((src, index) => (
            <Page key={index}><img src={src} alt="" /></Page>
                
            ))}
          
          
          <PageCover><img src='/img/Back.png' alt="" /></PageCover>
        </HTMLFlipBook>
        
            
      </div>
        </main>
        </>
        
      
    );
  }
}

  
export default Fairytales;
