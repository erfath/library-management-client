import React from 'react';
import { Link } from 'react-router-dom';

const IssueBookList = ({ issueBook, index, refetch }) => {
    const { book, userName } = issueBook;
    return (
        <tr class="border-b">
            <td class="px-6 py-4 whitespace-nowrap lg:text-xl font-medium text-gray-900">{index + 1}</td>
            <td class="lg:text-lg text-gray-900 px-6 py-4 font-medium whitespace-nowrap">
                {book}
            </td>
            <td class="lg:text-lg text-gray-900 px-6 py-4 font-medium whitespace-nowrap">
                {userName}
            </td>
        </tr>
    );
};

export default IssueBookList;