async function main() {
  const chunks = [];
  for await (const chunk of process.stdin) {
    chunks.push(chunk);
  }
  
  const toolArgs = JSON.parse(Buffer.concat(chunks).toString());
  
  // Extract the file path Claude is trying to read
  const readPath = 
    toolArgs.tool_input?.file_path || toolArgs.tool_input?.path || "";
  
  // Check if Claude is trying to read the .env file
  if (readPath.includes('.env') || readPath.includes('.env.local')) {
    console.error("You cannot read the .env or .env.local file");
    process.exit(2);
  }

  console.log(`Reading file: ${readPath}`);
}

main();