import React from 'react'
import { NextIcons, PrevIcons } from '../ui/Icons'

export default function Pagination({currentPage, itemsPerPage, length, onPageChanged}) {


    const pagesCount = Math.ceil(length / itemsPerPage)
    const pages = []
    for (let i = 1; i < pagesCount + 1; i++) {
        pages.push(i)
    }

    return (
        <nav className="d-flex justify-content-center">
            <ul className="pagination pagination-sm m-auto">
                <li className={"page-item" + (currentPage == 1 && " disabled")}>
                    <button onClick={() => onPageChanged(currentPage - 1)} className="page-link">
                        <PrevIcons />
                    </button>
                </li>
                {pages.map(page =>
                    <li className={"page-item" + (currentPage == page && " active")} key={page}>
                        <button onClick={() => onPageChanged(page)} className="page-link">{page}</button>
                    </li>
                )}
                <li className={"page-item" + (currentPage == pagesCount && " disabled")}>
                    <button onClick={() => onPageChanged(currentPage + 1)} className="page-link">
                        <NextIcons />
                    </button>
                </li>
            </ul>
        </nav>
    )
}

Pagination.getData = (items, currentPage, itemsPerPage) => {
    const start = currentPage * itemsPerPage - itemsPerPage
    return items.slice(start, start + itemsPerPage)
}