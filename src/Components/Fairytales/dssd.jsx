import HTMLFlipBook from "react-pageflip";
import './Fairytales.css';
import React from "react";

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
            imagePaths.push(`img/страницы/Сказки-${i}.webp`);
    }

}

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
class Fairytales extends React.Component {
  constructor(props) {
    super(props);
    const saved = parseInt(localStorage.getItem("page") ?? "0", 10);
    this.state = {
      page: saved,
      totalPage: 47,
      isLoading: true,
    };

    // Если нужно использовать класс-реф, можно также создать его так:
    this.flipBook = React.createRef();
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

  handleInit = () => {
    const inst = this.flipBook.current.pageFlip();
    this.setState({
      totalPage: inst.getPageCount(),
      isLoading: false,
    });
    window.scrollTo(0, 0);
  };

  onFlip = (e) => {
    // Сохраняем текущую страницу и отворачиваем скролл
    const currentPage = e.data;
    this.setState({ page: currentPage });
    localStorage.setItem("page", currentPage.toString());
  };

  flipTo = (pageNumber) => {
    // pageNumber уже должен быть 0-based
    const inst = this.flipBook.current.pageFlip();
    inst.flip(pageNumber);
  };

  onPage = (e) => {
    const currentPage = e.data;
    this.setState({ page: currentPage });
    localStorage.setItem("page", currentPage.toString());
  };

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
          startPage={this.state.page}
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
          onInit={this.handleInit}
          onFlip={(e) => {
            this.onPage(e);
          }}
          onChangeOrientation={this.onChangeOrientation}
          onChangeState={this.onChangeState}
          className="demo-book"
          ref={this.flipBook}
        >
          <PageCover><img src='/img/Cover.png' alt="" /></PageCover>
          <Page></Page>
          {imagePaths.map((src, index) => (
            <Page key={index}><img src={src} alt="" loading="lazy"/></Page>
                
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
