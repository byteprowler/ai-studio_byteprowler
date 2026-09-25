export interface AniListAnime {
  id: number;
  title: {
    romaji: string;
    english: string | null;
  };
  coverImage: {
    medium?: string;
    large: string;
  };
  bannerImage: string | null;
  averageScore: number | null;
  episodes: number | null;
  status: string;
  genres: string[];
  siteUrl: string;
}

export interface AniListActivityItem {
  id: string;
  action: string;
  progress?: string;
  title: string;
  mediaType?: string;
  mediaFormat?: string;
  coverImage?: string;
  url?: string;
  createdAt: number;
  likes: number;
  replies: number;
}

export const fallbackAnimeList: AniListAnime[] = [
  {
    id: 110277,
    title: { romaji: "Shingeki no Kyojin: The Final Season", english: "Attack on Titan Final Season" },
    coverImage: { large: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx110277-O7vJXDg77r7q.png" },
    bannerImage: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/110277-7O2X8uAdY0Gq.jpg",
    averageScore: 88,
    episodes: 16,
    status: "FINISHED",
    genres: ["Action", "Drama", "Fantasy", "Mystery"],
    siteUrl: "https://anilist.co/anime/110277"
  },
  {
    id: 113415,
    title: { romaji: "Jujutsu Kaisen", english: "JUJUTSU KAISEN" },
    coverImage: { large: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx113415-8t9v7Z7ZdT9j.png" },
    bannerImage: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/113415-vHqscb7v6z1x.jpg",
    averageScore: 86,
    episodes: 24,
    status: "FINISHED",
    genres: ["Action", "Fantasy", "Mystery"],
    siteUrl: "https://anilist.co/anime/113415"
  },
  {
    id: 21519,
    title: { romaji: "Gintama", english: "Gintama Season 4" },
    coverImage: { large: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx21519-7YgVscb7Yg7Z.png" },
    bannerImage: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/21519-7O2X8uAdY0Gq.jpg",
    averageScore: 90,
    episodes: 51,
    status: "FINISHED",
    genres: ["Action", "Comedy", "Sci-Fi"],
    siteUrl: "https://anilist.co/anime/21519"
  },
  {
    id: 11061,
    title: { romaji: "Hunter x Hunter (2011)", english: "Hunter x Hunter (2011)" },
    coverImage: { large: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx11061-f9b6Maas9g9g.png" },
    bannerImage: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/11061-vHqscb7v6z1x.jpg",
    averageScore: 90,
    episodes: 148,
    status: "FINISHED",
    genres: ["Action", "Adventure", "Fantasy"],
    siteUrl: "https://anilist.co/anime/11061"
  }
];

const ANILIST_API_URL = "https://graphql.anilist.co";

const GET_USER_FAVOURITES_QUERY = `
  query ($username: String!, $page: Int!, $perPage: Int!) {
    User (name: $username) {
      favourites {
        anime (page: $page, perPage: $perPage) {
          pageInfo {
            hasNextPage
          }
          nodes {
            id
            title { romaji english }
            coverImage { medium large }
            bannerImage
            averageScore
            episodes
            status
            genres
            siteUrl
          }
        }
      }
    }
  }
`;

const FAVORITES_PER_PAGE = 25;
const MAX_FAVORITES_PAGES = 10;

const GET_USER_ID_QUERY = `
  query ($username: String!) {
    User(name: $username) {
      id
    }
  }
`;

const GET_USER_ACTIVITY_BY_ID_QUERY = `
  query ($userId: Int!, $limit: Int!) {
    Page(page: 1, perPage: $limit) {
      activities(userId: $userId, type: MEDIA_LIST, sort: ID_DESC) {
        ... on ListActivity {
          id
          status
          progress
          createdAt
          likeCount
          replyCount
          siteUrl
          media {
            id
            type
            format
            siteUrl
            title { romaji english }
            coverImage { medium large }
          }
        }
      }
    }
  }
`;

interface AniListGraphQlError {
  message?: string;
}

interface AniListActivityNode {
  id?: number;
  status?: string;
  progress?: string;
  createdAt?: number;
  likeCount?: number;
  replyCount?: number;
  siteUrl?: string;
  media?: {
    type?: string;
    format?: string;
    siteUrl?: string;
    title?: { romaji?: string; english?: string | null };
    coverImage?: { medium?: string; large?: string };
  };
}

async function requestAniList<T>(query: string, variables: Record<string, unknown>): Promise<T> {
  const response = await fetch(ANILIST_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error(`AniList server responded with HTTP status ${response.status}`);
  }

  const result = await response.json();
  if (result.errors) {
    const errors = result.errors as AniListGraphQlError[];
    throw new Error(errors[0]?.message || "Failed to query AniList endpoint");
  }

  return result.data as T;
}

function normalizeActivity(node: AniListActivityNode): AniListActivityItem | null {
  if (!node.id || !node.media) return null;

  const title = node.media.title?.english || node.media.title?.romaji || "Unknown media";

  return {
    id: String(node.id),
    action: node.status || "updated",
    progress: node.progress || undefined,
    title,
    mediaType: node.media.type,
    mediaFormat: node.media.format,
    coverImage: node.media.coverImage?.medium || node.media.coverImage?.large,
    url: node.siteUrl || node.media.siteUrl,
    createdAt: node.createdAt || 0,
    likes: node.likeCount || 0,
    replies: node.replyCount || 0,
  };
}

export async function fetchFavoriteAnime(username: string): Promise<AniListAnime[]> {
  const cleanUsername = username.trim();
  if (!cleanUsername) {
    return [];
  }

  const favorites: AniListAnime[] = [];

  for (let page = 1; page <= MAX_FAVORITES_PAGES; page += 1) {
    const data = await requestAniList<{
      User?: {
        favourites?: {
          anime?: {
            pageInfo?: { hasNextPage?: boolean };
            nodes?: AniListAnime[];
          };
        };
      };
    }>(GET_USER_FAVOURITES_QUERY, {
      username: cleanUsername,
      page,
      perPage: FAVORITES_PER_PAGE,
    });

    const animePage = data?.User?.favourites?.anime;
    const nodes = animePage?.nodes;
    if (Array.isArray(nodes)) {
      favorites.push(...nodes);
    }

    if (!animePage?.pageInfo?.hasNextPage) {
      break;
    }
  }

  return favorites;
}

export const fetchUserFavourites = fetchFavoriteAnime;

export async function fetchAniListActivity(
  username: string, 
  limit = 6
): 
Promise<AniListActivityItem[]> {
  const cleanUsername = username.trim();
  if (!cleanUsername) return [];

  const safeLimit = Math.min(Math.max(limit, 1), 6);
  const userData = await requestAniList<{ User?: { id?: number } }>(GET_USER_ID_QUERY, {
    username: cleanUsername,
  });
  const userId = userData.User?.id;

  if (!userId) return [];

  const activityData = await requestAniList<{ Page?: { activities?: AniListActivityNode[] } }>(
    GET_USER_ACTIVITY_BY_ID_QUERY,
    { userId, limit: safeLimit },
  );

  return (activityData.Page?.activities || [])
    .map(normalizeActivity)
    .filter((activity): activity is AniListActivityItem => Boolean(activity))
    .slice(0, safeLimit);
}
