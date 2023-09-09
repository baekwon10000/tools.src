export default {

  scriptsLoaded: [],

  /**
   * 
   * @param {*} url 
   * @param {*} callback 
   */
  loadScript: function(url, callback) {
    let split = url.split('/');
    let filename = split[split.length-1];
    let scriptsLoaded = this.scriptsLoaded;
    // let scriptsLoaded = this.state.scriptsLoaded;
    if(!scriptsLoaded.includes(filename)) {
      // console.log('load script...');
      scriptsLoaded.push(filename);
      // this.setState({scriptsLoaded: scriptsLoaded});
      let script = document.createElement('script');
      script.type = 'text/javascript';
      script.onload = function() { callback(); };
      script.src = url;
      document.getElementsByTagName('head')[0].appendChild(script);
    } else 
      callback();
  }
}