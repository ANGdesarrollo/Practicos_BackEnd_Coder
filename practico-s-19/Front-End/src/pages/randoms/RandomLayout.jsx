export const RandomLayout = ({randoms = {}}) => {

    return (
        <div>
            Your random numbers are = {JSON.stringify(randoms, null, 4)}
        </div>
    );
};
