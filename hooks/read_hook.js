async function main() {
    const { basename } = await import('node:path');
    const chunks = [];
    for await(const chunk of process.stdin){
        chunks.push(chunk); 
    }

    const toolArgs = JSON.parse(Buffer.concat(chunks).toString);
    const readPath = toolArgs.tool_input?.file_path || toolArgs.tool_input?.path || "";

    const fileName = basename(readPath);
    const blockedFiles = ['.env', '.env.local'];

    const isBlocked = blockedFiles.contains(fileName);

    if (isBlocked) {
    console.error(`❌ Access Denied: Cannot read file: ${fileName}`);
    process.exit(2);
  }

  console.log(`✓ Allowing read of: ${readPath}`);
  
}

main();