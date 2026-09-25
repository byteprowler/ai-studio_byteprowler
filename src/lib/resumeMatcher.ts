import { defaultResumeProfile, resumeProfiles, type ResumeProfile } from "./content/resumeProfiles";

function normalize(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function getTokens(values: string[]) {
  return values.flatMap((value) => normalize(value).split(" ")).filter(Boolean);
}

export interface ResumeMatchResult {
  profile: ResumeProfile;
  score: number;
  reason: string;
}

export function matchResumeProfile(selectedRole: string, focusAreas: string[]): ResumeMatchResult {
  const roleTokens = getTokens([selectedRole]);
  const focusTokens = getTokens(focusAreas);

  const scoredProfiles = resumeProfiles.map((profile) => {
    const roleTagTokens = getTokens(profile.roleTags);
    const profileFocusTokens = getTokens(profile.focusAreas);
    const labelTokens = getTokens([profile.label]);

    const roleScore = roleTokens.reduce((score, token) => {
      return score + (roleTagTokens.includes(token) || labelTokens.includes(token) ? 4 : 0);
    }, 0);

    const focusScore = focusTokens.reduce((score, token) => {
      return score + (profileFocusTokens.includes(token) || roleTagTokens.includes(token) ? 2 : 0);
    }, 0);

    return {
      profile,
      score: roleScore + focusScore,
    };
  });

  const bestMatch = scoredProfiles.sort((a, b) => b.score - a.score)[0];
  const profile = bestMatch?.score > 0 ? bestMatch.profile : defaultResumeProfile;

  return {
    profile,
    score: bestMatch?.score ?? 0,
    reason:
      focusAreas.length > 0
        ? `${profile.label} matched the selected role signal and ${focusAreas.length} focus area${
            focusAreas.length === 1 ? "" : "s"
          }.`
        : `${profile.label} is the closest match for the selected role signal.`,
  };
}
