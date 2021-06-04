import UserStatusDot from './UserStatusDot';
import DefaultAvatar from '../assets/images/jabber-default.svg';
import AnimatingDots from './AnimatingDots';

const avatar = ({ imageSrc, alt, size, name, status, typing }) => {
    let avatar;
    let userImage = imageSrc ? imageSrc : DefaultAvatar;

    //  Will be removed while connecting with backend
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
                        {status && <UserStatusDot status={status} />}
                    </div>
                    <figcaption className="flex-auto pl-3 flex flex-wrap">
                        <h5 className="text-lg leading-5 font-bold text-brand-tertiary tracking-wide">{name}
                        {typing ? (<>
                                    <br />
                                    <span className="text-xs">
                                        <AnimatingDots />
                                        Typing
                                    </span>
                                </>
                                )
                                : null}
                        {!status ? (<><br/><span className="text-xs text-brand-gray">Active 5 hrs ago</span></>) : null}
                        </h5>
                        {status && <span className="ml-auto font-semibold text-sm">1 Minutes ago</span>}
                    </figcaption>
                </figure>
            );
            break;
        case 'small':
            avatar = (
                    <figure className="w-14 flex-shrink-0">
                        <img className={`w-9 h-9 ${classes.avatar} mb-0`} src={userImage} alt={alt} />
                    </figure>
            );
            break;
        default: break;
    }

    return avatar;
};

export default avatar;