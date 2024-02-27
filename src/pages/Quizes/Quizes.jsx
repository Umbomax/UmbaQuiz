import React from "react";
import SearchQuizInput from "./SearchQuizInput/SearchQuizInput";
import clases from "./Quizes.module.css"

function Quizes() {
    return <div className={clases.root}>
        <SearchQuizInput></SearchQuizInput>
    </div>;
}

export default Quizes;
