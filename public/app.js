// Initialize Firebase
let config = {
  apiKey: "AIzaSyAR4kDsYmYfxklwwmru0Q7ynH2ZPhpFyto",
  authDomain: "vue-links.firebaseapp.com",
  databaseURL: "https://vue-links.firebaseio.com",
  projectId: "vue-links",
  storageBucket: "vue-links.appspot.com",
  messagingSenderId: "345038877205"
};

let fb = firebase.initializeApp(config);
let db = fb.database();
let linksRef = db.ref('links');

var app = new Vue({
  el: '#app',
  data: function () {
    return{
      links: [],
      newLink: {
        page: '',
        description: '',
        url: ''
      }
    }
  },
  methods: {
    addLink: function() {
      linksRef.push(this.newLink)
      this.reloadTable();
      this.newLink.page = '';
      this.newLink.description = '';
      this.newLink.url = '';
    },
    deleteLink: function(link) {
      linksRef.child(link[0].key).remove();
      this.reloadTable();
    },
    reloadTable () {
      var that = this;
      that.links = []
      var query = linksRef.orderByKey();
      query.once('value',function(snap) {
        snap.forEach(function(item) {
          var data = []
          var itemVal = item.val();
          var itemKey = {key: item.key};
          data.push(itemKey)
          data.push(itemVal)
          //console.log(data)
          that.links.push(data)
        });
      });
    }
  },
  // Antes de renderear el template
  created: function () {
    this.reloadTable();
  }
});