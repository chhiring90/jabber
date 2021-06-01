const AnimatingDots = () => {
    const dotSize = new Array(3);
    const dots = [...dotSize]
        .map((_, index) => <span
            key={index}
            className={`block border-2 animation-delay-${index + 1} border-white rounded-full w-2 h-2 bg-brand-primary animate-bounce`}></span >);

    return <span className="inline-flex mr-1 items-center">{dots}</span>;
}

export default AnimatingDots;