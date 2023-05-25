import React from "react";

import "./Basket.css";

export default function Basket({
  title,
  dndImage,
  dropHandler,
  openBasketHandler,
}) {
  function dragLeaveHandler(e) {
    e.target.style.backgroundColor = "blue";
  }

  function dragOverHandler(e) {
    e.preventDefault();
    if (e.target.innerText === dndImage.title) {
      e.target.style.backgroundColor = "green";
    }else e.target.style.backgroundColor = "red"
  }
  return (
    <div
      className="basket"
      onDragOver={(e) => dragOverHandler(e)}
      onDragLeave={(e) => dragLeaveHandler(e)}
      onDrop={(e) => dropHandler(e, title)}
      onClick={()=>openBasketHandler(title)}>
      {title}
    </div>
  );
}
