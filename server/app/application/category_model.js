// ~> Model
// ~A Scott Smereka

/* App
 * Handles all data related to an application's SDL category.
 */

 /* ************************************************** *
  * ******************** Load Libraries
  * ************************************************** */
 var fox      = require("foxjs"),
     model    = fox.model;

module.exports = function(app, db, config) {

  /* ************************************************** *
   * ******************** Module Variables
   * ************************************************** */

  var Schema      = db.Schema,              // Mongoose schema object for MongoDB documents.
      ObjectId    = Schema.ObjectId;        // Object ID used in mongoose schemas


  /* ************************************************** *
   * ******************** Module Config Schema
   * ************************************************** */

  /**
   * Describes a SDL category for applications.
   */
  var Category = new Schema({
    name:       { type:String },               // Name of the cateogry, gernally this will be displayed to the user.
    queryName:  { type:String },               // Nice name for quering a category.
    value:      { type:Number, unique: true }  // Unique value representing the category
  });


  /* ************************************************** *
   * ******************** Application Methods
   * ************************************************** */

  /* ************************************************** *
   * ******************** Application Events
   * ************************************************** */

  Category.pre('save', function(next) {
    return next();
  });


  /* ************************************************** *
   * ******************** CRUD Override Methods
   * ************************************************** */

   /* Enabling CRUD will automatically take care of
    * update, and delete methods for the object. However
    * you can still add your own custom functionality
    * here, by overriding the default methods.
    *
    * In addition to overriding you can add more methods
    * that CRUD will automatically use such as sanitize.
    */

  /**
   * Strip out secret information that should not be seen
   * outside of this server.
   */
  Category.methods.sanitize = function() {
    return this;
  };

  /* ************************************************** *
   * ******************** Plugins
   * ************************************************** */

  // Enable additional functionality through plugins
  // you have written or 3rd party plugins.

  // Add addition fields and methods to this schema to
  // create, read, update, and delete schema objects.
  Category.plugin(model.crudPlugin);

  /* ************************************************** *
   * ******************** Export Schema(s)
   * ************************************************** */

  db.model('Category', Category);
};
