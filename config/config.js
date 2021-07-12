const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 5000,
  jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key",
  db_name : "test_db",
  db_username : "postgres",
  db_password: "P@rasonge103"
}
  
export default config