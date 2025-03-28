type Props = {
    avgLikes: number;
    setAvgLikes: (value: number) => void;
    avgReviews: number;
    setAvgReviews: (value: number) => void;
};

export const LikesReviewsControls = ({
    avgLikes,
    setAvgLikes,
    avgReviews,
    setAvgReviews,
}: Props) => (
    <div className="space-y-6">
        <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
                Average Likes: <span className="text-blue-600 font-semibold">{avgLikes.toFixed(1)}</span>
            </label>
            <input
                type="range"
                min="0"
                max="10"
                step="0.1"
                value={avgLikes}
                onChange={(e) => setAvgLikes(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
        </div>
        <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
                Average Reviews: <span className="text-blue-600 font-semibold">{avgReviews.toFixed(1)}</span>
            </label>
            <div className="relative">
                <input
                    type="number"
                    min="0"
                    max="10"
                    step="0.1"
                    value={avgReviews}
                    onChange={(e) => setAvgReviews(Number(e.target.value))}
                    className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                    placeholder="Enter number of reviews"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                    </svg>
                </div>
            </div>
        </div>
    </div>
);