type Props = {
    seed: number;
    setSeed: (seed: number) => void;
};

export const SeedControls = ({ seed, setSeed }: Props) => (
    <div className="flex gap-2">
        <input
            type="number"
            value={seed}
            onChange={(e) => setSeed(Number(e.target.value))}
            className="p-2 border rounded"
        />
        <button
            onClick={() => setSeed(Math.floor(Math.random() * 1000000))}
            className="cursor-pointer p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-300 ease-in-out"
        >
            Random
        </button>
    </div>
);