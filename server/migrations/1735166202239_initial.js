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
    is_especial: { type: "boolean", default: false },
  });

  pgm.createTable("users_goldrush", {
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

  pgm.createTable("crypto_currency", {
    id: "id",
    symbol: { type: "varchar(50)", notNull: true, unique: true },
    crypto_id: { type: "varchar(255)", notNull: true },
  });

  pgm.createTable("crypto_email", {
    id: "id",
    email: { type: "varchar(255)", notNull: true, unique: true },
  });

  pgm.createTable("crypto_threshold", {
    id: "id",
    email_id: {
      type: "integer",
      notNull: true,
      references: '"crypto_email"',
      onDelete: "CASCADE",
    },
    crypto_id: {
      type: "integer",
      notNull: true,
      references: '"crypto_currency"',
      onDelete: "CASCADE",
    },
    threshold: { type: "decimal", notNull: true },
    is_greater_than_current: { type: "boolean", notNull: true },
    created_at: { type: "timestamp", notNull: true },
  });

  pgm.createTable("item_storage_goldrush", {
    id: "id",
    user_id: {
      type: "integer",
      notNull: true,
      references: '"users_goldrush"',
      onDelete: "CASCADE",
    },
    item_id: { type: "integer", notNull: true },
    quantity: { type: "integer", notNull: true },
  });

  pgm.addConstraint("item_storage_goldrush", "unique_user_id_item_id", {
    unique: ["user_id", "item_id"],
  });

  pgm.createTable("matches", {
    id: "id",
    player_one_id: {
      type: "integer",
      notNull: true,
      references: '"users"',
      onDelete: "SET NULL",
    },
    player_two_id: {
      type: "integer",
      notNull: true,
      references: '"users"',
      onDelete: "SET NULL",
    },
    winner_id: { type: "integer", references: '"users"', onDelete: "SET NULL" },
    start_time: { type: "timestamp", notNull: true },
    end_time: { type: "timestamp", default: pgm.func("NOW()") },
    total_rounds: { type: "integer", notNull: true },
    was_full_match: { type: "boolean", notNull: true },
  });

  pgm.createTable("statistics_goldrush", {
    user_id: {
      type: "integer",
      primaryKey: true,
      references: '"users_goldrush"',
      onDelete: "CASCADE",
    },
    escaped_matches: { type: "integer", notNull: true },
    killed_enemies: { type: "integer", notNull: true },
    time_spent_in_matches: { type: "decimal", notNull: true },
    total_matches: { type: "integer", notNull: true },
    spoils_value: { type: "decimal", notNull: true },
  });
};

exports.down = (pgm) => {};
