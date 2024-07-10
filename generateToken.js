const { RtcTokenBuilder, RtcRole } = require('agora-access-token');

// Your Agora App ID
const appID = '14d55aa12fa64c45877fb352f4f9e28d';
// Your Primary Certificate
const appCertificate = '90ae62d527be45f48e1ef4cae7a4552d';
// Channel name
const channelName = 'test-channel';
// User ID or UID
const uid = 0; // Set to 0 if using user account
// Role: RtcRole.PUBLISHER or RtcRole.SUBSCRIBER
const role = RtcRole.PUBLISHER;

// Token expiration time in seconds
const expirationTimeInSeconds = 3600;

// Current timestamp
const currentTimestamp = Math.floor(Date.now() / 1000);

// Expiration timestamp
const privilegeExpireTime = currentTimestamp + expirationTimeInSeconds;

// Build the token
const token = RtcTokenBuilder.buildTokenWithUid(appID, appCertificate, channelName, uid, role, privilegeExpireTime);

console.log('Token:', token);
