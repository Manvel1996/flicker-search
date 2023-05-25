import React, { useState } from "react";
import Modal from "../../components/UI/modal/Modal";

import "./Search.css";

export default function Search({ newImages }) {
  const [inputValue, setInputValue] = useState("");
  const [visible, setVisible] = useState(false);
  const [modalText, setModalText] = useState("");

  function fetchSearch(e) {
    e.preventDefault();

    if (inputValue.length < 2) {
      setModalText("Your text must be longer than 2 characters");
      setVisible(true);
      return;
    } else if (inputValue.length > 25) {
      setModalText("Your text cannot be longer than 25 characters");
      setVisible(true);
      return;
    }

    fetch(
      `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=37bda1798910c78bef5284aed9201d60&tags=${inputValue}&format=json&nojsoncallback=1&per_page=5`
    )
      .then((res) => res.json())
      .then((data) => {
        newImages(data.photos.photo, inputValue);
        setInputValue("");
      })
      .catch(() => {
        setVisible(true);
        setModalText("Server error");
      });
  }

  return (
    <div className="image-search">
      <form onSubmit={fetchSearch}>
        <input
          type="search"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value.toLowerCase())}
          placeholder="Search"
        />
        <button>Search</button>
      </form>
      <Modal
        visible={visible}
        setVisible={setVisible}
        modalText={modalText}
        setModalText={setModalText}
      />
    </div>
  );
}
