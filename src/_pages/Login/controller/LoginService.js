import Vue from '../../../prototype';
import { user } from '../../../models/user'
const LoginService = new Vue({
  data: {
    vm: this
  },
  methods: {
    do: async function (username, password) {
      /** Delete this when your webservice is set */
      this.$session.set('@app:user', JSON.stringify(user))
      this.$session.set('@app:token', JSON.stringify(username + password));
      return {
        success: true,
        msg: 'You\'re logged in. Loading..',
        user
      };
      /* Uncoment this when your webservice is set
      try {
        const result = await this.$http.post(this.$ws('USER', 'LOGIN'), {
          username,
          password,
        });

        if ("token" in result.data) {
          this.$session.set('@app:user', JSON.stringify(result.data));
          this.$session.set('@app:token', JSON.stringify(result.data.token));
          
          return this.$util.respond(user);
        }
      } catch (err) {
        return this.$util.respond(err.response.data, true);


      }
      */
    },
    done: function () {
      this.$session.destroy();
      return this.$util.respond("Saindo..");
    },
    check: function () {
      if (this.$session.get('@app:token')) {
        const user = this.$session.get('@app:user');
        if (user) return {
          authenticated: true,
          user: JSON.parse(user),
        }
      }
      return false;
    }
  },
});

export default LoginService;
