export const Loading = ({ showTimeoutMessage }) => {
    return (
        <div className="preloader">
            <div className="loader"></div>
            {showTimeoutMessage && (
                <div className="timeout-message">
                    <p>Сервер может «засыпать» при отсутствии активности.</p>
                    <p>Пожалуйста, наберитесь терпения - сервер скоро проснётся!</p>
                    <p>Это занимает не более одной минуты.</p>
                </div>
            )}
        </div>
    );
};