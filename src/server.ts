import app from "./app";
import { prisma } from "./app/lib/prisma";

const PORT = process.env.PORT || 5000;

async function main() {
  try {
    await prisma.$connect();
    console.log("Connected to DB successfully");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("An error occuered:", error);
    await prisma.$disconnect();
    process.exit(1);
  }
}

main();
