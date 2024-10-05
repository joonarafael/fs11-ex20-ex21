interface NotificationProps {
	isError?: boolean | null;
	message?: string | null;
}

const Notification = ({ isError, message }: NotificationProps) => {
	if (!message) {
		return null;
	}

	if (isError) {
		return <div style={{ color: "red" }}>{message}</div>;
	}

	return <div style={{ color: "green" }}>{message}</div>;
};

export default Notification;
