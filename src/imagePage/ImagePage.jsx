import React, { useState } from "react";
import Search from "./search/Search";
import Main from "./main/Main";

import "./ImagePage.css";

export default function ImagePage() {
  const [images, setImages] = useState([]);


  function newImages(imgs, title) {
    if (images.length === 0) return setImages([{ title, imgs }]);
    const obj = images.find((el) => el.title === title);
    if (obj) {
      return setImages(
        images.map((el) => {
          if (el.title === title) {
            const obj = {
              title,
              imgs: [...el.imgs, ...imgs],
            };
            return obj;
          }
          return el;
        })
      );
    }
    setImages([...images, { title, imgs }]);
  }

  
  function imgGoBasket(title, id) {
    setImages(
      images.map((obj) => {
        if (obj.title === title) {
          const newImgs = obj.imgs.filter((el) => el.id !== id);
          const newObj = {
            title,
            imgs: newImgs,
          };
          return newObj;
        }
        return obj;
      })
    );
  }

  return (
    <div className="image-page">
      <Search newImages={newImages} />
      <Main images={images} imgGoBasket={imgGoBasket} />
    </div>
  );
}
