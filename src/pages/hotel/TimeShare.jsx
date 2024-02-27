const TimeShare = ({ timeshares }) => {
    return (
        <div>
            {timeshares.map((timeshare) => (
                <li key={timeshare.id}>{timeshare.name}</li>
            ))}
        </div>
    );
};

export default TimeShare;
