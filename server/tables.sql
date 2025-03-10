-- Tabela users
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255),
    google_id VARCHAR(255) UNIQUE,
    last_login TIMESTAMP,
    reset_password_token VARCHAR(255),
    reset_password_expires TIMESTAMP,
	especial bool DEFAULT FALSE,
);

-- Tabela usersGoldrush
CREATE TABLE IF NOT EXISTS usersgoldrush (
    id SERIAL PRIMARY KEY,
    nickname VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    last_login TIMESTAMP
);

-- Tabela active_sessions
CREATE TABLE IF NOT EXISTS active_sessions (
    id SERIAL PRIMARY KEY,
    token TEXT NOT NULL,
    user_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Tabela itemstoragegoldrush
CREATE TABLE IF NOT EXISTS itemstoragegoldrush (
    id SERIAL PRIMARY KEY,
    userid INTEGER NOT NULL,
    itemid INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    UNIQUE(userid, itemid),
    FOREIGN KEY (userid) REFERENCES usersgoldrush(id) ON DELETE CASCADE
);

-- Tabela matches
CREATE TABLE IF NOT EXISTS matches (
    id SERIAL PRIMARY KEY,
    playerOne_id INTEGER NOT NULL,
    playerTwo_id INTEGER NOT NULL,
    winner INTEGER, -- NULL se empate ou desistência
    start_time TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    end_time TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(), -- Supõe-se que o jogo termina quando inserido
    total_rounds INTEGER NOT NULL,
    wasFullMatch BOOLEAN NOT NULL,
    FOREIGN KEY (playerOne_id) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (playerTwo_id) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (winner) REFERENCES users(id) ON DELETE SET NULL
);

-- Tabela statisticsgoldrush
CREATE TABLE IF NOT EXISTS statisticsgoldrush (
    userid INTEGER PRIMARY KEY,
    escapedMatches INTEGER NOT NULL,
    killedEnemies INTEGER NOT NULL,
    timeSpendInMatches DECIMAL NOT NULL,
    totalMatches INTEGER NOT NULL,
    spoilsvalue DECIMAL NOT NULL,
    FOREIGN KEY (userid) REFERENCES usersgoldrush(id) ON DELETE CASCADE
);
