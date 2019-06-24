class Concert {
    constructor(containerElement, idx, nextLog) {
      this.containerElement = containerElement;
      this.nextLog = nextLog;
      // Bind methods.
      this._loadComm = this._loadComm.bind(this);
      this._saveComm = this._saveComm.bind(this);
      this.saveNewComm = this.saveNewComm.bind(this);

      console.log(idx);

      this.id = CONCERT_INFO[idx].title;
      this.comm = "Text your comment here.";
      this.pElement = this._createPosterDOM(idx);
      this.logElement = this._createConcertDOM(idx);
      this.containerElement.append(this.pElement);
      this.containerElement.append(this.logElement);

      //this._loadComm();
    }

    _createPosterDOM(idx) {
      const pContainer = document.createElement('div');
      pContainer.classList.add('poster');
      pContainer.style.backgroundImage = "url('"+CONCERT_INFO[idx].poster+"')";
  
      return pContainer;
    }

    _createConcertDOM(idx) {
      const logContainer = document.createElement('div');
      logContainer.classList.add('info');
  
      const title = document.createElement('div');
      title.classList.add('concert-info');
      title.classList.add('title'); 
      title.textContent = CONCERT_INFO[idx].title;
  
      const atime = document.createElement('div');
      atime.classList.add('concert-info');
      atime.classList.add('atime');
      atime.textContent= CONCERT_INFO[idx].time;
  
      const comm = document.createElement('textarea');
      comm.classList.add('concert-info');
      comm.classList.add('comm');
      comm.id = "comm";
      comm.textContent = this.comm;

      logContainer.appendChild(title);
      logContainer.appendChild(atime);
      logContainer.appendChild(comm);
      return logContainer;
    }

    async _loadComm() {
      console.log(this.id);

      const result = await fetch('/get/'+this.id);
      const json = await result.json();
      console.log(json);
      if(json) {
        const textContainer = document.querySelector('#comm');
        textContainer.value = json.comm;
        this.comm = json.comm;
      }
      else this.saveNewComm()

      document.addEventListener('click',this._saveComm);
    }

    async saveNewComm() {
      const params = {
        id: this.id,
        comm: this.comm
      }
      const fetchOptions = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
      };
      const result = await fetch('/nsave', fetchOptions);
    }

    async _saveComm() {
      event.preventDefault();

      const params = {
        id: this.id,
        comm: this.comm
      }
      const fetchOptions = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
      };
      const result = await fetch('/save', fetchOptions);
    }
}