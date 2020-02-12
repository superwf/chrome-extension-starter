/******/ "use strict";
/*!**************************!*\
  !*** ./src/hotReload.ts ***!
  \**************************/
/*! unknown exports (runtime-defined) */
/*! exports [maybe provided (runtime-defined)] [no usage info] */
/*! runtime requirements:  */

// copy from crx-hotreload
const filesInDirectory = (dir) => new Promise(resolve => dir.createReader().readEntries(entries => {
    return Promise.all(entries
        .filter(e => e.name[0] !== '.')
        .map(e => {
        return e.isDirectory ? filesInDirectory(e) : new Promise(r => e.file(r));
    }))
        .then((files) => {
        return [].concat(...files);
    })
        .then(resolve);
}));
const timestampForFilesInDirectory = (dir) => filesInDirectory(dir).then(files => files
    .map(f => {
    return f.name + f.lastModified;
})
    .join());
const reload = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        // NB: see https://github.com/xpl/crx-hotreload/issues/5
        var _a;
        if ((_a = tabs[0]) === null || _a === void 0 ? void 0 : _a.id) {
            chrome.tabs.reload(tabs[0].id);
        }
        chrome.runtime.reload();
    });
};
const watchChanges = (dir, lastTimestamp) => {
    timestampForFilesInDirectory(dir).then(timestamp => {
        if (!lastTimestamp || lastTimestamp === timestamp) {
            setTimeout(() => watchChanges(dir, timestamp), 1000); // retry after 1s
        }
        else {
            reload();
        }
    });
};
chrome.management.getSelf(self => {
    console.log('self.installType', self.installType);
    if (self.installType === 'development') {
        chrome.runtime.getPackageDirectoryEntry(dir => watchChanges(dir));
    }
});


//# sourceMappingURL=hotReload.js.map