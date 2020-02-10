/// <reference types="filesystem" />
declare const filesInDirectory: (dir: DirectoryEntry) => Promise<File[]>;
declare const timestampForFilesInDirectory: (dir: DirectoryEntry) => Promise<string>;
declare const reload: () => void;
declare const watchChanges: (dir: DirectoryEntry, lastTimestamp?: string | undefined) => void;
