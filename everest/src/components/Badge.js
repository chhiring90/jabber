const badge = ({ children }) => (
    <span
        className="bg-red-500 text-white text-xs w-6 h-6 text-center rounded-full flex items-center justify-center">
        {children}
    </span>
);

export default badge;