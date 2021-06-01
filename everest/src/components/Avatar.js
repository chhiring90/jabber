import UserStatusDot from './UserStatusDot';
import DefaultAvatar from '../assets/images/jabber-default.svg';
import AnimatingDots from './AnimatingDots';

const avatar = ({ imageSrc, alt, size, name }) => {
    let avatar;
    let userImage = imageSrc ? imageSrc : DefaultAvatar;

    //  Will be removed while connecting with backend
    let status = 'online';

    const classes = {
        avatar: ['rounded-full overflow-hidden mb-3'],
        wrapper: [''],
        avatarIntro: [' ']
    }

    switch (size) {
        case 'large':
            avatar = (
                <figure className='w-full'>
                    <img className={`flex flex-wrap justify-center mx-auto w-24 h-24 text-center ${classes.avatar}`} src={userImage} alt={alt} />
                    <figcaption className={'flex-full text-center'}>
                        <h5 className="text-brand-tertiary text-lg font-semibold caplitalize">{name}</h5>
                    </figcaption>
                </figure>
            );
            break;
        case 'medium':
            avatar = (
                <figure className="flex">
                    <div className='relative'>
                        <img className={`w-14 h-14 ${classes.avatar}`} src={userImage} alt={alt} />
                        <UserStatusDot status={status} />
                    </div>
                    <figcaption className="flex-auto pl-3 flex flex-wrap">
                        <h5 className="text-lg leading-5 font-bold text-brand-tertiary tracking-wide">{name} <br />
                            <span className="text-xs">
                                <AnimatingDots />
                                Typing
                            </span>
                        </h5>
                        <span className="ml-auto font-semibold text-sm">1 Minutes ago</span>
                    </figcaption>
                </figure>
            );
            break;
        case 'small':
            avatar = (
                <div className={classes}>
                    <figure className={classes.avatar}>
                        <img src={userImage} alt={alt} />
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