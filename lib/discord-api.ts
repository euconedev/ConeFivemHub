export interface DiscordRole {
  id: string;
  name: string;
  permissions: string;
  color: number;
  hoist: boolean;
  managed: boolean;
  mentionable: boolean;
}

export interface DiscordGuildMember {
  user: {
    id: string;
    username: string;
    discriminator: string;
    avatar: string | null;
    bot?: boolean;
    system?: boolean;
    mfa_enabled?: boolean;
    locale?: string;
    verified?: boolean;
    email?: string;
    flags?: number;
    premium_type?: number;
    public_flags?: number;
  };
  nick: string | null;
  avatar: string | null;
  roles: string[]; // Array of role IDs
  joined_at: string;
  premium_since: string | null;
  deaf: boolean;
  mute: boolean;
  pending?: boolean;
  permissions?: string;
  communication_disabled_until?: string | null;
}

export async function getDiscordRoles(guildId: string, botToken: string): Promise<DiscordRole[]> {
  const response = await fetch(`https://discord.com/api/v10/guilds/${guildId}/roles`, {
    headers: {
      Authorization: `Bot ${botToken}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch Discord roles: ${response.statusText}`);
  }

  return response.json();
}

export async function getDiscordGuildMembers(guildId: string, botToken: string): Promise<DiscordGuildMember[]> {
  let allMembers: DiscordGuildMember[] = [];
  let lastUserId: string | undefined = undefined;
  const limit = 1000; // Max limit for Discord API

  while (true) {
    let url = `https://discord.com/api/v10/guilds/${guildId}/members?limit=${limit}`;
    if (lastUserId) {
      url += `&after=${lastUserId}`;
    }

    const response = await fetch(url, {
      headers: {
        Authorization: `Bot ${botToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch Discord guild members: ${response.statusText}`);
    }

    const members: DiscordGuildMember[] = await response.json();
    if (members.length === 0) {
      break; // No more members
    }

    allMembers = allMembers.concat(members);
    lastUserId = members[members.length - 1].user.id;

    if (members.length < limit) {
      break; // Less than limit, so no more pages
    }
  }

  return allMembers;
}

export async function getDiscordClientMembers(guildId: string, clientRoleName: string, botToken: string): Promise<DiscordGuildMember[]> {
  const roles = await getDiscordRoles(guildId, botToken);
  const clientRole = roles.find(role => role.name === clientRoleName);

  if (!clientRole) {
    throw new Error(`Role "${clientRoleName}" not found in guild ${guildId}`);
  }

  const allMembers = await getDiscordGuildMembers(guildId, botToken);
  const clientMembers = allMembers.filter(member => member.roles.includes(clientRole.id));

  return clientMembers;
}
