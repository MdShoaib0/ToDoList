import React, { Fragment } from 'react'
import { Link, Links } from "react-router";

const category = [
    {
        name: "Namaz",
        backGround: "bg-cyan-700"
    },
    {
        name: "Tasbih",
        backGround: "bg-teal-600"
    }
];

function Navigate() {
    return (
        <Fragment>
            {category.map((cat, index) => {
                return(
                    <Link
                    key={index}
                    className={`text-white w-full text-center font-bold py-4 ${cat.backGround} rounded-lg shadow-lg cursor-pointer active:scale-95 transition-all duration-300`}
                    to={`/${cat.name}`}
                    >
                    {cat.name}
                    </Link>
                )  
            })}
        </Fragment>
    )
}

export default Navigate;