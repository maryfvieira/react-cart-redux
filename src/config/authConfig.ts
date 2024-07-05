const authConfig = {
	saltRounds: 12,
	jwtExpires: 86400 * 7, // 7 days
	jwtExpiresString: '7d',
	jwtTokenName: 'token'
};

export default authConfig;