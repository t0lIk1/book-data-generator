import { useEffect, useState, useCallback } from 'react';
import { locales, useBookGenerator } from './hooks/useBookGenerator';
import { LanguageSelector } from './components/LanguageSelector';
import { SeedControls } from './components/SeedControls';
import { LikesReviewsControls } from './components/LikesReviewsControls';
import { BookTable } from './components/BookTable';

export type Book = ReturnType<ReturnType<typeof useBookGenerator>['generateBook']>;

export default function App() {
    const [locale, setLocale] = useState<keyof typeof locales>('en');
    const [seed, setSeed] = useState(42);
    const [avgLikes, setAvgLikes] = useState(3.5);
    const [avgReviews, setAvgReviews] = useState(2.5);
    const [page, setPage] = useState(1);
    const [books, setBooks] = useState<Book[]>([]);

    const { generateBook } = useBookGenerator(seed, locale, avgLikes, Math.ceil(avgReviews));

    const loadMore = useCallback(() => {
        setPage(prev => prev + 1);
    }, []);

    useEffect(() => {
        const newBooks = Array.from({ length: 20 * page }, (_, i) => generateBook(i));
        setBooks(newBooks);
    }, [page, seed, locale, avgLikes, avgReviews]);

    return (
        <div className="min-h-screen bg-slate-50">
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-8">
                        <h1 className="text-3xl font-semibold text-gray-900 mb-2">Book Data Generator</h1>
                        <p className="text-3xl font-bold underline">Generate and explore book data with customizable
                            parameters</p>
                    </div>

                    <div className="bg-white rounded-xl  p-6">
                        <div className="flex items-center space-x-4">
                            <div>
                                <div>
                                    <LanguageSelector locale={locale} setLocale={setLocale} />
                                </div>
                            </div>
                            <div className="flex-1 ">
                                <div className=" rounded-lg px-4 py-3 h-full">
                                    <SeedControls seed={seed} setSeed={setSeed} />
                                </div>
                            </div>
                            <div className="flex-[2] min-w-[400px]">
                                <div className="bg-slate-50 rounded-lg px-4 py-3 h-full">
                                    <LikesReviewsControls
                                        avgLikes={avgLikes}
                                        setAvgLikes={setAvgLikes}
                                        avgReviews={avgReviews}
                                        setAvgReviews={setAvgReviews}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <BookTable
                        books={books}
                        loadMore={loadMore}
                        avgLikes={avgLikes}
                        avgReviews={avgReviews}
                    />
                </div>
            </div>
        </div>
    );
}