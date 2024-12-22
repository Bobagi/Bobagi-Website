/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("users", {
    id: "id",
    email: { type: "varchar(255)", notNull: true, unique: true },
    username: { type: "varchar(255)", notNull: true, unique: true },
    password: "varchar(255)",
    google_id: { type: "varchar(255)", unique: true },
    last_login: "timestamp",
    reset_password_token: "varchar(255)",
    reset_password_expires: "timestamp",
    especial: { type: "boolean", default: false },
  });

  pgm.createTable("usersgoldrush", {
    id: "id",
    nickname: { type: "varchar(255)", notNull: true, unique: true },
    password: { type: "varchar(255)", notNull: true },
    last_login: "timestamp",
  });

  pgm.createTable("active_sessions", {
    id: "id",
    token: { type: "text", notNull: true },
    user_id: {
      type: "integer",
      notNull: true,
      references: '"users"',
      onDelete: "CASCADE",
    },
  });

  pgm.createTable("cripto_currency", {
    id: "id",
    symbol: { type: "varchar(50)", notNull: true, unique: true },
    cryptoId: { type: "varchar(255)", notNull: true },
  });

  pgm.createTable("cripto_email", {
    id: "id",
    email: { type: "varchar(255)", notNull: true, unique: true },
  });

  pgm.createTable("cripto_threshold", {
    id: "id",
    id_email: {
      type: "integer",
      notNull: true,
      references: '"cripto_email"',
      onDelete: "CASCADE",
    },
    id_cripto: {
      type: "integer",
      notNull: true,
      references: '"cripto_currency"',
      onDelete: "CASCADE",
    },
    threshold: { type: "decimal", notNull: true },
    greaterThanCurrent: { type: "boolean", notNull: true },
    created_at: { type: "timestamp", notNull: true },
  });

  pgm.createTable("itemstoragegoldrush", {
    id: "id",
    userid: {
      type: "integer",
      notNull: true,
      references: '"usersgoldrush"',
      onDelete: "CASCADE",
    },
    itemid: { type: "integer", notNull: true },
    quantity: { type: "integer", notNull: true },
  });

   pgm.addConstraint("itemstoragegoldrush", "unique_userid_itemid", {
     unique: ["userid", "itemid"],
   });

  pgm.createTable("matches", {
    id: "id",
    playerOne_id: {
      type: "integer",
      notNull: true,
      references: '"users"',
      onDelete: "SET NULL",
    },
    playerTwo_id: {
      type: "integer",
      notNull: true,
      references: '"users"',
      onDelete: "SET NULL",
    },
    winner: { type: "integer", references: '"users"', onDelete: "SET NULL" },
    start_time: { type: "timestamp", notNull: true },
    end_time: { type: "timestamp", default: pgm.func("NOW()") },
    total_rounds: { type: "integer", notNull: true },
    wasFullMatch: { type: "boolean", notNull: true },
  });

  pgm.createTable("statisticsgoldrush", {
    userid: {
      type: "integer",
      primaryKey: true,
      references: '"usersgoldrush"',
      onDelete: "CASCADE",
    },
    escapedMatches: { type: "integer", notNull: true },
    killedEnemies: { type: "integer", notNull: true },
    timeSpendInMatches: { type: "decimal", notNull: true },
    totalMatches: { type: "integer", notNull: true },
    spoilsvalue: { type: "decimal", notNull: true },
  });
};

exports.down = pgm => {};
