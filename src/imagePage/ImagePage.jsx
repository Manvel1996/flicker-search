import React, { useState } from "react";
import Search from "./search/Search";
import Main from "./main/Main";
import Modal from "../components/UI/modal/Modal";

import "./ImagePage.css";

export default function ImagePage() {
  const [images, setImages] = useState([]);
  const [visible, setVisible] = useState(false);


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

    if (images.length === 1 && images[0].imgs.length === 1) {
      return setVisible(true);
    }

    let num = 0;
    let haveImgIndex = 0
    for (let i = 0; i < images.length; i++) {
      if (images[i].imgs.length === 0) {
        num += 1;
      }else haveImgIndex = i
      if (num === images.length - 1 && images[i].imgs.length === 1 ) {
        setVisible(true);
      }else if(num === images.length - 1 && images[haveImgIndex].imgs.length === 1){
        setVisible(true)
      }
    }
  }

  return (
    <div className="image-page">
      <Search newImages={newImages} />
      <Main images={images} imgGoBasket={imgGoBasket} />
      <Modal
        visible={visible}
        setVisible={setVisible}
        modalText={"Congratulations all photos in the right baskets"}
      />
    </div>
  );
}
