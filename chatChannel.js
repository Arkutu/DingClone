import client from './supabaseRealtime';

const channel = client.channel('chat-channel', {
  config: {
    broadcast: { ack: true, self: false },
    presence: { key: 'user_id' }
  }
});

export default channel;
