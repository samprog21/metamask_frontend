const endpoint = process.env.NEXT_PUBLIC_API_BASE_URL;
const secret = process.env.JWT_SECRET;

const baseUrl = `${endpoint}/metamask/api/v1`;

export { baseUrl,secret };

