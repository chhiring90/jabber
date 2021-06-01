const avatar = ({ imageSrc, alt, size, name }) => {
    let avatar;

    const classes = {
        avatar: ['rounded-full mx-auto w-24 h-24 overflow-hidden mb-3'],
        wrapper: [''],
        avatarIntro: [' ']
    }

    switch (size) {
        case 'large':
            avatar = (
                <div className='flex flex-wrap justify-center text-center'>
                    <figure className={classes.avatar}>
                        <img src={imageSrc} alt={alt} />
                    </figure>
                    <div className={'text-brand-tritery flex-full'}>
                        <h5 className="text-brand-tertiary text-lg font-semibold caplitalize">{name}</h5>
                    </div>
                </div>
            );
            break;
        case 'medium':
            avatar = (
                <div className={classes}>
                    <figure className={classes.avatar}>
                        <img src={imageSrc} alt={alt} />
                    </figure>
                    <div className={classes.avatarIntro}>
                        <h5>{name}</h5>
                    </div>
                </div>
            );
            break;
        case 'small':
            avatar = (
                <div className={classes}>
                    <figure className={classes.avatar}>
                        <img src={imageSrc} alt={alt} />
                    </figure>
                    <div className={classes.avatarIntro}>
                        <h5>{name}</h5>
                    </div>
                </div>
            );
            break;
        default: break;
    }

    return avatar;
};

export default avatar;