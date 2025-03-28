import { faker } from '@faker-js/faker';
import {Book} from "../App.tsx";

type Props = {
    book: Book;
    onClose: () => void;
    avgLikes: number;
    avgReviews: number;
};

export const BookDetailsModal = ({ book, onClose, avgLikes, avgReviews }: Props) => {
    const reviewsCount = Math.round(avgReviews);
    const reviews = Array.from({ length: reviewsCount }, () => ({
        text: faker.lorem.paragraph(),
        author: faker.person.fullName(),
    }));

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg max-w-2xl w-full">
                <div className="flex justify-between items-start mb-4">
                    <h2 className="text-2xl font-bold">{book.title}</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        ✕
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <div className="bg-blue-100 h-64 flex items-center justify-center mb-4">
                            <div className="text-center p-4">
                                <h3 className="text-xl font-semibold">{book.title}</h3>
                                <p className="text-gray-600">by {book.author}</p>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <span className="text-yellow-400 text-xl">★</span>
                            <span className="ml-1">{avgLikes.toFixed(1)}</span>
                        </div>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-2">Publisher: {book.publisher}</h3>
                        <h3 className="font-semibold mb-2">ISBN: {book.isbn}</h3>
                        {reviewsCount > 0 && (
                            <div>
                                <h4 className="font-semibold mt-4 mb-2">Reviews:</h4>
                                {reviews.map((review, i) => (
                                    <div key={i} className="mb-3">
                                        <p className="text-gray-600">"{review.text}"</p>
                                        <p className="text-sm text-gray-500">— {review.author}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};