import { Injectable } from '@angular/core';

declare let document: any;
declare let $: any;

interface Script {
  src: string;
  loaded: boolean;
}

@Injectable()
export class ScriptLoaderService {
  private scripts: Script[] = [];
  private tag: any;

  load(tag, ...scripts: string[]) {
    this.tag = tag;
    scripts.forEach(
      (script: string) =>
        (this.scripts[script] = { src: script, loaded: false })
    );

    const promises: any[] = [];
    scripts.forEach(script => promises.push(this.loadScript(script)));
    return Promise.all(promises);
  }

  loadScript(src: string) {
    return new Promise((resolve, reject) => {
      // resolve if already loaded
      if (this.scripts[src].loaded) {
        resolve({ script: src, loaded: true, status: 'Already Loaded' });
      } else {
        // load script
         const script = document.createElement('script');
         script.setAttribute('type', 'text/javascript');
         script.setAttribute('src', this.scripts[src].src);

         document.querySelector(this.tag).append(script);
         resolve({ script: src, loaded: true, status: 'Loaded' });
      }
    });
  }
}
