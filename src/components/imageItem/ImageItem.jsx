import React from "react";

import "./ImageItem.css";

export default function ImageItem({ img, obj, dndParams }) {
  function dragStartHandler(e) {
    e.target.style.opacity = "50%";
    const id = img.id;
    const title = obj.title;
    const src = `http://farm${img.farm}.staticflickr.com/${img.server}/${img.id}_${img.secret}.jpg`;
    dndParams(title, src, id);
  }
  return (
    <img
      draggable="true"
      onDragStart={(e)=>dragStartHandler(e)}
      onDragEnd={(e)=>e.target.style.opacity = "100%"}
      className="img"
      alt={img.title}
      src={`http://farm${img.farm}.staticflickr.com/${img.server}/${img.id}_${img.secret}.jpg`}
    />
  );
}
