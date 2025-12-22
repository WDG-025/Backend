export function envOrThrow(key: string) {
	if (!process.env[key]) {
		throw new Error(`${key} is missing in .env file`);
	} else {
		return process.env[key];
	}
}
