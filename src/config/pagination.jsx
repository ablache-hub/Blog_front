import React from 'react'
import { Link } from 'react-router-dom';

export default function pagination({postPerPage, totalPosts, paginate}) {
    const PageNumbers = [];

    for(let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
        PageNumbers.push(i);
    }

    return (
        <nav>
            <ul className="pagination">
                {PageNumbers.map(number => (
                    <li key={number} className="page-item">
                        <Link to="#!" 
                        className="page-link link"
                        onClick={() => paginate(number)}
                        >
                            {number}
                        </Link>
                    </li>
                ))
                }
            </ul>
        </nav>
    )
}
