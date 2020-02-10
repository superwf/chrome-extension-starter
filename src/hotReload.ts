// copy from crx-hotreload

const filesInDirectory = (dir: DirectoryEntry): Promise<File[]> =>
  new Promise(resolve =>
    dir.createReader().readEntries(entries => {
      return Promise.all(
        entries
          .filter(e => e.name[0] !== '.')
          .map(e => {
            return e.isDirectory ? filesInDirectory(e as DirectoryEntry) : new Promise(r => (e as any).file(r))
          }),
      )
        .then((files: any[]): File[] => {
          return [].concat(...files)
        })
        .then(resolve)
    }),
  )

const timestampForFilesInDirectory = (dir: DirectoryEntry): Promise<string> =>
  filesInDirectory(dir).then(files =>
    files
      .map(f => {
        return f.name + (f as File).lastModified
      })
      .join(),
  )

const reload = (): void => {
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    // NB: see https://github.com/xpl/crx-hotreload/issues/5

    if (tabs[0]?.id) {
      chrome.tabs.reload(tabs[0].id)
    }

    chrome.runtime.reload()
  })
}

const watchChanges = (dir: DirectoryEntry, lastTimestamp?: string): void => {
  timestampForFilesInDirectory(dir).then(timestamp => {
    if (!lastTimestamp || lastTimestamp === timestamp) {
      setTimeout(() => watchChanges(dir, timestamp), 1000) // retry after 1s
    } else {
      reload()
    }
  })
}

chrome.management.getSelf(self => {
  if (self.installType === 'development') {
    chrome.runtime.getPackageDirectoryEntry(dir => watchChanges(dir))
  }
})
