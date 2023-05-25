import React, { useState } from "react";
import ImageItem from "../../components/imageItem/ImageItem";
import Basket from "../../components/basket/Basket";

import "./Main.css";

export default function Main({ images, imgGoBasket }) {
  const [basketsImages, setBasketImages] = useState([]);
  const [insideBasket, setInsideBasket] = useState([]);
  const [openBasketTitle, setOpenBasketTitle] = useState(null);
  let dndImage = {};

  function dropHandler(e, title) {
    e.preventDefault();
    e.target.style.backgroundColor = "blue";

    if (dndImage.title !== title) return (dndImage = {});

    const obj = basketsImages.find((el) => el.title === title);
    if (basketsImages.length === 0 || !obj) {
      setBasketImages([...basketsImages, { title, imgs: [dndImage.src] }]);
      imgGoBasket(title, dndImage.id);
      return (dndImage = {});
    }

    setBasketImages(
      basketsImages.map((el) => {
        if (el.title === title) {
          const newSrc = el.imgs.find((src) => src === dndImage.src);
          if (newSrc) {
            return el;
          }
          const obj = {
            title,
            imgs: [...el.imgs, dndImage.src],
          };
          return obj;
        }
        return el;
      })
    );
    imgGoBasket(title, dndImage.id);
    dndImage = {};   
  }

  function dndParams(title, src, id) {
    dndImage["id"] = id;
    dndImage["title"] = title;
    dndImage["src"] = src;
  }

  function openBasketHandler(title) {
    if (openBasketTitle === title) {
      return setOpenBasketTitle(null);
    }

    setOpenBasketTitle(title);
    const obj = basketsImages.find((el) => el.title === title);
    if (obj) {
      setInsideBasket(obj.imgs);
    } else setInsideBasket([]);
  }

  return (
    <>
      <div className="image-board">
        {images?.map((obj) => {
          return obj.imgs?.map((img) => {
            return (
              <ImageItem
                key={img.id}
                obj={obj}
                img={img}
                dndParams={dndParams}
              />
            );
          });
        })}
      </div>
      <div className="baskets-block">
        {images?.map((obj) => {
          return (
            <Basket
              key={obj.title}
              title={obj.title}
              dropHandler={dropHandler}
              dndImage={dndImage}
              openBasketHandler={openBasketHandler}
            />
          );
        })}
      </div>
      <div className="basket-images-block">
        <p className="basket-images-title">Group pics</p>
        <div className="basket-images">
          {openBasketTitle &&
            insideBasket?.map((el) => {
              return (
                <img
                  className="basket-img"
                  src={el}
                  key={el}
                  alt={"your search"}
                />
              );
            })}
        </div>
      </div>
    </>
  );
}
