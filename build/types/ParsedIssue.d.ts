import { URL } from "./index";
export declare type ParsedIssue = ParsedEpic | ParsedStory;
export declare type ParsedEpic = Issue<"Epic"> & {
    epicKey?: never;
    epicName: string | null;
};
export declare type ParsedStory = Issue<"Story"> & {
    epicKey?: string | null;
    epicName?: never;
};
interface Issue<T> {
    key: string;
    description: string | null;
    summary: string | null;
    issuetype: {
        name: T;
        iconUrl: URL;
    };
    webUrl: URL;
}
export {};
