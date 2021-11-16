import React from 'react'

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
                        <a href="#!" 
                        className="page-link"
                        onClick={() => paginate(number)}
                        >
                            {number}
                        </a>
                    </li>
                ))
                }
            </ul>
        </nav>
    )
}
