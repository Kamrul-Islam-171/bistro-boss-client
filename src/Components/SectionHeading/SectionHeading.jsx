

const SectionHeading = ({heading, subHeading}) => {
    return (
        <div className="w-4/12 mx-auto text-center my-12">
            <div>
                <h1 className="text-yellow-600 mb-3">{heading}</h1>
            </div>
            <div className=" border-y-4 py-4">
                <p className="text-4xl uppercase">{subHeading}</p>
            </div>
        </div>
    );
};

export default SectionHeading;