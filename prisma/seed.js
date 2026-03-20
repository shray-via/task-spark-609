import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const seedTodos = [
  { title: 'Review weekly goals and pick the top 3 priorities', completed: true },
  { title: 'Book dentist appointment for next month', completed: false },
  { title: 'Prep ingredients for Saturday dinner with friends', completed: false },
  { title: 'Archive finished design files from the desktop', completed: true },
];

async function main() {
  const count = await prisma.todo.count();
  if (count > 0) return;

  await prisma.todo.createMany({ data: seedTodos });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
