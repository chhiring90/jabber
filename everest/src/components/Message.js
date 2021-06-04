import Avatar from './Avatar';
import Button from './Button';
import {AiOutlineMore} from 'react-icons/ai';
import {BsCheckAll} from 'react-icons/bs';

const message = () => {

    return(
        <>
            <div className="flex items-start w-full max-w-xl mb-5">
                <blockquote className="flex-auto justify-start flex">
                    <Avatar name="Nika Jerrardo" size="small" />
                    <div className="bg-brand-primary flex-grow-0 shadow-message-alt rounded-tl-none rounded-xl py-4 px-4 text-white">
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
            <div className="flex items-start w-full ml-auto max-w-xl">
                <blockquote className="pr-2 flex justify-end flex-auto">
                    <div className="bg-white order-2 border-2 border-gray-50 flex-grow-0 rounded-br-none rounded-xl py-4 px-4 text-brand-gray text-right">
                        <p>
                            Hello! Finally found the time to write to you) I need your help in creating interactive animations for my mobile application.
                        </p>
                    </div>
                    <footer className="flex items-center order-1">
                        <Button customClass="text-brand-gray focus:outline-none">
                            <AiOutlineMore className="w-5 h-5"/>
                        </Button>
                    </footer>
                    <div className="flex flex-shrink-0 w-8 self-center justify-end order-3">
                        <BsCheckAll />
                    </div>
                </blockquote>
            </div>
        </>
    );
}

export default message;