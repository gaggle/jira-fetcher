import { URL } from "./index"

export type ParsedIssue = ParsedEpic | ParsedStory

export type ParsedEpic = Issue<"Epic"> & {
  epicKey?: never;
  epicName: string | null;
}

export type ParsedStory = Issue<"Story"> & {
  epicKey?: string | null; // fields > customfield_11120
  epicName?: never; // fields > customfield_11121
}

interface Issue<T> {
  key: string; // key
  description: string | null; // fields > description
  summary: string | null; // fields > summary
  issuetype: {
    name: T; // fields > issuetype > name
    iconUrl: URL; // fields > issuetype > iconUrl
  };
  webUrl: URL; // self
}
