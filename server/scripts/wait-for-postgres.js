require("dotenv").config();

if (!process.env.POSTGRES_HOST) {
  throw new Error("Environment variable POSTGRES_HOST is not defined");
}else{
  console.log(process.env)
}

const { exec } = require("node:child_process");

function checkPostgres() {
  exec(
    `docker exec postgres-website pg_isready --host ${process.env.POSTGRES_HOST}`,
    handleReturn
  );

  async function handleReturn(error, stdout) {
    if (stdout.search("accepting connections") === -1) {
      process.stdout.write("🟡");
      return checkPostgres();
    }

    console.log("🟢 PostgreSQL is ready!");
  }
}

console.log("🔴 Waiting for PostgreSQL to become available...");
checkPostgres();
