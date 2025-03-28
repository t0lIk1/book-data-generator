import { useState, useEffect } from 'react';
import { Book } from '../hooks/useBookGenerator';
import React from 'react';

type Props = {
    books: Book[];
    loadMore: () => void;
    avgLikes: number;
    avgReviews: number;
};

const ReviewCard = ({ review }: { review: Book['reviews'][0] }) => (
    <div className="bg-white p-3 rounded-lg shadow-sm">
        <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
                <span className="text-yellow-500">★</span>
                <span className="text-gray-700">{review.rating}</span>
            </div>
            <span className="text-sm text-gray-500">by {review.author}</span>
        </div>
        <p className="text-gray-600">{review.text}</p>
    </div>
);

const BookDetails = ({ book }: { book: Book }) => (
    <div className="space-y-4">
        <div>
            <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
            <p className="text-gray-600">{book.description}</p>
        </div>
        <div>
            <h3 className="font-semibold text-gray-900 mb-2">Reviews</h3>
            <div className="space-y-2">
                {book.reviews.map((review, index) => (
                    <ReviewCard key={index} review={review} />
                ))}
            </div>
        </div>
    </div>
);

export const BookTable = ({ books, loadMore }: Props) => {
    const [expandedBookId, setExpandedBookId] = useState<number | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
            if (scrollTop + clientHeight >= scrollHeight - 100) {
                loadMore();
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loadMore]);

    return (
        <div className="mt-4">
            <table className="w-full border-collapse">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="p-2 border">#</th>
                        <th className="p-2 border">ISBN</th>
                        <th className="p-2 border">Title</th>
                        <th className="p-2 border">Author</th>
                        <th className="p-2 border">Publisher</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((book) => (
                        <React.Fragment key={book.id}>
                            <tr
                                onClick={() => setExpandedBookId(expandedBookId === book.id ? null : book.id)}
                                className="hover:bg-blue-50 cursor-pointer duration-300 ease-in-out border-b border-gray-100"
                            >
                                <td className="p-2 border">{book.id + 1}</td>
                                <td className="p-2 border">{book.isbn}</td>
                                <td className="p-2 border">{book.title}</td>
                                <td className="p-2 border">{book.author}</td>
                                <td className="p-2 border">{book.publisher}</td>
                            </tr>
                            {expandedBookId === book.id && (
                                <tr>
                                    <td colSpan={5} className="p-4 border bg-gray-50">
                                        <BookDetails book={book} />
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
};