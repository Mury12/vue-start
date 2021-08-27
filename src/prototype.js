import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue';
import VueTheMask from 'vue-the-mask';
import VueSession from 'vue-session';
import PageTitle from './components/PageTitle/PageTitle.vue';
import VueScrollTo from 'vue-scrollto'
import moment from 'moment'
import Axios from 'axios';

let wsr = require('../ws-routes.js').default;

Vue
  .use(VueSession, { persist: true })
  .use(VueTheMask)
  .use(BootstrapVue)
  .use(VueScrollTo, {
    container: "body",
    duration: 500,
    easing: "ease",
    offset: 0,
    force: true,
    cancelable: true,
    onStart: false,
    onDone: false,
    onCancel: false,
    x: false,
    y: true
  })

Vue.component('page-title', PageTitle);

/**
 * Perform http requests.
 * 
 * @method get {Promise<any>} 
 * @method put {Promise<any>} 
 * @method post {Promise<any>} 
 * @method patch {Promise<any>} 
 * @method delete {Promise<any>} 
 */
Vue.prototype.$http = {
  /**
   * Performs a POST http request
   * @param {string} url url
   * @param {*} data body
   */
  post: async (url, data) => {
    try {
      const result = await Axios.post(url, data);
      return result.data;
    } catch (error) {
      return error.response;
    }
  },

  /**
   * Performs a PUT http request
   * @param {string} url url
   * @param {*} data body
   */
  put: async (url, data) => {
    try {
      const result = await Axios.put(url, data,);
      return result.data;
    } catch (error) {
      return error.response;
    }
  },

  /**
   * Performs a GET http request
   * @param {string} url url
   * @param {*} params query params
   */
  get: async (url, params = {}) => {
    try {
      const result = await Axios.get(url, {
        params
      });
      return result.data;
    } catch (error) {
      return error.response;
    }
  },

  /**
   * Performs a DELETE http request
   * @param {string} url url
   * @param {*} params query params
   */
  del: async (url, params = {}) => {
    try {
      const result = await Axios.delete(url, {
        params
      });
      return result.data;
    } catch (error) {
      return error.response.data;
    }
  },

  /**
   * Performs a PATCH http request
   * @param {string} url url
   * @param {*} data body
   */
  patch: async (url, data) => {
    try {
      const result = await Axios.patch(url, data);
      return result.data;
    } catch (error) {
      return error.response;
    }
  }
}


Vue.prototype.$cookie = {
  /**
   * Set a cookie
   * @param {string} name 
   * @param {string} value 
   */
  set: (name, value) => {
    document.cookie = `${name}=${value}`
  },
  /**
   * Get cookie by name
   * @param {string} name 
   */
  get: (name) => {
    var c = document.cookie;
    var r = c.split(name)[1];
    if (r) {
      r = (r.split(';')[0]).split('=');
      return r[1];
    }
    return false
  },
  /**
   * Unset a cookie
   * @param {string} name 
   */
  destroy: (name) => {
    document.cookie = `${name}=${null}`
  }
}

/**
 * Parses an object using a reference model.
 * Useful if you want fields *exactly* equals the reference.
 * 
 * @param {Object} model a reference model
 * @param {Object} data the desired data
 * @returns {Object}
 */
Vue.prototype.$util = {
  parseToModel: (model, data) => {
    const parsed = { ...model };
    for (let key in model) {
      if (!data) break;
      if (data[key] === null) {
        continue;
      }
      if (data[key]) parsed[key] = data[key];
      if (typeof data[key] === "object" && model[key]) {
        if (Array.isArray(data[key])) {
          parsed[key] = data[key];
        } else {
          parsed[key] = Vue.prototype.$util.parseToModel(model[key], data[key]);
        }
      }
    }
    return parsed;
  },

  $timeDiff: (start, end) => {
    const date1 = new Date(moment(start).format("YYYY/MM/DD hh:mm:ss"));
    let date2 = new Date(moment().subtract(3, 'hours'));
    if (end)
      date2 = new Date(moment(end).format("YYYY/MM/DD hh:mm:ss"));

    let diffTime = Math.abs(date2 - date1);

    let seconds = Math.floor((diffTime / 1000) % 60)
    let minutes = Math.floor((diffTime / (1000 * 60)) % 60)
    let hours = Math.floor((diffTime / (1000 * 60 * 60)))

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return hours + ":" + minutes + ":" + seconds;
  },
  /**
   * Standarizes responses from inside the application to match webservice responses.
   * @param {string} message 
   * @param {boolean} error 
   */
  respond: function (message, error = false) {
    return {
      success: !error,
      status: message
    }
  },

  /**
   * Triggers a toast message with a default configuration
   * @param {string} message the message to show
   * @param {boolean} success variant success if true or error if false.
   */
  toast: (message, success = true, $vm = new Vue()) => {
    return $vm.$bvToast.toast(message, {
      title: "Mensagem do sistema",
      autoHideDelay: 5000,
      appendToast: false,
      variant: success ? "success" : "danger",
    });
  },
}

/**
 * Loads and mounts URIs based in ws-routes.js file
 * @param {string} domain Route domain such as USER, COMPANY, etc.
 * @param {string} name route name
 * @param {*} opts route options if dynamic
 */
Vue.prototype.$ws = (domain, name = "BASE", opts) => {
  domain = domain.toUpperCase();
  name = name.toUpperCase() || "";
  if (domain === 'BASE') {
    return wsr.WS.URL
  }
  if (opts && opts.length) {
    const route = wsr.WS[domain][name];
    if (typeof route === 'function')
      return wsr.WS.URL + route(...opts)
  }
  return wsr.WS.URL + wsr.WS[domain][name]
}

Vue.prototype.$promise = {
  /**
   * Makes a promise until reach the number `tries` chosen or success.
   * @param {Function} fn function to enqueue
   * @param {number} tries number of tries
   */
  do: async (fn, tries = 3) => {
    if (typeof fn !== 'function')
      throw new TypeError(`Expected fn to be function, given ${typeof fn} instead`);
    return new Promise((resolve, reject) => {

      let t = tries;
      if (t === 0) {
        reject('Maximum tries exceeded');
        return;
      }
      try {
        setTimeout(async () => {
          const result = await fn();
          if (result && result.success)
            resolve(result);
          else
            setTimeout(() => {
              resolve(Vue.prototype.$http.refetch(fn, --t));
            }, 350)
        }, 1)
      } catch (error) {
        setTimeout(() => {
          resolve(Vue.prototype.$http.refetch(fn, --t));
        }, 350)
      }
    });
  }
}

export default Vue;


