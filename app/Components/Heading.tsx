interface HeadingProps {
    title: string;
    center?: boolean;
}

const Heading: React.FC<HeadingProps> = ({ title, center = false }) => {
    return (
        <div className={center ? 'text-center' : 'text-start'}>
            <h1 className="font-bold text-2xl">{title}</h1>
        </div>
    );
};

export default Heading;
