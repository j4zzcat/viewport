// Route Help
// Print the help information to stderr.

export default function ({ params, error, stderr, stderr_end }) {
  const command = this.helping(params);
  if (error) {
    stderr.write(`\n${typeof error === "string" ? error : error.message}\n`);
  }
  stderr.write(this.help(command));
  if (stderr_end) {
    stderr.end();
  }
  return null;
}
