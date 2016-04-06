describe("Stylesheets plugin", function() {

  it("should move CSS and compiled SCSS to assets folder", function(done) {
    var uid = triggerBuild({
      builds: [{ format: "html" }],
      stylesheets: {
        files: [
          "spec/support/book/stylesheets/styles.css",
          "spec/support/book/stylesheets/otherstyles.scss",
        ]
      },
      finish: function() {
        expect(buildPath(uid, "build1/assets/styles.css")).toExist();
        expect(buildPath(uid, "build1/assets/otherstyles.css")).toExist();
        done();
      }
    });
  });

  it("should move CSS into subfolders", function(done) {
    var uid = triggerBuild({
      builds: [{ format: "html" }],
      stylesheets: {
        files: [
          "spec/support/book/**/styles.css",
          "spec/support/book/**/otherstyles.scss",
        ]
      },
      finish: function() {
        expect(buildPath(uid, "build1/assets/stylesheets/styles.css")).toExist();
        expect(buildPath(uid, "build1/assets/stylesheets/otherstyles.css")).toExist();
        done();
      }
    });
  });

  it("should use custom stylesheets destination folder", function(done) {
    var uid = triggerBuild({
      builds: [{ format: "html" }],
      stylesheets: {
        destination: "myassets/css",
        files: [
          "spec/support/book/stylesheets/styles.css",
        ]
      },
      finish: function() {
        expect(buildPath(uid, "build1/myassets/css/styles.css")).toExist();
        done();
      }
    });
  });

  it("should compress stylesheets", function(done) {
    var uid = triggerBuild({
      builds: [{ format: "html" }],
      stylesheets: {
        compress: true,
        files: [
          "spec/support/book/stylesheets/styles.css",
        ]
      },
      finish: function() {
        expect(buildPath(uid, "build1/assets/styles.css")).toHaveContent("color:green");
        done();
      }
    });
  });

  it("should digest stylesheets", function(done) {
    var uid = triggerBuild({
      builds: [{ format: "html" }],
      stylesheets: {
        digest: true,
        files: [
          "spec/support/book/stylesheets/styles.css",
        ]
      },
      finish: function() {
        expect(buildPath(uid, "build1/assets/styles.css")).not.toExist();
        expect(buildPath(uid, "build1/assets/styles-b71c3f4f5d.css")).toExist();
        done();
      }
    });
  });

  it("should bundle stylesheets with default name", function(done) {
    var uid = triggerBuild({
      builds: [{ format: "html" }],
      stylesheets: {
        bundle: true,
        files: [
          "spec/support/book/stylesheets/styles.css",
          "spec/support/book/stylesheets/otherstyles.scss"
        ]
      },
      finish: function() {
        expect(buildPath(uid, "build1/assets/bundle.css")).toHaveContent("color: red;");
        expect(buildPath(uid, "build1/assets/bundle.css")).toHaveContent("color: green;");
        done();
      }
    });
  });

  it("should bundle stylesheets with custom name", function(done) {
    var uid = triggerBuild({
      builds: [{ format: "html" }],
      stylesheets: {
        bundle: "mybundle.css",
        files: [
          "spec/support/book/stylesheets/styles.css",
          "spec/support/book/stylesheets/otherstyles.scss"
        ]
      },
      finish: function() {
        expect(buildPath(uid, "build1/assets/mybundle.css")).toExist();
        done();
      }
    });
  });

  it("should insert stylesheets in layout", function(done) {
    var uid = triggerBuild({
      builds: [{ format: "html" }],
      layout: "spec/support/book/layouts/assets.html",
      stylesheets: {
        files: [
          "spec/support/book/stylesheets/styles.css",
          "spec/support/book/stylesheets/otherstyles.scss"
        ]
      },
      finish: function() {
        expect(buildPath(uid, "build1/first-chapter.html")).toHaveContent("<link rel=\"stylesheet\" href=\"assets/styles.css\">");
        expect(buildPath(uid, "build1/first-chapter.html")).toHaveContent("<link rel=\"stylesheet\" href=\"assets/otherstyles.css\">");
        done();
      }
    });
  });

});
