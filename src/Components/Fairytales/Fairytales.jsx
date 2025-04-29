import React, { Suspense } from "react";
import './Fairytales.css';
const FlipBookComponent = React.lazy(() => import("./FlipBook")); // лениво импортируем

class Fairytales extends React.Component {
  constructor(props) {
    super(props);
    const saved = parseInt(localStorage.getItem("page") ?? "0", 10);
    this.state = {
      page: saved,
      totalPage: 47,
      isLoading: true,
    };

    this.flipBook = React.createRef();
  }

  componentDidMount() {
    const isFirstVisit = sessionStorage.getItem("visited") !== "true";
    if (isFirstVisit) {
      window.scrollTo(0, 0);
      sessionStorage.setItem("visited", "true");
    }
  }

  handleInit = () => {
    const inst = this.flipBook.current.pageFlip();
    this.setState({
      totalPage: inst.getPageCount(),
      isLoading: false,
    });
  };

  onPage = (e) => {
    const currentPage = e.data;
    this.setState({ page: currentPage });
    localStorage.setItem("page", currentPage.toString());
  };

  flipTo = (pageNumber) => {
    const inst = this.flipBook.current.pageFlip();
    inst.flip(pageNumber);
  };

  render() {
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

    return (
      <>
        {this.state.isLoading && (
          <div className="preloader"><div className="loader"></div></div>
        )}
        <main className="collection">
          <div className="wrapContain">
            <div className="to">
              <ul>
                <li className="tocTitle">
                  <p>Содержание</p>
                  <ul className="toc none">
                    {contents.map((name, index) => (
                      <li key={index} onClick={() => this.flipTo(pageMap[index])}>
                        {name}
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>
              <a href="Кабардинские народные сказки.pdf" download>Скачать сборник</a>
            </div>

            <Suspense fallback={<div className="preloader"><div className="loader"></div></div>}>
              <FlipBookComponent
                page={this.state.page}
                onFlip={this.onPage}
                imagePaths={imagePaths}
                contents={contents}
                pageMap={pageMap}
                flipTo={this.flipTo}
                onInit={this.handleInit}
                ref={this.flipBook}
              />
            </Suspense>
          </div>
        </main>
      </>
    );
  }
}

export default Fairytales;
