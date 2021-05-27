export const FormSection = ({ children }) => (
    <section className="py-10 px-8 w-full flex items-center min-h-full h-full">
        <div className="max-w-6xl min-h-2xl w-full flex mx-auto shadow-xl rounded bg-white">
            {children}
        </div>
    </section>
);

export const FormContainer = ({ children }) => (<div className="flex-grow-0 px-7 py-4 w-2/4 items-center flex">{children}</div>);

export const FormGraphic = ({ children }) => (<div className="w-2/4 flex-grow-0 bg-brand-primary">{children}</div>);