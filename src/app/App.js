import React, { useState } from "react";
import styles from "./App.module.css";
import { MemoizedAutocomplete } from "../components/Autocomplete/Autocomplete";
import { MemoizedProductDetail } from "../components/ProductDetail/ProductDetail";

function App() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [errorState, setErrorState] = useState(null);

  return (
    <div className={styles.App}>
      {errorState ? (
        <div
          className={styles.error}
        >{`There was a problem with your request: ${errorState}`}</div>
      ) : undefined}
      <MemoizedAutocomplete
        setSelectedItem={setSelectedItem}
        onError={setErrorState}
      />
      {setSelectedItem ? (
        <MemoizedProductDetail
          productId={selectedItem}
          onError={setErrorState}
        />
      ) : undefined}
    </div>
  );
}

export default App;
