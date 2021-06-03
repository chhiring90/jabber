import Avatar from './Avatar';
import Button from './Button';
import {AiOutlineMore} from 'react-icons/ai';
import {BsCheckAll} from 'react-icons/bs';

const message = () => {



    return(
        <>
            <div className="flex items-start w-full max-w-xl mb-5">
                <Avatar name="Nika Jerrardo" size="small" />
                <blockquote className="flex-auto pl-2 flex">
                    <div className="bg-brand-primary rounded-tl-none rounded-xl py-4 px-4 text-white">
                        <p>
                            Hello! Finally found the time to write to you) I need your help in creating interactive animations for my mobile application.
                        </p>
                    </div>
                    <footer className="flex items-center">
                        <Button customClass="text-brand-gray focus:outline-none">
                            <AiOutlineMore className="w-5 h-5"/>
                        </Button>
                    </footer>
                </blockquote>
            </div>
            <div className="flex items-start justify-end w-full ml-auto max-w-xl">
                    <div className="order-2 flex self-center">
                        <BsCheckAll />
                    </div>
                    <blockquote className="pr-2 inline-flex order-1">
                        <div className="bg-white border-2 border-gray-50 order-2 rounded-br-none rounded-xl py-4 px-4 text-brand-gray text-right">
                            <p>
                                Hello! Finally found the time to write to you) I need your help in creating interactive animations for my mobile application.
                            </p>
                        </div>
                        <footer className="flex items-center order-1">
                            <Button customClass="text-brand-gray focus:outline-none">
                                <AiOutlineMore className="w-5 h-5"/>
                            </Button>
                        </footer>
                    </blockquote>
                </div>
        </>
    );
}

export default message;