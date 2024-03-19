import React from "react";
import SearchQuizInput from "./SearchQuizInput/SearchQuizInput";
import clases from "./Quizes.module.css"
import { useNavigate } from "react-router-dom";

function Quizes() {
    const navigate = useNavigate();
    return <div className={clases.root}>
        <SearchQuizInput></SearchQuizInput>
        <section className={clases.cardsContainer}>

            {/* TODO if admin show create quiz box */}
            <div className={clases.createQuiz} onClick={(e)=> navigate("/createQuiz")}>

            </div>              
            
        </section>
    </div>;
}

export default Quizes;
