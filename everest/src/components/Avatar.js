const avatar = ({ imageSrc, alt, size }) => {
    let avatar;

    const classes = ['rounded-full mx-auto w-24 h-24 overflow-hidden'];

    switch (size) {
        case 'large':
            avatar = (
                <figure className={classes}>
                    <img src={imageSrc} alt={alt} />
                </figure>
            );
            break;
        case 'medium':
            avatar = (
                <figure className={classes}>
                    <img src={imageSrc} alt={alt} />
                </figure>
            );
            break;
        case 'small':
            avatar = (
                <figure className={classes}>
                    <img src={imageSrc} alt={alt} />
                </figure>
            );
            break;
        default: break;
    }

    return avatar;
};

export default avatar;