'use client';

interface Props {
    error: Error;
    reset: () => void;
}

const ErrorPage = ({ error, reset }: Props) => {
    console.log('Error', error);

    return (
        <div className="workCollection">
            <div className="content--container workCollection--container">
                <div className="content--container">
                    <div>An unexpected error has occured.</div>
                    <button onClick={() => reset()}>Retry</button>
                </div>
            </div>
        </div>
    )
}

export default ErrorPage