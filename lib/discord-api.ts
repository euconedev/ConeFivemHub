// lib/discord-api.ts
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
  roles: string[];
  joined_at: string;
  premium_since: string | null;
  deaf: boolean;
  mute: boolean;
  pending?: boolean;
  permissions?: string;
  communication_disabled_until?: string | null;
}

// === FUNÇÃO ÚNICA: CHAMA A API INTERNA ===
export async function getDiscordClientMembers(
  guildId: string,
  clientRoleName: string = 'cliente',
  botToken: string
): Promise<DiscordGuildMember[]> {
  const params = new URLSearchParams({
    guildId,
    role: clientRoleName,
    token: botToken,
  });

  const res = await fetch(`/api/discord/members?${params.toString()}`);

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`API Error: ${res.status} - ${errorText}`);
  }

  return await res.json();
}
